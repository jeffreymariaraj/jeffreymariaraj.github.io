import { content } from '../content/content';
import { Rich } from './Rich';
import './CV.css';

/**
 * Step 1 (content & structure) stub: the left column (label, heading,
 * updated date, download/open links) is wired to the new content
 * shape and already works without JS. The right-column PDF viewer
 * panel (`CvViewer`, pdf.js) arrives in Step 3.
 */
export function CV() {
  const { cv } = content;

  return (
    <section id="cv" data-bg="1" className="cv-section">
      <div className="wrap">
        <div className="cv-row">
          <div>
            <div className="lbl" style={{ marginBottom: 24 }}>
              {cv.eyebrow}
            </div>
            <h2 className="h2" style={{ fontSize: 'clamp(30px, 3.4vw, 48px)' }}>
              {cv.heading}
            </h2>
            <p className="p" style={{ marginTop: 20 }}>
              <Rich value={cv.intro} />
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 32, alignItems: 'flex-start' }}>
              <a className="btn btn-p" href={cv.pdfHref} download={cv.pdfFilename}>
                {cv.downloadLabel} <span aria-hidden="true">↓</span>
              </a>
              <a className="lnk mono" href={cv.pdfHref} target="_blank" rel="noopener noreferrer">
                {cv.openNewTabLabel} ↗
              </a>
            </div>
          </div>
          <div
            style={{
              flex: '1 1 560px',
              minWidth: 0,
              border: '1px solid var(--line-2)',
              background: 'rgba(12,17,25,0.94)',
              minHeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>
              CV viewer — Step 3
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
