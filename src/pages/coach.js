const { site } = require('../data/site');
const { coaching } = require('../data/coaching');
const K = require('../kit');

const md = t => t.split('\n\n').map(p =>
  `<p>${p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>`).join('');

module.exports = function coach(c) {
  const idx = coaching.findIndex(x => x.slug === c.slug);
  const colour = ['#C8A24A', '#2FA592', '#8E7130'][idx];
  const others = coaching.filter(x => x.slug !== c.slug);

  return `
<section class="phero on-ink" style="--c:${colour}">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Coaching', href: '/coaching/' }, { label: c.title }])}
    <div class="phero__grid">
      <div>
        <span class="mono" style="color:${colour};font-weight:600">${c.kicker}</span>
        <h1 class="d1 lines" style="margin-top:1rem">
          ${K.headLines(c.title)}
        </h1>
        <p class="lede lede--wide rv" style="--d:.35s;margin-top:1.5rem">${c.lede}</p>
      </div>
      <div class="rv" style="--d:.28s">
        <div class="mark-box">
          <span class="kicker">Availability</span>
          <p class="d3" style="margin-top:.8rem">${c.volume}</p>
          <p style="margin-top:.9rem">${c.seats.total ? K.seats(c.seats) : '<span class="seats">Open cohort · two certifications a year</span>'}</p>
          <div class="mark-box__cap">Scarcity is the product. The number is printed because it is true.</div>
        </div>
      </div>
    </div>

    <dl class="specbar rv mt-lg" style="--d:.4s">
      ${K.field('Term', c.duration)}
      ${K.field('Register', c.register)}
      ${K.field('Band', `<span class="price">${c.price}</span>`)}
      ${K.field('Volume', c.volume)}
    </dl>
    <p class="xs faint mt-sm rv">${c.priceNote} Bands as at ${site.asAt}.</p>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(1.5rem,4vw,3.5rem)">
      <div class="mark-box rv" style="background:var(--surface)">
        <span class="kicker">Who it is for</span>
        <p class="body-lg" style="margin-top:.85rem">${c.forWhom}</p>
      </div>
      <div class="mark-box rv" style="--d:.1s;background:var(--surface);border-left:2px solid var(--sienna)">
        <span class="kicker" style="color:var(--sienna)">Who it is not for</span>
        <p class="body-lg" style="margin-top:.85rem">${c.notFor}</p>
      </div>
    </div>

    <div class="artgrid mt-xl">
      <div class="prose rv">
        <span class="kicker">What it actually is</span>
        <h2 style="margin-top:.9rem">No curriculum. That is the definition of the tier.</h2>
        ${md(c.body)}
      </div>
      <aside class="aside-sticky rv">
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">The shape</span>
          <div class="outs" style="margin-top:1rem">
            ${c.what.map(w => `<div class="out"><span class="out__m"></span><span><strong style="color:var(--fg)">${w.t}</strong> — ${w.d}</span></div>`).join('')}
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <div class="rv">
        ${K.kicker('Apply')}
        <h2 class="d2" style="margin-top:1rem">Four things, honestly stated.</h2>
        <p class="lede lede--wide mt-sm">There is no application fee and no discovery call script. These four answers tell me whether this is the right tier — and if it is not, I will say which one is, including when the answer is “none of them yet”.</p>

        <div class="ledger mt-lg">
          ${c.apply.map((a, i) => K.lrow({ n: String(i + 1).padStart(2, '0'), title: a })).join('')}
        </div>

        <form class="f-grid mt-lg" data-form="coaching-${c.slug}">
          <div class="grid g-2" style="gap:1.05rem">
            <div class="f"><label for="cn-${c.slug}">Name</label><input id="cn-${c.slug}" name="name" autocomplete="name" required placeholder="Your name"></div>
            <div class="f"><label for="ce-${c.slug}">Email</label><input id="ce-${c.slug}" name="email" type="email" autocomplete="email" required placeholder="you@company.com"></div>
          </div>
          <div class="grid g-2" style="gap:1.05rem">
            <div class="f"><label for="co-${c.slug}">Group or company</label><input id="co-${c.slug}" name="organization" autocomplete="organization" required placeholder="Entity name"></div>
            <div class="f"><label for="cr-${c.slug}">Your role</label><input id="cr-${c.slug}" name="jobTitle" autocomplete="organization-title" required placeholder="Principal, chairman, founder…"></div>
          </div>
          <div class="f">
            <label for="cq1-${c.slug}">${c.apply[0]}</label>
            <textarea id="cq1-${c.slug}" required></textarea>
          </div>
          <div class="f">
            <label for="cq2-${c.slug}">${c.apply[2]}</label>
            <textarea id="cq2-${c.slug}" required></textarea>
          </div>
          <div class="flex ac wrapf gap-sm">
            <button class="btn btn--brass btn--lg" type="submit">Submit an application</button>
            <span class="xs faint">Every application is read and answered, including the declines.</span>
          </div>
        </form>
      </div>

      <aside class="aside-sticky rv">
        <div class="mark-box">
          <span class="kicker">Seats</span>
          <p style="margin-top:.8rem">${c.seats.total ? K.seats(c.seats) : '<span class="seats">Open cohort</span>'}</p>
          <div class="mark-box__cap">When a tier is full, this page says full. There is no hidden capacity that appears for the right number.</div>
        </div>
        <div class="mark-box">
          <span class="kicker">Structural positions</span>
          <p class="sm mute" style="margin-top:.7rem">No equity in client groups. No transaction fees. No operating roles. One client per category and geography, written into the agreement.</p>
          <div class="mark-box__cap">${K.tlink('Why', '/coaching/')}</div>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="band on-paper closing">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The other tiers', h: 'A different shape of access.', cta: K.tlink('All three tiers', '/coaching/') })}
    <div class="grid g-2" data-stagger="0.07">
      ${others.map(o => `<a class="card card--link" href="/coaching/${o.slug}/">
        <div class="card__body">
          <span class="kicker">${o.kicker}</span>
          <p class="card__ttl">${o.title}</p>
          <p class="card__txt">${o.lede}</p>
          <div class="card__foot"><span class="mono faint">${o.volume}</span><span class="stk__go">${K.icon.arr}</span></div>
        </div></a>`).join('')}
    </div>
  </div>
</section>`;
};
