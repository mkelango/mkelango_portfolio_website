/* Component kit — every reusable mark on the site is built here.
   Nothing is duplicated in a page module. */

const { site } = require('./data/site');

/* ------------------------------------------------------------------ ICONS */
const icon = {
  arr:  '<svg viewBox="0 0 14 12" fill="none" aria-hidden="true"><path d="M8 1l5 5-5 5M13 6H1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrL: '<svg viewBox="0 0 14 12" fill="none" aria-hidden="true"><path d="M6 1L1 6l5 5M1 6h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  car:  '<svg viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  dl:   '<svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1v9m0 0L3.5 6.5M7 10l3.5-3.5M1 12.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ext:  '<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 1h7v7M11 1L3 9M8 11H1V4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play: '<svg viewBox="0 0 12 14" fill="none" aria-hidden="true"><path d="M1 1.5v11l10-5.5L1 1.5z" fill="currentColor"/></svg>'
};

/* --------------------------------------------------------- EVIDENCE TAGS */
/* The component that makes this site unmistakable.                        */

const GRADE_DEF = {
  A: 'Verified — traced to a named primary source.',
  B: 'Claimed — reported credibly, not independently traceable.',
  C: 'Estimate — modelled or sampled. Method stated. A shape, not a number.'
};

/**
 * Inline evidence chip. Every published figure gets one. No exceptions.
 * @param {'A'|'B'|'C'} g grade
 * @param {string} note   what the figure is and where it came from
 * @param {string} asAt   as-at date
 */
function etag(g, note, asAt) {
  return `<span class="etag" data-g="${g}" tabindex="0" role="note" aria-label="Evidence grade ${g}. ${esc(note)}">` +
    `<span>[${g}]</span>` +
    `<span class="etag__pop"><b>Grade ${g} · ${GRADE_DEF[g].split(' — ')[0]}</b>${note}<em>As at ${asAt || site.asAt}</em></span>` +
  `</span>`;
}

/** A figure with its grade attached — the atomic unit of proof on this site. */
function figure({ n, dec, suffix = '', label, g, note, asAt }) {
  const num = String(n);
  return `<div class="stat">
    <p class="stat__n"><span data-count="${n}"${dec ? ` data-dec="${dec}"` : ''}>${num}</span>${suffix ? `<span>${suffix}</span>` : ''}${etag(g, note, asAt)}</p>
    <p class="stat__l">${label}</p>
  </div>`;
}

/* ------------------------------------------------------------- PRIMITIVES */

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const kicker = (t, cls = '') => `<span class="kicker ${cls}">${t}</span>`;

const btn = (label, href, cls = 'btn--brass', attrs = '') =>
  `<a class="btn ${cls}" href="${href}" ${attrs}>${label}</a>`;

const tlink = (label, href, attrs = '') =>
  `<a class="tlink" href="${href}" ${attrs}>${label}${icon.arr}</a>`;

const rule = (cls = '') => `<hr class="rule ${cls}">`;

/** A honeypot. Invisible and unreachable by keyboard; only a bot fills it.
    The database rejects any row where it is non-empty. */
let hpN = 0;
const honeypot = () => {
  const id = 'hp-' + (++hpN);
  return '<div class="hp-field" aria-hidden="true">' +
    `<label for="${id}">Leave this field empty</label>` +
    `<input type="text" name="hp" id="${id}" tabindex="-1" autocomplete="off"></div>`;
};

/** A machine-readable date. Display text stays human; the attribute is ISO. */
const time = (display, iso, cls = '') =>
  `<time${cls ? ` class="${cls}"` : ''}${iso ? ` datetime="${iso}"` : ''}>${display}</time>`;

/** Section head: headline left, lede right. The band grammar of the whole site. */
function shead({ k, h, lede, cta, center = false, tag = 'h2', hclass = 'd2' }) {
  return `<div class="shead ${center ? 'shead--center' : ''} rv">
    <div>
      ${k ? kicker(k, 'shead__k') : ''}
      <${tag} class="${hclass}">${h}</${tag}>
    </div>
    ${lede || cta ? `<div>${lede ? `<p class="lede lede--wide">${lede}</p>` : ''}${cta ? `<p class="mt-sm">${cta}</p>` : ''}</div>` : '<div></div>'}
  </div>`;
}

/** Breadcrumb trail. */
function crumb(items) {
  return `<nav class="crumb" aria-label="Breadcrumb">` +
    items.map((it, i) =>
      (i ? '<i></i>' : '') +
      (it.href ? `<a href="${it.href}">${it.label}</a>` : `<span aria-current="page">${it.label}</span>`)
    ).join('') + `</nav>`;
}

/** Mono field: label above value. A description list, so the label/value pairing
    is machine-readable — search engines and language models extract these directly. */
const field = (l, v) => `<div class="field"><dt class="field__l">${l}</dt><dd class="field__v">${v}</dd></div>`;
const fields = arr => `<dl class="fields">${arr.map(([l, v]) => field(l, v)).join('')}</dl>`;

/** Seat counter — plain text scarcity. Never a countdown. */
function seats({ total, open, year, note }) {
  if (total == null) return `<span class="seats">Open cohort${note ? ` · ${note}` : ''}</span>`;
  const slots = Math.min(total, 12);
  const lit = total ? Math.max(open > 0 ? 1 : 0, Math.round(open / total * slots)) : 0;
  const dots = Array.from({ length: slots }, (_, i) =>
    `<i class="${i < lit ? 'on' : ''}"></i>`).join('');
  return `<span class="seats"><span class="seats__dots">${dots}</span>
    <span>${total} seat${total === 1 ? '' : 's'} · <b>${open} open${year ? ` for ${year}` : ''}</b></span></span>`;
}

/** Ledger row — the audit-register list. Used everywhere a list must read as a record. */
function lrow({ n, title, desc, meta = [], href, right }) {
  const inner = `
    <span class="idx">${n}</span>
    <div>
      <p class="lrow__t">${title}</p>
      ${desc ? `<p class="lrow__d">${desc}</p>` : ''}
      ${meta.length ? `<div class="lrow__meta">${meta.map(m => `<span class="chip">${m}</span>`).join('')}</div>` : ''}
    </div>
    <div>${right || (href ? `<span class="stk__go">${icon.arr}</span>` : '')}</div>`;
  return href
    ? `<a class="lrow rv" href="${href}">${inner}</a>`
    : `<div class="lrow rv">${inner}</div>`;
}

/** Card. */
function card({ k, title, text, href, foot, media, tags, cls = '' }) {
  const inner = `
    ${media || ''}
    <div class="card__body">
      ${k ? kicker(k) : ''}
      <p class="card__ttl">${title}</p>
      ${text ? `<p class="card__txt">${text}</p>` : ''}
      ${foot ? `<div class="card__foot">${foot}</div>` : ''}
    </div>`;
  const attr = tags ? ` data-tags="${tags}"` : '';
  return href
    ? `<a class="card card--link ${cls}" href="${href}"${attr}>${inner}</a>`
    : `<div class="card ${cls}"${attr}>${inner}</div>`;
}

/** Horizontal rail with prev/next. */
function railX({ k, h, cta, items, id }) {
  return `<div data-rail${id ? ` id="${id}"` : ''}>
    <div class="rail-hd rv">
      <div>${k ? kicker(k, 'shead__k') : ''}<h2 class="d3">${h}</h2></div>
      <div class="flex ac gap">
        ${cta || ''}
        <div class="rail-nav">
          <button class="rail-btn" data-rail-prev aria-label="Previous">${icon.arrL}</button>
          <button class="rail-btn" data-rail-next aria-label="Next">${icon.arr}</button>
        </div>
      </div>
    </div>
    <div class="rail-x">${items.join('')}</div>
  </div>`;
}


/** Split a headline into 1–3 clipped lines for the .lines reveal. */
function headLines(title, { italicLast = false } = {}) {
  const w = title.split(' ');
  let lines;
  if (w.length <= 3) lines = [w];
  else if (w.length <= 5) { const h = Math.ceil(w.length / 2); lines = [w.slice(0, h), w.slice(h)]; }
  else { const t = Math.ceil(w.length / 3); lines = [w.slice(0, t), w.slice(t, t * 2), w.slice(t * 2)]; }
  /* Joined with a newline, not an empty string — otherwise a text extractor
     reads "Make theimpossible". */
  return lines.filter(l => l.length).map((l, i, a) =>
    `<span><span${italicLast && i === a.length - 1 ? ' class="d-it"' : ''}>${l.join(' ')}</span></span>`).join('\n');
}


/* ====================================================== AEO / GEO BLOCKS */
/*  Two components exist purely so that an answer engine or a language model
    can lift a correct, attributable passage without having to infer it from
    marketing prose. They are useful to human readers too, which is the test.  */

/**
 * The answer-first block. 40–60 words that define the page's subject in the
 * first sentence. Marked up as the speakable region and mirrored into
 * FAQPage/WebPage schema.
 */
function answerBlock({ q, a, updated, tag = 'In short' }) {
  if (!a) return '';
  return `<aside class="answer-block rv" aria-label="Summary answer">
    <div class="answer-block__k">
      <span class="kicker">${tag}</span>
      ${updated ? `<time class="mono faint" datetime="${updated}">Updated ${updated}</time>` : ''}
    </div>
    ${q ? `<p class="answer-block__q">${q}</p>` : ''}
    <p class="answer-block__a">${a}</p>
  </aside>`;
}

/** Visible FAQ. The schema is emitted separately by src/seo.js from the same data. */
function faqSection(faqs, { heading = 'Questions people actually ask', kicker: k = 'FAQ' } = {}) {
  if (!faqs || !faqs.length) return '';
  return `<section class="band on-paper" id="faq" aria-labelledby="faq-h">
    <div class="wrap wrap--wide">
      ${shead({ k, h: heading, tag: 'h2', hclass: 'd2',
        lede: 'Answered plainly, with the real figures. If something here is wrong, ' +
              '<a href="/evidence/">tell us and it goes in the log</a>.' }).replace('<h2 class="d2">', '<h2 class="d2" id="faq-h">')}
      <div class="faq" data-acc>
        ${faqs.map((f, i) => `<div class="faq__i${i === 0 ? ' is-on' : ''}" data-acc-item>
          <h3 class="faq__q">
            <button type="button" data-acc-hd id="faq-q${i}" aria-controls="faq-a${i}" aria-expanded="${i === 0 ? 'true' : 'false'}">
              <span>${f.q}</span>
              <span class="faq__ic" aria-hidden="true">${icon.car}</span>
            </button>
          </h3>
          <div class="faq__p" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}"><div><p class="faq__a">${f.a}</p></div></div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

/** A key-facts table. Highly extractable — LLMs quote these almost verbatim. */
function factTable(rows, { caption } = {}) {
  if (!rows || !rows.length) return '';
  return `<div class="tbl-scroll facts">
    <table class="tbl">
      ${caption ? `<caption class="sr">${caption}</caption>` : ''}
      <tbody>
        ${rows.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

/* ------------------------------------------------------- THE STACK LADDER */
/* The framework is the hero image. This is that component.                 */

function stackLadder(stack, { current, compact = false, linkBase = '/books/' } = {}) {
  return `<div class="stack ${compact ? 'stack--compact' : ''}" data-stagger="0.075">` + stack.map(b => {
    const soon = b.status === 'forthcoming';
    return `<a class="stk ${soon ? 'stk--soon' : ''}" href="${linkBase}${b.slug}/"
        style="--stk-c:${b.colour}" ${current === b.id ? 'aria-current="true"' : ''}>
      <span class="stk__alt">
        <span class="stk__altn">${b.altitude}</span>
        <span class="stk__hz">${b.horizon}</span>
      </span>
      <span>
        <span class="stk__ttl">${b.title}${soon ? ' <span class="chip" style="translate:0 -2px">Forthcoming</span>' : ''}</span>
        ${compact ? '' : `<span class="stk__q">${b.question}</span>`}
      </span>
      <span class="stk__go">${icon.arr}</span>
    </a>`;
  }).join('') + `</div>`;
}

/* --------------------------------------------------------- BOOK COVER SVG */
/* Typeset covers. No stock imagery anywhere on this site — by design.      */

function cover(b, { w = 320 } = {}) {
  const h = Math.round(w * 1.48);
  const words = b.coverWords;
  const dark = b.id !== 'constitution';
  const bg = dark ? '#0E121A' : '#F1EEE7';
  const fg = dark ? '#F4F2EC' : '#14181F';
  const acc = b.colour === '#F4F2EC' ? '#8E7130' : b.colour;

  const boxW = w * 0.78;                 // printable measure inside the cover margins
  const maxLen = Math.max(...words.map(x => x.length));
  const base = b.lowercase ? h * 0.147 : (words.length > 2 ? h * 0.095 : h * 0.112);
  // Cap the size so the longest word always fits the measure (Outfit caps ≈ .60em average advance)
  const fs = Math.min(base, boxW / (maxLen * 0.60));
  const startY = 0.40, gap = (fs * 1.06) / h;

  const lines = words.map((wd, i) => {
    const y = (startY + i * gap) * h;
    return `<text x="${w * 0.11}" y="${y}" fill="${fg}" font-family="Outfit, Helvetica, Arial, sans-serif"
      font-size="${fs.toFixed(2)}" letter-spacing="-0.035em"
      font-weight="300">${esc(wd)}</text>`;
  }).join('');

  return `<svg class="cover" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"
      aria-label="${esc(b.title)} — book cover" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="${bg}"/>
    <rect x="0" y="0" width="4" height="${h}" fill="${acc}"/>
    <line x1="${w * 0.11}" y1="${h * 0.145}" x2="${w * 0.89}" y2="${h * 0.145}" stroke="${acc}" stroke-width="1" opacity=".55"/>
    <text x="${w * 0.11}" y="${h * 0.115}" fill="${acc}" font-family="Outfit, Helvetica, Arial, sans-serif"
      font-size="${h * 0.021}" letter-spacing="0.19em">${esc(b.coverRule)}</text>
    ${lines}
    <line x1="${w * 0.11}" y1="${h * 0.795}" x2="${w * 0.42}" y2="${h * 0.795}" stroke="${acc}" stroke-width="1" opacity=".5"/>
    <text x="${w * 0.11}" y="${h * 0.845}" fill="${fg}" opacity=".62" font-family="Outfit, Helvetica, Arial, sans-serif"
      font-size="${h * 0.021}" letter-spacing="0.17em">M. K. ELANGO</text>
    <text x="${w * 0.11}" y="${h * 0.885}" fill="${fg}" opacity=".34" font-family="Outfit, Helvetica, Arial, sans-serif"
      font-size="${h * 0.019}" letter-spacing="0.13em">${esc(b.horizon.toUpperCase())}</text>
    <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="${dark ? 'rgba(244,242,236,.10)' : 'rgba(11,14,20,.12)'}" stroke-width="1"/>
  </svg>`;
}

/* -------------------------------------------------------- FRAMEWORK MARKS */
/* Diagrams, drawn. These replace photography throughout the site.          */

/** The AI Flywheel — four stages, DRIVE hub, CORE rim. */
function flywheelMark(size = 460) {
  const c = size / 2, R = size * 0.40, r = size * 0.17;
  const stages = [
    { l: 'FOUNDATION', a: -90, c: '#C8A24A' },
    { l: 'GENERATIVE', a: 0,   c: '#2FA592' },
    { l: 'AGENTIC',    a: 90,  c: '#5B8DEF' },
    { l: 'PHYSICAL',   a: 180, c: '#B4472E' }
  ];
  const arc = (a0, a1, rad) => {
    const p = a => [c + rad * Math.cos(a * Math.PI / 180), c + rad * Math.sin(a * Math.PI / 180)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M ${x0} ${y0} A ${rad} ${rad} 0 0 1 ${x1} ${y1}`;
  };
  return `<svg viewBox="0 0 ${size} ${size}" class="mark-fly" role="img" aria-label="The AI Flywheel: four stages around a DRIVE hub, inside a CORE rim" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${c}" cy="${c}" r="${R * 1.20}" fill="none" stroke="rgba(244,242,236,.13)" stroke-width="1" stroke-dasharray="3 5"/>
    <text x="${c}" y="${c - R * 1.20 - 9}" text-anchor="middle" fill="rgba(244,242,236,.42)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9" letter-spacing="0.2em">CORE · THE RIM</text>
    ${stages.map((s, i) => `
      <path d="${arc(s.a + 6, s.a + 84, R)}" fill="none" stroke="${s.c}" stroke-width="2.5" stroke-linecap="round" opacity=".85"/>
      <text x="${c + R * 1.13 * Math.cos((s.a + 45) * Math.PI / 180)}" y="${c + R * 1.13 * Math.sin((s.a + 45) * Math.PI / 180) + 3}"
        text-anchor="middle" fill="${s.c}" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9" letter-spacing="0.16em" font-weight="600">${s.l}</text>
      <circle cx="${c + R * Math.cos(s.a * Math.PI / 180)}" cy="${c + R * Math.sin(s.a * Math.PI / 180)}" r="3.5" fill="${s.c}"/>
    `).join('')}
    <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="rgba(244,242,236,.28)" stroke-width="1"/>
    <text x="${c}" y="${c - 4}" text-anchor="middle" fill="#F4F2EC" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="12" letter-spacing="0.22em" font-weight="600">DRIVE</text>
    <text x="${c}" y="${c + 12}" text-anchor="middle" fill="rgba(244,242,236,.45)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="7.5" letter-spacing="0.13em">THE HUB</text>
    ${[0, 1, 2, 3].map(i => {
      const a = (i * 90 + 45) * Math.PI / 180;
      return `<line x1="${c + r * Math.cos(a)}" y1="${c + r * Math.sin(a)}" x2="${c + (R - 8) * Math.cos(a)}" y2="${c + (R - 8) * Math.sin(a)}" stroke="rgba(244,242,236,.16)" stroke-width="1"/>`;
    }).join('')}
  </svg>`;
}

/** The three layers — Milk, Mountain, Moonshot. */
function layersMark(w = 480) {
  const h = Math.round(w * 0.66);
  const rows = [
    { l: 'MOONSHOT', s: '21–25 years · the objective', y: 0.13, c: '#F4F2EC', wf: 0.42 },
    { l: 'MOUNTAIN', s: '3–8 years · the hard ventures', y: 0.44, c: '#2FA592', wf: 0.68 },
    { l: 'MILK',     s: 'now · the businesses that pay', y: 0.75, c: '#C8A24A', wf: 0.92 }
  ];
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Three layers: Milk pays forwards, Moonshot selects backwards" xmlns="http://www.w3.org/2000/svg">
    ${rows.map(r => {
      const y = r.y * h, bw = r.wf * w * 0.78, x = w * 0.11;
      return `<rect x="${x}" y="${y - 17}" width="${bw}" height="34" rx="5" fill="${r.c}" opacity=".10"/>
      <rect x="${x}" y="${y - 17}" width="2.5" height="34" rx="1" fill="${r.c}"/>
      <text x="${x + 14}" y="${y - 1}" fill="${r.c}" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="10.5" letter-spacing="0.2em" font-weight="600">${r.l}</text>
      <text x="${x + 14}" y="${y + 12}" fill="rgba(244,242,236,.44)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9.5">${r.s}</text>`;
    }).join('')}
    <path d="M ${w * 0.955} ${h * 0.75} L ${w * 0.955} ${h * 0.16}" stroke="#C8A24A" stroke-width="1.2" stroke-dasharray="4 4" opacity=".65"/>
    <path d="M ${w * 0.955} ${h * 0.15} l -4 6 l 8 0 z" fill="#C8A24A" opacity=".8"/>
    <text x="${w * 0.945}" y="${h * 0.47}" text-anchor="end" fill="rgba(200,162,74,.75)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="8" letter-spacing="0.14em" transform="rotate(-90 ${w * 0.945} ${h * 0.47})">CAPITAL RUNS FORWARDS</text>
    <path d="M ${w * 0.055} ${h * 0.16} L ${w * 0.055} ${h * 0.74}" stroke="#F4F2EC" stroke-width="1.2" stroke-dasharray="4 4" opacity=".4"/>
    <path d="M ${w * 0.055} ${h * 0.75} l -4 -6 l 8 0 z" fill="#F4F2EC" opacity=".55"/>
    <text x="${w * 0.065}" y="${h * 0.45}" fill="rgba(244,242,236,.5)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="8" letter-spacing="0.14em" transform="rotate(-90 ${w * 0.065} ${h * 0.45})">SELECTION RUNS BACKWARDS</text>
  </svg>`;
}

/** goal1 mission object — four fields. */
function missionMark(w = 440) {
  const h = 200;
  const f = [
    { l: 'INTENT',  d: 'what we are causing',        c: '#C8A24A' },
    { l: 'MEASURE', d: 'read, never typed',          c: '#2FA592' },
    { l: 'LEVEL',   d: 'the threshold',              c: '#5B8DEF' },
    { l: 'ROUTE',   d: 'what happens next',          c: '#B4472E' }
  ];
  const bw = (w - 40 - 30) / 4;
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="The goal1 mission object: Intent, Measure, Level, Route" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="26" fill="rgba(244,242,236,.42)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9" letter-spacing="0.2em">ONE MISSION · FOUR FIELDS</text>
    ${f.map((x, i) => {
      const bx = 20 + i * (bw + 10);
      return `<rect x="${bx}" y="46" width="${bw}" height="86" rx="6" fill="${x.c}" opacity=".09"/>
      <rect x="${bx}" y="46" width="${bw}" height="2.5" rx="1" fill="${x.c}"/>
      <text x="${bx + 11}" y="76" fill="${x.c}" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9.5" letter-spacing="0.14em" font-weight="600">${x.l}</text>
      <text x="${bx + 11}" y="96" fill="rgba(244,242,236,.48)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9">${x.d.split(' ').slice(0, 2).join(' ')}</text>
      <text x="${bx + 11}" y="109" fill="rgba(244,242,236,.48)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9">${x.d.split(' ').slice(2).join(' ')}</text>`;
    }).join('')}
    <line x1="20" y1="150" x2="${w - 20}" y2="150" stroke="rgba(244,242,236,.13)" stroke-width="1"/>
    <text x="20" y="172" fill="rgba(244,242,236,.55)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="10.5" font-style="italic">The measure is read from a system of record. Never typed.</text>
  </svg>`;
}

/** Twelve traits grid — TAO. */
function traitsMark(w = 460) {
  const names = ['Parallel', 'Distributed', 'Scalable', 'Data as infra', 'Continuous', 'Pattern',
    'Feedback', 'Transfer', 'Network', 'Self-opt', 'Modular', 'Emergent'];
  const cols = 4, cw = (w - 40 - 24) / cols, ch = 52;
  const h = 40 + Math.ceil(12 / cols) * (ch + 8);
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Twelve architectural traits" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="24" fill="rgba(244,242,236,.42)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9" letter-spacing="0.2em">TWELVE TRAITS · FIVE LEVELS EACH</text>
    ${names.map((n, i) => {
      const x = 20 + (i % cols) * (cw + 8), y = 40 + Math.floor(i / cols) * (ch + 8);
      const lvl = [3, 2, 4, 2, 3, 2, 4, 1, 3, 2, 3, 1][i];
      return `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="5" fill="rgba(244,242,236,.035)" stroke="rgba(244,242,236,.10)"/>
      <text x="${x + 9}" y="${y + 18}" fill="rgba(244,242,236,.72)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9.5" font-weight="500">${n}</text>
      <text x="${x + 9}" y="${y + 31}" fill="rgba(244,242,236,.3)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="7.5" letter-spacing="0.1em">${String(i + 1).padStart(2, '0')}</text>
      ${[0, 1, 2, 3, 4].map(k => `<rect x="${x + 9 + k * 9}" y="${y + 38}" width="6" height="5" rx="1.2" fill="${k < lvl ? '#2FA592' : 'rgba(244,242,236,.14)'}"/>`).join('')}`;
    }).join('')}
  </svg>`;
}

/** CCi — three moves in sequence. */
function cciMark(w = 460) {
  const h = 170;
  const s = [
    { l: 'COPY', d: 'proven elsewhere', c: '#C8A24A' },
    { l: 'CUSTOMIZE', d: 'five axes', c: '#2FA592' },
    { l: 'INNOVATE', d: 'on a de-risked base', c: '#5B8DEF' }
  ];
  const bw = (w - 40 - 60) / 3;
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Copy, Customize, Innovate — three moves in sequence" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="26" fill="rgba(244,242,236,.42)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9" letter-spacing="0.2em">SEQUENCE IS THE METHOD</text>
    ${s.map((x, i) => {
      const bx = 20 + i * (bw + 30);
      return `<rect x="${bx}" y="50" width="${bw}" height="70" rx="6" fill="${x.c}" opacity=".10"/>
      <rect x="${bx}" y="50" width="${bw}" height="2.5" rx="1" fill="${x.c}"/>
      <text x="${bx + bw / 2}" y="82" text-anchor="middle" fill="${x.c}" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="10" letter-spacing="0.15em" font-weight="600">${x.l}</text>
      <text x="${bx + bw / 2}" y="101" text-anchor="middle" fill="rgba(244,242,236,.48)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="9">${x.d}</text>
      ${i < 2 ? `<path d="M ${bx + bw + 8} 85 l 14 0 m -5 -4 l 5 4 l -5 4" stroke="rgba(244,242,236,.35)" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`;
    }).join('')}
    <text x="20" y="148" fill="rgba(244,242,236,.5)" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="10.5" font-style="italic">Most entry failures are sequence failures.</text>
  </svg>`;
}

/** Portrait slot — an honest placeholder, designed rather than apologised for. */
function portraitSlot(label = 'ONE PORTRAIT') {
  return `<div class="portrait">
    <div class="portrait__inner">
      <span class="mono faint">${label}</span>
      <span class="portrait__note">Documentary, not stage. Supply before launch.</span>
    </div>
  </div>`;
}

module.exports = {
  icon, esc, etag, figure, kicker, btn, tlink, rule, shead, crumb,
  field, fields, seats, lrow, card, railX, stackLadder, cover, headLines, time, honeypot,
  answerBlock, faqSection, factTable,
  flywheelMark, layersMark, missionMark, traitsMark, cciMark, portraitSlot, GRADE_DEF
};
