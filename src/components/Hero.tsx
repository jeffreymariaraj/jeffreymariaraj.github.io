import { content } from '../content/content';
import { Portrait } from './Portrait';
import './Hero.css';

/**
 * The identity hero (design revision 2): portrait left, name +
 * Studying/Next/Research identity list + one-sentence statement + 4
 * CTAs right. Side by side at >=900px (CSS grid), stacked below. The
 * bottom annotation bar is desktop-only — Mobile.dc.html's hero ends
 * right after the buttons.
 */
export function Hero() {
  const { hero } = content;

  return (
    <section id="hero" data-bg="0" className="hero-section">
      <div aria-hidden="true" className="hide-s hero-vline" />
      <div className="hero-main">
        <div className="wrap hero-grid">
          <Portrait className="fi" />

          <div className="hero-identity-col">
            <div className="fi mono hero-status">
              <span className="pd hero-status-dot" aria-hidden="true" />
              <span>{hero.status.role}</span>
              <span className="hero-status-sep">/</span>
              <span>{hero.status.domain}</span>
            </div>

            <h1 className="fi hero-name" style={{ animationDelay: '80ms' }}>
              {hero.nameFirst} <br />
              {hero.nameSurname}
            </h1>

            <dl className="fi hero-identity" style={{ animationDelay: '160ms' }}>
              {hero.identity.map((row) => (
                <div key={row.label} className="hero-identity-row">
                  <dt className="lbl hero-identity-label">{row.label}</dt>
                  <dd className="hero-identity-value">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="fi p hero-statement" style={{ animationDelay: '220ms' }}>
              {hero.statement}
            </p>

            <div className="fi hero-ctas" style={{ animationDelay: '280ms' }}>
              {hero.ctas.map((cta) => (
                <a
                  key={cta.label}
                  className={`btn ${cta.variant === 'primary' ? 'btn-p' : 'btn-g'}`}
                  href={cta.href}
                  {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {cta.label}
                  {cta.icon && (
                    <span
                      aria-hidden="true"
                      className={cta.icon === '↗' ? 'mono' : undefined}
                      style={cta.icon === '↗' ? { fontSize: 11 } : undefined}
                    >
                      {cta.icon}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap hero-bottom hide-s">
        <div className="hero-bottom-row">
          <div className="hero-meta-group">
            <div>
              <div className="lbl" style={{ fontSize: 10 }}>
                {hero.annotation.focusLabel}
              </div>
              <div className="mono hero-meta-value">{hero.annotation.focus}</div>
            </div>
            <div>
              <div className="lbl" style={{ fontSize: 10 }}>
                {hero.annotation.statusLabel}
              </div>
              <div className="mono hero-meta-value">
                <span style={{ color: 'var(--cyan)' }}>●</span> {hero.annotation.status}
              </div>
            </div>
            <div>
              <div className="lbl" style={{ fontSize: 10 }}>
                {hero.annotation.positionLabel}
              </div>
              <div className="mono hero-meta-value">{hero.annotation.position}</div>
            </div>
          </div>
          <div className="mono hero-figure-note">
            {hero.figureNote.map((line, i) => (
              <span key={i}>
                {line}
                {i < hero.figureNote.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
