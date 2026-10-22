/**
 * Pure, DOM-free logic for the network background, ported from the
 * `boot()` method in docs/design/Background.dc.html. Kept separate
 * from NetworkBackground.tsx (which owns the canvas, rAF loop and
 * pointer/visibility wiring) so the maths can be unit tested without
 * a DOM.
 */

export interface FieldNode {
  /** Stable index into the deterministic field; used for the hub-ring rule (i % 11). */
  i: number;
  u: number;
  v: number;
  w: number;
  z: number;
  layer: number;
}

/** [x, y] in 0..1 normalized layout space. */
export type Point = [number, number];

/**
 * The same 64/72-node field every load: a tiny seeded linear
 * congruential generator (Lehmer / Park-Miller), seed 42, exactly as
 * in the source component. Determinism matters here — it's what lets
 * the four layouts below read as one field reconfiguring rather than
 * scenes swapping.
 */
export function generateField(total = 72): FieldNode[] {
  let s = 42;
  const r = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const nodes: FieldNode[] = [];
  for (let i = 0; i < total; i++) {
    const u = r();
    const v = r();
    const w = r();
    const z = r();
    nodes.push({ i, u, v, w, z, layer: Math.floor(u * 6) });
  }
  return nodes;
}

/**
 * The four page-state layouts of the same node field:
 * 0 hero · 1 research · 2 dense content · 3 contact.
 */
export function layout(k: 0 | 1 | 2 | 3, n: FieldNode): Point {
  if (k === 0) {
    if (n.w < 0.22) return [n.u * 0.44, 0.1 + 0.8 * n.v];
    return [
      0.46 + 0.52 * (n.layer / 5) + (n.w - 0.5) * 0.05,
      0.12 + 0.76 * n.v + 0.05 * Math.sin(n.layer * 1.3 + n.v * 6),
    ];
  }
  if (k === 1) {
    if (n.w < 0.2) return [0.52 + 0.46 * n.u, 0.08 + 0.84 * n.v];
    const clusters: Point[] = [
      [0.82, 0.22],
      [0.9, 0.52],
      [0.78, 0.8],
    ];
    const c = clusters[n.i % 3];
    const a = n.v * 6.283;
    const rr = 0.02 + 0.13 * Math.sqrt(n.u);
    return [c[0] + rr * Math.cos(a) * 0.8, c[1] + rr * Math.sin(a) * 1.5];
  }
  if (k === 2) {
    return [n.u, 0.84 + (n.v - 0.5) * 0.14 + 0.03 * Math.sin(n.u * 18)];
  }
  const sp = 0.06 + 0.8 * Math.pow(Math.abs(n.u - 0.5) * 2, 1.4);
  return [n.u, 0.5 + (n.v - 0.5) * sp];
}

/** Opacity multiplier per state: hero is loudest, dense content quietest. */
export const QUIET: readonly [number, number, number, number] = [1, 0.72, 0.34, 0.85];

/** Smoothstep. */
export function sm(t: number): number {
  return t * t * (3 - 2 * t);
}

export function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Splits a continuous progress value (0..3) into the two integer
 * layout indices either side of it, plus a smoothstepped blend factor
 * between them. Clamped at both ends.
 */
export function kk(p: number): [a: 0 | 1 | 2 | 3, b: 0 | 1 | 2 | 3, t: number] {
  const f = Math.min(3, Math.max(0, p));
  const a = Math.floor(f) as 0 | 1 | 2 | 3;
  const b = Math.min(3, a + 1) as 0 | 1 | 2 | 3;
  return [a, b, sm(f - a)];
}

/** The node's target position at continuous progress `p`. */
export function target(n: FieldNode, p: number): Point {
  const [a, b, t] = kk(p);
  const A = layout(a, n);
  const B = layout(b, n);
  return [mix(A[0], B[0], t), mix(A[1], B[1], t)];
}

/** The quiet factor (opacity multiplier) at continuous progress `p`. */
export function quietAt(p: number): number {
  const [a, b, t] = kk(p);
  return mix(QUIET[a], QUIET[b], t);
}

/**
 * Node count scales with density, floored so the field never collapses
 * to near-nothing at very low density. Desktop density 1 → 64 nodes;
 * mobile density 0.5 → 32, matching the DESIGN.md budget.
 */
export function computeNodeCount(density: number, base = 64, min = 12): number {
  return Math.max(min, Math.round(base * density));
}

export function computePulseCount(density: number, base = 12, min = 4): number {
  return Math.max(min, Math.round(base * density));
}

/** Device pixel ratio, capped per the performance budget (1.5 desktop / 1.0 low-density). */
export function computeDpr(devicePixelRatio: number, density: number): number {
  return Math.min(devicePixelRatio || 1, density < 0.8 ? 1 : 1.5);
}

/** Link search radius: a fraction of the smaller viewport dimension. */
export function computeLinkDistance(width: number, height: number, density: number): number {
  return Math.max(90, Math.min(width, height) * (density < 0.8 ? 0.3 : 0.22));
}

// --------------------------------------------------------------------
// Scroll → continuous section progress (0..3)
// --------------------------------------------------------------------

export interface SectionRect {
  /** The section's data-bg value (0..3). */
  k: number;
  /** Current top offset from the viewport, in px (from getBoundingClientRect). */
  top: number;
  /** Section height in px. */
  height: number;
}

/**
 * Maps the current scroll position to a continuous 0..3 progress
 * value: find where the viewport's vertical midline falls relative to
 * each section's own midpoint, and linearly interpolate between the
 * two neighbouring section midpoints. Ported from `scrollProg()`;
 * takes an already-narrowed list of rects (see useSectionProgress)
 * instead of re-querying the whole document every frame.
 */
export function computeProgress(rects: SectionRect[], viewportHeight: number): number {
  if (rects.length === 0) return 0;
  const mids = rects
    .map((r) => ({ k: r.k, m: r.top + Math.min(r.height, viewportHeight) / 2 }))
    .sort((a, b) => a.k - b.k);

  const center = viewportHeight * 0.5;
  if (center <= mids[0].m) return mids[0].k;
  for (let i = 0; i < mids.length - 1; i++) {
    if (center < mids[i + 1].m) {
      const span = mids[i + 1].m - mids[i].m;
      const t = span === 0 ? 0 : (center - mids[i].m) / span;
      return mix(mids[i].k, mids[i + 1].k, t);
    }
  }
  return mids[mids.length - 1].k;
}
