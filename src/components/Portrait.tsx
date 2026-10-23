import { content } from '../content/content';
import './Portrait.css';

// `import.meta.glob` on a literal (non-wildcard) path still resolves
// at build time by scanning the filesystem for matches, so — unlike a
// plain `import x from '../assets/portrait.webp'` — it does NOT throw
// when the file doesn't exist yet; the result object is just empty.
// This is what lets the real <img> pipeline and the placeholder frame
// live in the same component without a build-time dependency on
// whether you've supplied a photo.
const portraitModules = import.meta.glob<string>('../assets/portrait.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});
const portraitUrl = portraitModules['../assets/portrait.webp'];

// Real intrinsic size of the supplied portrait.webp (838x1048, a hair
// off exact 4:5 — close enough that object-fit: cover in a 4:5 frame
// shows the whole frame with no visible crop drift). Only meaningful
// once a real photo exists; harmless as a width/height hint otherwise.
const PORTRAIT_WIDTH = 838;
const PORTRAIT_HEIGHT = 1048;

/**
 * The hero portrait: a real, LCP-prioritized <img> when
 * src/assets/portrait.webp exists, otherwise the dashed amber
 * placeholder frame — both wrapped in the same cyan corner-tick frame
 * and caption bar per DESIGN.md.
 */
export function Portrait({ className = '' }: { className?: string }) {
  const { portrait } = content.hero;

  return (
    <figure className={`portrait-figure ${className}`.trim()}>
      <div className="portrait-frame">
        {portraitUrl ? (
          <img
            className="portrait-img"
            src={portraitUrl}
            // Only one real export exists yet; declaring its width
            // keeps this a valid, extensible srcset — add more sized
            // exports later for true responsive loading.
            srcSet={`${portraitUrl} ${PORTRAIT_WIDTH}w`}
            sizes="(max-width: 720px) 100vw, min(33vw, 440px)"
            width={PORTRAIT_WIDTH}
            height={PORTRAIT_HEIGHT}
            alt={portrait.alt}
            decoding="async"
            // React 18 doesn't know the `fetchPriority` DOM prop yet
            // (that lands in React 19) and would otherwise warn and
            // drop it — spread the lowercase HTML attribute directly
            // so it still reaches the DOM for this LCP image.
            {...{ fetchpriority: 'high' }}
          />
        ) : (
          <div className="portrait-placeholder">
            <span className="ph portrait-placeholder-label">
              {portrait.placeholderLabel[0]}
              <br />
              {portrait.placeholderLabel[1]}
            </span>
          </div>
        )}
        <span aria-hidden="true" className="portrait-tick portrait-tick-tl" />
        <span aria-hidden="true" className="portrait-tick portrait-tick-tr" />
        <span aria-hidden="true" className="portrait-tick portrait-tick-bl" />
        <span aria-hidden="true" className="portrait-tick portrait-tick-br" />
      </div>
      <figcaption className="mono portrait-caption">
        <span>{portrait.captionLabel}</span>
        <span className="hide-s">{portrait.position}</span>
      </figcaption>
    </figure>
  );
}
