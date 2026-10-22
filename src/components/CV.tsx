import { content } from '../content/content';
import { Rich } from './Rich';
import './CV.css';

export function CV() {
  const { cv } = content;

  return (
    <section id="cv" data-bg="2" className="cv-section">
      <div className="wrap">
        <div className="cv-row">
          <div>
            <div className="lbl" style={{ marginBottom: 14 }}>
              {cv.eyebrow}
            </div>
            <div className="cv-statement">{cv.statement}</div>
          </div>
          <a className="btn btn-g cv-button" href={cv.button.href}>
            {cv.button.label}{' '}
            <span className="mono" style={{ fontSize: 11 }}>
              <Rich value={cv.button.sub} />
            </span>{' '}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
