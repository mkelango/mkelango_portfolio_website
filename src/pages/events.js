const { site } = require('../data/site');
const { events } = require('../data/events');
const K = require('../kit');

module.exports = function eventsIndex() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Events' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Events')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>A date</span></span>
          <span><span class="d-it">and a room.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">If it has a date, it is an Event. Every one of these carries a city, a price, a seat count and a line saying what you leave with — and none of them carries a countdown timer.</p>
        <div class="mt">${K.btn('Full calendar', '/events/calendar/', 'btn--brass')}</div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="chiprow rv mb-lg" data-filter-group="#ev-list">
      <button class="chip" data-filter="all" aria-pressed="true">All</button>
      <button class="chip" data-filter="in-person" aria-pressed="false">In person</button>
      <button class="chip" data-filter="virtual" aria-pressed="false">Virtual</button>
      <button class="chip" data-filter="closed" aria-pressed="false">Closed room</button>
      <button class="chip" data-filter="family-business" aria-pressed="false">Family business</button>
      <button class="chip" data-filter="tamil" aria-pressed="false">தமிழ்</button>
    </div>

    <div id="ev-list" class="grid g-2" style="gap:clamp(1.25rem,2.5vw,2rem)" data-stagger="0.07">
      ${events.map(e => `
        <a class="prog-card card--link" href="/events/${e.slug}/" style="--c:${e.colour === '#F4F2EC' ? '#8E7130' : e.colour}" data-tags="${e.tags}">
          <div class="prog-card__top">
            <span class="idx">${e.n}</span>
            <span class="chip ${e.format === 'VIRTUAL' ? 'chip--live' : 'chip--brass'}">${e.format}</span>
            ${e.tamil ? '<span class="chip chip--live ta">தமிழ் + English</span>' : ''}
          </div>
          <h2 class="d3" style="margin-top:1rem">${e.title}</h2>
          <p class="card__txt" style="margin-top:.7rem;font-size:.9rem;max-width:48ch">${e.lede}</p>
          <p class="sm mute" style="margin-top:.9rem;max-width:48ch">
            <strong style="color:var(--fg)">You leave with:</strong> ${e.leaveWith}</p>
          <div style="margin-top:1.25rem">
            ${K.fields([['Next date', K.time(e.next.date, e.dateISO)], ['Place', e.next.place], ['Cadence', e.cadence], ['Price', e.price]])}
          </div>
          <div class="prog-card__foot">
            ${K.seats(e.seats)}
            <span class="stk__go">${K.icon.arr}</span>
          </div>
        </a>`).join('')}
      <p class="mute" data-empty hidden>Nothing matches that filter yet.</p>
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    <div class="artgrid artgrid--l">
      <aside class="aside-sticky rv">
        ${K.kicker('The rule')}
        <h2 class="d3" style="margin-top:.75rem">Real scarcity, stated plainly.</h2>
      </aside>
      <div class="rv" style="--d:.1s">
        <p class="lede lede--wide">Thirty seats means thirty seats. Twelve means twelve. Those numbers are printed on the page because they are true, and they are never dressed up with a timer or a “only 3 left!” banner.</p>
        <p class="sm mute mt">Manufactured urgency makes real scarcity look fake, which is an expensive trade for anyone whose entire proposition is that the numbers can be checked. Where a session sells out, the page says so. Where seats remain, the page says how many.</p>
        <div class="note note--live mt-lg">
          <span class="kicker note__k">Concessions</span>
          CCi Live carries a student rate and quiet concessions. They are not advertised as scarce and they are not
          a marketing device — if price is the reason you cannot come, write in.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper closing">
  <div class="wrap">
    <div class="tc rv" style="max-width:42rem;margin-inline:auto">
      <h2 class="d2">Nothing on the calendar that fits?</h2>
      <p class="lede mx-auto mt-sm" style="max-width:44ch">Programs run to a syllabus and Coaching runs to your agenda. Events are the only layer with a fixed date.</p>
      <div class="flex ac jc wrapf gap-sm mt">
        ${K.btn('Programs', '/programs/', 'btn--solid')}
        ${K.btn('Coaching', '/coaching/', 'btn--ghost')}
      </div>
    </div>
  </div>
</section>`;
};
