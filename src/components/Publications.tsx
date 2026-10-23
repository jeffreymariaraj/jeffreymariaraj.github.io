import { content } from '../content/content';
import { Chip } from './Chip';
import { FigQueries } from './figures/FigQueries';
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
              <span className="mono pub-featured-venue">{featured.venue}</span>
            </div>
            <h3 className="pub-featured-title">{featured.title}</h3>
            <div className="pub-featured-authors">{featured.authors}</div>
            <div className="mono pub-featured-venue-full">
              {featured.venueFull}
              <br />
              {featured.doi}
            </div>
            <p className="p pub-featured-abstract">{featured.abstract}</p>
            <div className="pub-featured-links">
              {featured.links.map((link) => (
                <a
                  key={link.href}
                  className="lnk mono"
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pub-table-block">
              <div className="mono pub-table-caption-row">
                <span>{featured.table.caption}</span>
                <span className="hide-l">swipe →</span>
              </div>
              <div className="tbl-scroll">
                <table className="tbl">
                  <thead>
                    <tr>
                      {featured.table.headers.map((h, i) => (
                        <th key={h} className={i > 0 ? 'num' : undefined}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featured.table.rows.map((row) => (
                      <tr key={row.model} className={row.highlight ? 'tbl-row-highlight' : undefined}>
                        <td>
                          {row.model}
                          {row.note && <span className="tbl-row-note"> {row.note}</span>}
                        </td>
                        <td className="num">{row.accuracy}</td>
                        <td className={`num${row.time === 'baseline' ? ' dash' : ''}`}>{row.time}</td>
                        <td className={`num${row.size === 'baseline' ? ' dash' : ''}`}>{row.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mono pub-table-note">{featured.table.note}</p>
            </div>
          </div>

          <aside className="pub-evidence">
            <div className="mono pub-evidence-label-row">
              <span>{featured.figureCaption}</span>
              <span>{featured.figureNote}</span>
            </div>
            <div className="pub-fig-wrap">
              <FigQueries ariaLabel={featured.figureAriaLabel} />
            </div>
            <dl className="pub-stats">
              {featured.stats.map((stat) => (
                <div key={stat.label} className="pub-stat">
                  <dt className="pub-stat-value">{stat.value}</dt>
                  <dd className="mono pub-stat-label">{stat.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mono pub-stats-note">{featured.statsNote}</p>
          </aside>
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
