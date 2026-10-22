# DESIGN.md — "Computational Lab" design spec

Concept: a sophisticated computational research lab. Near-black surfaces, one cool cyan accent, a sans for reading, a mono for measuring. The research is the substance; the animated network background is the signature, not the point.

Exact markup, copy and SVG figures are in `docs/design/*.dc.html`. This file records the decisions.

## Tokens (put in `src/styles/tokens.css`)
```css
:root {
  /* surfaces */
  --ink-0: #06080C;  /* page edge */
  --ink-1: #080B10;  /* base */
  --ink-2: #0C1119;  /* panels/figures */
  --ink-3: #10161F;  /* raised */
  --line:   #1E2938; /* dividers */
  --line-2: #2C3B50; /* borders */
  --mute:   #5B6B83; /* decorative lines/separators ONLY (3.6:1, never text) */
  /* text (contrast vs --ink-1) */
  --text:   #E8EDF4; /* 16.8:1 */
  --text-1: #C3CDDA; /* 12.3:1 */
  --text-2: #A3AFC0; /* 8.9:1 body */
  --text-3: #8793A6; /* 6.3:1 minimum for any text */
  /* accent */
  --cyan:    #5CC8DC;  /* 10.1:1; under ~5% of any view */
  --cyan-hi: #9BE5F1;  /* hover, 14.0:1 */
  --on-cyan: #05161B;  /* text on cyan buttons, 9.5:1 */
  --amber:   #E3B766;  /* PLACEHOLDER content only; absent from final site */
  /* motion */
  --ease: cubic-bezier(.2, .6, .2, 1);
  --dur-fast: 160ms; --dur-base: 200ms; --dur-enter: 700ms;
  /* layout */
  --frame: 1312px;
  --gutter: clamp(20px, 4.4vw, 64px);
  --radius: 2px;
}
```
Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96. Sections: 120–140px vertical on desktop, 72–80px on mobile. 12-column frame, 24px gutter.

## Typography
- Sans: **Geist** (400/500). Mono: **Geist Mono** (400). Self-host via fontsource; system fallbacks `system-ui` / `ui-monospace`.
- Display (hero only): `clamp(50px, 8.1vw, 118px)`, weight 500, line-height .96, letter-spacing −.045em.
- H2: `clamp(34px, 4.3vw, 62px)`, 500, lh 1.04, ls −.03em. H3: `clamp(26px, 2.6vw, 36px)`, 500, lh 1.12, ls −.022em.
- Lead 19px/1.6 `--text-1`. Body 17px/1.65 `--text-2` (15–16 on small), measure ≤ 68ch.
- Mono label: 12px, uppercase, ls .08em. Mono note: 10–11px (figure captions, coordinates).

## Layout and sections (ids and background state)
| id | nav | `data-bg` | notes |
|---|---|---|---|
| `hero` | — | 0 | identity hero: portrait left (4:5, ~33vw, max 440px) with cyan corner ticks and caption; right: status line, name (display type), 3-row definition list (Studying / Next / Research), one-sentence statement, 4 buttons (View CV primary, Research, Publications, GitHub); bottom annotation bar |
| `cv` | 01 CV | 1 | left: label, heading, updated date, **Download PDF** (primary) + "Open in new tab"; right: PDF viewer panel (toolbar with page counter, prev/next, zoom −/+; 720px-high scroll area on `--ink-3` with the white page; footer note) |
| `research` | 02 Research | 1 | heading is the question "How little precision can a network afford?" (cyan "?"); three rows R.1–R.3, each with chip, text, tags, small SVG figure |
| `publications` | 03 Publications | 2 | status key; featured publication panel + evidence slot; research ledger |
| `projects` | 04 Projects | 2 | P.1 ongoing, P.2 exploratory (placeholder), P.3 published; figure panels; P.2 text/figure order flips on desktop |
| `method` | (under Projects) | 2 | label 05; five steps M.1–M.5 + proposed `results/` layout |
| `contact` | 06 Contact | 3 | large closing statement, four link rows, footer |

Nav order follows the page: CV 01, Research 02, Publications 03, Projects 04, Contact 06 (05 is the Method section label). Sticky header, 68px high, blurred dark background, 1px bottom border. Active section = 2px cyan rule under the item (scroll-spy). Mobile (≤720px): "Menu" button (48px) opens a sheet with 60px rows.

## Portrait
Natural photo with a light cool grade; no duotone. 1px-weight cyan corner ticks outside the frame, 14px. Caption bar: "Fig. 00 · portrait" left, coordinates right. Placeholder state = dashed amber frame with the label. Mobile: full-width (inset 7px so ticks stay on screen), above the name.

## CV viewer (pdf.js)
- Source: `public/cv/CV.pdf`. Download and "Open in new tab" are plain `<a href="/cv/CV.pdf">` (`download` attribute on the download link) and work without JS.
- Viewer loads `pdfjs-dist` only when the section is near the viewport (IntersectionObserver, ~400px root margin) or the user presses a control. Show a skeleton page while loading; on any failure show the direct-link fallback with a short message.
- Render pages to `<canvas>` at device pixel ratio (cap 2), width fitted to the panel; text layer optional (nice to have: selectable text). Controls are real `<button>`s, ≥44px, with `aria-label`s and a live region announcing "Page X of Y". Keyboard: focusable scroll area, arrow/PageUp/PageDown work natively; buttons for zoom (50–200%).
- The page stays white (no inversion). Panel footer note from the design is design commentary and is **not** shipped.

## Components
- **Chip** (status): Published = filled square, cyan tint fill + border; Ongoing = half-filled circle, cyan border; Exploratory = hollow circle, dashed grey border. Mono 11px uppercase.
- **Tag**: mono 11px, 1px `--line-2` border, neutral.
- **Placeholder** `.ph`: amber text, dashed amber underline.
- **Button**: 48px high (52px mobile), 2px radius. Primary = cyan fill; ghost = 1px `--line-2`, cyan border on hover.
- **Link** `.lnk`: bottom border `--line-2` → cyan on hover.
- **Entry** (ledger/research rows): hover = 5% cyan wash, arrow shifts 4px. No layout shift.
- **Figure panel**: `--ink-2` at ~92% opacity, 1px `--line-2` border, mono caption bar ("Fig. P.1 · … / schematic · not data").
- **Data table**: mono 12–13px, header `--text-3`, rows separated by `--line`; best cell marked by weight, not colour; scrolls horizontally on mobile with sticky first column.
- Borders not shadows. No glassmorphism beyond the header blur. No gradients except the subtle texture below.

## Background (signature feature)
Fixed layer behind content, `pointer-events: none`, `aria-hidden`. Two parts: a CSS grid texture (96px, 5.5% cyan-grey lines, fading out toward the bottom) and a Canvas 2D network.
- One deterministic field of 72 seeded nodes (use first 64 / 32). Each has `u, v, w, z (depth), layer`.
- Four layouts of the same nodes: **0 hero** (six-layer feed-forward field right of the headline, sparse left margin), **1 research** (three clusters at right edge), **2 dense content** (thin signal band at the bottom), **3 contact** (funnel converging to a central waist).
- Quiet factor scales opacity per state: [1, .72, .34, .85].
- Scroll → progress 0..3 (interpolated between section midpoints) → smoothed → node targets interpolated with smoothstep. Frame-rate-independent exponential easing. Slow sinusoidal drift; depth parallax.
- Links between nodes closer than ~22% of min(width,height) (30% on mobile); alpha falls with distance squared. Hub rings on every 11th node. Pulses travel left→right along links.
- Pointer: nodes within 130px yield up to 22px and ease back. Fine pointers only.
- Reduced motion: one still frame per state; redraw on scroll/resize only.
- **Port from `docs/design/Background.dc.html`** (the `boot()` method). Wrap as `NetworkBackground` with props `density`, and a `useSectionProgress` hook.

## Motion
Hero only: four fade-ups (700ms, 80ms stagger, once). Status dot pulse 2.4s. Hover transitions 160–200ms with `--ease`. Optional section reveal (opacity + 8px rise, 400ms, once, IntersectionObserver) — must degrade to fully visible without JS. Nothing animates in text-heavy areas beyond hover.

## Responsive
- ≥1200 full frame; 721–1199 figures wrap under text; ≤720 single column, menu sheet, density 0.5, no pointer effect.
- Mobile is a re-composition (see `Mobile.dc.html`): simplified figures with larger labels, project figure panels stacked under titles, vertical routing pipeline, 44px+ touch targets.

## Content status
Verified = plain text. Placeholder = amber `.ph`. Proposed = plain text noted in the figure caption. The shipped site has no amber; every `.ph` must be resolved or removed (`npm run check:placeholders`).
