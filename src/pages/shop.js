const { site } = require('../data/site');
const { stack } = require('../data/stack');
const { shopInstruments, shopDigital } = require('../data/misc');
const K = require('../kit');

module.exports = function shop() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Shop' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Shop')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>A thing that ships</span></span>
          <span><span class="d-it">or downloads.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">Books, printed instruments, and the paid reports. Nothing here is merchandise — no supplements, no apparel, no branded water bottle. Every item is something you use on a problem.</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Books', h: 'Six books, ordered by altitude.', cta: K.tlink('All books', '/books/') })}
    <div class="covers rv">
      ${stack.map(b => `<a class="cover-slot ${b.flagship ? 'is-flag' : ''}" href="/books/${b.slug}/" aria-label="${b.title}">
        ${K.cover(b, { w: b.flagship ? 300 : 240 })}
        <span class="cover-meta">
          <span class="mono" style="color:${b.colour}">${b.altitude}</span>
          <span class="cover-ttl">${b.title}</span>
          ${b.status === 'forthcoming' ? '<span class="chip">Forthcoming</span>' : ''}
        </span></a>`).join('')}
    </div>
    <div class="mt-lg rv">
      ${K.btn('The Elango Stack — boxed set', '/shop/the-stack/', 'btn--solid btn--lg')}
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Instruments', h: 'Printed. Because these get written on.',
      lede: 'Every framework in the stack has a physical worksheet. They exist because a matrix filled in by hand at a board table is treated differently from one on a screen.',
      cta: K.tlink('All instruments', '/shop/instruments/') })}
    <div class="grid g-3" data-stagger="0.06">
      ${shopInstruments.slice(0, 3).map(i => `<div class="card">
        <div class="card__body">
          <span class="mono faint">${i.tag}</span>
          <p class="card__ttl">${i.name}</p>
          <p class="card__txt">${i.line}</p>
          <div class="card__foot"><span class="price" style="font-size:1.25rem">${i.price}</span><span class="chip">Ships in India</span></div>
        </div></div>`).join('')}
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Digital', h: 'The reports below the free score.',
      lede: 'The diagnostics are free and always will be. These are what sits underneath them — the full benchmark sets, the implementation packs, and the self-paced versions of two programmes.',
      cta: K.tlink('All digital', '/shop/digital/') })}
    <div class="grid g-3" data-stagger="0.06">
      ${shopDigital.slice(0, 3).map(i => `<div class="card">
        <div class="card__body">
          <span class="mono faint">${i.tag}</span>
          <p class="card__ttl">${i.name}</p>
          <p class="card__txt">${i.line}</p>
          <div class="card__foot"><span class="price" style="font-size:1.25rem">${i.price}</span><span class="chip chip--live">Instant</span></div>
        </div></div>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap wrap--wide">
    <div class="note note--alert rv">
      <span class="kicker note__k">Before launch</span>
      <b>Payments are not yet connected.</b> Razorpay for domestic and Stripe for international need wiring,
      along with ISBNs on the retail links and a shipping rate card for the printed instruments.
      Nothing on this page can currently be bought, and it says so rather than failing at a checkout.
    </div>
    <div class="tc rv mt-xl" style="max-width:42rem;margin-inline:auto">
      <p class="pull">No supplements. No merchandise.<br><em>Instruments and workbooks.</em></p>
    </div>
  </div>
</section>`;
};
