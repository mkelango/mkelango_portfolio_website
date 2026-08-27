#!/usr/bin/env node
/* ============================================================================
   Static site generator
   Zero dependencies. `node build.js` writes the whole site to /dist.
   Clean URLs: every route becomes <route>/index.html.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');

/* Clear the require cache so `--watch` picks up data edits. */
function fresh(p) { delete require.cache[require.resolve(p)]; return require(p); }

function write(route, html) {
  const dir = route === '/' ? OUT : path.join(OUT, route.replace(/^\/|\/$/g, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

function build() {
  const t0 = Date.now();
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  /* ---- fresh modules ---- */
  Object.keys(require.cache).forEach(k => { if (k.startsWith(path.join(ROOT, 'src'))) delete require.cache[k]; });

  const { page } = require('./src/layout');
  const routes = require('./src/routes');

  let n = 0; const skipped = [];
  for (const r of routes) {
    let content;
    try { content = r.render(); }
    catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') { skipped.push(r.path); continue; }
      throw new Error(`${r.path} → ${e.message}`);
    }
    write(r.path, page({
      title: r.title, desc: r.desc, path: r.path,
      content, bodyClass: r.bodyClass || '', ogType: r.ogType,
      seo: r.seo || {}, schema: r.schema || [], crumbs: r.crumbs || null,
      articleMeta: r.articleMeta || null, dateModified: r.dateModified
    }));
    n++;
  }
  if (skipped.length) console.log(`  … ${skipped.length} route(s) awaiting a page module: ${skipped.slice(0, 6).join(' ')}${skipped.length > 6 ? ' …' : ''}`);

  /* ---- assets ---- */
  copyDir(path.join(ROOT, 'assets'), path.join(OUT, 'assets'));

  /* ---- favicon mark ---- */
  fs.mkdirSync(path.join(OUT, 'assets/img'), { recursive: true });
  fs.writeFileSync(path.join(OUT, 'assets/img/mark.svg'),
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="#0B0E14"/>
<rect x="4" y="4" width="56" height="56" rx="11" fill="url(#g)"/>
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#E2C377"/><stop offset="1" stop-color="#8E7130"/></linearGradient></defs>
<text x="32" y="45" text-anchor="middle" font-family="Catamaran, sans-serif" font-weight="800" font-size="34" fill="#0B0E14">உ</text>
</svg>`);

  /* ---- machine-readable surface: markdown twins, llms.txt, feeds ---- */
  const G = require('./src/generate');
  const SEO = require('./src/seo');
  const seoMeta = require('./src/seo-meta');

  const mdPages = [];
  for (const r of routes) {
    const dir = r.path === '/' ? OUT : path.join(OUT, r.path.replace(/^\/|\/$/g, ''));
    const file = path.join(dir, 'index.html');
    if (!fs.existsSync(file)) continue;
    const meta = seoMeta[r.path] || {};
    const md = G.htmlToMarkdown(fs.readFileSync(file, 'utf8'), {
      title: meta.title || r.title,
      url: SEO.ORIGIN + r.path,
      description: meta.description || r.desc
    });
    fs.writeFileSync(path.join(dir, 'index.md'), md);
    mdPages.push({ url: SEO.ORIGIN + r.path, md });
  }

  fs.writeFileSync(path.join(OUT, 'robots.txt'), G.robots());
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), G.sitemap(routes));
  fs.writeFileSync(path.join(OUT, 'llms.txt'), G.llms(routes, seoMeta));
  fs.writeFileSync(path.join(OUT, 'llms-full.txt'), G.llmsFull(mdPages));
  fs.writeFileSync(path.join(OUT, 'feed.xml'), G.feed());
  fs.writeFileSync(path.join(OUT, 'site.webmanifest'), G.manifest());

  /* GitHub Pages: CNAME binds the custom domain to the deployment, and
     .nojekyll stops Jekyll from touching the output. Both are derived, so the
     domain can never drift between the schema and the host binding. */
  fs.writeFileSync(path.join(OUT, 'CNAME'), SEO.ORIGIN.replace('https://', '') + '\n');
  fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

  /* ---- 404 ---- */
  write('/404', page({
    noindex: true,
    title: 'Page not found', desc: `That page does not exist on ${SEO.ORIGIN.replace('https://', '')}.`, path: '/404/',
    seo: { title: 'Page not found', description: 'That page does not exist. Try the stack, the six free instruments, or the events calendar.' },
    content: `<section class="band on-ink" style="min-height:62vh;display:grid;place-items:center">
      <div class="wrap tc">
        <span class="kicker kicker--plain">404</span>
        <h1 class="d1" style="margin-top:1rem">That page does not exist.</h1>
        <p class="lede mx-auto" style="margin-top:1.25rem;max-width:40ch">
          Which is at least honest. Try the stack, the instruments, or the calendar.</p>
        <div class="flex ac jc wrapf gap-sm mt">
          <a class="btn btn--brass" href="/">Home</a>
          <a class="btn btn--ghost" href="/the-stack/">The Stack</a>
          <a class="btn btn--ghost" href="/diagnostics/">Instruments</a>
        </div>
      </div></section>`
  }));
  fs.copyFileSync(path.join(OUT, '404/index.html'), path.join(OUT, '404.html'));

  console.log(`✓ ${n + 1} pages + ${n} markdown twins + llms.txt/sitemap/feed → dist/  (${Date.now() - t0}ms)`);
  return n;
}

build();

if (process.argv.includes('--watch')) {
  console.log('  watching src/ and assets/ …');
  let t;
  for (const d of ['src', 'assets']) {
    fs.watch(path.join(ROOT, d), { recursive: true }, () => {
      clearTimeout(t);
      t = setTimeout(() => { try { build(); } catch (e) { console.error('✗', e.message); } }, 90);
    });
  }
}
