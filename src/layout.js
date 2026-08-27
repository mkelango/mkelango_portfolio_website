/* The shell — head, header, drawer, footer. Rendered identically on every page. */

const { site, nav, footerCols } = require('./data/site');
const { icon, esc, btn, kicker, honeypot } = require('./kit');
const SEO = require('./seo');
const { backend } = require('./data/backend');
const K = require('./kit');

/* --------------------------------------------------------------- AEO WIRING */
/* The answer block and the FAQ are injected structurally rather than hand-placed
   in thirty page modules: the answer sits directly under the hero, the FAQ sits
   directly above the closing band. Both are also mirrored into JSON-LD. */

function injectAEO(content, seo, path) {
  let out = content;

  if (seo.answer) {
    const block = `
<section class="band band--tight band--flush-t on-ink aeo">
  <div class="wrap wrap--wide">
    ${K.answerBlock({ a: seo.answer, updated: SEO.BUILD_DATE })}
  </div>
</section>`;
    const i = out.indexOf('</section>');
    if (i > -1) out = out.slice(0, i + 10) + block + out.slice(i + 10);
    else out = block + out;
  }

  if (seo.faqs && seo.faqs.length >= 2) {
    /* The heading names the page's subject — 57 identical H2s would be a
       duplication signal, and a generic one answers nothing. */
    const subject = seo.primaryEntity && seo.primaryEntity !== 'M. K. Elango'
      ? seo.primaryEntity : 'this';
    const faq = K.faqSection(seo.faqs, {
      heading: subject === 'this'
        ? 'Questions people actually ask'
        : `Questions about ${subject}`
    });
    /* Above the closing band if there is one, otherwise at the end. */
    const m = [...out.matchAll(/<section class="band[^"]*closing[^"]*"/g)];
    if (m.length) {
      const at = m[m.length - 1].index;
      out = out.slice(0, at) + faq + '\n' + out.slice(at);
    } else {
      out += faq;
    }
  }
  return out;
}

/* ----------------------------------------------------------------- HEADER */

function isActive(item, path) {
  if (path === item.href) return true;
  const seg = item.href.split('/')[1];
  if (!seg) return false;
  const extra = { About: ['about', 'the-stack', 'the-portfolio', 'speaking', 'press'],
                  Explore: ['explore', 'diagnostics', 'ideas', 'show', 'evidence', 'ta', 'newsletter'],
                  Shop: ['shop', 'books'] }[item.label];
  const first = path.split('/')[1];
  return extra ? extra.includes(first) : first === seg;
}

function header(path) {
  const items = nav.map(item => {
    const active = isActive(item, path);
    return `<div class="nav__item">
      <a class="nav__link" href="${item.href}" ${active ? 'aria-current="page"' : ''}>${item.label}${item.children ? `<span class="nav__car">${icon.car}</span>` : ''}</a>
      ${item.children ? `<div class="mega">
        ${item.children.map((c, i) => `<a class="mega__l" href="${c.href}">
          <span class="idx">${String(i + 1).padStart(2, '0')}</span>
          <span class="mega__t">${c.label}</span>
          <span class="mega__d">${c.desc}</span>
        </a>`).join('')}
      </div>` : ''}
    </div>`;
  }).join('');

  return `<div class="sprog" aria-hidden="true"></div>

<aside class="ann" aria-label="Announcement">
  <span class="ann__dot" aria-hidden="true"></span>
  <span>${site.announce.text} <a href="${site.announce.link.href}">${site.announce.link.label}</a></span>
</aside>

<header class="hdr">
  <div class="hdr__in">
    <a class="mark" href="/" aria-label="M. K. Elango — home">
      <span class="mark__glyph" aria-hidden="true">உ</span>
      <span class="mark__txt"><b>M. K. ELANGO</b></span>
    </a>
    <nav class="nav" aria-label="Primary">${items}</nav>
    <div class="hdr__cta">
      <a class="btn btn--ghost btn--sm" href="${site.ctaFree.href}">${site.ctaFree.label}</a>
      <a class="btn btn--brass btn--sm" href="${site.ctaHigh.href}">${site.ctaHigh.label}</a>
      <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="drawer">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<nav class="drawer" id="drawer" aria-label="Mobile menu">
  ${nav.map(item => `<div class="drawer__grp">
    <button class="drawer__hd" aria-expanded="false">${item.label} ${icon.car}</button>
    <div class="drawer__pn"><div>
      <a class="drawer__l" href="${item.href}">Overview</a>
      ${(item.children || []).map(c => `<a class="drawer__l" href="${c.href}">${c.label}</a>`).join('')}
    </div></div>
  </div>`).join('')}
  <div class="drawer__foot">
    <a class="btn btn--ghost btn--block" href="${site.ctaFree.href}">${site.ctaFree.label}</a>
    <a class="btn btn--brass btn--block" href="${site.ctaHigh.href}">${site.ctaHigh.label}</a>
  </div>
</nav>`;
}

/* ----------------------------------------------------------------- FOOTER */

function footer() {
  return `<footer class="ftr" aria-label="Site footer">
  <div class="wrap wrap--wide">
    <div class="ftr__top">
      <div>
        <a class="mark" href="/" aria-label="M. K. Elango — home">
          <span class="mark__glyph" aria-hidden="true">உ</span>
          <span class="mark__txt"><b>M. K. ELANGO</b></span>
        </a>
        <p class="d3" style="margin-top:1.5rem;max-width:14ch">Make the impossible inevitable.</p>
        <p class="sm mute" style="margin-top:1rem;max-width:34ch">${site.lines.reject}</p>

        <div style="margin-top:2rem">
          <h2 class="ftr-h">The Inevitable, weekly</h2>
          <p class="sm mute" style="max-width:34ch;margin-bottom:.9rem">One structural idea, every Tuesday. No motivation. No news roundup.</p>
          <form class="sub" data-form="subscribe" data-ref="footer">
            <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
            <button class="btn btn--brass btn--sm" type="submit">Subscribe</button>
          ${honeypot()}
          </form>
        </div>
      </div>

      <div class="ftr__cols">
        ${footerCols.map(col => `<div>
          <h2 class="ftr-h">${col.title}</h2>
          ${col.links.map(l => `<a class="ftr__l" href="${l.href}">${l.label}</a>`).join('')}
        </div>`).join('')}
      </div>
    </div>

    <div class="ftr__bot">
      <p class="xs faint" style="max-width:52ch">
        © <span data-year>2026</span> M. K. Elango. Every figure on this site carries a grade and a date —
        <a href="/evidence/" style="color:inherit;border-bottom:1px solid currentColor">read the standard</a>.
      </p>
      <nav class="flex ac wrapf gap" aria-label="Legal">
        <a class="xs faint" href="/contact/">Contact</a>
        <a class="xs faint" href="/press/">Media enquiries</a>
        <a class="xs faint" href="/the-portfolio/">The Portfolio</a>
        <a class="xs faint" href="/privacy/">Privacy</a>
        <a class="xs faint" href="/terms/">Terms</a>
      </nav>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------------------------- PAGE */

/* Title composition. The bare title is authored for search; branding is appended
   here so no page module can forget it and no title can double-brand. */
function composeTitle(title, path) {
  if (path === '/') return `${site.name} — ${site.verb}`;
  const t = String(title).trim();
  if (t.toLowerCase().includes('elango')) return t;
  return `${t} · ${site.name}`;
}

function page({
  title, desc, path, content, bodyClass = '', ogType = 'website',
  seo = {}, schema = [], crumbs = null, lang, dateModified, articleMeta, noindex = false
}) {
  const full = composeTitle(seo.title || title, path);
  const description = seo.description || desc;
  const htmlLang = lang || (path === '/ta/' ? 'ta-IN' : 'en-IN');
  const og = SEO.ogImageURL(path);
  const body = injectAEO(content, seo, path);

  /* The @graph: shared entity nodes first, then whatever this page type adds. */
  const graph = [
    SEO.personNode(),
    SEO.orgNode(),
    ...SEO.ventureNodes(),
    SEO.websiteNode(),
    /* The page node carries its own specific type (ProfilePage, ContactPage …)
       rather than a second node claiming the same URL. */
    SEO.webPageNode({ path, title: full, description, crumbs, seo, dateModified,
                      type: seo.pageType || 'WebPage' }),
    SEO.breadcrumbNode(path, crumbs),
    SEO.faqNode(path, seo.faqs),
    ...(Array.isArray(schema) ? schema : [schema])
  ];

  return `<!doctype html>
<html lang="${htmlLang}">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.add('js')</script>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">

<!-- Indexing: allow full snippets so answer engines can quote enough to be useful. -->
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'}">
${noindex ? '' : '<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large">'}
<link rel="canonical" href="${SEO.ORIGIN}${path}">
${seo.keywords && seo.keywords.length ? `<meta name="keywords" content="${esc(seo.keywords.join(', '))}">` : ''}
<meta name="author" content="${esc(site.name)}">
<meta name="theme-color" content="#0B0E14">
<meta name="format-detection" content="telephone=no">

<!-- Alternate representations. The markdown twin is for machine readers. -->
<link rel="alternate" type="text/markdown" href="${SEO.ORIGIN}${path}index.md" title="Markdown">
<link rel="alternate" type="application/rss+xml" href="${SEO.ORIGIN}/feed.xml" title="Ideas — M. K. Elango">

<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SEO.ORIGIN}${path}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(seo.title || title)} — ${esc(site.name)}">
<meta property="og:locale" content="${path === '/ta/' ? 'ta_IN' : 'en_IN'}">
${path !== '/ta/' ? '<meta property="og:locale:alternate" content="ta_IN">' : '<meta property="og:locale:alternate" content="en_IN">'}
${articleMeta ? `<meta property="article:published_time" content="${articleMeta.published}">
<meta property="article:author" content="${SEO.ORIGIN}/about/">
<meta property="article:section" content="${esc(articleMeta.section)}">` : ''}

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(full)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
<meta name="twitter:image:alt" content="${esc(seo.title || title)}">

<link rel="icon" href="/assets/img/mark.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/mark.svg">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Fonts load async so a third-party host never blocks first paint.
     display=swap means text is readable immediately in the fallback stack. -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..800&family=Catamaran:wght@400;600;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..800&family=Catamaran:wght@400;600;800&display=swap"></noscript>
<link rel="stylesheet" href="/assets/css/site.css">

${SEO.jsonLd(graph)}
</head>
<body class="${bodyClass}" data-sb-url="${backend.enabled ? backend.url : ''}" data-sb-key="${backend.enabled ? backend.anonKey : ''}">
<a href="#main" class="sr">Skip to content</a>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/site.js" defer></script>
</body>
</html>`;
}

module.exports = { page, header, footer };
