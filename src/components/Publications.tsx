import { content } from '../content/content';
import { Chip } from './Chip';
import './Publications.css';

/**
 * Step 1 (content & structure) stub: wires the new real-content shape
 * (Table 1, Fig. 1, stats, single ledger entry) so the build stays
 * green while content.ts changes land. The full featured-panel layout
 * with the real figure and table arrives in Step 2.
 */
export function Publications() {
  const { publications } = content;
  const { featured } = publications;

  return (
    <section id="publications" data-bg="2" className="pub-section">
      <div className="wrap">
        <div className="pub-head">
          <div className="pub-head-main">
            <div className="lbl">{publications.eyebrow}</div>
            <h2 className="h2">{publications.heading}</h2>
          </div>
          <div className="pub-status-key" aria-label="Status key">
            {publications.statusKey.map((entry) => (
              <div key={entry.status} className="pub-status-key-row">
                <span className="pub-status-key-chip">
                  <Chip status={entry.status} minWidth={118} />
                </span>
                <span className="mono pub-status-key-note">{entry.note}</span>
              </div>
            ))}
          </div>
        </div>

        <article className="panel pub-featured" style={{ padding: 32 }}>
          <div className="pub-featured-top">
            <Chip status={featured.status} />
            <span className="mono pub-featured-venue">{featured.venue}</span>
          </div>
          <h3 className="pub-featured-title">{featured.title}</h3>
          <div className="pub-featured-authors">{featured.authors}</div>
          <p className="p pub-featured-abstract">{featured.abstract}</p>
          <div className="pub-featured-links">
            {featured.links.map((link) => (
              <a key={link.href} className="lnk mono" href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 16 }}>
            Table 1 + Fig. 1 + stats — Step 2
          </div>
        </article>

        <div className="pub-ledger">
          <div className="lbl pub-ledger-label">{publications.ledgerLabel}</div>
          <div className="pub-ledger-list">
            {publications.ledger.map((entry) => (
              <a key={entry.title} className="entry pub-ledger-row" href={entry.href}>
                <span className="pub-ledger-row-chip">
                  <Chip status={entry.status} />
                </span>
                <div className="pub-ledger-row-main">
                  <div className="pub-ledger-row-title">{entry.title}</div>
                  <div className="p pub-ledger-row-desc">{entry.description}</div>
                </div>
                <div className="mono pub-ledger-row-meta">{entry.meta}</div>
                <span className="go mono" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
