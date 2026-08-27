const { site } = require('../data/site');
const { programs } = require('../data/programs');
const { stack } = require('../data/stack');
const K = require('../kit');

module.exports = function programsIndex() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Programs' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Programs')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Six installations,</span></span>
          <span><span class="d-it">ordered by altitude.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">A Program has a curriculum and a defined outcome, and it runs again. That is the whole test. Everything here is priced as a published band — “contact for pricing” reads to a family office as <em>the price depends on how rich you look</em>.</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(1.25rem,2.5vw,2rem)" data-stagger="0.08">
      ${programs.map(p => {
        const b = stack.find(s => s.id === p.book);
        return `<a class="prog-card card--link" href="/programs/${p.slug}/" style="--c:${b.colour}">
          <div class="prog-card__top">
            <span class="idx">${p.n}</span>
            <span class="mono" style="color:${b.colour}">${b.altitude}</span>
            ${p.flagship ? '<span class="chip chip--brass">Lead offer</span>' : ''}
            ${p.volume ? '<span class="chip chip--live">Volume · தமிழ்</span>' : ''}
          </div>
          <h2 class="d3" style="margin-top:1rem">${p.title}</h2>
          <p class="card__txt" style="margin-top:.7rem;font-size:.9rem;max-width:46ch">${p.lede}</p>
          <div style="margin-top:1.25rem">
            ${K.fields([['Duration', p.duration], ['Cohort', p.cohort], ['Band', p.price]])}
          </div>
          <div class="prog-card__foot">
            <span class="mono faint">${p.kicker}</span>
            <span class="stk__go">${K.icon.arr}</span>
          </div>
        </a>`;
      }).join('')}
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    <div class="artgrid artgrid--l">
      <aside class="aside-sticky rv">
        ${K.kicker('The segregation rule')}
        <h2 class="d3" style="margin-top:.75rem">Divided by commitment shape, not by topic.</h2>
        <p class="sm mute mt-xs">Every one of these can be about the same framework. What separates them is what you are actually agreeing to.</p>
      </aside>
      <div class="rv" style="--d:.1s">
        <div class="tbl-scroll" tabindex="0" role="region" aria-label="Comparison table">
          <table class="tbl">
            <thead><tr><th scope="col">Section</th><th scope="col">The test</th><th scope="col">You commit to</th><th scope="col">Duration</th><th scope="col">Band</th></tr></thead>
            <tbody>
              <tr><td>Programs</td><td>Has a curriculum and a defined outcome. Runs again.</td><td>A transformation with a syllabus</td><td>6 weeks – 12 months</td><td>₹2L – ₹2cr</td></tr>
              <tr><td><a href="/events/">Events</a></td><td>Has a date and a room. Happens once.</td><td>Showing up</td><td>Half a day – 2 days</td><td>Free – ₹2.5L</td></tr>
              <tr><td><a href="/coaching/">Coaching</a></td><td>Has me in it, personally, repeatedly.</td><td>Access</td><td>12 months, renewable</td><td>₹25L – ₹1cr+/yr</td></tr>
            </tbody>
          </table>
        </div>
        <p class="spine mt-lg" style="max-width:52ch">If it has a syllabus, it’s a Program. If it has a date, it’s an Event. If it has me, it’s Coaching.</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Before a programme', h: 'Run the instrument first. It is free.',
      lede: 'Every programme has a diagnostic attached to it. Running the free version first means the first working session starts from a reading rather than from an introduction — and occasionally it means you discover you need a different altitude entirely.',
      cta: K.tlink('All six instruments', '/diagnostics/') })}

    <div class="grid g-3" data-stagger="0.07">
      ${[
        ['The AQ Score', '/diagnostics/aq-score/', 'The Accelerated Organization Program', '#2FA592'],
        ['The Flywheel Locator', '/diagnostics/flywheel-locator/', 'AI Flywheel: The 90-Day Start', '#5B8DEF'],
        ['Do You Actually Have a Moonshot?', '/diagnostics/moonshot-test/', 'The Moonshot Intensive', '#C8A24A'],
        ['The Coherence Matrix, lite', '/diagnostics/coherence-matrix/', 'The Coherence Audit', '#B4472E'],
        ['The Three Questions', '/diagnostics/three-questions/', 'goal1 Installation', '#B4472E'],
        ['The CCi Readiness Assessment', '/diagnostics/cci-readiness/', 'The CCi Sprint', '#8E7130']
      ].map(([t, h, p, c]) => `
        <a class="card card--link inst-card" href="${h}" style="--c:${c}">
          <div class="card__body">
            <span class="chip chip--free">Free · instant</span>
            <p class="card__ttl">${t}</p>
            <div class="card__foot"><span class="mono faint">→ ${p}</span></div>
          </div>
        </a>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      <p class="pull">Not another framework.<br><em>Five instruments you can run tonight.</em></p>
      <div class="flex ac jc wrapf gap-sm mt-lg">
        ${K.btn('Start a conversation', '/contact/', 'btn--brass btn--lg')}
        ${K.btn('The Stack', '/the-stack/', 'btn--ghost btn--lg')}
      </div>
      <p class="mono faint mt">${site.lines.reject}</p>
    </div>
  </div>
</section>`;
};
