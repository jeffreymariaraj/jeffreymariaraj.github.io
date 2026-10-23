import { useEffect, useState } from 'react';

/**
 * Scroll-spy for the sticky header: which nav item should carry the
 * 2px cyan active rule right now. Ported from the `componentDidMount`
 * scroll-spy in Main.dc.html — a single passive, rAF-throttled scroll
 * listener that reads (never writes) layout once per frame.
 */
const SECTION_TO_NAV: [sectionId: string, navId: string][] = [
  ['cv', 'cv'],
  ['research', 'research'],
  ['publications', 'publications'],
  ['projects', 'projects'],
  ['contact', 'contact'],
];

const ACTIVE_LINE = 140;

export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let queued = false;

    const spy = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        let current: string | null = null;
        for (const [sectionId, navId] of SECTION_TO_NAV) {
          const el = document.getElementById(sectionId);
          if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) {
            current = navId;
          }
        }
        setActive((prev) => (current !== prev ? current : prev));
      });
    };

    spy();
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy, { passive: true });
    return () => {
      window.removeEventListener('scroll', spy);
      window.removeEventListener('resize', spy);
    };
  }, []);

  return active;
}
