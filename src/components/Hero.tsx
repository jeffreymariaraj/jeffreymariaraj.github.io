import { content } from '../content/content';
import './Hero.css';

/**
 * Step 1 (content & structure) stub: wires the new identity-hero
 * content shape so the build stays green while content.ts changes
 * land. The real portrait component and the final grid layout (grid
 * `minmax(260px,440px) 1fr` ≥900px, stacked below) arrive in Step 2.
 */
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
          <span>{hero.status.domain}</span>
        </div>

        {/* Portrait slot — placeholder box until Step 2's <Portrait> lands */}
        <div
          aria-hidden="true"
          style={{
            width: 160,
            aspectRatio: '4 / 5',
            border: '1px dashed rgba(227,183,102,0.7)',
            background: 'rgba(12,17,25,0.7)',
            marginBottom: 24,
          }}
        />

        <h1 className="fi hero-headline" style={{ animationDelay: '80ms', fontSize: 'clamp(52px, 7.4vw, 108px)' }}>
          {hero.nameFirst} <br />
          <span className="ph">{hero.nameSurname.ph}</span>
        </h1>

        <dl className="fi" style={{ animationDelay: '160ms', marginTop: 40, maxWidth: 560 }}>
          {hero.identity.map((row) => (
            <div key={row.label} style={{ display: 'flex', gap: 20, padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
              <dt className="lbl" style={{ flex: '0 0 96px', fontSize: 11 }}>
                {row.label}
              </dt>
              <dd style={{ margin: 0, fontSize: 18, lineHeight: 1.4, color: 'var(--text)' }}>{row.value}</dd>
            </div>
          ))}
        </dl>

        <p className="fi p hero-lead" style={{ animationDelay: '220ms', marginTop: 28 }}>
          {hero.statement}
        </p>

        <div className="fi hero-ctas" style={{ animationDelay: '280ms' }}>
          {hero.ctas.map((cta) => (
            <a key={cta.label} className={`btn ${cta.variant === 'primary' ? 'btn-p' : 'btn-g'}`} href={cta.href}>
              {cta.label}
              {cta.icon && <span aria-hidden="true">{cta.icon}</span>}
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
