const { site } = require('../data/site');
const { stack } = require('../data/stack');
const K = require('../kit');

module.exports = function boxedSet() {
  const available = stack.filter(b => b.status === 'available');
  const soon = stack.find(b => b.status === 'forthcoming');
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/' }, { label: 'The Elango Stack' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('The boxed set')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Five books,</span></span>
          <span><span>one argument,</span></span>
          <span><span class="d-it">one box.</span></span>
        </h1>
        <p class="lede lede--wide rv" style="--d:.35s;margin-top:1.5rem">
          The five published books in altitude order, in a slipcase printed with the ladder.
          <strong style="color:var(--fg)">The sixth ships to boxed-set buyers on publication, at no additional cost.</strong>
        </p>
        <div class="flex ac wrapf gap-sm rv mt-lg" style="--d:.45s">
          ${K.btn('Pre-order the set', '#order', 'btn--brass btn--lg')}
          ${K.btn('Read about the stack', '/the-stack/', 'btn--ghost btn--lg')}
        </div>
      </div>
      <div class="rv" style="--d:.28s">
        <div class="mark-box">
          <span class="kicker">In the box</span>
          <div class="outs" style="margin-top:1rem">
            ${available.map(b => `<div class="out"><span class="out__m"></span><span><strong style="color:var(--fg)">${b.title}</strong> — ${b.altitude}</span></div>`).join('')}
            <div class="out"><span class="out__m" style="border-color:var(--hair-str);background:none"></span>
              <span class="mute"><strong style="color:var(--fg-mute)">${soon.title}</strong> — ships on publication</span></div>
          </div>
          <div class="mark-box__cap">Plus the printed Ladder canvas and the Coherence Matrix pad.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="covers rv" style="grid-template-columns:repeat(5,minmax(0,1fr))">
      ${available.map(b => `<a class="cover-slot" href="/books/${b.slug}/" aria-label="${b.title}">
        ${K.cover(b, { w: 220 })}
        <span class="cover-meta"><span class="mono" style="color:${b.colour}">${b.altitude}</span>
        <span class="cover-ttl">${b.title}</span></span></a>`).join('')}
    </div>

    <div class="artgrid mt-xl">
      <div class="rv">
        ${K.kicker('Why a set')}
        <h2 class="d2" style="margin-top:1rem">Because it is one argument, not five.</h2>
        <p class="lede lede--wide mt-sm">Read individually these look like five business books on adjacent topics. Read in altitude order they are a single argument about structure, told at five heights — and the ladder printed on the slipcase is there so the order stays visible on the shelf.</p>
        <p class="sm mute mt">You do not have to read them in sequence. But knowing which altitude your problem lives at is the whole point of owning the set rather than one book.</p>
      </div>
      <aside class="aside-sticky rv" id="order">
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">The set</span>
          <p class="price" style="margin-top:.7rem">₹4,800</p>
          <p class="sm mute" style="margin-top:.5rem">Five books, slipcase, Ladder canvas, Coherence Matrix pad. Sixth book on publication.</p>
          <div style="margin-top:1rem">${K.fields([['Ships', 'India · 5–7 days'], ['International', 'On request'], ['Signed', 'On request, no charge']])}</div>
          <form class="sub" style="margin-top:1.1rem" data-form="boxed-set">
            <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
            <button class="btn btn--brass btn--sm btn--block" type="submit">Notify me when it ships</button>
          </form>
          <div class="mark-box__cap">Payments are not yet connected — Razorpay and Stripe need wiring before launch. This form records interest only.</div>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      <p class="pull">You do not need to read them in order.<br><em>You do need to know which altitude your problem lives at.</em></p>
      <div class="flex ac jc wrapf gap-sm mt-lg">
        ${K.btn('The Stack', '/the-stack/', 'btn--brass btn--lg')}
        ${K.btn('All books', '/books/', 'btn--ghost btn--lg')}
      </div>
    </div>
  </div>
</section>`;
};
