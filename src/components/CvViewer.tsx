import { useCallback, useEffect, useRef, useState } from 'react';
import { content } from '../content/content';
import './CvViewer.css';

// Minimal local surface of the pdf.js API we actually call — avoids
// depending on the exact shape of pdfjs-dist's own (large, fast-
// moving) type exports for a handful of methods.
interface PdfViewport {
  width: number;
  height: number;
}
interface PdfPage {
  getViewport(params: { scale: number }): PdfViewport;
  render(params: { canvasContext: CanvasRenderingContext2D; viewport: PdfViewport }): { promise: Promise<void> };
}
interface PdfDocument {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfPage>;
  destroy(): void;
}
interface PdfjsModule {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument(src: { url: string }): { promise: Promise<PdfDocument> };
}

type ViewerState = 'idle' | 'loading' | 'ready' | 'error';

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_STEP = 25;
const PANEL_PADDING = 28 * 2; // .cv-viewer-scroll padding, desktop

function SkeletonPage() {
  return (
    <div className="cv-skeleton-page" aria-hidden="true">
      <div className="cv-skeleton-bar" style={{ height: 18, width: '46%', background: '#3B4656' }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '62%' }} />
      <div style={{ height: 1, background: '#C9D0DA', margin: '6px 0' }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '28%', background: '#8793A6' }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '92%' }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '86%' }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '90%' }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '28%', background: '#8793A6', marginTop: 12 }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '94%' }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '84%' }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '88%' }} />
      <div className="cv-skeleton-bar" style={{ height: 8, width: '70%' }} />
    </div>
  );
}

/**
 * The pdf.js-backed CV viewer. Loads pdf.js only when this panel
 * nears the viewport (IntersectionObserver, ~400px root margin) or a
 * toolbar control is pressed first — never as part of the initial
 * bundle. Renders to <canvas> at a DPR capped at 2. Falls back to a
 * direct link to the PDF if anything fails.
 */
export function CvViewer() {
  const { cv } = content;
  const [state, setState] = useState<ViewerState>('idle');
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [zoom, setZoom] = useState(100);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const docRef = useRef<PdfDocument | null>(null);
  const loadStartedRef = useRef(false);

  const load = useCallback(() => {
    if (loadStartedRef.current) return;
    loadStartedRef.current = true;
    setState('loading');

    (async () => {
      try {
        const pdfjsLib = (await import('pdfjs-dist/build/pdf.mjs')) as unknown as PdfjsModule;
        // Served from our own build output, not a CDN — Vite resolves
        // this `new URL(..., import.meta.url)` at build time and
        // copies the worker file into dist/assets with a hashed name.
        const workerUrl = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

        const doc = await pdfjsLib.getDocument({ url: cv.pdfHref }).promise;
        docRef.current = doc;
        setNumPages(doc.numPages);
        setState('ready');
      } catch (err) {
        console.error('CV viewer: failed to load pdf.js or the document', err);
        setState('error');
      }
    })();
  }, [cv.pdfHref]);

  // Auto-trigger once the panel is ~400px from the viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      load();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  // Render the current page whenever it's ready, or page/zoom changes.
  useEffect(() => {
    if (state !== 'ready') return;
    const doc = docRef.current;
    const canvas = canvasRef.current;
    const scrollEl = scrollRef.current;
    if (!doc || !canvas || !scrollEl) return;

    let cancelled = false;
    (async () => {
      try {
        const page = await doc.getPage(pageNum);
        const unscaled = page.getViewport({ scale: 1 });
        const panelWidth = Math.max(240, scrollEl.clientWidth - PANEL_PADDING);
        const fitScale = panelWidth / unscaled.width;
        const scale = fitScale * (zoom / 100);
        const viewport = page.getViewport({ scale });

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(viewport.width * dpr);
        canvas.height = Math.round(viewport.height * dpr);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('2D canvas context unavailable');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        await page.render({ canvasContext: ctx, viewport }).promise;
      } catch (err) {
        if (!cancelled) {
          console.error('CV viewer: failed to render page', err);
          setState('error');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [state, pageNum, zoom]);

  // Free pdf.js resources on unmount.
  useEffect(() => {
    return () => {
      docRef.current?.destroy();
    };
  }, []);

  const handlePrev = () => {
    if (state === 'ready') setPageNum((p) => Math.max(1, p - 1));
    else load();
  };
  const handleNext = () => {
    if (state === 'ready') setPageNum((p) => Math.min(numPages, p + 1));
    else load();
  };
  const handleZoomOut = () => {
    if (state === 'ready') setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
    else load();
  };
  const handleZoomIn = () => {
    if (state === 'ready') setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
    else load();
  };

  const pageLabel = state === 'ready' ? `${pageNum} / ${numPages}` : '– / –';
  const liveText = state === 'ready' ? `Page ${pageNum} of ${numPages}` : '';

  return (
    <div ref={rootRef} className="cv-viewer-panel">
      <div className="cv-viewer-header">
        <span className="mono cv-viewer-filename">
          {cv.pdfFilename} · page {pageLabel}
        </span>
        <div className="cv-viewer-toolbar" role="toolbar" aria-label="CV viewer controls">
          <button
            type="button"
            className="cv-viewer-btn"
            aria-label="Previous page"
            onClick={handlePrev}
            disabled={state === 'ready' && pageNum <= 1}
          >
            ‹
          </button>
          <button
            type="button"
            className="cv-viewer-btn"
            aria-label="Next page"
            onClick={handleNext}
            disabled={state === 'ready' && pageNum >= numPages}
          >
            ›
          </button>
          <button
            type="button"
            className="cv-viewer-btn"
            aria-label="Zoom out"
            onClick={handleZoomOut}
            disabled={state === 'ready' && zoom <= MIN_ZOOM}
          >
            −
          </button>
          <button
            type="button"
            className="cv-viewer-btn"
            aria-label="Zoom in"
            onClick={handleZoomIn}
            disabled={state === 'ready' && zoom >= MAX_ZOOM}
          >
            +
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="cv-viewer-scroll"
        tabIndex={0}
        role="region"
        aria-label="CV page, scrollable"
      >
        {state === 'error' ? (
          <div className="cv-viewer-error">
            <p>Couldn't load the PDF preview here.</p>
            <a className="lnk mono" href={cv.pdfHref} target="_blank" rel="noopener noreferrer">
              Open the PDF directly ↗
            </a>
          </div>
        ) : state === 'ready' ? (
          <canvas ref={canvasRef} className="cv-viewer-canvas" />
        ) : (
          <SkeletonPage />
        )}
      </div>

      <div aria-live="polite" className="sr-only">
        {liveText}
      </div>
    </div>
  );
}
