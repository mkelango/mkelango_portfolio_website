const { site } = require('../data/site');
const { stack } = require('../data/stack');
const K = require('../kit');

module.exports = function theStack() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }, { label: 'The Stack' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('The Elango Stack')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Five books.</span></span>
          <span><span>One argument.</span></span>
          <span><span class="d-it">Read at five altitudes.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">You do not need to read them in order. But you do need to know which altitude your problem lives at — because a portfolio problem solved with an organisational tool will look like progress for about two years.</p>
      </div>
    </div>
  </div>
</section>

<!-- The ladder, full -->
<section class="band band--sm on-ink band--flush-t">
  <div class="wrap wrap--wide">
    <div class="hero-stack rv">
      <div class="flex ac jb wrapf gap-sm mb-sm" style="padding-inline:.15rem">
        ${K.kicker('Five altitudes, plus the case')}
        <span class="mono faint">ALTITUDE · HORIZON · THE QUESTION IT ANSWERS</span>
      </div>
      ${K.stackLadder(stack, {})}
    </div>
  </div>
</section>

<!-- Altitude by altitude -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({
      k: 'Altitude by altitude',
      h: 'One question each,<br>at one height.',
      lede: 'A framework is only useful if you know what it is <em>not</em> for. Each of these answers exactly one question, and answers it at exactly one altitude. Using the wrong one is the most common and most expensive mistake in the set.'
    })}

    <div class="grid" style="gap:clamp(1rem,2vw,1.5rem)" data-stagger="0.06">
      ${stack.map(b => `
        <article class="alt-row" style="--c:${b.colour}">
          <div class="alt-row__l">
            <span class="mono" style="color:${b.colour};font-weight:600">${b.altitude}</span>
            <span class="mono faint" style="letter-spacing:.06em;text-transform:none">${b.horizon}</span>
            <span class="mono faint" style="letter-spacing:.06em;text-transform:none">${b.layer}</span>
          </div>
          <div class="alt-row__m">
            <h3 class="d3">${b.title}${b.status === 'forthcoming' ? ' <span class="chip" style="translate:0 -6px">Forthcoming</span>' : ''}</h3>
            <p class="lede" style="margin-top:.65rem;max-width:56ch;font-size:1.02rem">${b.question}</p>
            <p class="sm mute" style="margin-top:.85rem;max-width:62ch"><strong style="color:var(--fg)">Makes inevitable:</strong> ${b.makes}</p>
            <div class="flex ac wrapf gap mt-sm">
              ${K.tlink('The book', `/books/${b.slug}/`)}
              ${b.instrument ? K.tlink('The instrument', `/diagnostics/${b.instrument}/`) : ''}
            </div>
          </div>
          <div class="alt-row__r">
            <a href="/books/${b.slug}/" aria-label="${b.title}">${K.cover(b, { w: 150 })}</a>
          </div>
        </article>`).join('')}
    </div>
  </div>
</section>

<!-- Which altitude is your problem at? -->
<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.shead({
      k: 'Diagnosis',
      h: 'Which altitude is your problem actually at?',
      lede: 'The sentences below are the ones people say when they arrive. Find the one closest to yours.',
      center: true
    })}

    <div class="grid g-3" data-stagger="0.07">
      ${[
        { q: '“We hold nine businesses and I could not tell you what any of them are for.”', a: 'Horizon', to: '/books/milk-mountain-moonshot/', c: '#C8A24A', i: '/diagnostics/coherence-matrix/' },
        { q: '“Every decision needs four approvals and nobody remembers why.”', a: 'Organisation', to: '/books/accelerated-organization/', c: '#2FA592', i: '/diagnostics/aq-score/' },
        { q: '“We have eleven AI pilots and nothing in production.”', a: 'Engine', to: '/books/ai-flywheel/', c: '#5B8DEF', i: '/diagnostics/flywheel-locator/' },
        { q: '“Nobody can say which system the number in the board deck came from.”', a: 'Instrument', to: '/books/goal1/', c: '#B4472E', i: '/diagnostics/three-questions/' },
        { q: '“We need to be in that market in ninety days and we are starting from nothing.”', a: 'Move', to: '/books/cci/', c: '#8E7130', i: '/diagnostics/cci-readiness/' },
        { q: '“Show me one organisation where all five of these ran at once.”', a: 'Proof', to: '/books/constitution-engine/', c: '#F4F2EC', i: null }
      ].map(x => `
        <a class="card card--link inst-card" href="${x.to}" style="--c:${x.c}">
          <div class="card__body">
            <span class="mono" style="color:${x.c}">${x.a}</span>
            <p class="card__ttl" style="font-size:1.16rem;font-weight:250;letter-spacing:-.026em">${x.q}</p>
            <div class="card__foot">
              <span class="mono faint">Read the book</span>
              <span class="stk__go">${K.icon.arr}</span>
            </div>
          </div>
        </a>`).join('')}
    </div>

    <div class="note mt-lg rv">
      <span class="kicker note__k">The rule of the stack</span>
      A portfolio problem solved with an organisational tool will look like progress for about two years —
      because the organisation genuinely does get faster, and it gets faster at doing the wrong things.
    </div>
  </div>
</section>

<!-- The evidence standard, reproduced -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:start">
      <div class="rv">
        ${K.kicker('The house signature')}
        <h2 class="d2" style="margin-top:1rem">The evidence standard runs across all six.</h2>
        <p class="lede lede--wide mt-sm">Every figure in every book, and every figure on this website, carries a grade and an as-at date. It costs nothing, almost nobody does it, and it is the first thing a family-office diligence team checks.</p>
        <p class="mt-sm">${K.tlink('The Evidence Log', '/evidence/')}</p>
      </div>
      <div class="ledger rv" style="--d:.12s">
        ${[['A', 'Verified', 'Traced to a named primary source — a filing, an audited statement, a contract, a dataset we hold.'],
           ['B', 'Claimed', 'Reported by a credible party, including by us, but not independently traceable to a primary document.'],
           ['C', 'Estimate', 'Modelled, sampled or directionally derived. Method stated. Treat it as a shape, not a number.']]
          .map(([g, n, d]) => K.lrow({ n: `[${g}]`, title: n, desc: d })).join('')}
      </div>
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      <p class="pull">Five books. One argument.<br><em>Six instruments you can run tonight.</em></p>
      <div class="flex ac jc wrapf gap-sm mt-lg">
        ${K.btn('All six instruments', '/diagnostics/', 'btn--brass btn--lg')}
        ${K.btn('The books', '/books/', 'btn--ghost btn--lg')}
      </div>
      <p class="mono faint mt">${site.lines.reject}</p>
    </div>
  </div>
</section>`;
};
