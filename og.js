#!/usr/bin/env node
/* ============================================================================
   Open Graph card generator.

   Renders one 1200×630 PNG per route using the site's own design system and
   the real Outfit typeface, via headless Chrome. Run after `node build.js`:

       node og.js

   Output: dist/assets/og/<slug>.png  (referenced by og:image / twitter:image)
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
/* Written into assets/ (not dist/) so `node build.js` copies them through
   rather than wiping them. */
const OUT = path.join(ROOT, 'assets', 'og');
const TMP = path.join(ROOT, '.og-tmp');

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  process.env.CHROME_PATH
].find(p => p && fs.existsSync(p));

if (!CHROME) {
  console.error('✗ No Chrome/Chromium found. Set CHROME_PATH, or skip — the build still works,\n' +
                '  it just ships without social cards.');
  process.exit(1);
}

const routes = require('./src/routes');
const { site } = require('./src/data/site');
const { stack } = require('./src/data/stack');
const { diagnostics } = require('./src/data/diagnostics');

const slugFor = p => p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '-');

/* Section accent + label, so a card is recognisable before it is read. */
function accentFor(p) {
  const b = stack.find(x => '/books/' + x.slug + '/' === p);
  if (b) return { c: b.colour === '#F4F2EC' ? '#8E7130' : b.colour, k: b.altitude + ' · BOOK' };
  const d = diagnostics.find(x => '/diagnostics/' + x.slug + '/' === p);
  if (d) return { c: d.colour, k: 'FREE INSTRUMENT' };
  const first = p.split('/')[1] || '';
  const map = {
    '': { c: '#C8A24A', k: 'STRATEGIST · AUTHOR' },
    'about': { c: '#C8A24A', k: 'ABOUT' },
    'the-stack': { c: '#C8A24A', k: 'THE ELANGO STACK' },
    'the-portfolio': { c: '#2FA592', k: 'THE PORTFOLIO' },
    'speaking': { c: '#C8A24A', k: 'SPEAKING' },
    'press': { c: '#C8A24A', k: 'PRESS KIT' },
    'programs': { c: '#2FA592', k: 'PROGRAM' },
    'events': { c: '#C8A24A', k: 'EVENT' },
    'coaching': { c: '#8E7130', k: 'COACHING' },
    'diagnostics': { c: '#2FA592', k: 'FREE INSTRUMENT' },
    'ideas': { c: '#5B8DEF', k: 'ESSAY' },
    'show': { c: '#5B8DEF', k: 'THE INEVITABLE' },
    'evidence': { c: '#B4472E', k: 'THE EVIDENCE LOG' },
    'ta': { c: '#8E7130', k: 'தமிழ்' },
    'newsletter': { c: '#C8A24A', k: 'THE INEVITABLE, WEEKLY' },
    'explore': { c: '#2FA592', k: 'EXPLORE' },
    'books': { c: '#C8A24A', k: 'BOOKS' },
    'shop': { c: '#C8A24A', k: 'SHOP' },
    'contact': { c: '#C8A24A', k: 'START A CONVERSATION' },
    'privacy': { c: '#8E7130', k: 'PRIVACY' },
    'terms': { c: '#8E7130', k: 'TERMS' }
  };
  return map[first] || { c: '#C8A24A', k: 'M. K. ELANGO' };
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Never cut a word in half on a social card. */
function trim(s, n) {
  s = String(s).trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—–-]$/, '') + '…';
}

function card({ title, sub, kicker, accent, isHome }) {
  const len = title.length;
  const size = isHome ? 96 : len > 58 ? 52 : len > 40 ? 62 : len > 26 ? 74 : 84;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..800&family=Catamaran:wght@400;600;800&display=block" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{
    background:#0B0E14; color:#F4F2EC;
    font-family:Outfit,Catamaran,sans-serif; -webkit-font-smoothing:antialiased;
    position:relative; display:flex; flex-direction:column; justify-content:space-between;
    padding:64px 72px;
  }
  .field{position:absolute;inset:0;z-index:0;overflow:hidden}
  .field::before{content:"";position:absolute;width:640px;height:640px;border-radius:50%;
    top:-260px;right:-160px;filter:blur(110px);
    background:radial-gradient(circle, ${accent}38, transparent 66%)}
  .field::after{content:"";position:absolute;width:560px;height:560px;border-radius:50%;
    bottom:-300px;left:-180px;filter:blur(110px);
    background:radial-gradient(circle, rgba(31,122,108,.26), transparent 66%)}
  .grid{position:absolute;inset:0;z-index:0;
    background-image:linear-gradient(to right,rgba(244,242,236,.045) 1px,transparent 1px),
                     linear-gradient(to bottom,rgba(244,242,236,.045) 1px,transparent 1px);
    background-size:60px 60px;
    -webkit-mask-image:radial-gradient(ellipse 76% 62% at 46% 40%,#000 6%,transparent 76%)}
  .row{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:24px}
  .mark{display:flex;align-items:center;gap:14px}
  .glyph{width:44px;height:44px;border-radius:11px;display:grid;place-items:center;
    background:linear-gradient(150deg,#E2C377,#8E7130);color:#0B0E14;
    font-family:Catamaran,sans-serif;font-weight:800;font-size:24px;line-height:1;padding-bottom:3px}
  .wm{font-size:19px;font-weight:600;letter-spacing:.13em;text-transform:uppercase}
  .k{font-size:15px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${accent};
     display:flex;align-items:center;gap:11px}
  .k::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor;
    box-shadow:0 0 0 5px ${accent}22}
  .body{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;justify-content:center;padding:26px 0}
  h1{font-size:${size}px;font-weight:${isHome ? 250 : 275};letter-spacing:-.038em;line-height:1.02;
     max-width:${isHome ? '15ch' : '19ch'};text-wrap:balance}
  h1 em{font-style:normal;font-weight:200;color:${accent}}
  .sub{margin-top:24px;font-size:23px;line-height:1.5;color:rgba(244,242,236,.6);max-width:52ch;
    letter-spacing:-.008em;font-weight:300}
  .rule{position:relative;z-index:1;height:2px;width:100%;
    background:linear-gradient(90deg,${accent},rgba(244,242,236,.08) 55%,transparent)}
  .foot{font-size:16px;letter-spacing:.02em;color:rgba(244,242,236,.5);font-weight:400}
  .foot b{color:rgba(244,242,236,.82);font-weight:500}
</style></head><body>
<div class="field"></div><div class="grid"></div>
<div class="row">
  <div class="mark"><div class="glyph">உ</div><div class="wm">M. K. Elango</div></div>
  <div class="k">${esc(kicker)}</div>
</div>
<div class="body">
  <h1>${title}</h1>
  ${sub ? `<p class="sub">${esc(sub)}</p>` : ''}
</div>
<div class="rule"></div>
<div class="row" style="margin-top:22px">
  <div class="foot"><b>${isHome ? 'Five books · Six free instruments' : 'Make the impossible inevitable.'}</b></div>
  <div class="foot">${site.domain}</div>
</div>
</body></html>`;
}

/* ---------------------------------------------------------------- render */

fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const seoMeta = (() => { try { return require('./src/seo-meta'); } catch { return {}; } })();

/* `node og.js --only home,about` re-renders a subset. */
const onlyArg = (process.argv.find(a => a.startsWith('--only=')) || '').split('=')[1];
const only = onlyArg ? new Set(onlyArg.split(',')) : null;

fs.mkdirSync(path.join(ROOT, 'assets', 'img'), { recursive: true });
const jobs = routes.filter(r => !only || only.has(slugFor(r.path))).map(r => {
  const a = accentFor(r.path);
  const isHome = r.path === '/';
  const m = seoMeta[r.path] || {};
  const title = isHome
    ? 'Make the impossible <em>inevitable.</em>'
    : esc(m.title || r.title);
  const sub = isHome
    ? 'Structure, not motivation. Five systems that turn an impossible objective into a schedule.'
    : trim(m.description || r.desc || '', 165);
  const slug = slugFor(r.path);
  fs.writeFileSync(path.join(TMP, slug + '.html'),
    card({ title, sub, kicker: a.k, accent: a.c, isHome }));
  return slug;
});

/* The Organization logo, as a raster. mark.svg renders its glyph as live text
   in a webfont, which is fine in a browser and unreliable everywhere else. */
if (!only) {
  fs.writeFileSync(path.join(TMP, '__logo.html'), `<!doctype html><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@800&display=block" rel="stylesheet">
<style>*{margin:0;padding:0}html,body{width:512px;height:512px;overflow:hidden}
body{display:grid;place-items:center;background:#0B0E14}
.g{width:448px;height:448px;border-radius:96px;display:grid;place-items:center;
   background:linear-gradient(150deg,#E2C377,#8E7130);color:#0B0E14;
   font-family:Catamaran,sans-serif;font-weight:800;font-size:272px;line-height:1;padding-bottom:26px}
</style><div class="g">உ</div>`);
  try {
    execFileSync(CHROME, ['--headless=new','--disable-gpu','--hide-scrollbars',
      '--force-device-scale-factor=1','--window-size=512,512','--virtual-time-budget=4000',
      `--screenshot=${path.join(ROOT, 'assets', 'img', 'logo-512.png')}`,
      'file://' + path.join(TMP, '__logo.html')], { stdio: 'ignore' });
    console.log('✓ logo → assets/img/logo-512.png');
  } catch (e) { console.log('✗ logo render failed'); }
}

console.log(`rendering ${jobs.length} Open Graph cards …`);

let done = 0, failed = [];
for (const slug of jobs) {
  const out = path.join(OUT, slug + '.png');
  try {
    execFileSync(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars',
      '--force-device-scale-factor=1', '--window-size=1200,630',
      '--virtual-time-budget=4000',
      `--screenshot=${out}`,
      'file://' + path.join(TMP, slug + '.html')
    ], { stdio: 'ignore' });
    if (fs.existsSync(out)) done++; else failed.push(slug);
  } catch (e) { failed.push(slug); }
  if (done % 10 === 0 && done) process.stdout.write(`  ${done}/${jobs.length}\r`);
}

fs.rmSync(TMP, { recursive: true, force: true });

const bytes = fs.readdirSync(OUT).reduce((a, f) => a + fs.statSync(path.join(OUT, f)).size, 0);
console.log(`✓ ${done} cards → assets/og/  (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
console.log('  run `node build.js` to copy them into dist/');
if (failed.length) console.log(`✗ failed: ${failed.join(', ')}`);
