const { site } = require('../data/site');
const { ideas } = require('../data/misc');
const { byId } = require('../data/stack');
const K = require('../kit');
const SEO = require('../seo');

const md = t => t.split('\n\n').map(p => {
  const h = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')
             .replace(/\[B — (.+?)\]/g, (m, note) => K.etag('B', note));
  return `<p>${h}</p>`;
}).join('');

module.exports = function idea(i) {
  const b = byId[i.book];
  const others = ideas.filter(x => x.slug !== i.slug).slice(0, 3);
  return `
<section class="phero on-ink" style="--c:${b.colour}">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Ideas', href: '/ideas/' }, { label: i.layer }])}
    <div style="max-width:46rem">
      <div class="flex ac wrapf gap-sm mb-sm">
        <span class="mono" style="color:${b.colour};font-weight:600">${i.layer}</span>
        ${K.time(i.date, SEO.isoDate(i.date), "mono faint")}
        <span class="mono faint">${i.read}</span>
      </div>
      <h1 class="d1 lines">${K.headLines(i.title)}</h1>
      <p class="lede lede--wide rv" style="--d:.35s;margin-top:1.5rem;max-width:52ch">${i.dek}</p>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <article class="prose rv" itemscope itemtype="https://schema.org/Article">${md(i.body)}</article>
      <aside class="aside-sticky rv">
        <a class="card card--link" href="/books/${b.slug}/">
          <div class="card__body">
            <span class="kicker">The book this comes from</span>
            <div style="margin:.6rem 0">${K.cover(b, { w: 132 })}</div>
            <p class="card__ttl">${b.title}</p>
            <div class="card__foot"><span class="mono faint">${b.altitude}</span><span class="stk__go">${K.icon.arr}</span></div>
          </div>
        </a>
        ${b.instrument ? `<a class="card card--link inst-card" href="/diagnostics/${b.instrument}/" style="--c:${b.colour}">
          <div class="card__body">
            <span class="chip chip--free">Free instrument</span>
            <p class="card__ttl">Run it on your own organisation</p>
            <div class="card__foot"><span class="mono faint">Instant</span><span class="stk__go">${K.icon.arr}</span></div>
          </div></a>` : ''}
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">The Inevitable, weekly</span>
          <p class="sm mute" style="margin-top:.6rem">One structural idea, every Tuesday.</p>
          <form class="sub" style="margin-top:.9rem" data-form="idea-${i.slug}">
            <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
            <button class="btn btn--brass btn--sm btn--block" type="submit">Subscribe</button>
          </form>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Keep reading', h: 'Other arguments.', cta: K.tlink('All essays', '/ideas/') })}
    <div class="grid g-3" data-stagger="0.07">
      ${others.map(o => `<a class="card card--link" href="/ideas/${o.slug}/">
        <div class="card__body">
          <span class="mono faint">${o.layer}</span>
          <p class="card__ttl">${o.title}</p>
          <p class="card__txt">${o.dek}</p>
          <div class="card__foot"><span class="mono faint">${o.read}</span><span class="stk__go">${K.icon.arr}</span></div>
        </div></a>`).join('')}
    </div>
  </div>
</section>`;
};
