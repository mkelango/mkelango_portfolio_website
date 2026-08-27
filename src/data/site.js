/* Global site configuration, navigation, and shared copy. */

const site = {
  name: 'M. K. Elango',
  domain: 'mkelango.com',
  word: 'INEVITABLE',
  verb: 'Make the impossible inevitable.',
  tamil: 'உறுதி',
  founded: 2026,
  asAt: '26 August 2026',

  // Persistent CTA pair — one free entry, one high-intent. Nothing in between.
  ctaFree: { label: 'Take the AQ Score', href: '/diagnostics/aq-score/' },
  ctaHigh: { label: 'Start a conversation', href: '/contact/' },

  announce: {
    text: 'The Inevitable Summit 2027 — Chennai, February. Registration opens November.',
    link: { label: 'Join the list', href: '/events/summit/' }
  },

  lines: {
    reject: 'Motivation is a mood. Structure is a schedule.',
    capital: 'Selection logic runs backwards from the Moonshot. Capital runs forwards from the Milk.',
    outImplement: 'You cannot out-model your competitors. You can out-implement them — and that lead compounds.',
    weakest: 'A machine is held back by its weakest part, not its strongest.',
    ownRoad: 'Own the road. Rent the car.',
    presence: 'Presence is not coherence.',
    tags: 'Every figure on this site carries a grade and a date. Hover it.',
    founded: 'Founded 2026. Here is everything, including what I got wrong.'
  }
};

/* --------------------------------------------------------------- NAVIGATION */
/* Six primary items. Restraint reads as confidence. */

const nav = [
  {
    label: 'About', href: '/about/',
    children: [
      { label: 'The Story',      href: '/about/',            desc: 'One page. Four movements. No résumé.' },
      { label: 'The Stack',      href: '/the-stack/',        desc: 'Six books. One argument. Five altitudes.' },
      { label: 'The Portfolio',  href: '/the-portfolio/',    desc: 'Three layers, running live. This page is the audit.' },
      { label: 'Speaking',       href: '/speaking/',         desc: 'Keynotes, formats, and what I will not do.' },
      { label: 'Press Kit',      href: '/press/',            desc: 'Bio, portrait, framework diagrams, fact sheet.' }
    ]
  },
  {
    label: 'Programs', href: '/programs/',
    children: [
      { label: 'The Moonshot Intensive',      href: '/programs/moonshot-intensive/',      desc: '6 months · 6 organisations a year' },
      { label: 'The Coherence Audit',         href: '/programs/coherence-audit/',         desc: '8–12 weeks · board level' },
      { label: 'The Accelerated Organization',href: '/programs/accelerated-organization/',desc: '90 days, then a 12-month track' },
      { label: 'AI Flywheel: The 90-Day Start',href:'/programs/ai-flywheel/',             desc: '90 days · one workflow in production' },
      { label: 'goal1 Installation',          href: '/programs/goal1/',                   desc: '365 days · four movements' },
      { label: 'The CCi Sprint',              href: '/programs/cci-sprint/',              desc: '6 weeks · Tamil + English' }
    ]
  },
  {
    label: 'Events', href: '/events/',
    children: [
      { label: 'Calendar',              href: '/events/calendar/',        desc: 'Every date, city and seat count' },
      { label: 'The Inevitable Summit', href: '/events/summit/',          desc: '2 days · Chennai · ~600 seats' },
      { label: 'Moonshot Day',          href: '/events/moonshot-day/',    desc: '1 day · 30 seats · invitation only' },
      { label: "The Chairman's Table",  href: '/events/chairmans-table/', desc: '12 seats · Chatham House rule' },
      { label: 'CCi Live',              href: '/events/cci-live/',        desc: 'Half-day · <span lang="ta">தமிழ்</span> + English' },
      { label: 'Clinics · AQ & Flywheel',href:'/events/clinics/',         desc: 'Monthly · virtual · hands-on' }
    ]
  },
  {
    label: 'Coaching', href: '/coaching/',
    children: [
      { label: "The Founder's Table",   href: '/coaching/founders-table/', desc: 'Six clients. Ever.' },
      { label: 'The Board Seat',        href: '/coaching/board-seat/',     desc: 'Quarterly advisory · 8–10 groups' },
      { label: 'Certified Practitioners',href:'/coaching/practitioners/',  desc: 'Licensed delivery · open cohort' }
    ]
  },
  {
    label: 'Explore', href: '/explore/',
    children: [
      { label: 'Diagnostics',        href: '/diagnostics/', desc: 'Six instruments. Free. Run one tonight.' },
      { label: 'Ideas',              href: '/ideas/',       desc: 'One structural argument each. Not blog posts.' },
      { label: 'The Inevitable',     href: '/show/',        desc: 'Conversations with people who made something certain.' },
      { label: 'The Evidence Log',   href: '/evidence/',    desc: 'Published corrections, tagged and dated.' },
      { label: '<span lang="ta">தமிழ்</span> / Tamil', href: '/ta/', desc: 'CCi content and the workshop archive.' },
      { label: 'Newsletter',         href: '/newsletter/',  desc: 'One structural idea, every Tuesday.' }
    ]
  },
  {
    label: 'Shop', href: '/shop/',
    children: [
      { label: 'Books',                 href: '/books/',            desc: 'All six, individually' },
      { label: 'The Elango Stack',      href: '/shop/the-stack/',   desc: 'The boxed set — five books, one argument' },
      { label: 'Instruments',           href: '/shop/instruments/', desc: 'Printed workbooks and canvases' },
      { label: 'Digital',               href: '/shop/digital/',     desc: 'Deep reports, templates, self-paced courses' }
    ]
  }
];

const footerCols = [
  {
    title: 'The Work',
    links: [
      { label: 'The Stack',        href: '/the-stack/' },
      { label: 'Programs',         href: '/programs/' },
      { label: 'Coaching',         href: '/coaching/' },
      { label: 'Speaking',         href: '/speaking/' },
      { label: 'The Portfolio',    href: '/the-portfolio/' }
    ]
  },
  {
    title: 'Instruments',
    links: [
      { label: 'The AQ Score',              href: '/diagnostics/aq-score/' },
      { label: 'The Flywheel Locator',      href: '/diagnostics/flywheel-locator/' },
      { label: 'Do You Have a Moonshot?',   href: '/diagnostics/moonshot-test/' },
      { label: 'The Coherence Matrix',      href: '/diagnostics/coherence-matrix/' },
      { label: 'The Three Questions',       href: '/diagnostics/three-questions/' },
      { label: 'CCi Readiness',             href: '/diagnostics/cci-readiness/' },
      { label: 'The Constitution Canvas',    href: '/diagnostics/constitution-canvas/' }
    ]
  },
  {
    title: 'Read',
    links: [
      { label: 'Milk, Mountain, Moonshot',   href: '/books/milk-mountain-moonshot/' },
      { label: 'The Accelerated Organization',href:'/books/accelerated-organization/' },
      { label: 'The AI Flywheel',            href: '/books/ai-flywheel/' },
      { label: 'goal1',                      href: '/books/goal1/' },
      { label: 'Copy, Customize, Innovate',  href: '/books/cci/' },
      { label: 'The Constitution Engine',    href: '/books/constitution-engine/' }
    ]
  },
  {
    title: 'The House',
    links: [
      { label: 'The Evidence Log',  href: '/evidence/' },
      { label: 'Ideas',             href: '/ideas/' },
      { label: '<span lang="ta">தமிழ்</span> / Tamil', href: '/ta/' },
      { label: 'Media enquiries',   href: '/press/' },
      { label: 'Contact',           href: '/contact/' }
    ]
  }
];

module.exports = { site, nav, footerCols };
