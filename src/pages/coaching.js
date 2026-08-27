const { site } = require('../data/site');
const { coaching } = require('../data/coaching');
const K = require('../kit');

module.exports = function coachingIndex() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Coaching' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Coaching')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Six seats.</span></span>
          <span><span>That is the entire</span></span>
          <span><span class="d-it">coaching practice.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">If it has me in it, personally and repeatedly, it is Coaching. There is no curriculum — it is your agenda, not mine. Scarcity here is not a technique. It is arithmetic.</p>
        <p class="mt-sm">${K.seats(coaching[0].seats)}</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid" style="gap:clamp(1.25rem,2.5vw,2rem)" data-stagger="0.08">
      ${coaching.map((c, i) => `
        <a class="prog-card card--link" href="/coaching/${c.slug}/" style="--c:${['#C8A24A', '#2FA592', '#8E7130'][i]}">
          <div class="prog-card__top">
            <span class="idx">${c.n}</span>
            <span class="mono" style="color:${['#8E7130', '#1F7A6C', '#8E7130'][i]}">${c.kicker}</span>
          </div>
          <div class="grid g-2" style="gap:clamp(1.25rem,3vw,3rem);margin-top:1rem;align-items:start">
            <div>
              <h2 class="d3">${c.title}</h2>
              <p class="card__txt" style="margin-top:.7rem;font-size:.92rem;max-width:44ch">${c.lede}</p>
            </div>
            <div>
              ${K.fields([['Volume', c.volume], ['Register', c.register], ['Band', `<span style="font-weight:560">${c.priceShort}</span>`], ['Term', c.duration]])}
            </div>
          </div>
          <div class="prog-card__foot">
            ${c.seats.total ? K.seats(c.seats) : '<span class="seats">Open cohort · certification twice a year</span>'}
            <span class="stk__go">${K.icon.arr}</span>
          </div>
        </a>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    <div class="artgrid artgrid--l">
      <aside class="aside-sticky rv">
        ${K.kicker('The arithmetic')}
        <h2 class="d3" style="margin-top:.75rem">Why six, and why it stays six.</h2>
      </aside>
      <div class="rv" style="--d:.1s">
        <p class="lede lede--wide">A bench of coaches selling packages would destroy the family-office positioning inside a year. So the one-to-one tier is capped at a number I can actually hold in my head, and the leverage comes from somewhere else.</p>
        <p class="sm mute mt">There is a harder version of this argument that is worth stating in public: <strong style="color:var(--fg)">if coaching is more than forty per cent of revenue, this is not a business — it is a job with good margins, capped by my calendar.</strong> The Programs layer, delivered by Certified Practitioners under licence, is what makes it a business. That was designed in from day one rather than discovered in year three.</p>

        <div class="grid g-3 mt-lg" style="gap:1rem">
          ${[['Coaching', 'Capped by the calendar. Six seats, ever.'],
             ['Programs', 'Delivered under licence by certified practitioners. This is the scalable layer.'],
             ['Instruments', 'Free at the top, paid reports below. No calendar involved at all.']]
            .map(([t, d]) => `<div class="mark-box"><span class="kicker">${t}</span><p class="sm mute" style="margin-top:.6rem">${d}</p></div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'What I do not do', h: 'Stated before you ask.',
      lede: 'Each of these is a structural position rather than a preference, which means it does not move for a large enough number.' })}
    <div class="ledger">
      ${[
        ['01', 'I hold no equity in client groups', 'And take no transaction fees. The moment I am paid on a transaction, my opinion on whether you should do the transaction is worth nothing.'],
        ['02', 'I do not take operating roles', 'If what the group needs is someone to run something, that is a hire, not an advisor. Confusing the two costs the group a year.'],
        ['03', 'I do not run a coaching business in the volume sense', 'No bench, no packages, no tiered membership. Three tiers, published seat counts, and a waiting list that is honest about its length.'],
        ['04', 'I do not advise competitors simultaneously', 'Within a defined category and geography, one client. It is written into the agreement rather than promised in a meeting.']
      ].map(([n, t, d]) => K.lrow({ n, title: t, desc: d })).join('')}
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      <p class="pull">If you are building something that will take twenty years, you need one person who will tell you <em>when the ladder is wrong.</em></p>
      <div class="flex ac jc wrapf gap-sm mt-lg">
        ${K.btn("Apply — The Founder's Table", '/coaching/founders-table/', 'btn--brass btn--lg')}
        ${K.btn('Start a conversation', '/contact/', 'btn--ghost btn--lg')}
      </div>
      <p class="mono faint mt">${site.lines.reject}</p>
    </div>
  </div>
</section>`;
};
