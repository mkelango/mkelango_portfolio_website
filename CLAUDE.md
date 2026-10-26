# mkelango.com

Static site for M. K. Elango. Zero dependencies — plain Node generates `dist/`.
README.md is the full reference; DEPLOY.md covers hosting.

## Working loop

- `node build.js --watch` — rebuilds `dist/` on any change in `src/` or `assets/`. It reloads `src/`
  but not `build.js` itself: restart it after editing `build.js` (e.g. `REDIRECTS`). A manual
  `node build.js` while the watcher runs can race it — if `check.js` hits ENOENT, just re-run.
- `.claude/launch.json` → `mkelango` serves `dist/` on http://localhost:4321
- `node build.js && node check.js` — must print `✓ clean` before any commit; CI runs the same
- `npm run og` re-renders social cards (needs Chrome). Run it after changing a page title
  or adding a route, and commit `assets/og/` — CI cannot render them.

## Where things live

- Copy and content: `src/data/` (site, stack, programs, events, coaching, diagnostics, misc)
- Page titles, descriptions, answer blocks, FAQs: `src/seo-meta.js`
- New page: module in `src/pages/` + entry in `src/routes.js`
- Moved page: add to `REDIRECTS` in `build.js`
- Design tokens and components: `assets/css/site.css`; shared markup: `src/kit.js`

## Rules this site holds itself to

- Every published figure carries an evidence grade and an as-at date (`kit.js → etag()`).
- Do not invent credentials, ISBNs, testimonials or numbers. Founder-reserved slots stay marked
  (see README → "What is deliberately unfinished").
- Never put the Supabase service_role key in `src/data/backend.js` — only the public anon key.

## Deploy

Push to `main` → GitHub Actions builds, validates, publishes to GitHub Pages at mkelango.com.
