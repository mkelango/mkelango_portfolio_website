const { site } = require('../data/site');
const { stack } = require('../data/stack');
const { knowledgeInvestor: ki } = require('../data/misc');
const K = require('../kit');

module.exports = function knowledgeInvestor() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore/' }, { label: 'Knowledge Investor' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Knowledge Investor')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Angels invest capital.</span></span>
          <span><span class="d-it">I invest knowledge.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">A knowledge investor backs a company the way an angel does — early, at risk, for the long run. What goes in is not money. It is the methods, the instruments and the judgement in six books, put to work inside the company.</p>
        <p class="mono faint mt">THE GOAL · ONE HUNDRED AI STARTUPS</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <article class="prose rv">
        <h2 style="margin-top:0">What a knowledge investor is</h2>
        <p>An angel investor writes a cheque before anyone else will, and stays through the years when a company is mostly risk. The cheque matters. But founders who have had a good angel will tell you the money was rarely the part that changed the company. The part that changed it was the person: the question asked at the right moment, the framework that turned a guess into a plan, the mistake named before it was made.</p>
        <p>A knowledge investor makes that part the investment. <strong>The investment is knowledge, not capital</strong> — a body of tested method committed to a company early, at the same risk, for the same long run.</p>
        <p>Knowledge behaves like capital in the one way that matters: it compounds. Cash is spent once. Knowledge invested in a team is used every day, taught on to the next hire, and is still working long after the investor has left the room.</p>
      </article>
      <aside class="aside-sticky rv">
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">Definition</span>
          <p class="g3" style="margin-top:.8rem">Knowledge investor <span class="mono faint">n.</span></p>
          <p class="sm mute" style="margin-top:.5rem">A person who commits a body of tested knowledge to an early-stage company — at risk and for the long run — in the way an angel investor commits capital.</p>
        </div>
        <div class="note">
          <span class="kicker note__k">A note on the word “investor”</span>
          This is not angel investing, and nothing on this page claims a history of it. The investment is knowledge. Where terms exist, they are agreed company by company.
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Side by side', h: 'Same posture. Different currency.',
      lede: 'The comparison is deliberate. A knowledge investor takes the stance of an angel — early, exposed, patient — and changes only what is put in.' })}
    <div class="tbl-scroll rv" tabindex="0" role="region" aria-label="Angel investor and knowledge investor compared">
      <table class="tbl">
        <thead><tr><th scope="col"></th><th scope="col">Angel investor</th><th scope="col">Knowledge investor</th></tr></thead>
        <tbody>
          ${ki.compare.map(([k, a, b]) => `<tr><td>${k}</td><td>${a}</td><td>${b}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Three roles', h: 'Three depths of commitment.',
      lede: 'Not every company needs the same thing, and pretending otherwise is how advice turns into noise. Each company gets one of three roles, from lightest to deepest.' })}
    <div class="grid g-3" style="gap:clamp(1rem,2vw,1.5rem)" data-stagger="0.08">
      ${ki.roles.map((r, i) => `
        <div class="prog-card" style="--c:${r.c}">
          <div class="prog-card__top">
            <span class="idx">${String(i + 1).padStart(2, '0')}</span>
            ${r.meta.map(m => `<span class="chip">${m}</span>`).join('')}
          </div>
          <h3 class="d3" style="margin-top:1rem">${r.t}</h3>
          <p class="mono" style="margin-top:.5rem;color:${r.c}">${r.depth}</p>
          <p class="card__txt" style="margin-top:.7rem;max-width:46ch">${r.d}</p>
        </div>`).join('')}
    </div>
    <p class="sm mute mt rv" style="max-width:62ch">Terms are agreed company by company. Every company, and the role held in it, will be listed on <a href="https://nooru.ai" rel="noopener" target="_blank" style="border-bottom:1px solid var(--hair-str)">nooru.ai</a>.</p>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'What is invested', h: 'Six books, put to work.',
      lede: 'The knowledge is not a personality. It is written down, tested and graded — six methods at six altitudes, each with a free instrument a founder can run before any conversation.',
      cta: K.tlink('The Stack', '/the-stack/') })}
    <div class="rv">${K.stackLadder(stack)}</div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:start">
      <div class="rv">
        ${K.kicker('The goal')}
        <p class="pull" style="margin-top:1rem"><span lang="ta">நூறு</span> — one hundred <em>AI startups.</em></p>
        <p class="lede lede--wide mt">${ki.goal}</p>
      </div>
      <div class="rv" style="--d:.1s">
        ${K.kicker('The wider idea')}
        <h2 class="d3" style="margin-top:.75rem">One person can back a hundred companies. The idea is bigger than one person.</h2>
        <p class="lede lede--wide mt-sm">${ki.platform}</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-ink closing">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Two sites', h: 'Where this lives.',
      lede: 'The companies are on one. The movement will be on the other.' })}
    <div class="grid g-2" style="gap:clamp(1rem,2vw,1.5rem)" data-stagger="0.08">
      ${ki.sites.map(s => {
        const inner = `
          <div class="prog-card__top">
            <span class="mono" style="color:${s.c};font-weight:600">${s.k}</span>
            <span class="chip${s.live ? '' : ' chip--alert'}">${s.status}</span>
          </div>
          <h3 class="d3" style="margin-top:1rem">${s.domain}</h3>
          <p class="card__txt" style="margin-top:.7rem;max-width:46ch">${s.d}</p>
          <div class="prog-card__foot">
            <span class="mono faint">${s.live ? 'Visit' : 'Not yet live'}</span>
            ${s.live ? `<span class="stk__go">${K.icon.ext}</span>` : ''}
          </div>`;
        return s.live
          ? `<a class="prog-card card--link" href="https://${s.domain}" rel="noopener" target="_blank" style="--c:${s.c}">${inner}</a>`
          : `<div class="prog-card" style="--c:${s.c}">${inner}</div>`;
      }).join('')}
    </div>

    <div class="note mt-lg rv">
      <span class="kicker note__k">Disclosure, stated before anyone asks</span>
      nooru.ai is powered by <b>elan1</b>, which I founded. Neither nooru.ai nor knowledgeinvestor.org is counted among the four ventures on this site until it is a registered entity with its own live property.
    </div>

    <div class="flex ac wrapf gap-sm mt-lg rv">
      ${K.btn('Building an AI startup? Start a conversation', '/contact/', 'btn--brass btn--lg')}
      ${K.btn('Run a free instrument first', '/diagnostics/', 'btn--ghost btn--lg')}
    </div>
    <p class="xs faint mt">${site.lines.reject}</p>
  </div>
</section>`;
};
