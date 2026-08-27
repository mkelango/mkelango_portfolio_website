const { site } = require('../data/site');
const { events } = require('../data/events');
const K = require('../kit');

/* Twelve months from September 2026. Marks are derived from the event data. */
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/* Contiguous days read as a range; separate dates read as a list. */
function dayLabel(days) {
  if (days.length === 1) return String(days[0]);
  const contiguous = days.every((d, i) => i === 0 || d === days[i - 1] + 1);
  return contiguous ? `${days[0]}–${days[days.length - 1]}` : days.join(' & ');
}

function monthGrid(y, m, marks) {
  const first = new Date(Date.UTC(y, m, 1)).getUTCDay();
  const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push('<span class="cal__d out"></span>');
  for (let d = 1; d <= days; d++) {
    const hit = marks.find(x => x.days.includes(d));
    cells.push(`<span class="cal__d ${hit ? 'on' : ''}" ${hit ? `style="--cd:${hit.colour}" title="${K.esc(hit.title)}"` : ''}>${d}</span>`);
  }
  return `<div class="cal__g">${DOW.map(d => `<span class="cal__dn">${d}</span>`).join('')}${cells.join('')}</div>`;
}

module.exports = function calendar() {
  /* Build a twelve-month window, repeating monthly cadences where the data says so. */
  const start = { y: 2026, m: 8 };            // September 2026
  const months = Array.from({ length: 12 }, (_, i) => {
    const m = (start.m + i) % 12, y = start.y + Math.floor((start.m + i) / 12);
    const key = `${y}-${String(m + 1).padStart(2, '0')}`;
    const marks = [];
    for (const e of events) {
      if (e.month === key && e.days.length) {
        marks.push({ days: e.days, colour: e.colour === '#F4F2EC' ? '#8E7130' : e.colour, title: e.title, slug: e.slug, e });
      } else if (/^Monthly/.test(e.cadence) && e.days.length && key > e.month) {
        /* Monthly cadences repeat on the same day numbers. */
        marks.push({ days: e.days, colour: e.colour, title: e.title, slug: e.slug, e, repeat: true });
      } else if (/^Quarterly/.test(e.cadence) && e.days.length && key > e.month && (i % 3 === 2)) {
        marks.push({ days: e.days, colour: e.colour, title: e.title, slug: e.slug, e, repeat: true });
      }
    }
    return { y, m, key, marks };
  });

  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Events', href: '/events/' }, { label: 'Calendar' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Calendar')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Twelve months,</span></span>
          <span><span class="d-it">every seat counted.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">September 2026 through August 2027. Monthly and quarterly cadences are shown on their recurring dates; cities are confirmed four to six weeks ahead.</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="flex ac jb wrapf gap mb-lg rv">
      <div class="chiprow">
        ${events.map(e => `<span class="chip" style="border-color:color-mix(in srgb, ${e.colour === '#F4F2EC' ? '#8E7130' : e.colour} 55%, transparent);color:${e.colour === '#F4F2EC' ? '#8E7130' : e.colour}">
          ${e.title}</span>`).join('')}
      </div>
      ${K.tlink('Event pages', '/events/')}
    </div>

    <div class="cal" data-stagger="0.05">
      ${months.map(mo => `
        <div class="cal__m">
          <p class="cal__h">${MONTHS[mo.m]} ${mo.y}</p>
          ${monthGrid(mo.y, mo.m, mo.marks)}
          ${mo.marks.length ? `<div class="cal__l">
            ${mo.marks.map(k => `<a class="cal__e" href="/events/${k.slug}/" style="--cd:${k.colour}">
              <span class="cal__ed">${dayLabel(k.days)} ${MONTHS[mo.m].slice(0, 3)}</span>
              <span class="cal__et">${k.title}</span>
              <span class="cal__ep"><i></i>${k.e.format === 'VIRTUAL' ? 'Virtual · IST' : (k.repeat ? 'City confirmed 6 weeks ahead' : K.esc(k.e.next.place))}</span>
            </a>`).join('')}
          </div>` : `<div class="cal__l"><p class="xs faint">No scheduled dates.</p></div>`}
        </div>`).join('')}
    </div>

    <p class="xs faint mt-lg rv">Calendar as at ${site.asAt}. Recurring dates for monthly and quarterly formats are indicative until the city is confirmed. Seat counts on each event page are the authoritative figure.</p>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Next up', h: 'The three nearest dates.', cta: K.tlink('All events', '/events/') })}
    <div class="grid g-3" data-stagger="0.07">
      ${['cci-live', 'clinics', 'chairmans-table'].map(s => {
        const e = events.find(x => x.slug === s);
        return `<a class="card card--link inst-card" href="/events/${e.slug}/" style="--c:${e.colour}">
          <div class="card__body">
            <span class="chip ${e.format === 'VIRTUAL' ? 'chip--live' : 'chip--brass'}">${e.format}</span>
            <p class="card__ttl">${e.title}</p>
            <div style="margin-top:.35rem">${K.fields([['Next', e.next.date], ['Place', e.next.place]])}</div>
            <div class="card__foot">${K.seats(e.seats)}</div>
          </div></a>`;
      }).join('')}
    </div>
  </div>
</section>`;
};
