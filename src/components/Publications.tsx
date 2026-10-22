import { content, type Rich as RichValue } from '../content/content';
import { Rich } from './Rich';
import { Chip } from './Chip';
import { PlotPlaceholder } from './figures/PlotPlaceholder';
import './Publications.css';

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

        <article className="panel pub-featured">
          <div className="pub-featured-main">
            <div className="pub-featured-top">
              <Chip status={featured.status} />
              <span className="mono pub-featured-venue">
                <Rich value={featured.venue} />
              </span>
            </div>
            <h3 className="pub-featured-title">
              <Rich value={featured.title} />
            </h3>
            <div className="pub-featured-authors">
              <Rich value={featured.authors} />
            </div>
            <p className="p pub-featured-abstract">
              <Rich value={featured.abstract} />
            </p>
            <div className="pub-featured-links">
              {featured.links.map((link, i) => (
                <a key={i} className="lnk mono" href={link.href}>
                  <Rich value={link.label} />
                </a>
              ))}
            </div>
          </div>

          <aside className="pub-evidence">
            <div className="mono pub-evidence-label-row">
              <span>{featured.evidenceLabel}</span>
              <span className="hide-l">{featured.evidenceSwipeHint}</span>
            </div>
            <div className="tbl-scroll" tabIndex={0} role="region" aria-label="Benchmark table, scrolls horizontally on narrow screens">
              <table className="tbl">
                <thead>
                  <tr>
                    {featured.table.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featured.table.rows.map((row, i) => (
                    <tr key={i}>
                      <td className="ph">
                        <Rich value={row[0] as RichValue} />
                      </td>
                      {(row.slice(1) as string[]).map((cell, j) => (
                        <td key={j} className="dash">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <PlotPlaceholder ariaLabel={featured.plotAriaLabel} placeholderText={featured.plotPlaceholderText} />
              <div className="mono pub-plot-caption">{featured.plotCaption}</div>
            </div>
          </aside>
        </article>

        <div className="pub-ledger">
          <div className="lbl pub-ledger-label">{publications.ledgerLabel}</div>
          <div className="pub-ledger-list">
            {publications.ledger.map((entry, i) => (
              <a key={i} className="entry pub-ledger-row" href={entry.href}>
                <span className="pub-ledger-row-chip">
                  <Chip status={entry.status} />
                </span>
                <div className="pub-ledger-row-main">
                  <div className="pub-ledger-row-title">
                    <Rich value={entry.title} />
                  </div>
                  <div className="p pub-ledger-row-desc">
                    <Rich value={entry.description} />
                  </div>
                </div>
                <div className="mono pub-ledger-row-meta">
                  <Rich value={entry.meta} />
                </div>
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
