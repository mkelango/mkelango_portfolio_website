const { site } = require('../data/site');
const { ideas } = require('../data/misc');
const K = require('../kit');

module.exports = function ideasIndex() {
  const layers = [...new Set(ideas.map(i => i.layer))];
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore/' }, { label: 'Ideas' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Ideas')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>One structural</span></span>
          <span><span>argument each.</span></span>
          <span><span class="d-it">Not blog posts.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">A fortnightly essay that has to earn its own existence. No listicles, no news reaction, no content calendar filling itself. If there is no mechanism to explain, nothing goes out.</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="chiprow rv mb-lg" data-filter-group="#ideas-list">
      <button class="chip" data-filter="all" aria-pressed="true">All</button>
      ${layers.map(l => `<button class="chip" data-filter="${l.toLowerCase()}" aria-pressed="false">${l}</button>`).join('')}
    </div>

    <div id="ideas-list" class="ledger">
      ${ideas.map((i, n) => `
        <a class="lrow rv" href="/ideas/${i.slug}/" data-tags="${i.layer.toLowerCase()}">
          <span class="idx">${String(ideas.length - n).padStart(2, '0')}</span>
          <div>
            <p class="lrow__t" style="font-size:1.28rem;font-family:var(--f-display);font-weight:350;letter-spacing:-.03em">${i.title}</p>
            <p class="lrow__d">${i.dek}</p>
            <div class="lrow__meta">
              <span class="chip">${i.layer}</span>
              <span class="chip">${i.read}</span>
              <span class="chip">${K.time(i.date, require("../seo").isoDate(i.date))}</span>
            </div>
          </div>
          <div><span class="stk__go">${K.icon.arr}</span></div>
        </a>`).join('')}
      <p class="mute mt" data-empty hidden>Nothing under that altitude yet.</p>
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      <p class="pull">One mechanism, explained well enough to <em>use on Monday.</em></p>
      <form class="sub jc mt-lg" data-form="subscribe" data-ref="ideas" style="max-width:30rem;margin-inline:auto">
        <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
        <button class="btn btn--brass" type="submit">Get it on Tuesdays</button>
      ${K.honeypot()}
      </form>
      <p class="xs faint mt-sm">${site.lines.reject}</p>
    </div>
  </div>
</section>`;
};
