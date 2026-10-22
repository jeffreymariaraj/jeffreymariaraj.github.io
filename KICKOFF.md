# KICKOFF.md — paste the prompt at the bottom into Claude Code

## What you do (about 10 minutes)
1. Open a terminal and clone the empty repo:
   ```
   git clone https://github.com/jeffreymariaraj/jeffreymariaraj.github.io.git
   cd jeffreymariaraj.github.io
   ```
2. Unzip `portfolio-handoff.zip` into this folder so you have `CLAUDE.md`, `DESIGN.md`, `KICKOFF.md`, `.github/workflows/deploy.yml` and `docs/design/`.
3. Make sure you are signed in to GitHub from the terminal (`gh auth login`, or have your git credentials set up). Claude Code uses this to push later.
4. Start Claude Code in this folder: `claude`. Paste the prompt below.

After that, Claude Code does the work and stops at checkpoints for you to review.

---

## Prompt to paste

You are building my research portfolio website. I'm new to this, so do as much as you can yourself and explain anything I must do by hand in plain steps.

Read `CLAUDE.md`, `DESIGN.md`, and everything in `docs/design/` before doing anything. The design is approved; build to it, don't redesign.

**Step 0 — environment check (do this first, then report)**
- Check `node -v` (need 20+), `npm -v`, `git --version`, and whether `gh` is installed and authenticated. Tell me exactly what to install or fix if anything is missing, and wait.
- Confirm this folder is the clone of `jeffreymariaraj/jeffreymariaraj.github.io` and create branch `build/initial`.

**Step 1 — plan (no code yet)**
Write a short plan: file structure, components, how `content.ts` holds all copy and placeholders, and how you'll port the engine in `docs/design/Background.dc.html` into a `NetworkBackground` component and a `useSectionProgress` hook. Show it to me and wait for my "go".

**Then build in these stages, committing after each, running `npm run build` and `npm run lint` each time:**
1. Scaffold Vite + React + TypeScript (strict), ESLint, `vite.config.ts` with `base: '/'`, self-hosted fonts via fontsource, `tokens.css`, global styles. Keep `.github/workflows/deploy.yml` as provided. Add `npm run check:placeholders`.
2. Page shell: skip link, sticky header with scroll-spy active rule, mobile menu sheet, section wrappers with ids and `data-bg`.
3. `NetworkBackground` + `useSectionProgress` (IntersectionObserver), CSS grid texture, reduced-motion and visibility handling. Add Vitest tests for the layout interpolation and progress mapping.
   **Checkpoint: start `npm run dev`, tell me the URL, and ask me to confirm the hero and background look right before continuing.**
4. Hero and Research sections with their SVG figures.
5. Publications (featured panel, evidence slot, ledger) and Projects (P.1–P.3 with figures).
6. Method, CV, Contact, footer.
7. Responsive pass against `Mobile.dc.html` at 390px, then 720px and 1440px. Use a headless browser (Playwright) to take screenshots at those widths and compare them against the design; fix differences.
8. Accessibility and performance pass: keyboard-only walkthrough, contrast, reduced-motion, Lighthouse. Report the scores honestly.
   **Checkpoint: summarise what's done, what placeholders remain (`npm run check:placeholders`), and anything that deviates from the design.**

**Deployment (only after I approve at the final checkpoint)**
- Merge `build/initial` into `main` and push. If `gh` is authenticated, enable Pages with source "GitHub Actions" via the API; otherwise tell me the exact clicks (repo Settings › Pages › Source: GitHub Actions).
- Watch the workflow run and confirm https://jeffreymariaraj.github.io loads. Fix any build errors.

**Rules while you work**
- Don't invent any research content; follow the content rules in `CLAUDE.md`.
- Don't push to `main` before I approve.
- If something in the design is unclear, pick the closest faithful option and tell me in one line.
- Keep your updates short: what you did, what's next, anything you need from me.

Start with Step 0.

---

## What you'll need to fill in later (Claude Code will leave these as amber placeholders)
Paper title, venue and year, author order, paper DOI/link, code repo links, your surname, email, LinkedIn URL, CV PDF, the SNN and distillation entries (delete if not real yet), P.2 project text, benchmark numbers. Edit them all in `src/content/content.ts`, then run `npm run check:placeholders` until it reports none.
