const { site } = require('../data/site');
const K = require('../kit');

const PAGES = {
  privacy: {
    kicker: 'Privacy',
    title: 'What this site collects, and what it does not.',
    lede: 'Written to be read rather than to be survived. If anything below is unclear, that is a fault in the writing and worth telling me about.',
    sections: [
      { h: 'Diagnostic results', b: `<p>Every diagnostic on this site is <strong>scored in your browser</strong>. While you are answering questions, nothing leaves your device — there is no request to a server between the first question and the score.</p>
        <p>Data is transmitted only if you ask for the detailed report. At that point we store your email address, the score, and the trait-level breakdown, because the report cannot be produced without them.</p>
        <p><strong>Your result is never published, sold, shared, or attached to your name in any material</strong> — not in a case study, not in a press release, not in an aggregate statistic that could identify your organisation.</p>` },
      { h: 'The newsletter', b: `<p>An email address, the date you subscribed, and whether you open the emails. That is the whole record. Unsubscribing removes the address rather than suppressing it.</p>
        <p>The list is never sold, rented, or shared with a partner, a sponsor, or a venture. There are no sponsored placements in the newsletter, so there is nobody to share it with.</p>` },
      { h: 'Enquiries and applications', b: `<p>What you type into a form on this site, plus the date. Applications for coaching and programmes are read by me and, where an analysis team is involved, by named members of that team under confidentiality.</p>
        <p>Nothing submitted in an application is used as marketing material, ever — including anonymised. If a case is published, it is published with named consent or not at all.</p>` },
      { h: 'Analytics', b: `<p>Aggregate page views, referrers and approximate country. No cross-site tracking, no advertising pixels, no fingerprinting, and no consent banner — because nothing here requires one.</p>` },
      { h: 'How long anything is kept', b: `<p>Newsletter records until you unsubscribe. Diagnostic results and enquiries for three years, then deleted. Applications for two years, so that a declined application can be revisited when a seat opens rather than restarted from nothing.</p>` },
      { h: 'Getting your data, or having it removed', b: `<p>Write in and ask. You will get a copy of everything held against your email address, or its deletion, within thirty days. There is no form to fill in and no verification hoop beyond replying from the address in question.</p>` },
      { h: 'Third parties', b: `<p>Email delivery, payment processing and hosting are handled by external providers, each of which necessarily processes the minimum data required to do its job. Those providers are named on request. Where a venture I founded delivers programme work, that is disclosed on the relevant programme page rather than buried here.</p>` }
    ]
  },
  terms: {
    kicker: 'Terms',
    title: 'What is promised, and what is not.',
    lede: 'The short version: the frameworks are published, the prices are published, the seat counts are true, and no outcome is guaranteed by anybody who is being honest.',
    sections: [
      { h: 'What the programmes promise', b: `<p>Each programme page lists named artefacts under <em>what you leave with</em>. Those artefacts are the deliverable and they are contractual — if a programme ends and you do not hold all of them, it has not finished and it is not billed as finished.</p>
        <p><strong>No business outcome is guaranteed.</strong> Not a revenue figure, not a percentage improvement, not a valuation. Anyone in this category who guarantees one is either not measuring or not telling you what they are measuring.</p>` },
      { h: 'Prices and bands', b: `<p>Every price on this site is published as a band with an as-at date. A band is the actual range, not a negotiating position, and where an engagement sits inside it depends on scope, travel and preparation — never on the size of the buyer.</p>
        <p>Bands are reviewed annually. A price agreed in writing does not move during an engagement.</p>` },
      { h: 'Seats and scarcity', b: `<p>Published seat counts are true. There is no reserve capacity that appears for a large enough number, and there are no countdown timers on this site. When something is full, the page says full.</p>` },
      { h: 'Conflicts and disclosure', b: `<p>Where a venture I founded delivers part of a programme, that relationship is disclosed on the programme page above the pricing band. I hold no equity in client groups and take no transaction fees. Within a defined category and geography I advise one client, and that exclusivity is written into the agreement.</p>` },
      { h: 'Cancellation', b: `<p>Events: full refund up to fourteen days before the date, fifty per cent inside fourteen days, and a transferable seat at any point. Programmes: terminable by either party at a phase boundary, with unstarted phases refunded. Coaching: ninety days' notice by either party.</p>` },
      { h: 'The instruments and the figures', b: `<p>The free diagnostics are provided as they are. They are honest instruments and they are not a substitute for a professional assessment of your organisation, and each results page says so in its own words.</p>
        <p>Every figure published on this site carries a grade — <span class="nowrap">[A] verified</span>, <span class="nowrap">[B] claimed</span>, <span class="nowrap">[C] estimate</span> — and an as-at date. A <span class="nowrap">[C]</span> is a shape rather than a number and should not be relied on as one. Corrections are welcomed and published in <a href="/evidence/">the Evidence Log</a>.</p>` },
      { h: 'Copyright', b: `<p>The frameworks, instruments and diagrams on this site are published so they can be used. Use them inside your own organisation freely. Reproduce them publicly with attribution. Deliver them commercially to third parties only under the <a href="/coaching/practitioners/">Certified Practitioner</a> licence — which exists to keep the scoring standards intact rather than to restrict the ideas.</p>` }
    ]
  }
};

module.exports = function legal(which) {
  const p = PAGES[which];
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: p.kicker }])}
    <div class="phero__grid">
      <div>
        ${K.kicker(p.kicker)}
        <h1 class="d2 lines" style="margin-top:1.25rem">${K.headLines(p.title)}</h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">${p.lede}</p>
        <p class="mono faint mt">AS AT ${site.asAt.toUpperCase()}</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <article class="prose rv">
        ${p.sections.map((s, i) => `<h2 ${i === 0 ? 'style="margin-top:0"' : ''}>${s.h}</h2>${s.b}`).join('')}
        <hr class="rule">
        <p class="sm">Questions about any of this go to <a href="/contact/">the contact form</a>. They are answered by a person.</p>
      </article>
      <aside class="aside-sticky rv">
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">On this page</span>
          <div class="toc" style="margin-top:.9rem">
            ${p.sections.map((s, i) => `<div class="toc__i"><span class="idx">${String(i + 1).padStart(2, '0')}</span><span>${s.h}</span></div>`).join('')}
          </div>
        </div>
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">The other one</span>
          <p style="margin-top:.8rem">${K.tlink(which === 'privacy' ? 'Terms' : 'Privacy', which === 'privacy' ? '/terms/' : '/privacy/')}</p>
        </div>
      </aside>
    </div>
  </div>
</section>`;
};
