/* COACHING — "If it has me in it, it's Coaching."
   Scarcity is the product. State the number of seats and how many are open. */

const coaching = [
  {
    slug: 'founders-table',
    n: '01',
    title: "The Founder's Table",
    kicker: 'One to one',
    lede: 'One-to-one with Elango. Monthly session, quarterly on-site, a direct line in between. Their agenda, not mine.',
    volume: 'Six clients. Ever.',
    seats: { total: 6, open: 2, year: '2027' },
    register: 'Annual retainer · application only',
    price: '₹60L – ₹1cr+ per year',
    priceShort: '₹60L – ₹1cr+ /yr',
    priceNote: 'Banded by on-site frequency and whether a board seat is included.',
    duration: '12 months, renewable',
    forWhom: 'For a founder or principal building something that will take twenty years, who needs one person who will say when the ladder is wrong.',
    notFor: 'This is not for someone who wants an accountability partner or a sounding board. There are better and cheaper people for that, and I will name three of them.',
    body: `There is no curriculum. That is the definition of the tier — a Program has a syllabus, and this does not. You bring the agenda; it is your year, not mine.

What is fixed is the shape. A monthly working session, long enough to actually get somewhere. A quarterly on-site, at your operation, with your people, because there are things you cannot see over a video call. And a direct line in between, used at your discretion, which in practice means four or five times a quarter and occasionally at eleven at night before a board meeting.

What you are buying is not access to advice. Advice is in the books and they cost six hundred rupees. What you are buying is someone who has the whole structure in their head, has been inside your numbers for a year, and has no incentive to tell you the ladder is fine when it is not.`,
    what: [
      { t: 'Monthly working session', d: 'Three hours, your agenda, prepared on both sides. Not a check-in.' },
      { t: 'Quarterly on-site', d: 'At your operation, with your team. One full day, including the sessions I have with your people without you in the room.' },
      { t: 'The direct line', d: 'Between sessions, at your discretion. There is no ticket system and no gatekeeper.' },
      { t: 'The annual structural review', d: 'Once a year, the whole portfolio scored against the objective, in writing, with the as-at date on it.' }
    ],
    apply: [
      'What the objective is, in one sentence.',
      'What you currently hold — the honest inventory, not the website version.',
      'What you have already tried that did not work.',
      'Who else advises you, and on what.'
    ]
  },

  {
    slug: 'board-seat',
    n: '02',
    title: 'The Board Seat',
    kicker: 'Governance, not operations',
    lede: 'Quarterly advisory to a family group’s board or a founder’s leadership team. Portfolio governance, deliberately not operations.',
    volume: '8–10 groups',
    seats: { total: 10, open: 3, year: '2027' },
    register: 'Annual retainer',
    price: '₹25L – ₹55L per year',
    priceShort: '₹25L – ₹55L /yr',
    priceNote: 'Four meetings plus the annual coherence re-score. Travel at cost.',
    duration: '12 months, renewable',
    forWhom: 'For a family group or a scaling company that needs the portfolio question held at board level by someone from outside the family and outside the cap table.',
    notFor: 'This is not an operating role and I will not take one. If what the group needs is someone to run something, that is a hire, not an advisor.',
    body: `Four board meetings a year, plus the annual coherence re-score, plus availability to the chair between meetings.

The reason this tier exists separately from the Founder's Table is that the questions are different. One-to-one work is about what you are building. Board work is about whether the structure will survive the people currently in it — succession, subordination, the constitution, and what happens when the third generation wants to renegotiate the objective.

I hold no equity in client groups and take no transaction fees. That is not a moral position; it is a structural one. The moment I am paid on a transaction, my opinion on whether the group should do the transaction is worth nothing.`,
    what: [
      { t: 'Four board meetings', d: 'Attended in person, papers read in advance, one written position circulated before each.' },
      { t: 'The annual coherence re-score', d: 'The same instrument, same weightings, year on year. Movement is the point.' },
      { t: 'Availability to the chair', d: 'Between meetings, on the structural questions. Not on operations.' },
      { t: 'The constitution review', d: 'Once a year: does the governing document still say what the family means?' }
    ],
    apply: [
      'The group structure, including the entities nobody lists on the website.',
      'Who sits on the board today and what each seat represents.',
      'The succession position, honestly stated.',
      'Whether the objective is agreed or contested inside the family.'
    ]
  },

  {
    slug: 'practitioners',
    n: '03',
    title: 'Certified Practitioners',
    kicker: 'Licensed delivery',
    lede: 'Trained practitioners deliver AQ, Flywheel and CCi work under licence. I review the output. I do not deliver it.',
    volume: 'Open cohort',
    seats: { total: null, open: null, year: '2027' },
    register: 'Per engagement · certification cohorts twice a year',
    price: 'Certification ₹3.5L · engagements priced by the practitioner',
    priceShort: 'Certification ₹3.5L',
    priceNote: 'The licence fee is a revenue share, published in the practitioner agreement.',
    duration: 'Certification: 12 weeks. Licence: annual.',
    forWhom: 'For experienced consultants and internal transformation leads who want to deliver these instruments under licence, properly, with the scoring standards intact.',
    notFor: 'This is not a badge. Certification is revoked for delivering a score without the as-at date, and that has already happened once.',
    body: `This tier exists because of an arithmetic problem I would rather state than hide. Coaching is capped by my calendar. Six seats is a ceiling by design, and a practice where coaching is most of the revenue is not a business — it is a job with good margins.

So the Programs layer has to be deliverable by people who are not me. Certified Practitioners are trained on the instruments, licensed to deliver AQ, Flywheel and CCi engagements, and reviewed by me on output rather than supervised on process.

The standard that matters is the evidence standard. A practitioner may disagree with my reading of a score. A practitioner may not publish a figure without a grade and a date.`,
    what: [
      { t: '12-week certification', d: 'The instruments, the scoring standards, and the evidence discipline. Assessed on a live engagement, not an exam.' },
      { t: 'Licence to deliver', d: 'AQ Benchmark, Flywheel 90-Day Start, and the CCi Sprint, under the published methodology.' },
      { t: 'Output review', d: 'I review delivered work. Not process supervision — the finished artefact and the tags on it.' },
      { t: 'Directory listing', d: 'Public, with the engagements each practitioner has delivered and the year of certification.' }
    ],
    apply: [
      'Your delivery record — engagements, sectors, sizes.',
      'Which instrument you intend to lead with.',
      'A worked example of your own output, with your own figures tagged.',
      'Whether you hold conflicting certifications or licences.'
    ]
  }
];

module.exports = { coaching, bySlug: Object.fromEntries(coaching.map(c => [c.slug, c])) };
