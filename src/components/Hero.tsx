import { content } from '../content/content';
import './Hero.css';

export function Hero() {
  const { hero } = content;

  return (
    <section id="hero" data-bg="0" className="hero-section">
      <div aria-hidden="true" className="hide-s hero-vline" />
      <div className="wrap hero-main">
        <div className="fi mono hero-status">
          <span className="pd hero-status-dot" aria-hidden="true" />
          <span>{hero.status.role}</span>
          <span className="hero-status-sep">/</span>
          <span>{hero.status.org}</span>
          <span className="hero-status-sep">/</span>
          <span>{hero.status.cohort}</span>
        </div>

        <h1 className="fi hero-headline" style={{ animationDelay: '80ms' }}>
          {hero.headlineLines.map((line, i) => (
            <span key={i}>
              {line}
              {i === hero.headlineLines.length - 1 ? (
                <span style={{ color: 'var(--cyan)' }}>{hero.headlineAccent}</span>
              ) : (
                <br />
              )}
            </span>
          ))}
        </h1>

        <p className="fi p hero-lead" style={{ animationDelay: '180ms' }}>
          {hero.lead}
        </p>

        <div className="fi hero-ctas" style={{ animationDelay: '260ms' }}>
          {hero.ctas.map((cta) => (
            <a key={cta.label} className={`btn ${cta.variant === 'primary' ? 'btn-p' : 'btn-g'}`} href={cta.href}>
              {cta.label}
              {cta.icon && (
                <span aria-hidden="true" className={cta.icon === '↗' ? 'mono' : undefined} style={cta.icon === '↗' ? { fontSize: 11 } : undefined}>
                  {cta.icon}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>

      <div className="wrap hero-bottom">
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
          <div className="mono hide-s hero-figure-note">
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
