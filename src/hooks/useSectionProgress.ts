import { useEffect, useRef } from 'react';
import { computeProgress, type SectionRect } from '../background/engine';

/**
 * Continuous 0..3 scroll progress, read by NetworkBackground once per
 * animation frame via the returned ref (no re-render per scroll
 * frame — the ref is written directly).
 *
 * Per CLAUDE.md, this replaces the original per-frame
 * `getBoundingClientRect` sweep over every `[data-bg]` section with
 * an IntersectionObserver: the observer keeps a short "candidate"
 * list of only the sections currently within one viewport height of
 * the screen (usually 1–3 of the page's 7 sections), using the
 * observer's own `boundingClientRect` — already computed by the
 * browser, no extra layout cost. Only that short list is re-measured
 * on scroll, instead of the whole document.
 */
export function useSectionProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-bg]'));
    if (sections.length === 0) return;

    const candidates = new Map<Element, number>();

    const recompute = () => {
      const vh = window.innerHeight || 800;
      let rects: SectionRect[] = [];
      candidates.forEach((k, el) => {
        const r = el.getBoundingClientRect();
        rects.push({ k, top: r.top, height: r.height });
      });
      // Before the observer has reported anything (first paint, or a
      // viewport so tall every section is simultaneously "near"), fall
      // back to a one-off full read rather than showing no progress.
      if (rects.length === 0) {
        rects = sections.map((el) => {
          const r = el.getBoundingClientRect();
          return { k: Number(el.getAttribute('data-bg')), top: r.top, height: r.height };
        });
      }
      progressRef.current = computeProgress(rects, vh);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const k = Number(entry.target.getAttribute('data-bg'));
          if (entry.isIntersecting) {
            candidates.set(entry.target, k);
          } else {
            candidates.delete(entry.target);
          }
        }
        recompute();
      },
      { rootMargin: '100% 0px 100% 0px', threshold: 0 }
    );
    sections.forEach((el) => io.observe(el));

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        recompute();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    recompute();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return progressRef;
}
