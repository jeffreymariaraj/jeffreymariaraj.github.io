import { useEffect, useRef } from 'react';
import {
  computeDpr,
  computeLinkDistance,
  computeNodeCount,
  computePulseCount,
  generateField,
  mix,
  quietAt,
  sm,
  target,
  type FieldNode,
} from './engine';
import { useSectionProgress } from '../hooks/useSectionProgress';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './NetworkBackground.css';

interface RuntimeNode extends FieldNode {
  x: number;
  y: number;
  ox: number;
  oy: number;
}

interface Pulse {
  a: RuntimeNode;
  b: RuntimeNode;
  t: number;
  sp: number;
}

// One deterministic 72-node field, generated once for the whole app —
// every density just takes a different leading slice of the same field,
// so scroll reads as the network reconfiguring, never scenes swapping.
const FIELD = generateField(72);

/**
 * The signature background: a Canvas 2D node field that reconfigures
 * across four layouts as the page scrolls. Ported from the `boot()`
 * method in docs/design/Background.dc.html — see DESIGN.md for the
 * behaviour spec and performance budget.
 *
 * Fixed layer, `pointer-events: none`, `aria-hidden`. Draws one still
 * frame (no rAF loop) under `prefers-reduced-motion: reduce`, and
 * pauses whenever the tab is hidden or the canvas scrolls off-screen.
 */
export function NetworkBackground({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useSectionProgress();
  const reducedMotion = useReducedMotion();
  const reducedMotionRef = useRef(reducedMotion);
  const syncRef = useRef<(() => void) | null>(null);

  // The running effect below reads reducedMotionRef each frame rather
  // than closing over the prop, so toggling the OS setting takes
  // effect immediately without tearing down and rebuilding the field.
  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
    syncRef.current?.();
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fineMq = window.matchMedia ? window.matchMedia('(pointer: fine)') : null;

    let nodes: RuntimeNode[] = [];
    let pulses: Pulse[] = [];
    let linkD = 160;
    let W = 0;
    let H = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let anim = true;
    let usePtr = false;
    let prog = 0;
    const ptr = { x: -9999, y: -9999, on: false };

    // A small separate seeded generator for pulse start/hop picks —
    // deterministic (so SSR/CSR never mismatch) but independent of
    // the field's own seed.
    let seed = 7919;
    const rnd = () => {
      seed = (seed * 48271) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const build = () => {
      const n = computeNodeCount(density);
      nodes = FIELD.slice(0, n).map((f) => ({ ...f, x: 0, y: 0, ox: 0, oy: 0 }));
      const npulses = computePulseCount(density);
      pulses = [];
      for (let i = 0; i < npulses; i++) {
        const a = nodes[Math.floor(rnd() * nodes.length)];
        pulses.push({ a, b: a, t: 1, sp: 0.5 + rnd() * 0.6 });
      }
    };

    const snap = () => {
      prog = progressRef.current;
      for (const n of nodes) {
        const t = target(n, prog);
        n.x = t[0] * W;
        n.y = t[1] * H;
        n.ox = 0;
        n.oy = 0;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const Q = quietAt(prog);
      const L2 = linkD * linkD;
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > L2) continue;
          const f = 1 - Math.sqrt(d2) / linkD;
          const al = f * f * 0.5 * Q * (0.4 + 0.6 * Math.min(a.z, b.z));
          if (al < 0.01) continue;
          ctx.strokeStyle = `rgba(92,200,220,${al.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const rad = 0.9 + n.z * 1.8;
        ctx.fillStyle = `rgba(184,226,238,${((0.25 + 0.6 * n.z) * Q).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
        ctx.fill();
        if (n.i % 11 === 0) {
          ctx.strokeStyle = `rgba(92,200,220,${(0.28 * Q).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, rad + 4.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (anim) {
        const PQ = Math.max(0.45, Q);
        for (const p of pulses) {
          if (p.a === p.b) continue;
          const tt = sm(Math.min(1, p.t));
          const t0 = sm(Math.max(0, p.t - 0.18));
          const x = mix(p.a.x, p.b.x, tt);
          const y = mix(p.a.y, p.b.y, tt);
          const x0 = mix(p.a.x, p.b.x, t0);
          const y0 = mix(p.a.y, p.b.y, t0);
          ctx.strokeStyle = `rgba(130,232,246,${(0.55 * PQ).toFixed(3)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.fillStyle = `rgba(160,240,252,${(0.95 * PQ).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.lineWidth = 1;
      }
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = computeDpr(window.devicePixelRatio || 1, density);
      W = w;
      H = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      linkD = computeLinkDistance(W, H, density);
      snap();
      draw();
    };

    const nextHop = (p: Pulse) => {
      const b = p.b;
      const candidates: RuntimeNode[] = [];
      for (const n of nodes) {
        if (n === b) continue;
        const dx = n.x - b.x;
        const dy = n.y - b.y;
        if (dx > -10 && dx * dx + dy * dy < linkD * linkD) candidates.push(n);
      }
      if (candidates.length) {
        p.a = b;
        p.b = candidates[Math.floor(rnd() * candidates.length)];
        p.t = 0;
      } else {
        const n = nodes[Math.floor(rnd() * nodes.length)];
        p.a = n;
        p.b = n;
        p.t = 1;
      }
    };

    const step = (dt: number, t: number) => {
      const ease = anim ? 1 - Math.exp(-dt * 5) : 1;
      prog += (progressRef.current - prog) * (anim ? 1 - Math.exp(-dt * 4) : 1);
      const R = 130;
      for (const n of nodes) {
        const g = target(n, prog);
        const dx = anim ? Math.sin(t * 0.23 + n.i * 1.7) * 7 * (0.4 + n.z) : 0;
        const dy = anim ? Math.cos(t * 0.19 + n.i * 2.3) * 7 * (0.4 + n.z) : 0;
        let fx = 0;
        let fy = 0;
        if (usePtr && ptr.on && anim) {
          const ex = n.x - ptr.x;
          const ey = n.y - ptr.y;
          const d = Math.sqrt(ex * ex + ey * ey);
          if (d < R && d > 0.1) {
            const k = (1 - d / R) * 22 * (0.4 + n.z);
            fx = (ex / d) * k;
            fy = (ey / d) * k;
          }
        }
        n.ox += (fx - n.ox) * Math.min(1, ease * 1.2);
        n.oy += (fy - n.oy) * Math.min(1, ease * 1.2);
        const par = (n.z - 0.5) * prog * 36;
        n.x += (g[0] * W + dx + n.ox - n.x) * ease;
        n.y += (g[1] * H + dy + n.oy + par - n.y) * ease;
      }
      if (anim) {
        for (const p of pulses) {
          p.t += dt * p.sp;
          if (p.t >= 1) nextHop(p);
        }
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!anim || !visible || document.hidden) return;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      step(dt, now / 1000);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      const reduced = reducedMotionRef.current;
      anim = !reduced;
      usePtr = !!(fineMq && fineMq.matches) && !reduced;
      if (anim) {
        if (!raf && visible && !document.hidden) {
          last = 0;
          raf = requestAnimationFrame(frame);
        }
      } else {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        // Genuinely static fallback: one still frame, no loop.
        snap();
        draw();
      }
    };
    syncRef.current = sync;

    const onScroll = () => {
      if (!anim) {
        snap();
        draw();
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const b = canvas.getBoundingClientRect();
      ptr.x = e.clientX - b.left;
      ptr.y = e.clientY - b.top;
      ptr.on = true;
    };
    const onPointerLeave = () => {
      ptr.on = false;
    };
    const onVisibilityChange = () => sync();

    build();
    resize();
    sync();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    let ro: ResizeObserver | null = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    }

    let io: IntersectionObserver | null = null;
    if (window.IntersectionObserver) {
      io = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        sync();
      });
      io.observe(canvas);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      ro?.disconnect();
      io?.disconnect();
      syncRef.current = null;
    };
    // progressRef is a stable ref object; density is the only value
    // that should rebuild the field and restart the loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: 'var(--bg-h, 900px)',
        overflow: 'hidden',
        background: 'var(--bg-base, var(--ink-1))',
        pointerEvents: 'none',
      }}
    >
      <div aria-hidden="true" className="bg-grid" />
      <canvas ref={canvasRef} aria-hidden="true" className="bg-canvas" />
    </div>
  );
}
