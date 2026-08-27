# Deploying mkelango.com

Host: **GitHub Pages**, published from `main` by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Repository: **github.com/mkelango/mkelango_portfolio_website**

Push to `main` → build → validate → live on `mkelango.com`. Nothing is published that does
not pass `check.js`.

One step remains, and it needs your Hostinger account: **pointing the DNS at GitHub.**

---

## State of the domain, as at 27 August 2026

| | |
|---|---|
| `mkelango.com` A record | `2.57.91.91` — Hostinger |
| Nameservers | `hermes.dns-parking.com`, `artemis.dns-parking.com` — Hostinger |
| `www.mkelango.com` | CNAME → `mkelango.com` |
| What is served today | A Hostinger **parked-domain placeholder**, marked `noindex, nofollow` |

**Nothing of value is live there.** Repointing replaces a placeholder, not a working site.

---

## Step 1 — Point the DNS at GitHub Pages

In Hostinger: **Domains → mkelango.com → DNS / Name Servers**. Keep Hostinger's nameservers;
only the records change.

### Apex — replace the parking A record with GitHub's four

**Delete** the existing `A` record on `@` pointing at `2.57.91.91` first. If you leave it,
the domain will resolve to the parking page a good share of the time.

Then add all four:

| Type | Host | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |

All four — they are GitHub's Pages edge servers and the redundancy is the point.

Optionally add the IPv6 equivalents as `AAAA` on `@`:
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

### `www` — replace the existing CNAME

The current `www` CNAME points at `mkelango.com`. **Change its value** to:

| Type | Host | Value | TTL |
|---|---|---|---|
| CNAME | `www` | `mkelango.github.io.` | 3600 |

That is the **GitHub account**, not the repository — no repository name, no path. GitHub
resolves the repository from the `CNAME` file in the published artifact.

**Do not touch `MX` or existing `TXT` records.** Those are mail and domain verification;
removing them breaks email.

---

## Step 2 — The first deploy binds the domain

The build writes `dist/CNAME` containing `mkelango.com`, derived from
[`src/data/site.js`](src/data/site.js). When the workflow publishes, GitHub reads that file
and sets the custom domain itself. There is nothing to type into the Pages settings.

`check.js` fails the build if that `CNAME` ever stops matching the domain the canonicals and
JSON-LD claim — the two cannot drift apart.

Once DNS resolves, go to **Settings → Pages** and confirm:

- the custom domain shows `mkelango.com` with a green check
- **Enforce HTTPS** is ticked — available once the certificate is issued, usually within an
  hour of DNS propagating

### Verify

```bash
dig +short A mkelango.com          # the four 185.199.x.153 — not 2.57.91.91
dig +short CNAME www.mkelango.com  # mkelango.github.io.
curl -sSI https://mkelango.com | head -3
curl -sSI https://www.mkelango.com | grep -i location   # 301 to the apex
curl -sS https://mkelango.com/llms.txt | head -3
```

---

## The publishing loop, once DNS is live

```
edit → git push → GitHub Action builds + validates → mkelango.com updates
```

That is the whole of it. No dashboard, no manual deploy, roughly a minute end to end.

```bash
npm run release     # og cards → build → validate   (run before pushing)
git add -A && git commit -m "…" && git push
```

Or, if nothing visual changed:

```bash
npm run check       # build + validate
git add -A && git commit -m "…" && git push
```

**When to run `npm run og`:** only when a page **title or description** changes, since those
are rendered into the social cards. It needs Chrome locally and takes about ninety seconds
for all 57. `npm run og -- --only=home,about` re-renders a subset. The workflow refuses to
publish if the cards go missing, so this cannot be forgotten silently.

**If the Action fails, nothing publishes.** The previous version stays live. Read the run log,
fix, push again.

---

## Why the site will not work before DNS is connected

Every internal link is root-absolute (`/about/`, `/diagnostics/aq-score/`). From a custom
domain at the root that is correct. From `mkelango.github.io/mkelango_portfolio_website/`
every link resolves one level too high and 404s.

That is a deliberate trade: root-absolute paths keep canonicals, sitemap, JSON-LD `@id`s,
Open Graph URLs and the markdown twins consistent with each other. The cost is that the
default `github.io` URL is not a usable preview. Preview locally instead:

```bash
npm run build && npm run serve      # http://localhost:4321
```

---

## What GitHub Pages cannot do

Pages serves static files and **cannot set response headers**. So:

- The `Cache-Control` tiering and security headers in [`vercel.json`](vercel.json) and
  [`netlify.toml`](netlify.toml) **do not apply here.** Pages sets its own caching and sends
  HSTS once *Enforce HTTPS* is on. `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options` and `Permissions-Policy` are simply absent.
- `Content-Type` on the markdown twins is whatever Pages decides. They stay fetchable and
  readable, just without an explicit `text/markdown`.

Both config files are kept because they are correct and make a move to Vercel or Netlify a
single import. They are inactive while Pages is the host. If those headers start to matter,
that is the reason to move.

Pages limits: 1 GB per site, 100 GB/month soft bandwidth. This site is about 12 MB.

---

## Step 3 — Once it is live

- [ ] **Google Search Console** — add `https://mkelango.com` as a domain property, verify by
      DNS TXT, submit `https://mkelango.com/sitemap.xml`
- [ ] **Bing Webmaster Tools** — same, and import from Search Console
- [ ] **Rich Results Test** on one page of each kind: a programme (`Course`), an event
      (`BusinessEvent`), a book (`Book`), a diagnostic (`WebApplication`), an essay (`Article`)
- [ ] **Schema Markup Validator** on the homepage — confirm the entity graph resolves with no
      unlinked nodes
- [ ] **Open Graph** — homepage and one book page through the Facebook Sharing Debugger and
      the X Card Validator
- [ ] **Lighthouse / PageSpeed** against the live origin
- [ ] **Analytics** — pick something privacy-preserving. `/privacy/` promises no cross-site
      tracking and no advertising pixels; Google Analytics would make that untrue. Plausible
      or Fathom keep the promise.
- [ ] **Forms** — still unwired. Every submit shows an honest "not connected" notice rather
      than failing silently. Connect: contact, programme applications, coaching applications,
      event registration, newsletter, corrections.
- [ ] **Payments** — Razorpay + Stripe for `/shop/`. When live, change the shop `Offer`
      availability in [`src/seo.js`](src/seo.js) from `PreOrder` to `InStock`.

## One thing to change soon

`BUILD_DATE` in [`src/seo.js`](src/seo.js) is a single site-wide as-at date (`2026-08-26`). It
feeds `datePublished`, `dateModified` and the sitemap's `lastmod` on every page. Honest for a
launch where everything ships at once; once you publish on a cadence it needs to become a
per-page date, or `dateModified` starts telling crawlers something untrue — exactly the
failure this site is built to avoid.
