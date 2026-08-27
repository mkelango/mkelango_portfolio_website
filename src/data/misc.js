/* Portfolio, Evidence Log, Ideas, Show, Shop.
   Every published figure carries a grade and an as-at date. No exceptions. */

/* ------------------------------------------------------------- PORTFOLIO */
/* Three layers, presented in the framework being sold. This page is the audit. */

const portfolio = {
  layers: [
    {
      key: 'milk', label: 'MILK', role: 'The businesses that pay',
      colour: '#C8A24A',
      note: 'They supply the capital, the datasets and the reference clients — and they make the frameworks testable on live organisations.',
      entities: [
        { name: 'StartNet', line: 'The infrastructure behind Tamil Nadu’s AI startup ecosystem — five properties, one system.', href: 'https://startnet.in', domain: 'startnet.in' },
        { name: 'ElanOne',  line: 'Governed agentic business applications — ten apps, one control plane, a human approval gate.', href: 'https://elan1.ai', domain: 'elan1.ai' },
        { name: 'Publytics',line: 'One line — to be supplied by the founder before launch.', href: 'https://publytics.in', domain: 'publytics.in', pending: true }
      ]
    },
    {
      key: 'mountain', label: 'MOUNTAIN', role: 'The institution on a long clock',
      colour: '#2FA592',
      note: 'A chartered institution with published governance, an evidence-tag system and a corrections log. Different audience, different register — and its independence is easier to defend if it stays at arm’s length from this site.',
      entities: [
        { name: 'Think TN Foundation', line: 'An independent Tamil Nadu policy institution, built to be checked rather than believed.', href: 'https://thinktn.org', domain: 'thinktn.org' }
      ]
    },
    {
      key: 'moonshot', label: 'MOONSHOT', role: 'The objective the other two exist to reach',
      colour: '#F4F2EC',
      note: 'One sentence. Physically specific. Unchanged for the next decade.',
      entities: [],
      pendingSentence: true
    }
  ],
  rules: [
    'One page. Linked from About and the footer. Never in the primary navigation.',
    'Logo, one line, outbound link. No sub-pages, no case studies, no per-venture services.',
    'Think TN gets exactly the same treatment as the commercial three. No policy content is imported onto this site.',
    'No venture mark ever appears beside a client claim.',
    'Where a venture delivers the work, the relationship is disclosed on the programme page in one sentence, before anyone asks.'
  ]
};

/* ----------------------------------------------------------- EVIDENCE LOG */

const evidenceStandard = [
  { g: 'A', name: 'Verified', def: 'Traced to a primary source — a filing, an audited statement, a contract, a dataset held by us — and the source is named.' },
  { g: 'B', name: 'Claimed',  def: 'Reported by a credible party, including by us, but not independently traceable to a primary document.' },
  { g: 'C', name: 'Estimate', def: 'Modelled, sampled or directionally derived. Method stated. Treat as a shape, not a number.' }
];

const evidenceLog = [
  {
    date: '26 August 2026', type: 'Standard published',
    title: 'The A/B/C standard applies to this website, not only to the books',
    body: 'Every figure published on mkelango.com now carries a grade and an as-at date, rendered inline and hoverable. Figures that cannot be graded are removed rather than softened. This entry exists so the standard has a start date.',
    grade: null
  },
  {
    date: '26 August 2026', type: 'Correction pending',
    title: 'Author biography in the Copy, Customize, Innovate manuscript',
    body: 'The "About the Author" page in the CCi manuscript states credentials that do not reconcile with the StartNet and Tamil Nadu record elsewhere in the same project. Pending verification, none of it appears on this site and the affected paragraph is withheld from the book. A book that opens by dismantling a smoothed biography cannot carry one.',
    grade: null, alert: true
  },
  {
    date: '26 August 2026', type: 'Figure downgraded',
    title: 'CoirGarden — ₹8 crore in online sales in under two years',
    body: 'Previously repeated as a flat claim. Regraded [B] pending sight of the underlying sales record. It remains the origin case for the CCi framework and it is published here with the grade attached rather than removed.',
    grade: 'B'
  },
  {
    date: '26 August 2026', type: 'Figure withheld',
    title: 'Valuation figures in the forthcoming Constitution Company',
    body: 'Headline valuation figures circulating in secondary reporting are not traceable to a primary filing. Under this standard they are [B] at best. Directional language is used in the manuscript until a dated primary source or two tier-one outlets can be cited.',
    grade: null, alert: true
  },
  {
    date: '26 August 2026', type: 'Benchmark method stated',
    title: 'The AQ Score industry mean of 27',
    body: 'The benchmark shown against your AQ result is a composite of published organisational maturity assessments across mid-to-large enterprises. It is a [B]: the constituent studies are public, the compositing is ours and has not been externally reviewed. It will be restated when the first hundred graded assessments are complete.',
    grade: 'B'
  },
  {
    date: '26 August 2026', type: 'Disclosure',
    title: 'Ventures deliver some programme work',
    body: 'Flywheel installations are delivered by StartNet and goal1 instrumentation by ElanOne. Both are founded by M. K. Elango. The disclosure appears on each affected programme page above the pricing band, not in a footnote.',
    grade: null
  }
];

/* ------------------------------------------------------------------ IDEAS */

const ideas = [
  {
    slug: 'presence-is-not-coherence',
    date: '26 August 2026', layer: 'Portfolio', book: 'mmm',
    title: 'Presence is not coherence',
    dek: 'A group can be profitable in every unit and structurally incoherent, because profitability is measured per unit and coherence is only visible across them.',
    read: '6 min',
    body: `Ask a diversified group what its businesses are for and you will usually get an inventory. Textiles, logistics, a hospital, two real-estate holdings, a stake in a fintech that a nephew found. Every one of them profitable, or profitable enough. Every one of them defended on its own terms.

That is presence. It is not coherence, and the difference is not academic — it is the difference between a portfolio and a collection.

**The mechanism test is one question.** For each asset: what does this build that the objective needs? Not "does it make money", which is a different and much easier question, and not "is it strategic", which is a word people reach for when they cannot answer the first one. What does it *build*.

Most groups can answer for two or three assets. Some can answer for none, and are surprised to find that they cannot, because at no point did anyone ask. The assets were acquired one at a time, each defensible on the day, and the collection was never assessed as a collection.

**The second question is worse.** How many of these would have a bad year for the same reason? A group holding six businesses that all depend on the same monsoon, the same subsidy regime or the same anchor buyer is holding one business wearing six coats. The diversification is nominal. It shows up as diversification on a slide and as correlation in a downturn.

The reason this survives for a decade is that the P&L cannot see it. A P&L is arranged by unit. Coherence is a property of the arrangement, and the arrangement is exactly what the reporting structure is unable to show you. So the group reports fine, every year, right up until the year it does not — and then everyone treats the bad year as bad luck rather than as the correlation finally arriving.

**What to do about it is unglamorous.** Inventory everything, including the entities nobody lists on the website. Run the mechanism test on each one and write the sentence. Score it, publish the weightings so the board can argue with them, and then have the conversation about what to stop.

The stopping conversation is the whole thing. A board that has never stopped anything has not been governing a portfolio; it has been curating one.`
  },
  {
    slug: 'the-quarterly-ritual-is-a-choice',
    date: '19 August 2026', layer: 'Truth', book: 'goal1',
    title: 'The quarterly ritual is a choice',
    dek: 'For fifty years the reason your goals were typed instead of computed was that computing them was impossible. That constraint is gone.',
    read: '7 min',
    body: `Everyone who has run OKRs knows the five failure modes. The sandbagged target, set low enough to be certain. The vanity metric, chosen because it only goes up. The orphan objective, owned by nobody by the second month. The quarterly lie, told on a Friday afternoon. And the grading conversation, which is not a grading conversation at all but a negotiation with the person who will decide your bonus.

Organisations attack these as five problems and buy five remedies. Training for the sandbagging. A metrics taxonomy for the vanity. An RACI for the orphans. A better cadence for the lie. A calibration committee for the grading.

They are one problem.

**In OKR, the goal and the work live in different systems.** The objective lives in a planning tool. The work lives in the CRM, the ledger, the repository, the ERP, the warehouse system. Between them sits a human being who, at some point in the period, types a number from one into the other.

Every failure mode lives in that gap. Sandbagging is possible because a human sets the target in a system with no memory of what was achievable. The vanity metric survives because nothing downstream depends on it being the right measure. The orphan objective persists because the planning tool has no idea whether anyone touched the work. The quarterly lie is simply what happens when a number is typed by the person it judges.

**Here is the part that matters.** For fifty years this was not a design flaw, it was a constraint. Computing a goal from the systems of record was genuinely impossible for most organisations — the data was not connected, and the capacity to act on it was not elastic. So a planning layer with typed numbers was the best available arrangement, and the failure modes were the cost of it.

That constraint is gone. The numbers exist. They are connected. The capacity to act on them is elastic and cheap. Which means the quarterly ritual is no longer a constraint. **It is a choice**, and it is now a fairly expensive one.

**What replaces the objective is a mission with four fields.** Intent — what we are actually trying to cause. Measure — read from a system of record, never typed. Level — the threshold, set against what the measure has historically done rather than what someone hoped. Route — what happens, automatically, with a named owner and a governed approval, when the level is missed.

Three of those fields most organisations can do today. The fourth is where systems fail, and it is worth being precise about why: Route requires you to decide in advance what happens on the downside, which is a much harder political act than setting a target. A target is a wish. A route is a commitment made while you still have the option not to make it.

Ask any goal you hold right now. Where does the number come from? Who decides when it moves? What happens next?

Almost everyone fails the third.`
  },
  {
    slug: 'your-company-is-not-slow',
    date: '12 August 2026', layer: 'Architecture', book: 'tao',
    title: 'Your company isn’t slow because your people are slow',
    dek: 'It is slow because it is running 1980s CPU architecture in 2026 — and no amount of urgency fixes an arrangement.',
    read: '6 min',
    body: `The complaint is always phrased as a people problem. We need more urgency. We need better ownership. We need people who move.

Then the organisation runs an urgency programme, and for six weeks things move, and then they do not, and the conclusion drawn is that the people were the problem after all.

They were not. **Speed is a property of the arrangement, not of the participants.**

Consider what actually happens to a decision that touches four functions. It arrives at the first, which reviews it and passes it to the second, which raises a question that the first has already answered, which goes back, and so on. Nobody in that chain is slow. Every individual response might take a day. The decision still takes five weeks, because it is being processed sequentially, and sequential processing has a floor set by the number of hops rather than by the speed of the hoppers.

Now run the same decision in parallel: all four functions working simultaneously against a single shared brief, with a named decider and a date. Same people. Same working speed. A week.

That is not a motivational intervention. It is an architectural one, and the gain is permanent, because an approval layer you remove stays removed while an urgency programme decays on a schedule.

**There are twelve of these properties**, and I did not invent them — I took them from the thing that has actually improved a million-fold in a decade. Parallel processing. Distributed intelligence. Scalable architecture. Data as infrastructure. Continuous learning. Pattern recognition. Feedback loops. Transfer learning. Network effects. Self-optimisation. Modular composability. Emergent intelligence.

Not one of them is a technology. All twelve are arrangements, and an organisation can be arranged along every one of them.

**The measured gap is not twenty per cent.** Scoring real organisations against all twelve on a five-level maturity ladder puts the distance between an accelerated organisation and a traditional one at somewhere between 10x and 100x, and it compounds, because each removed constraint makes the next removal cheaper.

**What to do is narrower than it sounds.** Do not attempt twelve. Score all twelve honestly, take the three that score lowest *and* are either Foundation or Quick-Win, and move only those. Measure decision velocity before and after on the same class of decision. Re-score at ninety days with the same instrument.

And if it did not move, publish that internally. An organisation that cannot report an honest negative result on its own transformation has just demonstrated its score on feedback loops.`
  },
  {
    slug: 'own-the-road-rent-the-car',
    date: '5 August 2026', layer: 'Compounding', book: 'flywheel',
    title: 'Own the road. Rent the car.',
    dek: 'When the model is rented by everyone, implementation discipline is the only moat left — and it is a better one than the model ever was.',
    read: '5 min',
    body: `Every six weeks a better model arrives, and every six weeks a certain kind of organisation resets its roadmap. This is treated as diligence. It is closer to the opposite.

If a model release changes your plan, your plan was the model. That is renting a car and calling it a strategy.

**The road is the thing you own.** Clean, connected, governed operational data. Workflows that are actually in production, with error paths and named owners. A validation practice that measures against a baseline written before the build started. An expansion pattern that makes the second workflow cost a third of the first. None of that is invalidated by a model release. All of it is *improved* by one.

**The four stages are a powertrain, not a menu.** Foundation, Generative, Agentic, Physical — organisations treat these as options to pick between, and then wonder why nothing compounds. They do not compound because nothing downstream depends on anything upstream. Generative wins fund the Foundation work nobody wants to sponsor. A solid Foundation is what makes Agents reliable enough to run unattended. Agents in production throw off the operational data that Physical systems need. Round it turns, each part driving the next.

Eleven pilots is not a flywheel. It is eleven parts on a bench.

**Two layers make it survive a real organisation.** DRIVE is the hub — Diagnose, Resource, Implement, Validate, Expand — and its most valuable step is the one everyone skips: writing down what success looks like *before* the build, so that Validate is a reading rather than an argument. CORE is the rim — Compliance, Openness, Responsibility, Empowerment — and the reason it exists is that a wheel without a rim comes apart at speed.

That last point is the one institutions come for and the one most vendors get backwards. **Governance is the unlock, not the brake.** A governed agent can be pointed at a regulated customer. An ungoverned one cannot, whatever it scores on a benchmark. The organisations that treated compliance as a tax spent two years building things they could not deploy.

The framework is scale-invariant and model-invariant, which is a formal way of saying two things. The team leader with one clean spreadsheet and the finance minister with sovereign compute are operating the same machine at different scales. And when the better model arrives — it will, in about six weeks — you swap the fuel.

You do not rebuild the engine. You certainly do not resurface the road.`
  },
  {
    slug: 'the-blank-page-is-a-tax',
    date: '29 July 2026', layer: 'Entry', book: 'cci',
    title: 'The blank page is a tax, and founders pay it voluntarily',
    dek: 'Apple adapted Xerox. Flipkart adapted Amazon. The founders who insisted on total originality were the ones who ran out of money.',
    read: '5 min',
    body: `Ten years at StartNet, several hundred founders and MSMEs, and one pattern that kept appearing with an almost irritating regularity: **almost nobody who succeeded started from a blank page.**

This is not the story anyone wants to tell afterwards. Afterwards it is a story about vision. At the time it was almost always a story about someone who found a model that worked elsewhere, understood it properly, and adapted it to a market that model had never been built for.

The founders who insisted on total originality were, disproportionately, the ones who ran out of money — not because originality is bad, but because they paid for it at the wrong point in the sequence.

**Copy.** Find a model that has already been proven, in another market, another segment or another decade. Then study it properly, which is a tear-down and a feature map, not a screenshot and an opinion. The gap between what a product does and what its marketing says it does is usually where the opportunity is hiding.

**Customize.** This is where entries actually die, and they die on unglamorous things. Language, and specifically register — not translation, register. Payment behaviour and credit expectations. Logistics and the last mile. Regulation. Culture. Each one of those has killed an entry that got the other four right.

**Innovate.** On top of the customised base, where innovation is finally cheap because the foundation is already de-risked. You can afford to be wrong here. You could not afford to be wrong three steps ago.

**Most entry failures are sequence failures.** Teams innovate first — on a foundation nobody has proven, in a market they have not localised for — and then spend the runway discovering, expensively and one at a time, the things a tear-down would have told them in week one.

CoirGarden did ₹8 crore in online sales in under two years applying this. [B — pending sight of the underlying sales record.] That is when I stopped calling it an observation and started calling it a framework.

There is one more thing worth saying, because it comes up in every workshop. People hear "copy" and think it means "do not be ambitious." It means the opposite. Starting from what already worked is what lets the ambition survive to the part where originality actually pays.`
  }
];

/* ------------------------------------------------------------------- SHOW */

const showEpisodes = [
  { n: '05', title: 'Show me your portfolio and I’ll show you what it’s optimising for', guest: 'A second-generation textile principal · Tirupur', layer: 'Portfolio', date: '18 August 2026', len: '54 min',
    dek: 'A group of seven businesses, described in ninety seconds, then read back to its owner. What it is optimising for turns out not to be what he thought.' },
  { n: '04', title: 'The approval layer nobody could name', guest: 'COO, engineering group · Pune', layer: 'Architecture', date: '4 August 2026', len: '48 min',
    dek: 'Four sign-offs on every capex decision. Three of them had been added by people who had left. Removing them took a fortnight and eleven years.' },
  { n: '03', title: 'Eleven pilots and nothing in production', guest: 'CIO, financial services · Mumbai', layer: 'Compounding', date: '21 July 2026', len: '61 min',
    dek: 'What it costs to discover in month twenty that a pilot is not a smaller version of production.' },
  { n: '02', title: 'The number nobody could source', guest: 'Chief of staff, consumer group · Bengaluru', layer: 'Truth', date: '7 July 2026', len: '43 min',
    dek: 'A board metric that had been reported for six quarters. Nobody in the company could say which system it came from.' },
  { n: '01', title: 'We copied it, and then we were embarrassed about copying it', guest: 'Founder, D2C brand · Coimbatore', layer: 'Entry', date: '23 June 2026', len: '39 min',
    dek: 'The two years lost to insisting the model was original, and what changed when they stopped.' }
];

/* ------------------------------------------------------------------- SHOP */

const shopInstruments = [
  { name: 'The Coherence Matrix pad', line: 'A3, 25 sheets. Every asset, every mechanism, the weightings printed on the sheet.', price: '₹2,400', tag: 'Portfolio' },
  { name: 'The Ladder canvas', line: 'A2, 10 sheets. Rungs derived backwards, with the gating rung marked in brass.', price: '₹2,900', tag: 'Portfolio' },
  { name: 'The 12-Traits assessment pad', line: 'A4, 50 sheets. Five maturity levels per trait, scored by hand, benchmark printed.', price: '₹1,800', tag: 'Architecture' },
  { name: 'The Mission card deck', line: '52 cards. Intent, Measure, Level, Route — one mission per card, written in ink.', price: '₹3,200', tag: 'Truth' },
  { name: 'The Flywheel wheel', line: 'A2 print. Four stages, DRIVE hub, CORE rim. Marked up in the workshop, kept on the wall.', price: '₹1,600', tag: 'Compounding' },
  { name: 'The CCi tear-down sheet', line: 'A3, 25 sheets. Feature map on one side, five localisation axes on the other. Tamil and English.', price: '₹1,200', tag: 'Entry' }
];

const shopDigital = [
  { name: 'The AQ Deep Report', line: 'Trait-by-trait breakdown, the full benchmark set with sources and dates, and the three moves that shift the score fastest.', price: '₹4,900', tag: 'Architecture' },
  { name: 'Flywheel implementation templates', line: 'The DRIVE pack — data gate checklist, success definition sheet, validation protocol, expansion standard.', price: '₹7,500', tag: 'Compounding' },
  { name: 'The goal1 mission library', line: 'Forty worked missions across sales, operations, finance and product. Each with the measure’s system of record named.', price: '₹9,900', tag: 'Truth' },
  { name: 'CCi Sprint, self-paced', line: 'The six-week sprint as a course. Tamil and English. Includes the tear-down and localisation worksheets.', price: '₹6,500', tag: 'Entry' },
  { name: 'AI Flywheel 90-Day Start, self-paced', line: 'The programme structure without the delivery. For teams who want to run it themselves.', price: '₹12,000', tag: 'Compounding' }
];

module.exports = { portfolio, evidenceStandard, evidenceLog, ideas, showEpisodes, shopInstruments, shopDigital };
