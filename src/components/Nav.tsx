import { useEffect, useState } from 'react';
import { content } from '../content/content';
import { useActiveSection } from '../hooks/useActiveSection';
import './Nav.css';

/** The triangle-and-nodes mark used as the home link and favicon. */
function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" className="nav-logo-mark">
      <path d="M5 19 L13 6 L21 19 M5 19 H21" fill="none" stroke="var(--cyan)" strokeWidth="1.2" />
      <circle cx="5" cy="19" r="2.4" fill="var(--ink-1)" stroke="var(--cyan)" strokeWidth="1.2" />
      <circle cx="13" cy="6" r="2.4" fill="var(--cyan)" />
      <circle cx="21" cy="19" r="2.4" fill="var(--ink-1)" stroke="var(--cyan)" strokeWidth="1.2" />
    </svg>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  // Close the mobile sheet if the viewport grows past the breakpoint
  // where it applies, so it can't be left open-but-invisible.
  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth > 720) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="wrap nav-row">
        {/* No aria-label override: the visible "Jeffrey Mariaraj" text
            already gives this link its accessible name. An aria-label
            like "Home" here would fail WCAG 2.5.3 (Label in Name) —
            it wouldn't contain the visible text, breaking voice
            control users who say what they see. */}
        <a href="#top" className="nav-logo">
          <LogoMark />
          <span className="mono nav-logo-name">
            {content.nav.logoName}
          </span>
        </a>

        <nav aria-label="Primary" className="nav-desktop">
          {content.nav.items.map((item) => (
            <a
              key={item.id}
              className="nv mono nav-item"
              href={`#${item.id}`}
              data-active={active === item.id}
            >
              <span className="nav-item-n">{item.n}</span>
              <span>{item.label}</span>
              <span aria-hidden="true" className="nav-item-rule" />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="m-menu"
          className="mono nav-menu-btn"
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
            <path d="M0 1H18M0 11H18" stroke="var(--cyan)" strokeWidth="1.4" />
          </svg>
        </button>
      </div>

      {open && (
        <nav id="m-menu" aria-label="Primary" className="nav-sheet">
          {content.nav.items.map((item) => (
            <a key={item.id} className="nav-sheet-row" href={`#${item.id}`} onClick={close}>
              <span>
                <span className="mono nav-sheet-row-n">{item.n}</span>
                {item.label}
              </span>
              <span className="mono nav-sheet-row-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
