# CHANGES.md — design revision 3 (real content; apply to the existing build)

Revisions 1 and 2 are already built. This revision replaces placeholders with verified content, adds three project figures, removes the Method section and adds contact icons. `CLAUDE.md`, `DESIGN.md` and `docs/design/*.dc.html` in this bundle replace the old ones. The previous change list is kept in `docs/CHANGES-rev2-applied.md` for reference only.

## What to do (about 5 minutes)
1. Commit or stash anything you have changed, then unzip `portfolio-handoff-v3.zip` over the repo folder (yes to overwrite).
2. Start `claude` in the folder and paste the prompt below.

## Change list
1. **Surname:** "Jeffrey Mariaraj" everywhere (hero, nav mark, footer, publication authors as "R. Jeffrey Mariaraj"). Remove the surname placeholder.
2. **Publications → featured paper** (real data): title, authors, venue (IEEE CSITSS 2025), DOI link, code link, short summary, Table 1 (classifier backbone comparison), Fig. 1 "where 100 queries go" (dot matrix 85/15 plus cost bars), three headline stats. All text, numbers and SVG are in `Main.dc.html` / `Mobile.dc.html`.
3. **Publications → ledger:** exactly one entry, Ongoing: "XyloTron Vision Model Quantization". The other placeholder rows are deleted. Status key becomes Published / Ongoing / Completed; section heading "Published and ongoing work, kept visibly apart."
4. **New status chip: Completed** (hollow square, solid grey border). Exploratory stays in the design system but is unused on the page.
5. **Projects:** P.1 XyloTron (Ongoing, wood-section → float32 → int8 figure), P.2 drug-like molecule generator (Completed, molecule + MW-window figure, repo link), P.3 LLM query routing (Published, new two-stage routing diagram, paper and repo links). Old P.1/P.2 content is removed.
6. **Method section is deleted** (markup, content.ts entries, nav/scroll-spy entries, `data-bg` mapping, the Method component, the `results/` layout block).
7. **Numbering:** CV 01, Research 02, Publications 03, Projects 04, Contact 05 (labels, nav, mobile menu).
8. **Contact:** rows LinkedIn, X, GitHub, Email (still a placeholder), CV, each with a 44px icon tile. Links: `https://www.linkedin.com/in/jeffrey-mariaraj`, `https://x.com/ffsj3ff`, `https://github.com/jeffreymariaraj`. Hero GitHub button links to the GitHub profile.
9. **Mobile:** same content; figures are re-drawn with larger labels (copy the SVGs from `Mobile.dc.html`, do not scale the desktop ones); P.3 diagram is vertical; Table 1 scrolls horizontally with a sticky first column.
10. **Artboard 03 (`Research.dc.html`)** shows the expanded publication and the project-detail template filled with real content; use it as the reference for any future detail pages (not required for this revision).

## Prompt to paste into Claude Code

We are applying design revision 3 to the site you already built. Read `CHANGES.md`, then the updated `CLAUDE.md` and `DESIGN.md`, then these artboards in `docs/design/`: `Main.dc.html` (publications, projects, contact), `Mobile.dc.html` (same sections) and `Research.dc.html` (reference only). Copy text, numbers and SVG figures from the artboards; do not retype figures from memory and do not change any number. Don't redesign anything not listed in the change list.

Work on a new branch `revision/real-content` from the current state of `main`. Don't push to `main` until I approve.

Before coding, reply with a short plan: files you will touch, how `content.ts` changes (new publication, projects and contact structures; Method removed), and how you'll componentise the SVG figures. Wait for my "go".

Then, committing after each step and running build + lint each time:
1. **Content and structure:** update `content.ts` with the verified facts from `CLAUDE.md`; set the surname; delete the Method section and everything that references it (component, content, nav and scroll-spy entries, background mapping); renumber to CV 01 / Research 02 / Publications 03 / Projects 04 / Contact 05 in the nav, mobile menu and section labels.
2. **Publications:** build the featured paper panel (text, Table 1, Fig. 1, stats) and the single-entry ledger; add the Completed chip variant to `Chip`; update the status key.
3. **Projects:** build P.1, P.2, P.3 with their figures as inline SVG React components (`FigXylo`, `FigMolecule`, `FigRouting`, `FigQueries`), keeping `role="img"`, `aria-label`, unique `id`s for filters, patterns, markers and clip paths, and the "schematic · not data" captions. Desktop and mobile variants as in the artboards. The wood-grain filter (`feTurbulence` + `feDisplacementMap`) must render statically (no animation).
4. **Contact:** five rows with icon tiles (inline SVG, `aria-hidden`), external links with `target="_blank" rel="noopener noreferrer"`, visible focus, 44px targets on mobile.
5. **Verification:** production build; Playwright screenshots at 390, 720 and 1440 compared with the artboards; check nothing under Publications or Projects overflows horizontally at 390 except the scrollable table; re-run Lighthouse and report honestly; update `npm run check:placeholders` (it should now list only the email, CV date, portrait, CV file and any remaining research-section placeholders).
6. **Checkpoint:** start `npm run dev`, give me the URL, list deviations from the design, and wait for my approval before merging.

Rules: no invented content; no phone number or address anywhere; numbers come only from the artboards; amber placeholders stay for email, portrait, CV date; tell me in one line whenever you make a judgement call.

## Things to confirm before you publish (flagged, not decided by the design)
- "Mariaraj" was inferred from your name, GitHub username and LinkedIn slug. The paper byline reads "R. Jeffrey Mariaraj"; confirm both.
- Spelling: the design uses "Quantization" (US) to match the existing site and the UW–Madison collaborators; say if you want "Quantisation".
- The paper contradicts itself in places (abstract says 97% classifier accuracy; its own Table II lists DistilBERT at 88.6%; latency reductions are quoted as 52%, 73% and 55% in different places). The page quotes 97% as "on a curated test set" and shows Table II as printed. The 84.15% cost saving comes from a simulated cost model and is labelled so. Decide whether to keep all of these before the site goes public.
- The Research section on the homepage still mentions spiking networks and distillation as directions. They were not in this change list; remove or keep as you like.
- XyloPhone is described as "an offline camera device" in your words. If it is better described otherwise (for example a smartphone attachment), edit the P.1 and ledger copy.
- The drug-like molecule generator is a rule-based MVP with no benchmark results, and the page says so.
