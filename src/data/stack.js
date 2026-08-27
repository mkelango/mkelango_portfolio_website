/* The Elango Stack — six books, one ladder.
   Not a shelf. Five altitudes of one argument, plus the case. */

const stack = [
  {
    id: 'mmm',
    slug: 'milk-mountain-moonshot',
    altitude: 'HORIZON',
    layer: 'The Portfolio Layer',
    layerShort: 'Portfolio',
    horizon: '21–25 years',
    title: 'Milk, Mountain, Moonshot',
    titleLines: ['Milk,', 'Mountain,', 'Moonshot'],
    colour: '#C8A24A',
    question: 'What are you building, and who pays for it?',
    prop: 'A moonshot with a ladder under it and a business that pays for it is not a gamble. It is a schedule.',
    makes: 'An objective 21 years out — because the ladder is derived backwards and the Milk pays the bill forwards.',
    status: 'available',
    flagship: true,
    coverWords: ['MILK', 'MOUNTAIN', 'MOONSHOT'],
    coverRule: 'THE PORTFOLIO LAYER',

    onePage: `Three layers, running at the same time, never in sequence. <strong>Milk</strong> is the business that pays now. <strong>Mountain</strong> is a portfolio of hard ventures on three-to-eight-year clocks. <strong>Moonshot</strong> is one objective twenty-five years out that everything else is subordinated to. The counter-intuitive part is the direction of travel: selection logic runs <em>backwards</em> from the Moonshot — you choose Mountains because they build a rung you will need — while capital runs <em>forwards</em> from the Milk. Most diversified groups have the layers and none of the direction, which is why they can hold nine businesses and still have no answer to what any of them are for. The book supplies the instruments: the ladder derived backwards, the gating rung, the Transfer Test for Milk selection, the correlation audit for Mountain selection, and the Coherence Matrix that scores the whole arrangement.`,

    origin: `I heard the Elon Musk story the way everyone hears it: rockets, then cars, then solar, a man who got rich and then got ambitious. Years later I went looking for the paperwork — filings, court records, loan agreements, a prospectus — and almost none of the order was right. The rocket company came first. The car company he did not found. The solar company was his cousins'. Twenty-four Decembers, and one of them very nearly ended all of it.

What was left after the myth came off was not a personality. It was a **structure**: a business that pays now, a portfolio of hard ventures on three-to-eight-year clocks, and one objective twenty-five years out that everything else is subordinated to. Three layers, running at the same time, never in sequence. **Selection logic runs backwards from the Moonshot. Capital runs forwards from the Milk.**

Then I found the same arrangement in a Danish state utility, a Dutch machine shop and a carpet company in Georgia — none of them with a founder worth writing a biography about. That is when it stopped being a story about a man and became a framework.`,

    contents: [
      'Part I · The Myth and the Paperwork', 'Part II · The Three Layers',
      'Part III · Deriving the Ladder Backwards', 'Part IV · The Gating Rung',
      'Part V · Milk Selection and the Transfer Test', 'Part VI · Mountain Selection and Correlation',
      'Ch. 17 · Do You Actually Have a Moonshot?', 'Ch. 22 · The Coherence Matrix',
      'Part VII · Capital Architecture', 'Part VIII · Three Constitutions',
      'Appendix · The A/B/C Evidence Standard'
    ],

    situations: [
      { s: 'You hold nine businesses and cannot say what any of them are for.', to: '/programs/coherence-audit/', t: 'The Coherence Audit' },
      { s: 'You have an enormous ambition and no ladder under it.',              to: '/programs/moonshot-intensive/', t: 'The Moonshot Intensive' },
      { s: 'You are a family principal and the next generation is asking why.',  to: '/events/chairmans-table/', t: "The Chairman's Table" }
    ],
    instrument: 'moonshot-test'
  },

  {
    id: 'tao',
    slug: 'accelerated-organization',
    altitude: 'ORGANISATION',
    layer: 'The Architecture Layer',
    layerShort: 'Architecture',
    horizon: '3–5 years',
    title: 'The Accelerated Organization',
    titleLines: ['The', 'Accelerated', 'Organization'],
    colour: '#2FA592',
    question: 'What kind of company can actually get there?',
    prop: 'Your company is not slow because your people are slow. It is slow because it is running 1980s CPU architecture in 2026.',
    makes: 'Speed — because it comes from architecture, not exhortation.',
    status: 'available',
    coverWords: ['THE', 'ACCELERATED', 'ORGANIZATION'],
    coverRule: 'THE ARCHITECTURE LAYER',

    onePage: `Twelve architectural traits let a machine improve a million-fold in a decade: parallel processing, distributed intelligence, scalable architecture, data as infrastructure, continuous learning, pattern recognition, feedback loops, transfer learning, network effects, self-optimisation, modular composability, emergent intelligence. Not one of them is a technology. All twelve are <em>arrangements</em> — and an organisation can be arranged the same way. The book scores real organisations against all twelve on five maturity levels and finds the gap between an accelerated organisation and a traditional one is not twenty per cent. It is 10x to 100x, and it compounds, because architecture that removes an approval layer removes it permanently. The remedy is not a transformation programme. It is picking the three lowest-scoring traits that are also cheapest to move, and moving them.`,

    origin: `I was reading NVIDIA's 2024 investor presentation — not looking for a book — and the phrase that stopped me was **parallel processing**. AI had not just outpaced Moore's Law; it had changed the shape of the curve. So I asked the obvious question nobody was asking: if we know exactly which architectural properties let a machine improve a million-fold in a decade, why are we not building organisations with the same properties?

I took twelve of them and scored real organisations against them on five maturity levels. The gap between an accelerated organisation and a traditional one is not 20%. It is 10x to 100x, and it compounds.

**Your company is not slow because your people are slow. It is slow because it is running 1980s CPU architecture in 2026.**`,

    contents: [
      'Part I · The Shape of the Curve Changed', 'Part II · The Twelve Traits',
      '01 Parallel Processing', '02 Distributed Intelligence', '03 Scalable Architecture',
      '04 Data as Infrastructure', '05 Continuous Learning', '06 Pattern Recognition',
      '07 Feedback Loops', '08 Transfer Learning', '09 Network Effects',
      '10 Self-Optimisation', '11 Modular Composability', '12 Emergent Intelligence',
      'Part III · Five Maturity Levels', 'Part IV · Scoring Your Organisation',
      'Part V · The Three-Trait Move', 'Part VI · Decision Velocity as the Measure'
    ],

    situations: [
      { s: 'Every decision needs four approvals and you cannot say why.',     to: '/programs/accelerated-organization/', t: 'The Accelerated Organization Program' },
      { s: 'Your competitors ship in weeks and you ship in quarters.',        to: '/diagnostics/aq-score/', t: 'The AQ Score' },
      { s: 'You are a CXO who needs a number the board will accept.',         to: '/programs/accelerated-organization/', t: 'AQ Benchmark' }
    ],
    instrument: 'aq-score'
  },

  {
    id: 'flywheel',
    slug: 'ai-flywheel',
    altitude: 'ENGINE',
    layer: 'The Compounding Layer',
    layerShort: 'Compounding',
    horizon: '90 days – 5 years',
    title: 'The AI Flywheel',
    titleLines: ['The', 'AI', 'Flywheel'],
    colour: '#5B8DEF',
    question: 'What compounds, and how do you turn it?',
    prop: 'Own the road. Rent the car.',
    makes: 'Compounding advantage — because implementation discipline is the only moat left when the model is rented.',
    status: 'available',
    coverWords: ['THE', 'AI', 'FLYWHEEL'],
    coverRule: 'THE COMPOUNDING LAYER',

    onePage: `Foundation AI, Generative AI, Agentic AI, Physical AI. Everyone treats these as a menu to pick from. They are not a menu — they are a <em>powertrain</em>. Generative wins fund the Foundation. A solid Foundation makes reliable Agents possible. Agents in production throw off the operational data that trains Physical systems. Round it turns, each part driving the next. Two layers make it survive contact with a real organisation: <strong>DRIVE</strong> — Diagnose, Resource, Implement, Validate, Expand — the hub that turns the wheel; and <strong>CORE</strong> — Compliance, Openness, Responsibility, Empowerment — the rim that stops it flying apart. The framework is scale-invariant and model-invariant: the team leader with one clean spreadsheet and the finance minister with sovereign compute operate the same machine, and when a better model lands in six weeks you swap the fuel, not the engine.`,

    origin: `The same NVIDIA presentation gave me the second book. Foundation AI, Generative AI, Agentic AI, Physical AI — everyone was treating these as a menu to pick from. They are not a menu. They are a **powertrain**. Generative wins fund the Foundation. A solid Foundation makes reliable Agents possible. Agents in production throw off the operational data that trains Physical systems. Round it turns, each part driving the next.

Then I added the two things that make it survive contact with a real organisation: **DRIVE** — Diagnose, Resource, Implement, Validate, Expand — the hub that turns the wheel; and **CORE** — Compliance, Openness, Responsibility, Empowerment — the rim that keeps it from flying apart.

The point of the framework is that it is **scale-invariant and model-invariant**. And when a better model arrives in six weeks — it will — you swap the fuel, not the engine. *Own the road. Rent the car.*`,

    contents: [
      'Part I · Four Stages Are a Powertrain, Not a Menu',
      'Stage 1 · Foundation AI', 'Stage 2 · Generative AI', 'Stage 3 · Agentic AI', 'Stage 4 · Physical AI',
      'Part II · DRIVE — the hub', 'D · Diagnose (the data gate)', 'R · Resource (neutral architecture)',
      'I · Implement (production-grade, not demo-grade)', 'V · Validate (measured honestly)', 'E · Expand (standardise the win)',
      'Part III · CORE — the rim', 'Part IV · Scale Invariance', 'Part V · Model Invariance',
      'Part VI · Governance Is the Unlock, Not the Brake'
    ],

    situations: [
      { s: 'You have an AI budget and eleven pilots and nothing compounding.',  to: '/programs/ai-flywheel/', t: 'AI Flywheel: The 90-Day Start' },
      { s: 'Every model release resets your roadmap.',                          to: '/diagnostics/flywheel-locator/', t: 'The Flywheel Locator' },
      { s: 'You run an institution and governance is being used as a brake.',   to: '/contact/', t: 'Institutional advisory' }
    ],
    instrument: 'flywheel-locator'
  },

  {
    id: 'goal1',
    slug: 'goal1',
    altitude: 'INSTRUMENT',
    layer: 'The Truth Layer',
    layerShort: 'Truth',
    horizon: 'continuous',
    title: 'goal1',
    titleLines: ['goal1'],
    colour: '#B4472E',
    question: 'How do you know, truthfully, if it is working?',
    prop: 'In OKR, the goal and the work live in different systems. Every failure mode follows from that one gap.',
    makes: 'Truth — because a grounded measure cannot be negotiated.',
    status: 'available',
    coverWords: ['goal1'],
    coverRule: 'THE TRUTH LAYER',
    lowercase: true,

    onePage: `Five failure modes recur in every OKR system ever run: the sandbagged target, the vanity metric, the orphan objective, the quarterly lie, and the grading conversation that is really a negotiation. Companies attack them as five problems. They are one problem. <strong>In OKR, the goal and the work live in different systems.</strong> The objective lives in a planning tool; the work lives in the CRM, the ledger, the repository, the ERP. Between them sits a human being who, on a Friday afternoon, types a number. For fifty years that gap was unavoidable because computing the number was impossible. That constraint is gone. goal1 replaces the objective with a <strong>mission</strong> carrying four fields — Intent, Measure, Level, Route — where the measure is <em>read from a system of record, never typed</em>, and going off-track triggers a routed action with a named owner and a governed approval, not a meeting eleven days from now.`,

    origin: `I have run OKRs. So has everyone reading this. And the five failure modes are always the same five — the sandbagged target, the vanity metric, the orphan objective, the quarterly lie, and the grading conversation that is really a negotiation. Companies attack them as five problems. They are one problem.

**In OKR, the goal and the work live in different systems.** The objective lives in a planning tool. The work lives in the CRM, the ledger, the repository, the ERP. Between them sits a human being who, on a Friday afternoon, types a number. Every failure mode lives in that gap.

For fifty years, the reason your goals were typed instead of computed was that computing them was impossible. That constraint is gone. The numbers exist, they are connected, and the capacity to act on them is now elastic. **The quarterly ritual is a choice.**`,

    contents: [
      'Part I · Five Failure Modes, One Gap', 'Part II · The Mission Object',
      'Field 1 · Intent', 'Field 2 · Measure (read, never typed)', 'Field 3 · Level', 'Field 4 · Route',
      'Part III · Instrumentation Missions', 'Part IV · The Governance Gate',
      'Part V · What Breaks at 8 Missions', 'Part VI · What Breaks Again at 40',
      'Part VII · The Honest Year-One Scorecard'
    ],

    situations: [
      { s: 'Your quarterly review is a negotiation, not a reading.',       to: '/programs/goal1/', t: 'goal1 Installation' },
      { s: 'Nobody can say where the number in the deck came from.',       to: '/diagnostics/three-questions/', t: 'The Three Questions' },
      { s: 'You are a chief of staff holding a planning tool nobody trusts.', to: '/programs/goal1/', t: 'Chief-of-Staff intensive' }
    ],
    instrument: 'three-questions',
    note: 'A note on the number: 10x belongs in the marketing, never in the promise. goal1 does not promise you 10x. It removes the ceiling that made 2x your default.'
  },

  {
    id: 'cci',
    slug: 'cci',
    altitude: 'MOVE',
    layer: 'The Entry Layer',
    layerShort: 'Entry',
    horizon: '90 days',
    title: 'Copy, Customize, Innovate',
    titleLines: ['Copy,', 'Customize,', 'Innovate'],
    colour: '#8E7130',
    question: 'How do you get to market before anyone else?',
    prop: 'Almost nobody who succeeded started from a blank page.',
    makes: 'Market entry — because you start from what already worked.',
    status: 'available',
    coverWords: ['COPY', 'CUSTOMIZE', 'INNOVATE'],
    coverRule: 'THE ENTRY LAYER',

    onePage: `Apple adapted Xerox's interface. Flipkart adapted Amazon's. The founders who insisted on total originality were the ones who ran out of money. The method is three moves in order. <strong>Copy</strong> a model that has already been proven — and study it properly rather than admiring it, which means a tear-down and a feature map, not a screenshot. <strong>Customize</strong> it to the market you actually operate in: language, payment rails, logistics, regulation, culture. <strong>Innovate</strong> on top of the customised base, where innovation is finally cheap because the foundation is already de-risked. Most entry failures are sequence failures — teams innovate first, on a foundation nobody has proven, in a market they have not localised for.`,

    origin: `This is the first book I wrote and it is the one people in Tamil Nadu still stop me about. It came out of ten years at StartNet, working with hundreds of startups and MSMEs, and one pattern that kept appearing: **almost nobody who succeeded started from a blank page.** Apple adapted Xerox's interface. Flipkart adapted Amazon's. The founders who insisted on total originality were the ones who ran out of money.

So: **Copy** a model that has already been proven, and study it properly rather than admiring it. **Customize** it to the market you actually operate in — language, payment, logistics, regulation, culture. **Innovate** on top of the customised base, where innovation is now cheap because the foundation is already de-risked.

CoirGarden did ₹8 crore in online sales in under two years applying it. That is when I stopped calling it an observation and started calling it a framework.`,

    contents: [
      'Part I · The Blank Page Is a Tax', 'Part II · COPY',
      'Choosing what is worth copying', 'The product tear-down', 'The feature map',
      'Part III · CUSTOMIZE', 'Language and register', 'Payment and credit behaviour',
      'Logistics and last mile', 'Regulation', 'Culture',
      'Part IV · INNOVATE', 'Innovating on a de-risked base', 'Part V · CCi Metrics',
      'Part VI · Cases from Tamil Nadu'
    ],

    situations: [
      { s: 'You are entering a market someone has already proven elsewhere.', to: '/programs/cci-sprint/', t: 'The CCi Sprint' },
      { s: 'Your innovation team keeps starting from a blank page.',          to: '/programs/cci-sprint/', t: 'CCi Sprint for corporates' },
      { s: 'You run an MSME in Tamil Nadu and want this in Tamil.',           to: '/events/cci-live/', t: 'CCi Live' }
    ],
    instrument: 'cci-readiness',
    note: 'CCi is the on-ramp, not the flagship. It carries the base, it feeds the funnel, and it is Tamil-language-first.'
  },

  {
    id: 'constitution',
    slug: 'constitution-company',
    altitude: 'PROOF',
    layer: 'The Case',
    layerShort: 'The Case',
    horizon: '5 years',
    title: 'The Constitution Company',
    subtitle: 'How Constraint Became the Fastest Compounding in Business History',
    titleLines: ['The', 'Constitution', 'Company'],
    colour: '#F4F2EC',
    question: 'Has anyone actually done all five at once?',
    prop: 'The safety constraints were not a tax on the growth. They were the mechanism of it.',
    makes: 'The proof — a five-year case that all of the above is real.',
    status: 'forthcoming',
    coverWords: ['THE', 'CONSTITUTION', 'COMPANY'],
    coverRule: 'THE CASE · FORTHCOMING',

    onePage: `Fifty people will write <em>the AI race book</em> and it will be obsolete in four months. This is the other book: a five-year case study of a company whose <strong>governance was the accelerant, not the brake</strong>. That is literally the CORE argument in <em>The AI Flywheel</em>, the governed-route argument in <em>goal1</em>, and the coherence argument in <em>Milk, Mountain, Moonshot</em> — which makes this the capstone of the stack rather than a sixth item on a shelf. Written under the same A/B/C evidence standard as everything else, which for this subject means directional language wherever a figure cannot be tagged against a primary filing or two tier-one outlets.`,

    origin: `This is the capstone, and it is also the fastest-decaying book I will write. The thesis is a single inversion: everyone reads a constraint as a cost. In this case the constraint was the compounding mechanism — the thing that made the speed possible rather than the thing it had to be traded against.

I am writing it under three conditions I set myself. The title names the phenomenon, not the trademark. Every figure carries a grade and a date, and the ones that cannot be tagged against a primary filing get directional language instead of a number. And it publishes inside twelve months of announcement or it does not publish at all — because a book about a five-year compounding curve that arrives two years late is a history, not a case.`,

    contents: [
      'Part I · The Inversion', 'Part II · Constraint as Architecture',
      'Part III · The Governed Route', 'Part IV · What Compounded, and When',
      'Part V · Reading This Against the Other Five', 'Appendix · Every Figure, Graded and Dated'
    ],

    situations: [
      { s: 'You want to see the five frameworks running in one organisation.', to: '/the-stack/', t: 'The Stack' },
      { s: 'You are being told governance will slow you down.',                to: '/programs/ai-flywheel/', t: 'AI Flywheel: The 90-Day Start' },
      { s: 'You want to know when it publishes.',                              to: '/newsletter/', t: 'The Inevitable, weekly' }
    ],
    instrument: null,
    cautions: [
      'The title names the phenomenon, not the company. That is both safer and better positioning.',
      'Every headline figure needs a source with a date. Under the standard this book is the one place that cannot be loose.',
      'This is a Mountain, not a Milk. Twelve months or it does not publish.'
    ]
  }
];

const byId = Object.fromEntries(stack.map(b => [b.id, b]));
const bySlug = Object.fromEntries(stack.map(b => [b.slug, b]));

module.exports = { stack, byId, bySlug };
