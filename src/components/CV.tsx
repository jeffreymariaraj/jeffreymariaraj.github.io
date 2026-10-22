import { content } from '../content/content';
import { Rich } from './Rich';
import { CvViewer } from './CvViewer';
import './CV.css';

/**
 * CV section: left column (label, heading, updated date, download +
 * open-in-new-tab — both plain links that work without JS) and the
 * pdf.js-backed viewer panel.
 *
 * Judgement call: Mobile.dc.html moves "Open in new tab" to *after*
 * the viewer panel on narrow screens; it stays grouped with Download
 * here on every width, matching the desktop artboard's left column.
 * Splitting it out as a reorderable third flex item for one cosmetic
 * sequencing difference wasn't worth the layout complexity.
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
            <div className="cv-links">
              <a className="btn btn-p" href={cv.pdfHref} download={cv.pdfFilename}>
                {cv.downloadLabel} <span aria-hidden="true">↓</span>
              </a>
              <a className="lnk mono" href={cv.pdfHref} target="_blank" rel="noopener noreferrer">
                {cv.openNewTabLabel} ↗
              </a>
            </div>
          </div>

          <CvViewer />
        </div>
      </div>
    </section>
  );
}
