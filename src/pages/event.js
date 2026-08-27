const { site } = require('../data/site');
const { events } = require('../data/events');
const K = require('../kit');

const md = t => t.split('\n\n').map(p =>
  `<p>${p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>`).join('');

module.exports = function event(e) {
  const c = e.colour === '#F4F2EC' ? '#8E7130' : e.colour;
  const others = events.filter(x => x.slug !== e.slug).slice(0, 3);

  return `
<section class="phero on-ink" style="--c:${c}">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Events', href: '/events/' }, { label: e.title }])}
    <div class="phero__grid">
      <div>
        <div class="flex ac wrapf gap-sm mb-sm">
          <span class="chip ${e.format === 'VIRTUAL' ? 'chip--live' : 'chip--brass'}">${e.format}</span>
          <span class="mono" style="color:${c};font-weight:600">${e.kicker}</span>
        </div>
        <h1 class="d1 lines">
          ${K.headLines(e.title)}
        </h1>
        <p class="lede lede--wide rv" style="--d:.35s;margin-top:1.5rem">${e.lede}</p>
      </div>
      <div class="rv" style="--d:.28s">
        <div class="mark-box">
          <span class="kicker">What you leave with</span>
          <p class="body-lg" style="margin-top:.85rem">${e.leaveWith}</p>
          <div class="mark-box__cap">${K.seats(e.seats)}</div>
        </div>
      </div>
    </div>

    <dl class="specbar rv mt-lg" style="--d:.4s">
      ${K.field('Dates', K.time(e.dates, e.dateISO))}
      ${K.field('City', e.city)}
      ${K.field('Shape', e.shape)}
      ${K.field('Who it is for', e.who)}
      ${K.field('Price', `<span class="price">${e.price}</span>`)}
    </dl>
    <p class="xs faint mt-sm rv">${e.priceNote} ${e.venue}. As at ${site.asAt}.</p>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <div class="prose rv">
        <span class="kicker">The room</span>
        <h2 style="margin-top:.9rem">${e.shape}</h2>
        ${md(e.body)}
      </div>
      <aside class="aside-sticky rv">
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">Seats</span>
          <p style="margin-top:.8rem">${K.seats(e.seats)}</p>
          <div class="mark-box__cap">${e.seats.note || ''} No countdown timers on this site — real scarcity, stated plainly.</div>
        </div>
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">Register</span>
          <form class="f-grid" style="margin-top:.9rem" data-form="event-${e.slug}">
            <div class="f"><label for="rn-${e.slug}">Name</label><input id="rn-${e.slug}" name="name" autocomplete="name" required placeholder="Your name"></div>
            <div class="f"><label for="re-${e.slug}">Email</label><input id="re-${e.slug}" name="email" type="email" autocomplete="email" required placeholder="you@company.com"></div>
            <div class="f"><label for="ro-${e.slug}">Organisation</label><input id="ro-${e.slug}" name="organization" autocomplete="organization" placeholder="Group or company"></div>
            <button class="btn btn--brass btn--block" type="submit">${e.seats.open ? 'Request a seat' : 'Join the waiting list'}</button>
          </form>
          <div class="mark-box__cap">${e.price === 'By invitation' ? 'Invitation only. Requests are read, and answered either way.' : 'Payment is taken after the seat is confirmed, never before.'}</div>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The running order', h: 'Published in advance.',
      lede: 'You should be able to decide whether a day is worth your time from the agenda rather than from the promise.' })}
    <div class="phases">
      ${e.agenda.map(a => `<div class="phase rv">
        <span class="mono faint" style="padding-top:.2rem;white-space:nowrap">${a.t}</span>
        <div><p class="phase__t">${a.h}</p><p class="phase__d">${a.d}</p></div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:center">
      <div class="rv">
        <p class="pull">${e.leaveWith}</p>
      </div>
      <div class="rv" style="--d:.1s">
        <p class="lede lede--wide">Every event page on this site carries the same five things: a date, a city, a price, a seat count, and this line. If any of them is missing, the event is not ready to be sold.</p>
        <div class="flex ac wrapf gap-sm mt">
          ${K.btn('Full calendar', '/events/calendar/', 'btn--solid')}
          ${K.btn('All events', '/events/', 'btn--ghost')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Other rooms', h: 'A different shape of commitment.', cta: K.tlink('All events', '/events/') })}
    <div class="grid g-3" data-stagger="0.07">
      ${others.map(o => `<a class="card card--link inst-card" href="/events/${o.slug}/" style="--c:${o.colour === '#F4F2EC' ? '#8E7130' : o.colour}">
        <div class="card__body">
          <span class="chip ${o.format === 'VIRTUAL' ? 'chip--live' : 'chip--brass'}">${o.format}</span>
          <p class="card__ttl">${o.title}</p>
          <p class="card__txt">${o.shape}</p>
          <div class="card__foot"><span class="mono faint">${o.next.date}</span><span class="stk__go">${K.icon.arr}</span></div>
        </div></a>`).join('')}
    </div>
  </div>
</section>`;
};
