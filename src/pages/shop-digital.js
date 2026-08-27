const { site } = require('../data/site');
const { shopDigital } = require('../data/misc');
const K = require('../kit');

module.exports = function shopDigitalPage() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/' }, { label: 'Digital' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Digital')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>What sits under</span></span>
          <span><span class="d-it">the free score.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">The diagnostics are free and always will be. These are the layer beneath — full benchmark sets with sources, implementation packs, mission libraries, and two programmes in self-paced form.</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="ledger">
      ${shopDigital.map((i, n) => K.lrow({
        n: String(n + 1).padStart(2, '0'),
        title: i.name, desc: i.line,
        meta: [i.tag, 'Instant download'],
        right: `<span class="price" style="font-size:1.3rem">${i.price}</span>`
      })).join('')}
    </div>
    <div class="note note--live mt-lg rv">
      <span class="kicker note__k">What stays free, permanently</span>
      All six diagnostics, the score, the benchmark, the method and the band reading. The paid report is
      <em>more</em> — it is never the same thing behind a wall.
    </div>
    <div class="note note--alert mt-sm rv">
      <span class="kicker note__k">Before launch</span>
      <b>Payments are not yet connected.</b> Prices above are the intended bands as at ${site.asAt}.
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:42rem;margin-inline:auto">
      <p class="pull">The score is free.<br><em>The report is more, not the same thing behind a wall.</em></p>
      <div class="flex ac jc wrapf gap-sm mt-lg">
        ${K.btn('Take the AQ Score', '/diagnostics/aq-score/', 'btn--brass btn--lg')}
        ${K.btn('Printed instruments', '/shop/instruments/', 'btn--ghost btn--lg')}
      </div>
    </div>
  </div>
</section>`;
};
