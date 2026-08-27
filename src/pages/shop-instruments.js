const { site } = require('../data/site');
const { shopInstruments } = require('../data/misc');
const K = require('../kit');

module.exports = function shopInstrumentsPage() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/' }, { label: 'Instruments' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Instruments')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Printed, because</span></span>
          <span><span class="d-it">these get written on.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">A matrix filled in by hand at a board table is treated differently from one on a screen. That is the entire reason these exist in paper.</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="ledger">
      ${shopInstruments.map((i, n) => K.lrow({
        n: String(n + 1).padStart(2, '0'),
        title: i.name, desc: i.line,
        meta: [i.tag, 'Ships in India'],
        right: `<span class="price" style="font-size:1.3rem">${i.price}</span>`
      })).join('')}
    </div>
    <div class="note note--alert mt-lg rv">
      <span class="kicker note__k">Before launch</span>
      <b>Payments and shipping are not yet connected.</b> Razorpay for domestic, Stripe for international,
      and a published rate card for print shipping. Prices above are the intended bands as at ${site.asAt}.
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:42rem;margin-inline:auto">
      <h2 class="d2">Run the digital version first. It is free.</h2>
      <p class="lede mx-auto mt-sm" style="max-width:44ch">Every printed instrument here has a free playable version on the site. Buy the pad when you want the room to fill it in together.</p>
      <div class="flex ac jc wrapf gap-sm mt">
        ${K.btn('The six instruments', '/diagnostics/', 'btn--brass btn--lg')}
        ${K.btn('Digital', '/shop/digital/', 'btn--ghost btn--lg')}
      </div>
    </div>
  </div>
</section>`;
};
