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
| `hero` | — | 0 | asymmetric; headline left, network right; status line; 3 links; bottom annotation bar |
| `research` | 01 Research | 1 | three rows R.1–R.3, each with chip, text, tags, small SVG figure |
| `publications` | 02 Publications | 2 | status key; featured publication panel + evidence slot; research ledger |
| `projects` | 03 Projects | 2 | P.1 ongoing, P.2 exploratory (placeholder), P.3 published; figure panels; P.2 text/figure order flips on desktop |
| `method` | (under Projects) | 2 | five steps M.1–M.5 + proposed `results/` layout |
| `cv` | 05 CV (nav "CV") | 2 | one row: education line + download button |
| `contact` | 06 Contact | 3 | large closing statement, four link rows, footer |

Nav numbers in the design: Research 01, Publications 02, Projects 03, CV 05, Contact 06 (04 is the Method section label). Sticky header, 68px high, blurred dark background, 1px bottom border. Active section = 2px cyan rule under the item (scroll-spy). Mobile (≤720px): "Menu" button (48px) opens a sheet with 60px rows.

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
