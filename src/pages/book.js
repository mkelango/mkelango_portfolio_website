const { site } = require('../data/site');
const { stack } = require('../data/stack');
const { diagnostics } = require('../data/diagnostics');
const { evidenceStandard } = require('../data/misc');
const { programs } = require('../data/programs');
const K = require('../kit');

const md = t => t.split('\n\n').map(p =>
  `<p>${p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>`).join('');

const MARKS = {
  mmm: K.layersMark, flywheel: K.flywheelMark, tao: K.traitsMark, goal1: K.missionMark,
  cci: K.cciMark, constitution: K.constitutionMark
};

module.exports = function book(b) {
  const diag = b.instrument ? diagnostics.find(d => d.slug === b.instrument) : null;
  const soon = b.status === 'forthcoming';
  const others = stack.filter(x => x.id !== b.id);
  const mark = MARKS[b.id];

  return `
<section class="phero on-ink" style="--c:${b.colour}">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Books', href: '/books/' }, { label: b.title }])}
    <div class="book-hero">
      <div class="rv">
        ${K.cover(b, { w: 340 })}
      </div>
      <div>
        <div class="flex ac wrapf gap-sm mb-sm">
          <span class="mono" style="color:${b.colour};font-weight:600">${b.altitude} · ${b.layer}</span>
          ${soon ? '<span class="chip chip--alert">Forthcoming · unpublished</span>' : '<span class="chip chip--brass">Available</span>'}
        </div>
        <h1 class="d1 lines">${K.headLines(b.title)}</h1>
        ${b.subtitle ? `<p class="lede lede--wide rv" style="--d:.3s;margin-top:1rem;font-weight:300;color:var(--brass-ctx)">${b.subtitle}</p>` : ''}
        <p class="pull rv" style="--d:.35s;margin-top:1.5rem;font-size:clamp(1.2rem,2.1vw,1.6rem);max-width:34ch">${b.prop}</p>

        <div class="flex ac wrapf gap-sm rv mt-lg" style="--d:.45s">
          ${soon
            ? `${K.btn('Tell me when it publishes', '/newsletter/', 'btn--brass btn--lg')}${K.btn('Why this title', '#origin', 'btn--ghost btn--lg')}`
            : `${K.btn('Where to buy', '#buy', 'btn--brass btn--lg')}${diag ? K.btn('Run the free instrument', `/diagnostics/${diag.slug}/`, 'btn--ghost btn--lg') : ''}`}
        </div>
        <p class="mono faint mt rv" style="--d:.55s">${b.horizon.toUpperCase()} · ${b.question.toUpperCase()}</p>
      </div>
    </div>
  </div>
</section>

<!-- The book in one page -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <div class="rv">
        ${K.kicker('The book in one page')}
        <h2 class="d2" style="margin-top:1rem">The argument, in 150 words.</h2>
        <div class="prose mt" style="max-width:none"><p style="font-size:1.14rem">${b.onePage}</p></div>

        ${mark ? `<div class="mark-box mark-box--plate mt-lg">
          ${mark(560)}
          <div class="mark-box__cap">The central instrument from <strong style="color:var(--fg)">${b.title}</strong>.</div>
        </div>` : ''}
      </div>
      <aside class="aside-sticky rv">
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">Where it sits in the stack</span>
          <div style="margin-top:.9rem">${K.stackLadder(stack, { current: b.id, compact: true })}</div>
        </div>
        ${b.note ? `<div class="note">${b.note}</div>` : ''}
      </aside>
    </div>
  </div>
</section>

<!-- The origin -->
<section class="band on-ink" id="origin">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    <div class="artgrid artgrid--l">
      <aside class="aside-sticky rv">
        ${K.kicker('The origin')}
        <h2 class="d3" style="margin-top:.75rem">How this one started.</h2>
        <p class="sm mute mt-xs">First person. Roughly 200 words.</p>
      </aside>
      <div class="prose rv" style="--d:.1s">${md(b.origin)}</div>
    </div>

    ${b.cautions ? `<div class="mt-xl rv">
      ${K.rule()}
      <div class="grid g-3 mt-lg" style="gap:1rem">
        ${b.cautions.map((c, i) => `<div class="mark-box" style="border-left:2px solid var(--sienna-hi)">
          <span class="idx">CAUTION ${String(i + 1).padStart(2, '0')}</span>
          <p class="sm mute" style="margin-top:.6rem">${c}</p></div>`).join('')}
      </div>
    </div>` : ''}
  </div>
</section>

<!-- The instrument, playable -->
${diag ? `
<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The instrument', h: 'Run the test from this book. Free.',
      lede: 'Every book here ships with an instrument, and the instrument is free and playable on this website. That is not a sample chapter — it is the whole tool.',
      cta: K.tlink('Run it now', `/diagnostics/${diag.slug}/`) })}

    <a class="prog-card card--link rv" href="/diagnostics/${diag.slug}/" style="--c:${diag.colour}">
      <div class="prog-card__top">
        <span class="chip chip--free">Free · no email to start</span>
        <span class="mono faint">${diag.time}</span>
      </div>
      <div class="grid g-2" style="gap:clamp(1.25rem,3vw,3rem);margin-top:1rem;align-items:center">
        <div>
          <h3 class="d3">${diag.title}</h3>
          <p class="card__txt" style="margin-top:.7rem;max-width:46ch">${diag.what}</p>
        </div>
        <div>${K.fields([['Scored out of', String(diag.engine.max)], ['Benchmark', String(diag.engine.benchmark)], ['Length', diag.time]])}</div>
      </div>
      <div class="prog-card__foot"><span class="mono faint">Play it inline</span><span class="stk__go">${K.icon.arr}</span></div>
    </a>
  </div>
</section>` : ''}

<!-- What it's for -->
<section class="band on-ink">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'What it is for', h: 'Three situations this answers.',
      lede: 'If none of these is close to your situation, this is probably the wrong altitude — and the stack page will point you at the right one.' })}
    <div class="grid g-3" data-stagger="0.08">
      ${b.situations.map((s, i) => `
        <a class="card card--link inst-card" href="${s.to}" style="--c:${b.colour}">
          <div class="card__body">
            <span class="idx">${String(i + 1).padStart(2, '0')}</span>
            <p class="card__ttl" style="font-size:1.14rem;font-weight:250;letter-spacing:-.026em">“${s.s}”</p>
            <div class="card__foot"><span class="mono faint">${s.t}</span><span class="stk__go">${K.icon.arr}</span></div>
          </div></a>`).join('')}
    </div>
  </div>
</section>

<!-- Contents -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <div class="rv">
        ${K.kicker('Contents')}
        <h2 class="d2" style="margin-top:1rem">The actual table of contents.</h2>
        <p class="lede lede--wide mt-sm">Buyers of serious business books read the contents before they read the blurb. So here it is, unabridged.</p>
        <div class="toc mt-lg">
          ${b.contents.map((c, i) => `<div class="toc__i"><span class="idx">${String(i + 1).padStart(2, '0')}</span><span>${c}</span></div>`).join('')}
        </div>
      </div>
      <aside class="aside-sticky rv" id="buy">
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">${soon ? 'Not yet published' : 'Buy'}</span>
          ${soon
            ? `<p class="sm mute" style="margin-top:.8rem">This book is in manuscript. It is marked forthcoming everywhere it appears on this site, and it will not be listed for pre-order until a publication date is committed.</p>
               <form class="sub" style="margin-top:1rem" data-form="book-notify" data-ref="${b.slug}">
                 <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
                 <button class="btn btn--brass btn--sm btn--block" type="submit">Tell me when</button>
               ${K.honeypot()}
               </form>`
            : `<p class="sm mute" style="margin-top:.8rem">Retail listings open when the ISBN is issued.
                 Until then the boxed set is the way to get it, and the instrument from this book is
                 already free on this site.</p>
               <div class="grid" style="gap:.55rem;margin-top:1rem">
                 ${K.btn('The boxed set', '/shop/the-stack/', 'btn--brass btn--block')}
                 ${diag ? K.btn('Run the free instrument', `/diagnostics/${diag.slug}/`, 'btn--ghost btn--block') : ''}
               </div>
               <form class="sub" style="margin-top:1rem" data-form="book-notify" data-ref="${b.slug}">
                 <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
                 <button class="btn btn--ghost btn--sm" type="submit">Tell me when it lists</button>
               ${K.honeypot()}
               </form>`}
        </div>
        <a class="card card--link" href="/shop/the-stack/">
          <div class="card__body">
            <span class="kicker">The boxed set</span>
            <p class="card__ttl">The Elango Stack</p>
            <p class="card__txt">Five books, one argument, one box. The sixth ships on publication.</p>
            <div class="card__foot"><span class="mono faint">Shop</span><span class="stk__go">${K.icon.arr}</span></div>
          </div>
        </a>
      </aside>
    </div>
  </div>
</section>

<!-- The evidence standard — the house signature, on every book page -->
<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The evidence standard', h: 'Every figure in this book carries a grade and a date.',
      lede: 'It is reproduced on every book page because it is the house signature, and because a standard you have to go looking for is a preference.',
      cta: K.tlink('The Evidence Log', '/evidence/') })}
    <div class="grid g-3" data-stagger="0.07">
      ${evidenceStandard.map(s => `
        <div class="mark-box" style="border-left:2px solid ${s.g === 'A' ? 'var(--teal-hi)' : s.g === 'B' ? 'var(--brass)' : 'var(--fg-faint)'}">
          <p style="font-size:2rem;line-height:1">${K.etag(s.g, s.def)}</p>
          <p class="g3" style="margin-top:.7rem">${s.name}</p>
          <p class="sm mute" style="margin-top:.45rem">${s.def}</p>
        </div>`).join('')}
    </div>
    <p class="spine mt-lg rv" style="max-width:56ch">If a figure cannot be graded, it is not softened. It is removed.</p>
  </div>
</section>

<!-- Related program -->
<section class="band on-paper closing">
  <div class="wrap wrap--wide">
    ${(() => {
      const rel = programs.find(x => x.book === b.id);
      if (!rel) return `
        <div class="tc rv" style="max-width:44rem;margin-inline:auto">
          <h2 class="d2">Where this book leads</h2>
          <p class="lede mx-auto mt-sm" style="max-width:44ch">This one is the case rather than the method. The five methods it tests are the rest of the stack.</p>
          <div class="flex ac jc wrapf gap-sm mt">${K.btn('The Stack', '/the-stack/', 'btn--solid btn--lg')}</div>
        </div>`;
      return `${K.shead({ k: 'The programme', h: 'Where this book gets installed.',
        lede: 'A book is an argument. A programme is the argument, run on your organisation, with named artefacts at the end.' })}
      <a class="prog-card card--link rv" href="/programs/${rel.slug}/" style="--c:${b.colour}">
        <div class="prog-card__top"><span class="idx">${rel.n}</span><span class="mono" style="color:${b.colour}">${b.altitude}</span></div>
        <div class="grid g-2" style="gap:clamp(1.25rem,3vw,3rem);margin-top:1rem;align-items:center">
          <div>
            <h3 class="d3">${rel.title}</h3>
            <p class="card__txt" style="margin-top:.7rem;max-width:46ch">${rel.lede}</p>
          </div>
          <div>${K.fields([['Duration', rel.duration], ['Cohort', rel.cohort], ['Band', rel.price]])}</div>
        </div>
        <div class="prog-card__foot"><span class="mono faint">${rel.kicker}</span><span class="stk__go">${K.icon.arr}</span></div>
      </a>`;
    })()}
  </div>
</section>

<section class="band band--sm on-paper">
  <div class="wrap wrap--wide">
    ${K.rule()}
    <p class="kicker mt-lg mb">The rest of the stack</p>
    <div class="covers rv" style="grid-template-columns:repeat(5,minmax(0,1fr))">
      ${others.map(o => `<a class="cover-slot" href="/books/${o.slug}/" aria-label="${o.title}">
        ${K.cover(o, { w: 200 })}
        <span class="cover-meta"><span class="mono" style="color:${o.colour}">${o.altitude}</span>
        <span class="cover-ttl">${o.title}</span></span></a>`).join('')}
    </div>
  </div>
</section>`;
};
