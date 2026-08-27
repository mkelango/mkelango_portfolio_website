# Deploying mkelango.com

The repository is at **github.com/mkelango/mkelango_portfolio_website** and builds clean on
every push (`.github/workflows/check.yml`).

Two steps remain, and both need someone signed in to an account — they cannot be done from
the repository:

1. **Connect the repo to a host** (Vercel, below — Netlify config is also included)
2. **Point mkelango.com at it** (DNS, currently parked at Hostinger)

---

## State of the domain, as at 27 August 2026

| | |
|---|---|
| `mkelango.com` A record | `2.57.91.91` (Hostinger) |
| Nameservers | `hermes.dns-parking.com`, `artemis.dns-parking.com` (Hostinger) |
| `www` | CNAME → `mkelango.com` |
| What is served | A Hostinger **parked-domain placeholder**, marked `noindex, nofollow` |

**Nothing of value is live there.** Repointing the domain replaces a placeholder page, not a
working site. No content is at risk.

---

## Step 1 — Connect the repository to Vercel

1. Sign in at **vercel.com** with the GitHub account `mkelango`.
2. **Add New → Project → Import** `mkelango/mkelango_portfolio_website`.
3. Change nothing on the configuration screen. `vercel.json` already declares:
   - Framework: none
   - Build command: `node build.js`
   - Output directory: `dist`
   - Install command: none (the project has no dependencies)
4. **Deploy.** It takes well under a minute — there is nothing to install and the build is
   about 130 ms.

You will get a `*.vercel.app` URL. Check it before touching DNS: the homepage, one programme
page, one diagnostic (run it end to end), and `/llms.txt`.

> The 57 Open Graph cards are committed to the repository on purpose. They are rendered by
> headless Chrome, which is not available on a build server, so `og.js` must be run locally
> and the PNGs committed. `npm run release` does that in the right order.

---

## Step 2 — Point the domain at it

### 2a. Add the domain in Vercel

Project → **Settings → Domains** → add both:

- `mkelango.com`  ← **set this as the primary domain**
- `www.mkelango.com` ← let Vercel redirect it to the apex

The apex must be primary. Every canonical URL the site emits is `https://mkelango.com/…`
with no `www`, so making `www` primary would put the canonical and the served host in
disagreement on all 58 pages.

Vercel will then display the exact DNS records to create. **Use the values it shows you** —
they vary by account and region, and they have changed more than once. They will look like:

- an **A** record on the apex pointing at a Vercel IP
- a **CNAME** on `www` pointing at `cname.vercel-dns.com`

### 2b. Create those records at Hostinger

Sign in to Hostinger → **Domains → mkelango.com → DNS / Name Servers**.

Keep Hostinger's nameservers. Then:

1. **Delete** the existing `A` record for `@` that points at `2.57.91.91` — that is the
   parking page, and leaving it in place means the domain will resolve to the placeholder
   roughly half the time.
2. **Add** the `A` record Vercel gave you, host `@`.
3. **Replace** the `www` CNAME with the one Vercel gave you (`cname.vercel-dns.com`).
4. Leave `MX` and any `TXT` records alone — those are email and verification, and removing
   them will break mail.

Propagation is usually minutes; allow up to a few hours. Vercel issues the TLS certificate
automatically once the records resolve.

> **Alternative:** you can instead move the nameservers to Vercel and let it manage DNS. It is
> tidier long-term, but it moves *all* records — including mail. Only do that if you know what
> is currently in the zone.

### 2c. Verify

```bash
dig +short A mkelango.com          # should be the Vercel IP, not 2.57.91.91
dig +short CNAME www.mkelango.com  # should be cname.vercel-dns.com
curl -sSI https://mkelango.com | head -3
curl -sSI https://www.mkelango.com | grep -i location   # should 301 to the apex
curl -sS https://mkelango.com/llms.txt | head -3
```

---

## Step 3 — Once it is live

- [ ] **Google Search Console** — add `https://mkelango.com` as a domain property, verify by
      DNS TXT, submit `https://mkelango.com/sitemap.xml`
- [ ] **Bing Webmaster Tools** — same, and import from Search Console to save time
- [ ] **Rich Results Test** on one page of each kind: a programme (`Course`), an event
      (`BusinessEvent`), a book (`Book`), a diagnostic (`WebApplication`), an essay (`Article`)
- [ ] **Schema Markup Validator** (validator.schema.org) on the homepage — confirm the entity
      graph resolves with no unlinked nodes
- [ ] **Open Graph** — run the homepage and one book page through the Facebook Sharing
      Debugger and the X Card Validator
- [ ] **Lighthouse / PageSpeed** against the live origin, then watch field Core Web Vitals in
      Search Console once data accumulates
- [ ] **Analytics** — pick something privacy-preserving. `/privacy/` currently promises no
      cross-site tracking and no advertising pixels; Google Analytics would make that untrue.
      Vercel Analytics or Plausible both keep the promise.
- [ ] **Forms** — still unwired. Every submit shows an honest "not connected" notice rather
      than failing silently. Connect: contact, programme applications, coaching applications,
      event registration, newsletter, corrections.
- [ ] **Payments** — Razorpay (domestic) + Stripe (international) for `/shop/`. When they go
      live, change the shop `Offer` availability in `src/seo.js` from `PreOrder` to `InStock`.

---

## Publishing changes after launch

```bash
npm run release     # og cards → build → validate
git add -A && git commit -m "…" && git push
```

Vercel deploys on push to `main`. The GitHub Action runs the same validator, so a broken link,
a duplicate title or invalid JSON-LD fails before it reaches the domain.

Run `npm run og` only when a page title or description changes — it needs Chrome locally and
takes about ninety seconds for all 57 cards. `npm run og -- --only=home,about` re-renders a
subset.

## One thing to change soon

`BUILD_DATE` in [`src/seo.js`](src/seo.js) is a single site-wide as-at date (`2026-08-26`). It
feeds `datePublished`, `dateModified` and the sitemap's `lastmod` on every page. That is honest
for a launch where everything genuinely ships at once, but once you are publishing on a
cadence it should become a per-page date — otherwise `dateModified` starts telling crawlers
something that is not true, which is exactly the failure mode this site is built to avoid.
