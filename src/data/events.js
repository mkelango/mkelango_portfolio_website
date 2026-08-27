/* EVENTS — "If it has a date, it's an Event."
   Every event page carries a date, a city, a price, a seat count and a
   "what you leave with" line. No countdown timers. Real scarcity, stated plainly. */

const events = [
  {
    slug: 'summit',
    startISO: '2027-02-11T09:00:00+05:30',
    endISO: '2027-02-12T17:00:00+05:30',
    next: { date: '11–12 Feb 2027', place: 'Chennai', tz: 'IST' },
    n: '01',
    title: 'The Inevitable Summit',
    kicker: 'The flagship gathering',
    shape: '2 days · single track · ~600 seats',
    cadence: 'Annual',
    who: 'Founders, family business principals, CXOs',
    lede: 'Two days, one track, six hundred people who each control a real decision. The whole stack, taught in sequence, once a year.',
    leaveWith: 'Your own ladder, derived backwards, on one page — and the gating rung named.',
    format: 'IN-PERSON',
    city: 'Chennai',
    venue: 'Venue announced with registration',
    dates: '11–12 February 2027',
    dateISO: '2027-02-11',
    month: '2027-02',
    days: [11, 12],
    price: '₹45,000 – ₹1,85,000',
    priceNote: 'Three tiers. The top tier adds a closed pre-Summit briefing on the evening of 10 February. Moonshot Day is a separate event on its own dates.',
    openFrom: '2026-11-01',
    seats: { total: 600, open: 600, note: 'Registration opens November 2026.' },
    colour: '#C8A24A',
    tags: 'in-person flagship founder family-business cxo',
    body: `The Summit is the only place the five altitudes are taught in sequence, in one room, in two days. It is a single track by design — there are no breakouts, because the argument does not decompose into breakouts. Everyone hears the same thing in the same order, which is the only way six hundred people leave with the same vocabulary.

Day one is Horizon and Organisation: the portfolio layers, the ladder derived backwards, the gating rung, and then the twelve architectural traits with a live scoring session. Day two is Engine, Instrument and Entry: the flywheel, the mission object, and the entry method — closing with the Coherence Matrix run against your own group, in the room, on paper.

There is no keynote reel, no band, and no fists in the air. You will be given instruments and made to use them.`,
    agenda: [
      { t: 'Day 1 · 09:00', h: 'The three layers', d: 'Milk, Mountain, Moonshot — and why the selection logic runs backwards.' },
      { t: 'Day 1 · 11:30', h: 'Deriving your ladder', d: 'Worked live, from your objective. Bring the objective.' },
      { t: 'Day 1 · 14:30', h: 'The twelve traits', d: 'The AQ instrument, scored in the room against published benchmarks.' },
      { t: 'Day 1 · 17:00', h: 'The gating rung', d: 'The one rung that makes the rest reachable. Named, funded, dated.' },
      { t: 'Day 2 · 09:00', h: 'The powertrain', d: 'Four stages, DRIVE and CORE. Why governance is the unlock.' },
      { t: 'Day 2 · 11:30', h: 'Read, never typed', d: 'Converting one objective into a mission, with the measure grounded.' },
      { t: 'Day 2 · 14:30', h: 'Entry in ninety days', d: 'The CCi method for the market you are about to enter.' },
      { t: 'Day 2 · 16:00', h: 'The Coherence Matrix', d: 'Your own group, scored, on paper, before you leave the room.' }
    ]
  },

  {
    slug: 'moonshot-day',
    startISO: '2027-03-19T09:00:00+05:30',
    endISO: '2027-03-19T17:00:00+05:30',
    next: { date: '19 Mar 2027', place: 'Chennai', tz: 'IST' },
    n: '02',
    title: 'Moonshot Day',
    kicker: 'Closed · invitation only',
    shape: '1 day · 30 seats · closed room',
    cadence: 'Twice a year',
    who: 'Chairmen and founders only',
    lede: 'One day, thirty seats, no observers. Everyone in the room controls a portfolio and is prepared to say what it is for.',
    leaveWith: 'A Moonshot sentence you are willing to leave unchanged for a decade — or the honest finding that you do not have one yet.',
    format: 'IN-PERSON',
    city: 'Rotating · Chennai, Coimbatore, Dubai',
    venue: 'Disclosed on confirmation',
    dates: '19 March 2027 · 24 September 2027',
    dateISO: '2027-03-19',
    month: '2027-03',
    days: [19],
    price: '₹2,50,000',
    priceNote: 'Principal only. No delegates, no advisors, no observers.',
    seats: { total: 30, open: 11, note: 'By application. Two-thirds of seats go to returning groups.' },
    colour: '#B4472E',
    tags: 'in-person closed family-business founder',
    body: `Chapter 17 asks a question most people have never actually been made to answer: do you have a Moonshot, or do you have an aspiration that has been rewritten twice this year? Moonshot Day is that question, run for a full day, in a room where nobody can hide behind a deck.

Thirty seats. Principals only — no delegates, no advisors, no observers — because the conversation only works when every person in the room can commit on the spot. The day ends with each participant reading their sentence aloud. Some of them are not ready, and saying so in that room is worth the fee on its own.`,
    agenda: [
      { t: '09:00', h: 'The Chapter 17 test', d: 'Run properly, on your objective, in writing.' },
      { t: '10:30', h: 'Physically specific', d: 'Why an objective that cannot be photographed is not yet an objective.' },
      { t: '12:00', h: 'The rewrite audit', d: 'How many times has it changed this year? The answer is diagnostic.' },
      { t: '14:00', h: 'Subordination', d: 'What in your group is currently not subordinated to it, and what that costs.' },
      { t: '16:00', h: 'Reading it aloud', d: 'Each principal, one sentence, to the room.' }
    ]
  },

  {
    slug: 'chairmans-table',
    startISO: '2026-11-14T19:00:00+05:30',
    endISO: '2026-11-14T22:30:00+05:30',
    next: { date: '14 Nov 2026', place: 'Coimbatore', tz: 'IST' },
    n: '03',
    title: "The Chairman's Table",
    kicker: 'Chatham House rule',
    shape: 'Dinner + roundtable · 12 seats',
    cadence: 'Quarterly, rotating cities',
    who: 'Family business principals',
    lede: 'Twelve principals, one table, one structural question. Nothing said in the room is attributed outside it.',
    leaveWith: 'The one question about your own group you had been avoiding, asked by someone with nothing to sell you.',
    format: 'IN-PERSON',
    city: 'Rotating · Coimbatore, Chennai, Madurai, Tirupur, Dubai, Singapore',
    venue: 'Private dining room, disclosed on confirmation',
    dates: 'Quarterly · next: 14 November 2026, Coimbatore',
    dateISO: '2026-11-14',
    month: '2026-11',
    days: [14],
    price: '₹75,000',
    priceNote: 'Per seat, per table. Includes dinner. Not a subscription.',
    seats: { total: 12, open: 4, note: 'Coimbatore, 14 November 2026.' },
    colour: '#8E7130',
    tags: 'in-person closed family-business',
    body: `A table for twelve. One structural question, tabled at the start, argued through dinner. Chatham House rule, which here means the ideas travel and the attributions do not.

The recurring format is simple and slightly uncomfortable: each principal describes their portfolio in ninety seconds, and the table says what it appears to be optimising for. It is remarkable how often the answer surprises the person who built it.

No presentation. No slides. No pitch at the end.`,
    agenda: [
      { t: '19:00', h: 'The question, tabled', d: 'One structural question. It is circulated a week ahead.' },
      { t: '19:30', h: 'Ninety seconds each', d: 'Your portfolio, described. The table responds.' },
      { t: '21:00', h: 'The argument', d: 'Where the table disagrees, which is the useful part.' },
      { t: '22:15', h: 'What each of us will change', d: 'One sentence each, spoken aloud.' }
    ]
  },

  {
    slug: 'cci-live',
    startISO: '2026-09-27T09:30:00+05:30',
    endISO: '2026-09-27T14:00:00+05:30',
    next: { date: '27 Sep 2026', place: 'Erode', tz: 'IST' },
    n: '04',
    title: 'CCi Live',
    kicker: 'தமிழ் + English · the base',
    shape: 'Half-day workshop · 200–500 seats',
    cadence: 'Monthly, Tamil Nadu cities',
    who: 'MSMEs, founders, students',
    lede: 'The workshop that started all of this. Copy, Customize, Innovate — taught in Tamil and English, priced so it is never the reason someone cannot come.',
    leaveWith: 'A tear-down of one proven model and a first-pass customisation map for your market.',
    format: 'IN-PERSON',
    city: 'Rotating · Coimbatore, Erode, Salem, Madurai, Trichy, Chennai',
    venue: 'Announced per city',
    dates: 'Monthly · next: 27 September 2026, Erode',
    dateISO: '2026-09-27',
    month: '2026-09',
    days: [27],
    price: '₹500 – ₹2,000',
    priceNote: 'Student rate ₹500. Concessions available and never advertised as scarce.',
    seats: { total: 400, open: 260, note: 'Erode, 27 September 2026.' },
    colour: '#2FA592',
    tags: 'in-person tamil msme entry',
    tamil: true,
    body: `This is the base, and the base is not a funnel — it is the reason any of the rest of this is real. Ten years of CCi Live is where the framework was tested against people who had to make it work on Monday with the money they actually had.

Half a day. The Copy, Customize, Innovate method taught end to end, with a live tear-down of a model the room chooses. Delivered in Tamil and English in the same session — not a translated version, a bilingual one.

Priced so that price is never the reason. If it still is, write to us.`,
    agenda: [
      { t: '09:30', h: 'ஏன் காலி பக்கம் விலை உயர்ந்தது', d: 'Why the blank page is a tax — and who pays it.' },
      { t: '10:30', h: 'COPY · the tear-down', d: 'A model the room picks, taken apart live.' },
      { t: '12:00', h: 'CUSTOMIZE · five axes', d: 'Culture, economics, regulation, logistics, language.' },
      { t: '13:30', h: 'INNOVATE · on a de-risked base', d: 'What you add, and when you can afford to be wrong.' }
    ]
  },

  {
    slug: 'clinics',
    startISO: '2026-09-10T10:00:00+05:30',
    endISO: '2026-09-10T13:00:00+05:30',
    next: { date: '10 Sep 2026', place: 'Virtual', tz: 'IST' },
    n: '05',
    title: 'Clinics · AQ and Flywheel',
    kicker: 'Virtual · hands-on',
    shape: 'AQ Live: 3 hours · Flywheel Clinic: half-day',
    cadence: 'Monthly, both',
    who: 'Anyone holding a free score; teams mid-implementation',
    lede: 'Two working clinics for people already holding a result. Bring the score, leave with the next three moves.',
    leaveWith: 'Your three-trait move, chosen against the scoring rather than against the room.',
    format: 'VIRTUAL',
    city: 'Virtual · IST',
    venue: 'Zoom · joining link on registration',
    dates: 'Monthly · AQ Live 2nd Thursday · Flywheel Clinic 4th Thursday',
    dateISO: '2026-09-10',
    month: '2026-09',
    days: [10, 24],
    price: 'Free – ₹9,500',
    priceNote: 'AQ Live is free to anyone holding an AQ Score. The Flywheel Clinic is ₹9,500 per team.',
    seats: { total: 120, open: 74, note: 'Per session, both clinics.' },
    colour: '#5B8DEF',
    tags: 'virtual organisation engine',
    body: `Two clinics, both working sessions rather than webinars.

**AQ Live** is a three-hour diagnostic clinic, free to anyone who has taken the AQ Score. You bring your twelve-trait result; we work through what the low scores actually mean in your organisation, which three to move first, and what evidence would prove the move worked. Cameras on, small groups, real numbers.

**The Flywheel Clinic** is a half-day for teams already mid-implementation. Bring the workflow that is stuck. We work the DRIVE loop on it in front of everyone, which is uncomfortable for the team whose workflow it is and extremely useful for everyone watching.`,
    agenda: [
      { t: 'AQ Live · 3 hours', h: 'Read your twelve traits', d: 'What a level-two score in distributed intelligence actually looks like on a Tuesday.' },
      { t: 'AQ Live', h: 'Pick three', d: 'Lowest-scoring, Foundation or Quick-Win. The scoring decides.' },
      { t: 'Flywheel · half-day', h: 'The stuck workflow', d: 'One team volunteers. DRIVE run on it, live.' },
      { t: 'Flywheel', h: 'Production vs demo', d: 'The specific gap, named, for the workflow in front of us.' }
    ]
  },

  {
    slug: 'authors-table',
    scheduled: false,          /* no date yet — no Event node, no calendar mark */
    next: { date: 'On publication', place: 'Chennai', tz: 'IST' },
    n: '06',
    title: "The Author's Table",
    kicker: 'Per book',
    shape: 'Book-launch dinner · 40 seats',
    cadence: 'One per publication',
    who: 'Press, clients, alumni',
    lede: 'Forty seats, one book, and the argument taken apart by people who are allowed to disagree with it in public.',
    leaveWith: 'A signed copy and the parts of the argument the author is least sure about.',
    format: 'IN-PERSON',
    city: 'Chennai',
    venue: 'Announced per launch',
    dates: 'Next: on publication of The Constitution Company',
    dateISO: null,
    month: '2027-06',
    days: [],
    price: 'By invitation',
    priceNote: 'Press seats are held and never charged.',
    seats: { total: 40, open: 40, note: 'Not yet scheduled.' },
    colour: '#F4F2EC',
    tags: 'in-person press',
    body: `A launch dinner built around a disagreement rather than a reading. Forty seats: press, clients, and alumni of the programmes.

The format inverts the usual one. Rather than the author presenting the argument, three readers who have had the manuscript for a month present the weakest parts of it, and the author answers at the table. The corrections that come out of these evenings go straight into the Evidence Log.`,
    agenda: [
      { t: '19:00', h: 'The argument, in ten minutes', d: 'The shortest honest version.' },
      { t: '19:20', h: 'Three readers, three objections', d: 'Prepared in advance. Not softened.' },
      { t: '20:30', h: 'The table', d: 'Open floor, on the record unless a speaker says otherwise.' },
      { t: '22:00', h: 'What goes into the corrections log', d: 'Agreed at the table, published within a week.' }
    ]
  }
];

module.exports = { events, bySlug: Object.fromEntries(events.map(e => [e.slug, e])) };
