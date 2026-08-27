const { site } = require('../data/site');
const { stack } = require('../data/stack');
const K = require('../kit');

module.exports = function speaking() {
  const talks = [
    { n: '01', t: 'Make the impossible inevitable', d: 'The three layers, the ladder derived backwards, and why ambition is a structure problem rather than a courage problem. The opening keynote.', len: '45–60 min', for: 'Mixed audience · conferences · family business forums', book: 'Milk, Mountain, Moonshot' },
    { n: '02', t: 'Your company isn’t slow because your people are slow', d: 'The twelve architectural traits, scored live against the room, with the decision-velocity measurement most organisations have never taken.', len: '45 min + live scoring', for: 'CXO forums · leadership offsites · PSU leadership', book: 'The Accelerated Organization' },
    { n: '03', t: 'Own the road. Rent the car.', d: 'Why the four AI stages are a powertrain rather than a menu, and why governance is the unlock rather than the brake.', len: '40–60 min', for: 'Technology summits · institutional and government audiences', book: 'The AI Flywheel' },
    { n: '04', t: 'The quarterly ritual is a choice', d: 'Five OKR failure modes, one gap, and the mission object that closes it. Includes the three questions, asked live.', len: '40 min', for: 'Founder communities · planning and strategy functions', book: 'goal1' },
    { n: '05', t: 'The blank page is a tax', d: 'Copy, Customize, Innovate — with a live tear-down of a model the room picks. Available in Tamil.', len: '45–90 min', for: 'MSME associations · student audiences · innovation teams', book: 'Copy, Customize, Innovate' }
  ];

  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }, { label: 'Speaking' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Speaking')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Frameworks,</span></span>
          <span><span class="d-it">not a stage show.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">Five talks, one per altitude. Each one ends with the room holding an instrument rather than a feeling.</p>
        <div class="mt">${K.btn('Enquire about a date', '/contact/', 'btn--brass')}</div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The talks', h: 'Five talks, one per altitude.',
      lede: 'They are not interchangeable. Booking the wrong altitude for your audience is the most common way one of these lands flat, so the brief conversation before a date is not a formality.' })}
    <div class="ledger">
      ${talks.map(t => K.lrow({ n: t.n, title: t.t, desc: t.d, meta: [t.len, t.for, t.book] })).join('')}
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:start">
      <div class="rv">
        ${K.kicker('What a room gets')}
        <h2 class="d2" style="margin-top:1rem">An instrument, not an anecdote.</h2>
        <div class="outs mt">
          ${['A framework diagram the audience can photograph and use on Monday',
             'One instrument run live, in the room, against their own organisation',
             'Every figure on every slide carrying a grade and an as-at date',
             'A written one-page summary circulated to attendees afterwards',
             'Tamil delivery where the audience is Tamil-first — not a translation, a bilingual session']
            .map(o => `<div class="out"><span class="out__m"></span><span>${o}</span></div>`).join('')}
        </div>
      </div>

      <div class="rv" style="--d:.12s">
        ${K.kicker('Three things I will not do', 'kicker--plain')}
        <h2 class="d2" style="margin-top:1rem;color:var(--sienna-hi)">Stated plainly, before you ask.</h2>
        <div class="ledger mt">
          ${[
            ['01', 'No fee-per-outcome claims', 'I will not stand on a stage and tell a room what percentage improvement they will get. The books publish ranges with grades; a stage is not the place to lose that discipline.'],
            ['02', 'No product pitch from the platform', 'The talk is the talk. If a programme is relevant it is in the written summary, not in the last four minutes of the keynote.'],
            ['03', 'No motivational register', 'No fists, no crowd shots, no “decide right now.” Wrong category, wrong margin, and it would make the rest of this website dishonest.']
          ].map(([n, t, d]) => K.lrow({ n, title: t, desc: d })).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Formats and fees', h: 'Published bands, as everywhere else.',
      lede: 'Travel and accommodation at cost, booked by the host. Fees are waived entirely for student audiences, MSME associations and government convenings in Tamil Nadu — that is not a discount, it is the base being served.' })}
    <div class="tbl-scroll rv" tabindex="0" role="region" aria-label="Comparison table">
      <table class="tbl">
        <thead><tr><th scope="col">Format</th><th scope="col">Shape</th><th scope="col">Audience</th><th scope="col">Fee band</th></tr></thead>
        <tbody>
          <tr><td>Conference keynote</td><td>45–60 minutes, one altitude, live instrument</td><td>200 – 3,000</td><td>₹8L – ₹25L</td></tr>
          <tr><td>Leadership offsite</td><td>Half-day, scored live, written summary</td><td>10 – 80</td><td>₹12L – ₹35L</td></tr>
          <tr><td>Board session</td><td>90 minutes, closed, Chatham House rule</td><td>6 – 15</td><td>₹10L – ₹20L</td></tr>
          <tr><td>Institutional / government</td><td>By convening. Flywheel and CORE material</td><td>Varies</td><td>By arrangement</td></tr>
          <tr><td>Student & MSME (Tamil Nadu)</td><td>Half-day, Tamil + English</td><td>200 – 500</td><td>No fee</td></tr>
        </tbody>
      </table>
    </div>
    <p class="xs faint mt">Bands as at ${site.asAt}. A band is not a negotiating position — it is the range, and where a session sits inside it depends on preparation and travel, not on the size of the host.</p>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:42rem;margin-inline:auto">
      <h2 class="d2">Enquire about a date</h2>
      <p class="lede mx-auto mt-sm" style="max-width:42ch">Tell me the audience, the altitude, and what you want them holding when they walk out.</p>
      <div class="flex ac jc wrapf gap-sm mt">
        ${K.btn('Start a conversation', '/contact/', 'btn--brass btn--lg')}
        ${K.btn('Press kit', '/press/', 'btn--ghost btn--lg')}
      </div>
    </div>
  </div>
</section>`;
};
