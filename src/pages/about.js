const { site } = require('../data/site');
const { stack } = require('../data/stack');
const { portfolio } = require('../data/misc');
const K = require('../kit');

module.exports = function about() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'About' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('About')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>I don’t make people</span></span>
          <span><span>more ambitious.</span></span>
          <span><span class="d-it">I make their ambition inevitable.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">One page, four movements, first person. No résumé, no awards wall, and nothing about what I enjoy at the weekend.</p>
        <div class="flex ac wrapf gap-sm mt">
          ${K.tlink('The Portfolio — the audit', '/the-portfolio/')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <article class="prose rv">
        <h2 style="margin-top:0">One · The observation</h2>
        <p>I spent ten years at StartNet working with several hundred founders and MSMEs across Tamil Nadu, and one pattern kept appearing with an almost irritating regularity: <strong>almost nobody who succeeded started from a blank page.</strong></p>
        <p>Apple adapted Xerox’s interface. Flipkart adapted Amazon’s. The founders who insisted on total originality were, disproportionately, the ones who ran out of money — not because originality is bad, but because they paid for it at the wrong point in the sequence.</p>
        <p>So I wrote it down as three moves in order. Copy a model that has already been proven, and study it properly rather than admiring it. Customize it to the market you actually operate in — language, payment, logistics, regulation, culture. Innovate on top of the customised base, where innovation is finally cheap because the foundation is already de-risked.</p>
        <p>CoirGarden did ₹8 crore in online sales in under two years applying it.${K.etag('B', 'Reported by the company. Regraded from a flat claim pending sight of the underlying sales record. Listed in the Evidence Log.')} That is when I stopped calling it an observation and started calling it a framework, and <em>Copy, Customize, Innovate</em> became the first book.</p>

        <h2>Two · The escalation</h2>
        <p>A framework that worked for a startup did not answer the question a ₹2,000-crore group was asking. They were not trying to enter a market. They were trying to work out why an organisation with every advantage moved so slowly, and whether that was fixable or simply what scale does to you.</p>
        <p>The answer arrived from an unlikely direction. I was reading NVIDIA’s investor presentation — not looking for a book — and the phrase that stopped me was <strong>parallel processing</strong>. AI had not merely outpaced Moore’s Law; it had changed the shape of the curve. Which raised the obvious question nobody was asking: if we know exactly which architectural properties let a machine improve a million-fold in a decade, why are we not building organisations with the same properties?</p>
        <p>That produced two books rather than one. <em>The Accelerated Organization</em> took twelve of those properties and scored real organisations against them on five maturity levels. <em>The AI Flywheel</em> took the four AI stages that everyone was treating as a menu and showed that they are a powertrain — each one driving the next, with DRIVE as the hub and CORE as the rim.</p>
        <p>Then <em>goal1</em>, because both of those books kept running into the same wall: an organisation that cannot read its own numbers truthfully cannot tell whether any of it worked.</p>

        <h2>Three · The correction</h2>
        <p>The fourth movement is the one that changed how I work rather than what I write about.</p>
        <p>I went looking for the paperwork behind the most-repeated founder story of the last twenty years — filings, court records, loan agreements, a prospectus. Almost none of the order was right. The rocket company came first. The car company he did not found. The solar company was his cousins’. Twenty-four Decembers, and one of them very nearly ended all of it.</p>
        <p>What was left after the myth came off was not a personality. It was a <strong>structure</strong> — and the same arrangement turned out to be sitting inside a Danish state utility, a Dutch machine shop and a carpet company in Georgia, none of them with a founder worth writing a biography about. That became <em>Milk, Mountain, Moonshot</em>.</p>
        <p>But it also produced something I did not expect to need: <strong>an evidence standard I now hold myself to.</strong> Every figure gets a grade — <span class="nowrap">[A] verified</span>, <span class="nowrap">[B] claimed</span>, <span class="nowrap">[C] estimate</span> — and an as-at date. If a number cannot be graded it does not get softened. It gets removed.</p>
        <blockquote>A book that opens by dismantling a smoothed biography cannot carry one. That obligation runs to the author before it runs to anyone else.</blockquote>
        <p>It costs nothing and almost nobody does it, which is precisely why a family-office CFO notices it inside ninety seconds.</p>

        <h2>Four · What I do now</h2>
        <p>Three layers, running at the same time.</p>
        <p><strong>Milk</strong> — StartNet, ElanOne and Publytics. The businesses that pay, that supply the datasets and the reference clients, and that make the frameworks testable on live organisations rather than on slides.</p>
        <p><strong>Mountain</strong> — Think TN Foundation. An independent Tamil Nadu policy institution on a long clock, with published governance and its own corrections log. It is deliberately kept at arm’s length from this site; its independence is easier to defend that way.</p>
        <p><strong>Moonshot</strong> — one objective at the far end, which everything above is subordinated to. Under my own standard that sentence must be physically specific and unchanged for a decade, so it is published on the Portfolio page or it is not published at all.</p>
        <p>I am running the framework I sell. <a href="/the-portfolio/">You can check it.</a></p>
      </article>

      <aside class="aside-sticky rv">
        ${K.portraitSlot('ONE PORTRAIT')}

        <div class="mark-box">
          <span class="kicker">The word</span>
          <p class="d3" style="margin-top:.75rem">Inevitable</p>
          <p class="sm mute" style="margin-top:.5rem">Verb form: <em>make it inevitable.</em></p>
          <p class="sm mute ta" style="margin-top:.5rem">தமிழில்: <strong>உறுதி</strong> — certainty, resolve.</p>
          <div class="mark-box__cap">${site.lines.reject}</div>
        </div>

        <div class="mark-box">
          <span class="kicker">The stack</span>
          <div style="margin-top:.9rem">${K.stackLadder(stack, { compact: true })}</div>
        </div>

        <div>
          ${K.btn('Start a conversation', '/contact/', 'btn--brass btn--block')}
          <p class="xs faint tc" style="margin-top:.7rem">${site.lines.founded}</p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    ${K.shead({
      k: 'Where the work happens',
      h: 'Programs, events, coaching — divided by commitment shape, not by topic.',
      lede: 'Every one of these can be about the same framework. What separates them is what you are actually agreeing to.'
    })}
    <div class="tbl-scroll rv" tabindex="0" role="region" aria-label="Comparison table">
      <table class="tbl">
        <thead><tr><th scope="col">Section</th><th scope="col">The test</th><th scope="col">You commit to</th><th scope="col">Duration</th><th scope="col">Band</th></tr></thead>
        <tbody>
          <tr><td><a href="/programs/">Programs</a></td><td>Has a curriculum and a defined outcome. Runs again.</td><td>A transformation with a syllabus</td><td>6 weeks – 12 months</td><td>₹2L – ₹2cr</td></tr>
          <tr><td><a href="/events/">Events</a></td><td>Has a date and a room. Happens once.</td><td>Showing up</td><td>Half a day – 2 days</td><td>Free – ₹2.5L</td></tr>
          <tr><td><a href="/coaching/">Coaching</a></td><td>Has me in it, personally, repeatedly. Their agenda.</td><td>Access</td><td>12 months, renewable</td><td>₹25L – ₹1cr+/yr</td></tr>
          <tr><td><a href="/explore/">Explore</a></td><td>Free. No transaction.</td><td>Attention</td><td>—</td><td>Free</td></tr>
          <tr><td><a href="/shop/">Shop</a></td><td>A thing that ships or downloads.</td><td>A purchase</td><td>—</td><td>₹1,200 – ₹12,000</td></tr>
        </tbody>
      </table>
    </div>
    <p class="spine mt-lg rv" style="max-width:52ch">If it has a syllabus, it’s a Program. If it has a date, it’s an Event. If it has me, it’s Coaching.</p>
  </div>
</section>

<section class="band on-paper closing">
  <div class="wrap">
    <div class="tc rv" style="max-width:40rem;margin-inline:auto">
      <h2 class="d2">Speaking</h2>
      <p class="lede mx-auto mt-sm" style="max-width:44ch">Keynotes and closed sessions — what a room gets, and the three things I will not do on a stage.</p>
      <div class="flex ac jc wrapf gap-sm mt">
        ${K.btn('Speaking', '/speaking/', 'btn--solid')}
        ${K.btn('Press kit', '/press/', 'btn--ghost')}
      </div>
    </div>
  </div>
</section>`;
};
