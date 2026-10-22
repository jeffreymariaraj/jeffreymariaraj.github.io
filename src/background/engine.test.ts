import { describe, expect, it } from 'vitest';
import {
  computeDpr,
  computeLinkDistance,
  computeNodeCount,
  computeProgress,
  computePulseCount,
  generateField,
  kk,
  layout,
  mix,
  quietAt,
  sm,
  target,
  type SectionRect,
} from './engine';

describe('generateField', () => {
  it('is deterministic: same seed, same field, every call', () => {
    const a = generateField(72);
    const b = generateField(72);
    expect(a).toEqual(b);
  });

  it('produces u, v, w, z in [0, 1) and a layer derived from u', () => {
    const nodes = generateField(72);
    expect(nodes).toHaveLength(72);
    for (const n of nodes) {
      for (const key of ['u', 'v', 'w', 'z'] as const) {
        expect(n[key]).toBeGreaterThanOrEqual(0);
        expect(n[key]).toBeLessThan(1);
      }
      expect(n.layer).toBe(Math.floor(n.u * 6));
    }
  });

  it('slicing to a smaller count keeps the same leading nodes', () => {
    const full = generateField(72);
    const sliced = full.slice(0, 32);
    expect(sliced).toEqual(full.slice(0, 32));
    expect(sliced[0]).toEqual(full[0]);
  });
});

describe('sm (smoothstep)', () => {
  it('is 0 at 0 and 1 at 1', () => {
    expect(sm(0)).toBe(0);
    expect(sm(1)).toBe(1);
  });

  it('is monotonically increasing and symmetric around 0.5', () => {
    expect(sm(0.25)).toBeLessThan(sm(0.5));
    expect(sm(0.5)).toBeLessThan(sm(0.75));
    expect(sm(0.5)).toBeCloseTo(0.5, 10);
    expect(sm(0.25)).toBeCloseTo(1 - sm(0.75), 10);
  });
});

describe('mix', () => {
  it('interpolates linearly', () => {
    expect(mix(0, 10, 0)).toBe(0);
    expect(mix(0, 10, 1)).toBe(10);
    expect(mix(0, 10, 0.5)).toBe(5);
    expect(mix(4, 2, 0.5)).toBe(3);
  });
});

describe('kk', () => {
  it('clamps below 0 to progress 0, with a zero blend so the result is layout 0', () => {
    // b is still a+1 (1) here, same as the ported original — but blend
    // t is 0, so mix(layout(0), layout(1), 0) resolves to layout(0).
    expect(kk(-1)).toEqual([0, 1, 0]);
    expect(kk(-0.001)).toEqual([0, 1, 0]);
  });

  it('clamps above 3 to layout 3 with zero blend (3→3 blend is sm(0))', () => {
    const [a, b, t] = kk(4);
    expect(a).toBe(3);
    expect(b).toBe(3);
    expect(t).toBe(0);
  });

  it('splits an interior value into its bracketing integers', () => {
    const [a, b, t] = kk(1.5);
    expect(a).toBe(1);
    expect(b).toBe(2);
    expect(t).toBeCloseTo(sm(0.5), 10);
  });

  it('lands exactly on integers with zero blend', () => {
    expect(kk(2)).toEqual([2, 3, 0]);
  });
});

describe('target (layout interpolation)', () => {
  it('at an exact integer progress, matches that layout exactly', () => {
    const nodes = generateField(8);
    for (const n of nodes) {
      expect(target(n, 0)).toEqual(layout(0, n));
      expect(target(n, 1)).toEqual(layout(1, n));
      expect(target(n, 2)).toEqual(layout(2, n));
      expect(target(n, 3)).toEqual(layout(3, n));
    }
  });

  it('at the midpoint, matches a smoothstepped mix of the two neighbouring layouts', () => {
    const nodes = generateField(8);
    for (const n of nodes) {
      const [x, y] = target(n, 1.5);
      const A = layout(1, n);
      const B = layout(2, n);
      const t = sm(0.5);
      expect(x).toBeCloseTo(mix(A[0], B[0], t), 10);
      expect(y).toBeCloseTo(mix(A[1], B[1], t), 10);
    }
  });

  it('clamps progress outside [0, 3] to the nearest end layout', () => {
    const nodes = generateField(4);
    for (const n of nodes) {
      expect(target(n, -5)).toEqual(layout(0, n));
      expect(target(n, 99)).toEqual(layout(3, n));
    }
  });
});

describe('quietAt', () => {
  it('matches the QUIET table exactly at integer progress', () => {
    expect(quietAt(0)).toBe(1);
    expect(quietAt(1)).toBeCloseTo(0.72, 10);
    expect(quietAt(2)).toBeCloseTo(0.34, 10);
    expect(quietAt(3)).toBeCloseTo(0.85, 10);
  });

  it('clamps outside 0..3', () => {
    expect(quietAt(-10)).toBe(1);
    expect(quietAt(10)).toBeCloseTo(0.85, 10);
  });
});

describe('density-driven budgets', () => {
  it('computeNodeCount scales with density and floors at `min`', () => {
    expect(computeNodeCount(1)).toBe(64);
    expect(computeNodeCount(0.5)).toBe(32);
    expect(computeNodeCount(0.01, 64, 12)).toBe(12);
  });

  it('computePulseCount scales with density and floors at `min`', () => {
    expect(computePulseCount(1)).toBe(12);
    expect(computePulseCount(0.5)).toBe(6);
    expect(computePulseCount(0.01, 12, 4)).toBe(4);
  });

  it('computeDpr caps at 1.0 for low density and 1.5 otherwise', () => {
    expect(computeDpr(3, 1)).toBe(1.5);
    expect(computeDpr(3, 0.5)).toBe(1);
    expect(computeDpr(1, 1)).toBe(1);
  });

  it('computeLinkDistance scales with the smaller viewport dimension, floored at 90', () => {
    expect(computeLinkDistance(1000, 800, 1)).toBeCloseTo(800 * 0.22, 10);
    expect(computeLinkDistance(1000, 800, 0.5)).toBeCloseTo(800 * 0.3, 10);
    expect(computeLinkDistance(100, 100, 1)).toBe(90);
  });
});

describe('computeProgress (scroll → continuous section progress)', () => {
  const vh = 800;

  it('returns the first section\'s k when its midpoint is at or below viewport center', () => {
    const rects: SectionRect[] = [{ k: 0, top: 0, height: 2000 }];
    expect(computeProgress(rects, vh)).toBe(0);
  });

  it('returns the last section\'s k once past its midpoint', () => {
    const rects: SectionRect[] = [
      { k: 0, top: -2000, height: 1000 },
      { k: 1, top: -1000, height: 1000 },
    ];
    expect(computeProgress(rects, vh)).toBe(1);
  });

  it('interpolates linearly between two section midpoints', () => {
    // Section 0 midpoint at y=0, section 1 midpoint at y=800 (one viewport below).
    const rects: SectionRect[] = [
      { k: 0, top: -400, height: 800 }, // mid = -400 + 400 = 0
      { k: 1, top: 400, height: 800 }, // mid = 400 + 400 = 800
    ];
    // Viewport center is at vh/2 = 400, exactly halfway between the two midpoints.
    expect(computeProgress(rects, vh)).toBeCloseTo(0.5, 10);
  });

  it('is order-independent — sorts rects by k before interpolating', () => {
    const inOrder: SectionRect[] = [
      { k: 0, top: -400, height: 800 },
      { k: 1, top: 400, height: 800 },
    ];
    const reversed: SectionRect[] = [...inOrder].reverse();
    expect(computeProgress(reversed, vh)).toBeCloseTo(computeProgress(inOrder, vh), 10);
  });

  it('returns 0 for an empty rect list rather than throwing', () => {
    expect(computeProgress([], vh)).toBe(0);
  });
});
