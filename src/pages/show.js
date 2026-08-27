const { site } = require('../data/site');
const { showEpisodes } = require('../data/misc');
const K = require('../kit');
const SEO = require('../seo');

module.exports = function show() {
  const layers = [...new Set(showEpisodes.map(e => e.layer))];
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore/' }, { label: 'The Inevitable' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('The show')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Conversations with</span></span>
          <span><span>people who made</span></span>
          <span><span class="d-it">something certain.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">Founders, chairmen, and one recurring format: <em>show me your portfolio and I’ll show you what it’s actually optimising for.</em> Nobody comes on to promote anything.</p>
        <div class="flex ac wrapf gap-sm mt">
          <span class="chip">Monthly</span><span class="chip">40–60 min</span><span class="chip">Audio + transcript</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="chiprow rv mb-lg" data-filter-group="#ep-list">
      <button class="chip" data-filter="all" aria-pressed="true">All</button>
      ${layers.map(l => `<button class="chip" data-filter="${l.toLowerCase()}" aria-pressed="false">${l}</button>`).join('')}
    </div>
    <div id="ep-list" class="ledger">
      ${showEpisodes.map(e => `
        <div class="ep rv" data-tags="${e.layer.toLowerCase()}">
          <span class="ep__p" aria-hidden="true">${K.icon.play}</span>
          <div>
            <div class="flex ac wrapf gap-sm" style="margin-bottom:.4rem">
              <span class="mono faint">EP ${e.n}</span>
              <span class="chip">${e.layer}</span>
              ${K.time(e.date, SEO.isoDate(e.date), "mono faint")}<span class="mono faint">· ${e.len}</span>
            </div>
            <p class="lrow__t" style="font-size:1.1rem">${e.title}</p>
            <p class="lrow__d">${e.dek}</p>
            <p class="xs faint" style="margin-top:.5rem">${e.guest}</p>
          </div>
          <span class="chip chip--live nowrap">Listen</span>
        </div>`).join('')}
      <p class="mute mt" data-empty hidden>No episodes at that altitude yet.</p>
    </div>
    <div class="note note--live mt-lg rv">
      <span class="kicker note__k">Guest consent</span>
      Guests are named where they have consented and described by role and city where they have not.
      No episode is published without the guest reading the transcript first — including the parts they got wrong.
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      <p class="pull">Show me your portfolio and I’ll show you <em>what it’s actually optimising for.</em></p>
      <p class="lede mx-auto mt-lg" style="max-width:42ch">New episodes are announced in the newsletter first.</p>
      <form class="sub jc mt" data-form="show-newsletter" style="max-width:30rem;margin-inline:auto">
        <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
        <button class="btn btn--brass" type="submit">Subscribe</button>
      </form>
    </div>
  </div>
</section>`;
};
