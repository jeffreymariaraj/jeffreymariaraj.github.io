# CLAUDE.md — Jeff's research portfolio

Personal research portfolio for an undergraduate ML researcher (RVCE Bengaluru, class of 2027).
Audience: professors, labs, collaborators, graduate admissions committees.
Deployed as a **static site on GitHub Pages** at https://jeffreymariaraj.github.io (repo: `jeffreymariaraj/jeffreymariaraj.github.io`).

The design is approved and lives in `docs/design/`. **Build to it; do not redesign.** Read `DESIGN.md` first.

## Source of truth
- `docs/design/Main.dc.html` — desktop homepage (copy, structure, spacing, inline SVG figures).
- `docs/design/Mobile.dc.html` — mobile homepage.
- `docs/design/Research.dc.html` — expanded publication + project-detail templates.
- `docs/design/DesignSystem.dc.html` — tokens and components.
- `docs/design/BackgroundSpec.dc.html` — background behaviour and performance budget.
- `docs/design/Background.dc.html` — **working background engine** (Canvas 2D). Port its logic; do not rewrite from scratch.
- The `.dc.html` files are design-tool exports: HTML plus a `<script type="text/x-dc">` block. Ignore `<x-dc>`, `<dc-import>`, `<sc-for>`, `<sc-if>` and `{{holes}}` as framework syntax; they are not part of the target stack. Read them for markup, CSS, copy and logic.

## Stack and hard constraints
- Vite + React 18 + TypeScript (strict). Plain CSS with CSS custom properties (tokens). No Tailwind, no UI kit.
- No animation libraries, no WebGL, no three.js, no analytics, no backend, no paid assets.
- Runtime dependencies: `react`, `react-dom`, and self-hosted fonts via `@fontsource-variable/geist` and `@fontsource/geist-mono`. Anything else needs a stated reason and my approval.
- Single page, anchor navigation (`#research`, `#publications`, `#projects`, `#cv`, `#contact`). No client router.
- `vite.config.ts`: `base: '/'` (user site at the domain root).
- Node 20. Use `npm`, commit `package-lock.json`.

## Content rules (important)
- **Never invent** publications, results, metrics, citations, awards, dates, names or links.
- Verified facts only: RVCE Bengaluru, B.E. CSE, expected 2027; an IEEE conference paper on LLM query routing with a fine-tuned DistilBERT classifier, co-authors Maurya Pradeep Gowda and Ronan Lobo; an ongoing student-team study of contradictions in vision-model quantization (public checkpoints, PyTorch/timm/torchvision, Colab-class GPUs); GitHub username `jeffreymariaraj`.
- Everything else stays a **placeholder**, rendered with the `.ph` class (amber text, dashed underline). Keep a single file `src/content/content.ts` holding all copy and placeholders so I can fill it in later. Components read from it.
- Keep the "illustration, not a result" and "schematic · not data" captions on every figure.
- The hero question, routing-pipeline diagram and `results/` layout are proposals; keep them but they are editable in `content.ts`.
- Before launch, a script `npm run check:placeholders` must list every remaining `[placeholder]` so I know what is unfinished. It must not fail the build.

## Quality bar
- Match the design closely at 1440px and 390px. Compare against the artboard markup, not memory.
- Accessibility: semantic landmarks, real `<a>`/`<button>`, visible focus ring (2px cyan, 3px offset), text contrast ≥ 4.5:1 (never below `--text-3`), touch targets ≥ 44px on mobile, `aria-hidden` on the canvas and decorative SVG, `role="img"` + `aria-label` on figures, skip link, `lang="en"`.
- Motion: respect `prefers-reduced-motion` everywhere. Background draws one still frame, no loop. Hero fade-in, status pulse and hover travel are removed.
- Status is never hue alone: Published = filled square, Ongoing = half-filled circle, Exploratory = hollow circle with dashed border (see `.chip` in the design).
- The page must remain fully readable with JavaScript disabled (content is in the HTML; only the canvas needs JS).

## Background engine budget
Nodes 64 desktop / 32 mobile · pulses 12 / 6 · DPR cap 1.5 / 1.0 · one `requestAnimationFrame` loop · paused when `document.hidden` or canvas off-screen · canvas sized to the viewport (max ~1000px tall), never the page · `pointer-events: none` · pointer repulsion disabled on touch/coarse pointers and under reduced motion.
In production, replace the per-frame `getBoundingClientRect` section lookup with an `IntersectionObserver` hook that yields progress 0..3 from `data-bg` sections (hero 0, research 1, publications/projects/method/CV 2, contact 3).

## Workflow
- Work in small stages (see `KICKOFF.md`). After each stage: `npm run build` and `npm run lint` pass, then commit with a clear message.
- Commit locally as you go. **Do not push to `main` until I say so**, because pushes to `main` deploy publicly. Use a branch `build/initial` and open it for review.
- If the design is ambiguous or you must deviate, say so briefly and pick the closest faithful option; do not silently redesign.
- Prefer editing existing files; keep components small (`Nav`, `Hero`, `ResearchFocus`, `Publications`, `Projects`, `Method`, `Contact`, `NetworkBackground`, `Chip`, `Figure`).
- Tests: add a small Vitest suite only for pure logic (layout interpolation, progress mapping). Do not over-test markup.
- Final checks before I deploy: Lighthouse (performance, accessibility, best practices ≥ 95), manual reduced-motion check, mobile 390px check, keyboard-only pass.
