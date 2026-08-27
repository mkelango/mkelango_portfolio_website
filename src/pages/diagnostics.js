const { site } = require('../data/site');
const { diagnostics } = require('../data/diagnostics');
const { byId } = require('../data/stack');
const K = require('../kit');

module.exports = function diagnosticsIndex() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore/' }, { label: 'Diagnostics' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('The instruments')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Don’t take my</span></span>
          <span><span>word for it.</span></span>
          <span><span class="d-it">Run the tests.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">Six instruments, one per book. Free, instant, and playable on the page. There is no email gate to start one — the gate sits on the detailed report, after you already have your answer.</p>
        <div class="flex ac wrapf gap-sm mt">
          <span class="chip chip--free">No account</span>
          <span class="chip chip--free">No email to start</span>
          <span class="chip chip--free">Score shown in full</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(1.25rem,2.5vw,2rem)" data-stagger="0.07">
      ${diagnostics.map(d => {
        const b = byId[d.book];
        return `<a class="prog-card card--link" href="/diagnostics/${d.slug}/" style="--c:${d.colour}">
          <div class="prog-card__top">
            <span class="idx">${d.n}</span>
            <span class="chip chip--free">Free</span>
            ${d.primary ? '<span class="chip chip--brass">Start here</span>' : ''}
            ${d.tamil ? '<span class="chip ta">தமிழ்</span>' : ''}
          </div>
          <h2 class="d3" style="margin-top:1rem">${d.title}</h2>
          <p class="card__txt" style="margin-top:.7rem;font-size:.92rem;max-width:46ch">${d.lede}</p>
          <div style="margin-top:1.25rem">
            ${K.fields([['Length', d.time], ['From', b.title], ['Altitude', b.altitude]])}
          </div>
          <div class="prog-card__foot">
            <span class="mono faint">Run it now</span>
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
        ${K.kicker('How the free layer works')}
        <h2 class="d3" style="margin-top:.75rem">Two jobs, stated openly.</h2>
      </aside>
      <div class="rv" style="--d:.1s">
        <div class="ledger">
          ${[
            ['01', 'The diagnostic produces a score, which produces a gap', 'A gap is a reason to read the book — and occasionally a reason not to buy anything at all, which is a legitimate outcome and the pages say so.'],
            ['02', 'The score is stored, so the second one means something', 'If you score AQ 22 with nine business units and take the Coherence test six months later, that sequence is visible. It is why the reports get better the more of these you run.'],
            ['03', 'No email gate at entry, ever', 'You see the score, the benchmark and the method without giving anything. The email is asked for at the report, which is a fair trade because the report is genuinely more.'],
            ['04', 'Your score is never published, sold or shared', 'Not aggregated into a press release, not used in a case study, not attached to your name anywhere.']
          ].map(([n, t, d]) => K.lrow({ n, title: t, desc: d })).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper closing">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      <p class="pull">Not another framework.<br><em>Six instruments you can run tonight.</em></p>
      <div class="flex ac jc wrapf gap-sm mt-lg">
        ${K.btn('Start with the AQ Score', '/diagnostics/aq-score/', 'btn--solid btn--lg')}
        ${K.btn('The Stack', '/the-stack/', 'btn--ghost btn--lg')}
      </div>
      <p class="mono faint mt">${site.lines.weakest}</p>
    </div>
  </div>
</section>`;
};
