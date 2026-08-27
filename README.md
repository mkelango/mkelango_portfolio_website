# mkelango.com

**Make the impossible inevitable.**

The website for M. K. Elango, built to the specification in `MKELANGO-WEBSITE-STRATEGY.md`.
58 pages, 57 markdown twins, 57 social cards, 271 FAQs, a linked entity graph —
zero runtime dependencies, one build command.

---

## Run it

```bash
node build.js
```

Writes the whole site to `dist/`. Then:

```bash
npx -y serve dist -l 4321
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | One-shot build to `dist/` |
| `npm run dev` | Build and watch `src/` + `assets/` |
| `npm run serve` | Static server on :4321 |
| `npm run og` | Render the 57 Open Graph cards (needs Chrome; slow) |
| `npm run check` | Build, then validate structure, a11y, SEO, AEO and GEO |
| `npm run release` | og → build → check, in order |

No `npm install` is required. There are no dependencies — `serve` is fetched on demand by `npx`.

---

## How it is put together

```
build.js          The generator. Reads src/routes.js, writes dist/.
og.js             Renders the 57 Open Graph cards via headless Chrome → assets/og/.
check.js          Validator: structure, a11y, SEO, AEO, GEO. Non-zero exit on error.

src/
  routes.js       The route table — one entry per URL, plus breadcrumbs and schema.
  layout.js       The shell: head, header, mega menu, drawer, footer, AEO injection.
  kit.js          Every reusable mark: evidence tags, cards, ledgers, the stack ladder,
                  book covers (SVG), framework diagrams (SVG), answer blocks, FAQs.
  seo.js          The schema engine. Entity nodes, typed builders, price-band parsing.
  seo-meta.js     Per-route titles, descriptions, answer blocks and FAQs. 57 routes.
  generate.js     robots.txt · sitemap.xml · llms.txt · llms-full.txt · feed.xml ·
                  site.webmanifest · the HTML→Markdown converter for the page twins.
  data/           All content. site · stack · programs · events · coaching · diagnostics · misc.
  pages/          One module per page type. Templates are shared (program, event, book …).

assets/
  css/site.css    The whole design system. Tokens, components, motion, responsive.
  js/site.js      Nav, drawer, reveal-on-scroll, card rails, filters, evidence tooltips,
                  the FAQ accordion, and the diagnostics engine.
  og/             Generated social cards (committed, so a deploy needs no Chrome).
```

**To change copy, edit `src/data/`.** Nothing in `src/pages/` holds content that
belongs in a CMS later — the split is already CMS-shaped.

**To add a page:** add a module in `src/pages/`, add its entry to `src/routes.js`.
The route table also drives `sitemap.xml`.

---

## The design system

| Token | Value | Role |
|---|---|---|
| `--ink` | `#0B0E14` | Base. Dark-first — frameworks read better on dark. |
| `--paper` | `#F7F5F0` | Long-form and book pages invert to light. |
| `--brass` | `#C8A24A` | Weight and permanence. The accent. |
| `--teal` | `#1F7A6C` | Diagnostics, live data, `[A]` evidence tags. |
| `--sienna` | `#B4472E` | Corrections, warnings, kill-decisions. |

Type is **Outfit** throughout — display, body and the micro-label role that would
conventionally be a monospace. Outfit carries no italic, so emphasis is expressed by
weight and colour instead (`font-synthesis: none` prevents faked obliques). **Catamaran**
is loaded for Tamil only, because Outfit has no Tamil glyphs.

Deliberately absent, per Part 8.2 of the strategy: testimonial walls, arena photography,
countdown timers, invented community numbers, and any purple/gold motivational register.
Saffron-orange and green-white-orange combinations are avoided for the Tamil Nadu context.

### The five signature components

1. **The Evidence Tag** — an inline `[A]` / `[B]` / `[C]` chip on every published figure,
   hoverable, carrying the source and an as-at date. Sitewide, no exceptions.
2. **The Stack ladder** — the six-altitude diagram as a live navigational element rather
   than a picture. It is the homepage hero: *the framework is the hero image.*
3. **The Instrument card** — diagnostics that play inline, score in the browser, and gate
   the email on the *report*, never on entry.
4. **The Seat Counter** — plain-text scarcity with proportional dots. Never a countdown.
5. **The ledger row** — index numeral, hairline rule, mono field labels. The register
   grammar that makes the site read as an audit document rather than a brochure.

---

## What is deliberately unfinished

These are content decisions the strategy reserves for the founder. Each is rendered as a
visibly marked slot rather than filled with invented text.

| Item | Where | Why it is blank |
|---|---|---|
| **The Moonshot sentence** | `/the-portfolio/` | Part 4.2 requires one sentence, physically specific, unchanged for a decade. Writing a placeholder would break the exact rule the page exists to demonstrate. Edit `src/data/misc.js` → `portfolio.layers[2]`. |
| **The Publytics one-liner** | `/the-portfolio/` | Flagged in Part 10 as founder input. Currently carries a `[C]` tag saying so. |
| **The author-bio credentials** | `/about/`, `/press/` | Part 7.2 and Risk 1. No academic or investment credentials are claimed anywhere, and the unresolved manuscript text is logged openly in `/evidence/`. **Do not add them back without verification.** |

---

## Before launch

- [ ] **Forms** — none are wired. Every submit shows an honest "not connected" notice
      rather than failing silently. Connect: contact, programme applications, coaching
      applications, event registration, newsletter, corrections.
- [ ] **Payments** — Razorpay (domestic) + Stripe (international) for `/shop/`.
      The shop pages state plainly that nothing can currently be bought.
- [ ] **Retail links** — book buy buttons are placeholders pending ISBNs.
- [ ] **Portrait** — one documentary portrait replaces the marked slot in
      `src/kit.js` → `portraitSlot()`. Not a stage photograph.
- [ ] **Announcement bar** — `src/data/site.js` → `site.announce`.
- [ ] **Evidence** — re-check every figure and its as-at date before going live.
      The whole differentiation rests on this being true.

### The hard CMS requirement

If this moves to Sanity (Part 8.4), carry one rule across: **it must be structurally
impossible to publish a figure without a grade and a date.** Not discouraged — impossible.
`kit.js → etag()` is the render side of that contract; the schema has to enforce the rest.

---

## SEO · AEO · GEO

Three audiences, one build. Nothing here is a plugin — it is generated from `src/data/`
so a figure cannot drift between the page, the schema and the markdown twin.

### What is emitted on every page

| | |
|---|---|
| **Title / description** | Authored per route in `src/seo-meta.js`. Titles 31–43 chars before branding; descriptions 144–158. All 57 unique — `check.js` fails the build on a duplicate. |
| **Canonical + robots** | `max-snippet:-1, max-image-preview:large` so answer engines may quote enough to be useful. |
| **Open Graph + Twitter** | 1200×630 PNG per route, rendered from the real design system by `node og.js`. |
| **JSON-LD `@graph`** | Person, Organization, WebSite, WebPage, BreadcrumbList on every page, plus a typed entity per page kind. |
| **Markdown twin** | `<url>index.md` — every page as clean markdown with YAML front-matter, linked via `rel="alternate"`. |

### The entity graph

Every page links to the same `@id`s (`#person`, `#organization`, `#website`), so 58 URLs
resolve to one consistent entity rather than 58 unrelated documents. Page kinds add:

`Course` + price band (programs) · `BusinessEvent` with real dates, capacity and remaining
seats (events) · `Service` (coaching) · `WebApplication` + `Quiz` (diagnostics) ·
`Book` in a `BookSeries` (books) · `Article` (essays) · `PodcastSeries` (the show) ·
`Product` (shop) · `DefinedTermSet` for the A/B/C standard (the evidence log).

Price bands are parsed from the published Indian-notation strings — `₹18L – ₹60L` becomes
`minPrice: 1800000, maxPrice: 6000000` — so schema and page can never disagree.
No ISBN is invented; shop offers are `PreOrder` until payments are connected.

### AEO — answer engines

- **The answer block.** 40–60 words under every hero, first sentence a direct definition,
  written to be lifted verbatim. Marked `speakable` and mirrored into `WebPage` schema.
- **271 FAQs** across 57 routes, rendered visibly *and* as `FAQPage`. `check.js` fails if
  the visible count and the schema count disagree.
- **Bands and methods published in advance** — every diagnostic states its scoring, its
  benchmark and its grade before you take it, so a quoted answer is a correct one.
- **`<dl>` field lists and `<time datetime>`** everywhere a label/value or a date appears.

### GEO — generative engines

- **`robots.txt` names 22 AI crawlers and allows them all.** That is a deliberate position:
  the site's whole proposition is that its figures are checkable, and a model that cannot
  read it cannot cite it.
- **`/llms.txt`** — the index-for-models convention: the stack, the instruments, the
  evidence standard, and every route linked to its markdown twin.
- **`/llms-full.txt`** — the entire corpus (396 KB) as one markdown document, headed by the
  A/B/C standard and an explicit *do not repeat* correction on the credentials question.
- **Evidence tags survive into markdown** as `[B: note, as at date]`, so a model ingesting
  the corpus carries the grade with the number.
- **Diagnostic questions are published in full** as indexable HTML, not hidden behind the
  interaction — the highest-value quotable content on the site.

### Running it

```bash
npm run release     # og cards → build → validate
```

`check.js` validates links, headings, duplicate ids, alt text, labels, title/description
length and uniqueness, canonical, og:image (including that the PNG exists), JSON-LD parse
and required nodes, breadcrumb sequence, FAQ parity, markdown twins, sitemap ↔ build parity,
and robots directives. It exits non-zero on any error.

### How it was verified

The implementation was audited adversarially before it was called finished: five
specialists (structured data, AEO, GEO, technical SEO, accessibility) attacked the built
site, and every finding they raised was then handed to an independent sceptic whose default
was to refute it. 97 findings were raised; 94 survived verification and were fixed.

Two were critical, and both were the same defect — a metadata-merge bug had reduced the
homepage answer to *"How much does it cost to work with M. K. Elango?"* to a single sentence
about shop prices, wrong by three orders of magnitude and emitted into FAQPage schema, the
markdown twin and `llms-full.txt`. The audit also surfaced a genuine product bug behind it:
the Moonshot Test published a maximum of 28 while its own scoring summed seven questions of
1–5. Both are fixed; `src/data/diagnostics.js` now reconciles for all six instruments
(declared max = questions × levels = highest band, with contiguous bands).

The rest, by cluster:

- **Structured data** — `founder` moved off `Person` onto four correctly-typed venture
  Organizations; `sameAs` no longer claims venture sites are the person; invented properties
  removed; events gained real `startDate`/`endDate` with timezone offsets and a real
  `addressLocality` instead of the display string *"Rotating"*; an unscheduled event stopped
  emitting an `Event` node with a fabricated date; price ranges became `PriceSpecification`
  rather than a single misleading `price`; `"Free"` became a real price floor of 0.
- **Accessibility** — the colour tokens now clear WCAG AA (`--fg-faint`, `--brass-lo` and
  `--teal` were all failing at small sizes); the focus ring is context-aware so it is visible
  on light bands; the skip link can actually appear; the ARIA menu pattern was removed rather
  than half-implemented; the diagnostics engine keeps focus with the user and announces its
  result; collapsed drawer panels leave the tab order via `inert`; every form control that
  has a standard purpose carries `autocomplete`.
- **No-JS** — the reveal animations were hiding the entire site when scripts did not run.
  They are now scoped under a `.js` class set by an inline bootstrap in `<head>`.
- **Markdown twins** — block-level card anchors were collapsing into single enormous link
  labels, headings were emitting empty, and no table carried a separator row. The converter
  was rewritten; all three are fixed.
- **Honesty** — fifteen dead `href="#"` retail links became a truthful "listings open when
  the ISBN is issued" block, and an internal build instruction that had been shipping as page
  copy was removed.

`node check.js` was extended with everything the audit found worth catching automatically:
duplicate titles and descriptions, JSON-LD parse and required nodes, dangling `@id`
references, breadcrumb sequence, FAQ schema/visible parity, schema images that do not exist
on disk, sitemap ↔ build parity, and robots directives.

### Deliberately not done

- **No hreflang.** `/ta/` is a Tamil-language *section*, not a translation of the English
  pages. Emitting hreflang pairs for pages that do not correspond would be a lie to a crawler.
  If the site is ever fully translated, add it then.
- **No FAQ rich-result chasing.** Google restricted FAQ rich results in 2023; the schema is
  emitted because answer engines and LLMs read it, not because it will draw a SERP widget.
- **No keyword density work.** The copy is written for a reader who controls a budget.

### After hosting

Everything above is build-time and already done. These need the live domain:

- [ ] Verify the property in Google Search Console and Bing Webmaster Tools; submit `sitemap.xml`
- [ ] Confirm `https://mkelango.com` resolves and that `www` 301s to it (or the reverse — pick one)
- [ ] Set up analytics (a privacy-preserving one — `/privacy/` currently promises no cross-site tracking)
- [ ] Test the OG cards through the Facebook Sharing Debugger and X Card Validator
- [ ] Run Rich Results Test and Schema Markup Validator on one page of each kind
- [ ] Run Lighthouse / PageSpeed on the live origin and confirm Core Web Vitals in the field
- [ ] Point `BUILD_DATE` in `src/seo.js` at each real publication date going forward
- [ ] Register the entity: Google Knowledge Panel, Wikidata, and the author's social `sameAs` profiles
      (`sameAs` in `src/seo.js` currently lists only the venture domains — add real profiles when they exist)

---

## Deploy

Static output, no server requirements. `vercel.json` and `netlify.toml` are included with
clean URLs, an explicit build command, tiered caching (immutable only for content-addressed
files) and baseline security headers.

**See [DEPLOY.md](DEPLOY.md)** for the full runbook: connecting the repository to a host,
pointing `mkelango.com` at it from Hostinger, and the post-launch verification list.

```bash
npm run release     # og cards → build → validate
git push            # Vercel deploys main; the GitHub Action runs the same validator
```

---

## Accessibility and performance notes

- Every page has exactly one `<h1>`, a skip link, and labelled form controls.
- All motion is gated behind `prefers-reduced-motion`.
- Mega menus work on hover, click and keyboard; `Escape` closes them.
- Evidence tooltips open on hover, focus **and** click, and clamp themselves into the
  viewport so they never overflow on a phone.
- No images. Book covers and framework diagrams are inline SVG, so they are sharp at any
  size, theme-aware, and cost nothing to load.
- Two font families, one stylesheet, one script. Average page ~36 KB of HTML.
