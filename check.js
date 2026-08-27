#!/usr/bin/env node
/* ============================================================================
   Build validator — structure, accessibility, SEO, AEO and GEO.
   Run: node check.js   (or `npm run check`, which builds first)
   Exit code 1 if any ERROR-level finding is present.
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'dist');

const errors = [];
const warns = [];
const err = (scope, msg) => errors.push(`${scope}  ${msg}`);
const warn = (scope, msg) => warns.push(`${scope}  ${msg}`);

/* ------------------------------------------------------------- inventory */

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p) : files.push(p);
  }
})(OUT);

const pages = files.filter(f => f.endsWith('.html'));
const rel = f => '/' + path.relative(OUT, f).replace(/\\/g, '/');

/* Everything that can legitimately be linked: routes and real files. */
const exists = new Set();
for (const f of files) {
  const r = rel(f);
  exists.add(r);
  if (r.endsWith('/index.html')) exists.add(r.replace(/index\.html$/, ''));
}
exists.add('/');

/* ------------------------------------------------------------- per page */

const titles = new Map();
const descs = new Map();
let linkCount = 0;

for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  const route = rel(f).replace(/index\.html$/, '');
  const S = route;
  const isAlias = route === '/404.html';

  /* ---- links ---- */
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const h = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(h)) continue;
    const clean = h.split('#')[0].split('?')[0];
    if (!clean) continue;
    linkCount++;
    if (!exists.has(clean)) err(S, `broken link → ${h}`);
  }

  /* ---- structure / a11y ---- */
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1s === 0) err(S, 'no <h1>');
  if (h1s > 1) err(S, `${h1s} <h1> elements (must be exactly one)`);

  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map(m => +m[1]);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      warn(S, `heading level skips h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const dup = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
  if (dup.length) err(S, `duplicate id(s): ${dup.join(', ')}`);

  for (const _ of html.matchAll(/<img (?![^>]*alt=)[^>]*>/g)) err(S, 'img without alt');
  for (const _ of html.matchAll(/<input (?![^>]*(?:aria-label|id=))[^>]*>/g)) err(S, 'unlabelled input');
  if (!/lang="/.test(html)) err(S, 'no lang attribute');
  if (/undefined|\[object Object\]|NaN|\$\{/.test(html.replace(/\\u003c/g, ''))) {
    if (/>undefined<|>\[object Object\]<|>NaN</.test(html)) err(S, 'template artefact in output');
  }

  /* ---- SEO ---- */
  const title = (/<title>([\s\S]*?)<\/title>/.exec(html) || [])[1] || '';
  if (!title) err(S, 'no <title>');
  if (title.length > 65) warn(S, `title ${title.length} chars (>65 truncates in SERP): "${title}"`);
  if (!isAlias) {
    if (titles.has(title)) err(S, `duplicate title, also on ${titles.get(title)}`);
    titles.set(title, S);
  }

  const desc = (/<meta name="description" content="([^"]*)"/.exec(html) || [])[1] || '';
  if (!desc) err(S, 'no meta description');
  else {
    if (desc.length < 70) warn(S, `description only ${desc.length} chars`);
    if (desc.length > 165) warn(S, `description ${desc.length} chars (>165 truncates)`);
    if (!isAlias) {
      if (descs.has(desc)) err(S, `duplicate description, also on ${descs.get(desc)}`);
      descs.set(desc, S);
    }
  }

  if (!/rel="canonical"/.test(html)) err(S, 'no canonical');
  if (!/property="og:image"/.test(html)) err(S, 'no og:image');
  if (!/property="og:title"/.test(html)) err(S, 'no og:title');
  if (!/name="twitter:card"/.test(html)) err(S, 'no twitter:card');
  if (!/name="robots"/.test(html)) warn(S, 'no robots meta');

  /* ---- structured data ---- */
  const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html);
  if (!ld) err(S, 'no JSON-LD');
  else {
    try {
      const data = JSON.parse(ld[1].replace(/\\u003c/g, '<'));
      const graph = data['@graph'] || [];
      if (!graph.length) err(S, 'empty JSON-LD graph');
      const types = graph.flatMap(n => [].concat(n['@type'] || []));
      for (const req of ['Person', 'WebSite']) {
        if (!types.includes(req)) err(S, `JSON-LD missing ${req}`);
      }
      /* Any WebPage subtype satisfies the page-node requirement. */
      const PAGE_TYPES = ['WebPage', 'CollectionPage', 'ProfilePage', 'ContactPage',
                          'AboutPage', 'ItemPage', 'FAQPage', 'CheckoutPage'];
      if (!types.some(t => PAGE_TYPES.includes(t))) err(S, 'JSON-LD has no page node');
      /* Every internal @id reference must resolve inside the graph. */
      const ids = new Set(graph.map(n => n['@id']).filter(Boolean));
      const refs = [];
      (function walk(v) {
        if (Array.isArray(v)) return v.forEach(walk);
        if (v && typeof v === 'object') {
          const keys = Object.keys(v);
          if (keys.length === 1 && keys[0] === '@id') refs.push(v['@id']);
          else keys.forEach(k => walk(v[k]));
        }
      })(graph);
      for (const r of new Set(refs)) {
        if (r.startsWith('https://mkelango.com') && !ids.has(r)) {
          err(S, `JSON-LD dangling @id reference: ${r}`);
        }
      }
      /* Every node with an @id must have a @type. */
      for (const n of graph) if (n['@id'] && !n['@type']) err(S, `JSON-LD node ${n['@id']} has no @type`);
      /* Breadcrumb positions must be sequential from 1. */
      const bc = graph.find(n => n['@type'] === 'BreadcrumbList');
      if (bc) {
        const pos = bc.itemListElement.map(x => x.position);
        if (pos.some((p, i) => p !== i + 1)) err(S, 'BreadcrumbList positions not sequential');
      }
      /* An emitted FAQPage must match visible FAQs. */
      const faq = graph.find(n => n['@type'] === 'FAQPage');
      const visible = [...html.matchAll(/class="faq__q"/g)].length;
      if (faq && faq.mainEntity.length !== visible) {
        err(S, `FAQPage has ${faq.mainEntity.length} questions but ${visible} are visible`);
      }
      if (visible && !faq) err(S, 'visible FAQ without FAQPage schema');
    } catch (e) { err(S, 'JSON-LD does not parse: ' + e.message); }
  }

  /* ---- AEO / GEO ---- */
  const mdTwin = path.join(path.dirname(f), 'index.md');
  if (f.endsWith('index.html') && !fs.existsSync(mdTwin) && route !== '/404/') {
    warn(S, 'no markdown twin');
  }
  const ogPng = path.join(OUT, 'assets/og',
    (route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '-')) + '.png');
  if (!fs.existsSync(ogPng) && route !== '/404/' && !isAlias) warn(S, 'og:image file missing on disk');
}

/* ------------------------------------------------------- site-level files */

const required = ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt',
                  '/feed.xml', '/site.webmanifest', '/404.html'];
for (const r of required) if (!exists.has(r)) err('SITE', `missing ${r}`);

if (exists.has('/sitemap.xml')) {
  const sm = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const routeSet = new Set(pages.filter(p => p.endsWith('index.html'))
    .map(p => 'https://mkelango.com' + rel(p).replace(/index\.html$/, '')));
  routeSet.delete('https://mkelango.com/404/');
  for (const l of locs) if (!routeSet.has(l)) err('SITEMAP', `lists a URL that is not built: ${l}`);
  for (const r of routeSet) if (!locs.includes(r)) warn('SITEMAP', `built page not in sitemap: ${r}`);
  if (!/<lastmod>/.test(sm)) warn('SITEMAP', 'no lastmod');
}

/* Every image a schema node points at must exist. A dangling logo or
   primaryImageOfPage is a silent rich-result failure. */
{
  const home = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');
  const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(home);
  if (ld) {
    const urls = new Set();
    (function walk(v) {
      if (Array.isArray(v)) return v.forEach(walk);
      if (v && typeof v === 'object') {
        for (const [k, x] of Object.entries(v)) {
          if ((k === 'url' || k === 'image' || k === 'logo') && typeof x === 'string'
              && /\.(png|jpg|jpeg|svg|webp)$/i.test(x)) urls.add(x);
          else walk(x);
        }
      }
    })(JSON.parse(ld[1].replace(/\\u003c/g, '<')));
    for (const u of urls) {
      const local = u.replace('https://mkelango.com', '');
      if (!exists.has(local)) err('SCHEMA', `image referenced but not built: ${u}`);
    }
  }
}

if (exists.has('/robots.txt')) {
  const rb = fs.readFileSync(path.join(OUT, 'robots.txt'), 'utf8');
  if (!/Sitemap:/.test(rb)) err('ROBOTS', 'no Sitemap directive');
  for (const ua of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'OAI-SearchBot']) {
    if (!rb.includes(ua)) warn('ROBOTS', `${ua} not named`);
  }
}

/* ------------------------------------------------------------------ report */

const htmlBytes = pages.reduce((a, p) => a + fs.statSync(p).size, 0);
const mdFiles = files.filter(f => f.endsWith('.md'));
const ogFiles = files.filter(f => f.includes('/assets/og/'));

console.log(`pages ${pages.length}   links ${linkCount}   markdown twins ${mdFiles.length}   og cards ${ogFiles.length}`);
console.log(`html ${(htmlBytes / 1024).toFixed(0)} KB total, ${(htmlBytes / pages.length / 1024).toFixed(1)} KB avg`);

if (errors.length) {
  console.log(`\n✗ ${errors.length} ERROR${errors.length > 1 ? 'S' : ''}`);
  errors.slice(0, 40).forEach(e => console.log('  ' + e));
  if (errors.length > 40) console.log(`  … and ${errors.length - 40} more`);
}
if (warns.length) {
  console.log(`\n! ${warns.length} warning${warns.length > 1 ? 's' : ''}`);
  const grouped = {};
  warns.forEach(w => {
    const key = w.replace(/^\S+\s+/, '').replace(/[:"].*$/, '').slice(0, 60);
    (grouped[key] = grouped[key] || []).push(w);
  });
  Object.entries(grouped).slice(0, 20).forEach(([k, v]) =>
    console.log(`  ${v.length}×  ${k}${v.length === 1 ? '' : ''}   e.g. ${v[0]}`));
}
if (!errors.length && !warns.length) console.log('\n✓ clean');
else if (!errors.length) console.log('\n✓ no errors');

process.exit(errors.length ? 1 : 0);
