const { site } = require('../data/site');
const { stack } = require('../data/stack');
const K = require('../kit');

module.exports = function booksIndex() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/' }, { label: 'Books' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('The books')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Six books.</span></span>
          <span><span class="d-it">One argument.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">Ordered by altitude, not by publication date. Each one answers a single question at a single height, and each one ships with a free instrument you can run on this website.</p>
        <div class="mt">${K.tlink('How the stack works', '/the-stack/')}</div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid" style="gap:clamp(1rem,2vw,1.5rem)" data-stagger="0.06">
      ${stack.map(b => `
        <article class="alt-row" style="--c:${b.colour}">
          <div class="alt-row__l">
            <span class="mono" style="color:${b.colour};font-weight:600">${b.altitude}</span>
            <span class="mono faint" style="letter-spacing:.06em;text-transform:none">${b.horizon}</span>
            ${b.status === 'forthcoming' ? '<span class="chip chip--alert">Forthcoming</span>' : ''}
          </div>
          <div class="alt-row__m">
            <h2 class="d3">${b.title}</h2>
            <p class="sm mute" style="margin-top:.55rem;max-width:60ch">${b.prop}</p>
            <p class="sm mute" style="margin-top:.7rem;max-width:60ch"><strong style="color:var(--fg)">Answers:</strong> ${b.question}</p>
            <div class="flex ac wrapf gap mt-sm">
              ${K.tlink('The book', `/books/${b.slug}/`)}
              ${b.instrument ? K.tlink('The free instrument', `/diagnostics/${b.instrument}/`) : ''}
            </div>
          </div>
          <div class="alt-row__r">
            <a href="/books/${b.slug}/" aria-label="${b.title}">${K.cover(b, { w: 150 })}</a>
          </div>
        </article>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:center">
      <div class="rv">
        <p class="pull">Five books, one argument.<br><em>Read at five altitudes.</em></p>
      </div>
      <div class="rv" style="--d:.1s">
        <p class="lede lede--wide">The boxed set collects the five published books. The sixth ships to boxed-set buyers on publication, at no additional cost.</p>
        <div class="flex ac wrapf gap-sm mt">
          ${K.btn('The Elango Stack — boxed set', '/shop/the-stack/', 'btn--brass btn--lg')}
          ${K.btn('The instruments', '/diagnostics/', 'btn--ghost btn--lg')}
        </div>
      </div>
    </div>
  </div>
</section>`;
};
