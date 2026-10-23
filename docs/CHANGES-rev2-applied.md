# CHANGES.md — design revision 2 (apply to the existing build)

Use this on a repo that already has the first version built. `CLAUDE.md`, `DESIGN.md` and `docs/design/*.dc.html` in this bundle replace the old ones.

## What to do (about 5 minutes)
1. In your repo folder, unzip `portfolio-handoff-v2.zip` over the existing files. Say yes to overwrite. (Back up first if you have edited those md files: `git stash` or commit.)
2. Put a placeholder-free CV at `public/cv/CV.pdf` when you have it. Claude Code will add a stand-in until then.
3. Start `claude` in the folder and paste the prompt below.

## Change list
1. **Hero becomes an identity hero.** Portrait left (placeholder frame until a photo exists); right: "Jeff [Surname]", a 3-row list (Studying: B.E. CSE, RVCE Bengaluru · 2027 / Next: Incoming SDE at Deutsche Bank / Research: quantization, spiking networks, distillation), one-sentence statement, buttons View CV · Research · Publications · GitHub. The old headline question leaves the hero.
2. **CV section moves directly after the hero** (id `cv`, `data-bg="1"`) and gets a real **pdf.js viewer** plus Download PDF and Open in new tab.
3. **Research section heading** becomes "How little precision can a network afford?" (cyan question mark). Its body line begins "One question, approached from three directions:".
4. **Section order and numbering:** Hero → CV (01) → Research (02) → Publications (03) → Projects (04) → Method (05, not in nav) → Contact (06). Nav: CV, Research, Publications, Projects, Contact. The old compact CV row near the bottom is deleted.
5. **Background:** `cv` uses state 1 (research clusters). No engine change needed beyond the `data-bg` values.
6. **New dependency:** `pdfjs-dist`, lazy-loaded only. Everything else unchanged.
7. **Mobile:** hero stacks (status line, full-width portrait, name, list, statement, 4 full-width buttons); CV section follows with a 460px viewer, 44px controls, Download button above it; menu order matches the nav.

## Prompt to paste into Claude Code

We are applying design revision 2 to the site you already built. Read `CHANGES.md`, then the updated `CLAUDE.md`, `DESIGN.md`, and these artboards in `docs/design/`: `Main.dc.html` (hero and `#cv` sections), `Mobile.dc.html` (hero and `#cv`), and `BackgroundSpec.dc.html`. Don't redesign anything not listed in the change list.

Work on a new branch `revision/identity-hero-cv` from the current state of `main`. Don't push to `main` until I approve.

Before coding, reply with a short plan listing: which files you will touch, how `content.ts` changes (new fields for name line, identity rows, portrait, CV path and updated date), and how you'll structure the CV viewer. Wait for my "go".

Then, committing after each step and running build + lint each time:
1. **Content and structure:** update `content.ts`, reorder sections to Hero → CV → Research → Publications → Projects → Method → Contact, renumber section labels, update the nav and mobile menu order and the scroll-spy map, set `data-bg` per `DESIGN.md`. Move the old headline question to the Research heading as specified.
2. **Hero:** build the identity hero (desktop and mobile) with the portrait component. Real `<img>` pipeline with the amber placeholder frame fallback when `src/assets/portrait.webp` is missing; mark it as the LCP image. Keep hero fade-in and reduced-motion handling. Match the design at 1440, 1024, 720 and 390px.
3. **CV viewer:** add `pdfjs-dist`, lazy-load it with dynamic `import()` when the section nears the viewport or a control is used, copy the worker into the build so it is served from the site (no CDN). Build `CvViewer` with the toolbar, page counter, zoom, canvas rendering at capped DPR, and the direct-link fallback on failure. Make Download PDF and Open in new tab plain links that work without JS. Add a stand-in `public/cv/CV.pdf` (one simple page that says it is a placeholder) if none exists. Add a live-region announcement for page changes and make everything keyboard-operable.
4. **Verification:** run a production build and check the initial JS bundle does not include pdf.js (report sizes before and after). Take Playwright screenshots at 390, 720, 1440 and compare against the artboards. Re-run Lighthouse and report the scores honestly, noting the LCP element. Update `npm run check:placeholders` so the portrait, CV date and the stand-in PDF are listed as unresolved.
5. **Checkpoint:** start `npm run dev`, give me the URL, summarise deviations from the design, and wait for my approval before merging to `main`.

Rules: no invented content; no phone number or address anywhere; keep amber placeholders for the surname, portrait and CV date; tell me in one line whenever you make a judgement call.

## After the build, you supply
Photo (face shot, 4:5 crop, cool-leaning colour grade is applied by CSS, export WebP under about 150 KB with location data stripped) → `src/assets/portrait.webp`. Your CV PDF (no phone or home address) → `public/cv/CV.pdf`. Surname, CV updated date, and the usual placeholders in `src/content/content.ts`.

## Layout note (hero, desktop)
At 900px and wider the portrait and the identity block sit **side by side on one row** (portrait left, name + Studying/Next/Research list + statement + buttons right), vertically centred. They stack only below 900px. In the build, make the hero container `width: 100%` (a flex child with `margin: 0 auto` otherwise shrinks to its content and the text drops below the photo), and use a CSS grid such as `grid-template-columns: minmax(260px, 440px) 1fr` above 900px.
