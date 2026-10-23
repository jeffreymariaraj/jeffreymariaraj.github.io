import { content } from '../content/content';
import './Footer.css';

/**
 * Rendered as a sibling of the page's <section> elements (not nested
 * inside #contact, as the artboard's markup literally has it) so it
 * keeps its `contentinfo` landmark role — a <footer> loses that role
 * once it's a descendant of <section>/<article>/<main>/<nav>/<aside>.
 */
export function Footer() {
  const { footer } = content;

  return (
    <footer className="wrap site-footer">
      <div className="site-footer-row">
        <span className="mono site-footer-meta">{footer.copyright}</span>
        <span className="mono site-footer-meta">{footer.stack}</span>
        <a className="lnk mono" href="#top" style={{ fontSize: 10, color: 'var(--text-1)' }}>
          {footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
