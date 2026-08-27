const { site } = require('../data/site');
const { diagnostics } = require('../data/diagnostics');
const { byId, stack } = require('../data/stack');
const { evidenceStandard } = require('../data/misc');
const K = require('../kit');

const md = t => t.split('\n\n').map(p =>
  `<p>${p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>`).join('');

module.exports = function diagnostic(d) {
  const b = byId[d.book];
  const e = d.engine;
  const others = diagnostics.filter(x => x.slug !== d.slug).slice(0, 3);

  /* The instrument payload is inlined as JSON and driven by assets/js/site.js */
  const payload = JSON.stringify({
    id: e.id, unit: e.unit, max: e.max, benchmark: e.benchmark, benchmarkNote: e.benchmarkNote,
    reportName: e.reportName, weakNote: e.weakNote, showTraits: e.showTraits,
    book: e.book, program: e.program, questions: e.questions, bands: e.bands
  }).replace(/</g, '\\u003c');

  return `
<section class="phero on-ink" style="--c:${d.colour}">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Diagnostics', href: '/diagnostics/' }, { label: d.short }])}
    <div class="phero__grid">
      <div>
        <div class="flex ac wrapf gap-sm mb-sm">
          <span class="chip chip--free">Free · no email to start</span>
          <span class="mono" style="color:${d.colour};font-weight:600">${d.kicker}</span>
        </div>
        <h1 class="d1 lines">
          ${K.headLines(d.title)}
        </h1>
        <p class="lede lede--wide rv" style="--d:.35s;margin-top:1.5rem">${d.lede}</p>
        <div class="flex ac wrapf gap mt rv" style="--d:.45s">
          ${K.fields([['Length', d.time], ['Scored out of', String(e.max)], ['Benchmark', String(e.benchmark)]])}
        </div>
      </div>
      <div class="rv" style="--d:.28s">
        <div class="mark-box">
          <span class="kicker">What it reads</span>
          <p class="body-lg" style="margin-top:.85rem">${d.what}</p>
          <div class="mark-box__cap">From <a href="/books/${b.slug}/" style="color:var(--brass);border-bottom:1px solid currentColor">${b.title}</a> · ${b.altitude}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════ THE INSTRUMENT — plays inline ══════════════════ -->
<section class="band band--sm on-ink band--flush-t" id="run">
  <div class="wrap wrap--wide">
    <div class="inst rv" data-instrument>
      <script type="application/json">${payload}</script>

      <div class="inst__hd">
        <div>
          ${K.kicker('The instrument')}
          <p class="g2" style="margin-top:.5rem">${d.short}</p>
        </div>
        <div class="tr">
          <span class="mono faint" data-counter>01 / ${String(e.questions.length).padStart(2, '0')}</span>
          <div class="prog" style="width:9rem;margin-top:.55rem"><i class="prog__b"></i></div>
        </div>
      </div>

      <div class="inst__bd">
        <div data-stage>
          <div data-step></div>
        </div>
        <div data-result hidden></div>
      </div>

      <div class="inst__ft">
        <div class="flex ac gap-sm">
          <button class="btn btn--ghost btn--sm" data-back hidden>${K.icon.arrL} Back</button>
          <button class="btn btn--ghost btn--sm" data-restart hidden>Run it again</button>
        </div>
        <span class="xs faint">Answer as the organisation actually behaves, not as the policy says it should.</span>
      </div>
    </div>

    <noscript>
      <div class="note note--alert mt">
        <span class="kicker note__k">JavaScript required</span>
        This instrument scores in the browser and stores nothing until you ask for the report.
        With scripts disabled the questions are still worth asking — they are reproduced in
        <a href="/books/${b.slug}/">${b.title}</a>.
      </div>
    </noscript>
  </div>
</section>

<!-- Why this instrument exists -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <div class="prose rv">
        <span class="kicker">Why this one</span>
        <h2 style="margin-top:.9rem">${b.prop}</h2>
        ${md(d.why)}
      </div>
      <aside class="aside-sticky rv">
        <a class="card card--link" href="/books/${b.slug}/">
          <div class="card__body">
            <span class="kicker">The book behind it</span>
            <div style="margin:.6rem 0">${K.cover(b, { w: 132 })}</div>
            <p class="card__ttl">${b.title}</p>
            <p class="card__txt">${b.makes}</p>
            <div class="card__foot"><span class="mono faint">Read the argument</span><span class="stk__go">${K.icon.arr}</span></div>
          </div>
        </a>
        ${e.program ? `<a class="card card--link inst-card" href="${e.program.href}" style="--c:${d.colour}">
          <div class="card__body">
            <span class="kicker">Where this gets fixed</span>
            <p class="card__ttl">${e.program.title}</p>
            <p class="card__txt">${e.program.why}</p>
            <div class="card__foot"><span class="mono faint">The programme</span><span class="stk__go">${K.icon.arr}</span></div>
          </div></a>` : ''}
      </aside>
    </div>
  </div>
</section>

<!-- Method and benchmark, published -->
<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Method', h: 'The benchmark, and how it was built.',
      lede: 'A score is only as good as the thing it is compared against. So the benchmark carries a grade and a method, exactly like every other figure on this site.' })}

    <div class="grid g-2" style="gap:clamp(1.5rem,4vw,3.5rem);align-items:start">
      <div class="mark-box rv">
        <span class="kicker">The benchmark</span>
        <p class="stat__n" style="margin-top:.8rem">${e.benchmark}<span class="score__d" style="font-size:.42em">/${e.max}</span>${K.etag(e.benchmarkNote.includes('[B]') ? 'B' : 'C', e.benchmarkNote.replace(/Grade \[[ABC]\] — /, ''))}</p>
        <div class="mark-box__cap">${e.benchmarkNote}</div>
      </div>
      <div class="rv" style="--d:.1s">
        <div class="ledger">
          ${evidenceStandard.map(s => K.lrow({ n: `[${s.g}]`, title: s.name, desc: s.def })).join('')}
        </div>
        <p class="xs faint mt">${K.tlink('The Evidence Log', '/evidence/')}</p>
      </div>
    </div>

    <div class="note mt-lg rv">
      <span class="kicker note__k">What we do with your result</span>
      The score is computed in your browser. Nothing is transmitted unless you ask for the detailed report,
      and in that case only the score, the trait breakdown and your email address are stored.
      Your result is never published, sold, shared or attached to your name in any material.
      ${K.tlink('Privacy', '/privacy/')}
    </div>
  </div>
</section>

<!-- The questions, published in full -->
<section class="band on-ink" id="questions">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The questions', h: 'All ${e.questions.length}, published in full.'.replace('${e.questions.length}', String(e.questions.length)),
      lede: 'Nothing is hidden behind the interaction. If you would rather read the instrument than run it — or run it on paper, in a room, with other people — here it is.' })}
    <div class="qlist">
      ${e.questions.map((q, i) => `<details class="qlist__i rv"${i === 0 ? ' open' : ''}>
        <summary>
          <span class="idx">${String(i + 1).padStart(2, '0')}</span>
          <span class="qlist__q">${q.trait ? `<b>${q.trait}</b> — ` : ''}${q.q}</span>
        </summary>
        <div class="qlist__b">
          ${q.help ? `<p class="xs faint" style="margin-bottom:.7rem">${q.help}</p>` : ''}
          <ol class="qlist__o">
            ${q.options.map(o => `<li><span class="qlist__v">${o.value}</span><span>${o.label}</span></li>`).join('')}
          </ol>
        </div>
      </details>`).join('')}
    </div>
    <p class="xs faint mt">Scored out of ${e.max}. Published benchmark ${e.benchmark}. Method and grade above.</p>
  </div>
</section>

<!-- Bands, published in advance -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The bands', h: 'What each range means.',
      lede: 'Published before you take the test, so the reading cannot be tuned to flatter afterwards.' })}
    <div class="phases">
      ${e.bands.map(bd => `<div class="phase rv">
        <span class="mono faint" style="padding-top:.25rem;white-space:nowrap">${bd.min}–${bd.max}</span>
        <div><p class="phase__t">${bd.title}</p><p class="phase__d">${bd.text}</p></div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The other instruments', h: 'Five more, one per altitude.', cta: K.tlink('All six', '/diagnostics/') })}
    <div class="grid g-3" data-stagger="0.07">
      ${others.map(o => `<a class="card card--link inst-card" href="/diagnostics/${o.slug}/" style="--c:${o.colour}">
        <div class="card__body">
          <span class="chip chip--free">Free</span>
          <p class="card__ttl">${o.title}</p>
          <p class="card__txt">${o.what}</p>
          <div class="card__foot"><span class="mono faint">${o.time}</span><span class="stk__go">${K.icon.arr}</span></div>
        </div></a>`).join('')}
    </div>
  </div>
</section>`;
};
