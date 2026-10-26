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
    subtitle: 'How Anyone Can Learn, Research and Build With AI — From Models to Machines',
    edition: 'Second Edition · The Learning Edition',
    isbn: '978-81-687762-3-4',
    titleLines: ['The', 'AI', 'Flywheel'],
    colour: '#5B8DEF',
    question: 'What compounds, and how do you turn it?',
    prop: 'Tools expire. Layers endure.',
    makes: 'Compounding capability — because the value lives in the handoffs between layers, and a person who can see the layers is never reset by the next tool.',
    status: 'available',
    coverWords: ['THE', 'AI', 'FLYWHEEL'],
    coverRule: 'THE COMPOUNDING LAYER',

    onePage: `Every AI product, from a chatbot to a robotaxi, is the same four layers turning together. <strong>Foundation AI</strong> knows. <strong>Generative AI</strong> makes. <strong>Agentic AI</strong> does. <strong>Physical AI</strong> moves. They are not a menu — they are a <em>powertrain</em>, and the value lives in the handoffs: a quick generative win pays for the data floor, the floor makes agents reliable, agents leave the telemetry that trains machines, and the world hands data back to the floor. <strong>DRIVE</strong> — Diagnose, Resource, Implement, Validate, Expand — is the hub that turns the wheel, in three modes: Learn, Research and Build. <strong>CORE</strong> — Compliance, Openness, Responsibility, Empowerment — is the rim: four plain questions anyone can ask of any AI, where the weakest pillar sets the ceiling. Learn the layers rather than the tools, and the next tool costs you almost nothing. Tools expire. Layers endure.`,

    origin: `In 2026 I spent my time in two kinds of rooms. One was a government school in Tamil Nadu — a blackboard, slow ceiling fans, forty students on benches built for thirty. When I finished, a girl in the second row raised her hand. "Sir, where do I start?" The other was a town hall at a global capability centre in Chennai. Afterwards a vice-president who ran a division of more than a thousand people walked me to the lift and asked the same question, almost word for word.

They did not need two different books. They needed **one way of seeing, told at two different depths.**

The first edition was a method for organisations. Then I watched learners and scholars use it, and saw that the five verbs of DRIVE do not belong to project managers. They describe how anyone gets good at anything hard. So the method now runs in three modes — Learn, Research, Build — and CORE became four questions any citizen can ask of any AI.

**Capability is abundant. Understanding is scarce.** Cash is spent once. Capability compounds. Start with one layer. Take one turn. Teach one person.`,

    contents: [
      'Preface · Where Do I Start?', 'Prologue · The Meal That Built a State',
      'Part One · See the Machine — four layers, one hub, one rim',
      'Part Two · Foundation AI: The Model Studio — KNOW',
      'Part Three · Generative AI: The Generative Studio — MAKE',
      'Part Four · Agentic AI: The Agentic Studio — DO',
      'Part Five · Physical AI: The Robotic Studio — MOVE',
      'Part Six · One Engine: DRIVE and CORE',
      'Ch. 21 · The Compounding Engine', 'Ch. 22 · DRIVE: One Method, Three Modes',
      'Ch. 23 · CORE: The Conscience of the Flywheel', 'Ch. 24 · The Invention Engine',
      'Part Seven · A Flywheel for Every Learner — school, campus and research, career, venture',
      'Part Eight · The Literacy Dividend',
      'Epilogue · Make the Impossible Inevitable',
      'Appendix A · The Flywheel Canvas', 'Appendix B · Reconstruction: A State That Learns'
    ],

    situations: [
      { s: 'You have an AI budget and eleven pilots and nothing compounding.',  to: '/programs/ai-flywheel/', t: 'AI Flywheel: The 90-Day Start' },
      { s: 'Every model release resets your roadmap.',                          to: '/diagnostics/flywheel-locator/', t: 'The Flywheel Locator' },
      { s: 'You run a school, a campus or a state programme and need AI literacy that compounds.', to: '/contact/', t: 'Institutional advisory' }
    ],
    instrument: 'flywheel-locator',
    note: 'The second edition is the Learning Edition: one wheel, told at four depths — Spark for ages 11 to 16, Build for college students, Deep for researchers, Lead for leaders and founders. Its five competence levels, C1 Aware to C5 Architect, are proposed, not yet tested by outside bodies.'
  },

  {
    id: 'rrr',
    slug: 'reach-read-run',
    altitude: 'INSTRUMENT',
    layer: 'The Truth Layer',
    layerShort: 'Truth',
    horizon: 'continuous',
    title: 'Reach, Read, Run',
    subtitle: 'How to Set Goals Bigger Than Your Headcount — and Run Them at the Speed of AI',
    titleLines: ['Reach,', 'Read,', 'Run'],
    colour: '#B4472E',
    question: 'How far can you reach, what is true right now, and what runs next?',
    prop: 'Reach like a founder. Read like an auditor. Run like a machine.',
    makes: 'Truth at machine speed — goals bigger than your headcount, numbers that can say “I don’t know”, and a named person who can always stop what happens next.',
    status: 'forthcoming',
    coverWords: ['REACH', 'READ', 'RUN'],
    coverRule: 'THE TRUTH LAYER · FORTHCOMING',

    onePage: `For fifty years every goal was quietly sized to the payroll, checked once a quarter, and acted on at the next meeting. Those are three ceilings — on ambition, on truth and on action — and they are lifting. <strong>Reach</strong> is a goal bigger than your headcount, written so a person or a machine can act on it. <strong>Read</strong> is the goal computing its own state from the systems where the work happens, and refusing to answer when it cannot. <strong>Run</strong> is what happens next: a missed bar reaching a named person within hours, agents working inside limits, and a human who can always stop it. Each goal is one <strong>Reach Card</strong> with five fields — WHY, BAR, SOURCE, TRIGGER, STOP. A person writes all five; the machine runs three, and <em>never touches the WHY</em>. Three gates keep it honest: Does it say why? Can it say “I don’t know”? Who can stop it?`,

    origin: `I owe you a note on the name before the book starts.

This method began as a book called *goal1*, and was then drafted under the working title *Trace, Threshold, Trigger*. Both names described the machinery of measurement rather than what a leader actually does. A leader stretches for something. A leader finds out what is true. A leader makes something happen. **Reach. Read. Run.** The machinery is still here. It is no longer the name.

The question underneath it is not a hard one. A quarterly review, forty-one slides, customer retention at ninety-four percent, green. A new board member puts his pen down and asks: "Is that as of today?" It is ten weeks old. The real number arrives four days later, and nobody in the room experiences it as a failure — because it is normal.

**In nearly every organisation on earth, a goal is a sentence.** It is written at the start of a period, discussed at the end, and in between it does nothing at all. This book is about making it something else. There is no number on its cover, because a book about numbers that cannot lie cannot open with one.`,

    contents: [
      'Introduction · Is That as of Today?',
      'Part I · The Case',
      'Ch. 1 · The Ritual That Outlived Its Reason', 'Ch. 2 · The Three Ceilings', 'Ch. 3 · What R³ Is, and What It Is Not',
      'Part II · Reach',
      'Ch. 4 · The Ration Has Lifted', 'Ch. 5 · Write the Why', 'Ch. 6 · Raise the Bar', 'Ch. 7 · From Moonshot to Monday',
      'Gate 1 · Does it say why?',
      'Part III · Read',
      'Ch. 8 · The Standing Question', 'Ch. 9 · Grounded, Not Typed', 'Ch. 10 · The Source', 'Ch. 11 · Numbers That Lie Politely',
      'Gate 2 · Can it say “I don’t know”?',
      'Part IV · Run',
      'Ch. 12 · Routed, Not Aligned', 'Ch. 13 · The Goal a Machine Holds', 'Ch. 14 · Who Can Stop It', 'Ch. 15 · Let It Stop',
      'Gate 3 · Who can stop it?',
      'Part V · The Rollout',
      'Ch. 16 · The First Ninety Days', 'Ch. 17 · The First Year', 'Ch. 18 · Where R³ Is the Wrong Tool',
      'Epilogue · The Next Reach',
      'Back matter · The Reach Card, the R³ Score and the eighteen instruments'
    ],

    situations: [
      { s: 'Your quarterly review is a negotiation, not a reading.',                   to: '/programs/reach-read-run/', t: 'Reach, Read, Run Installation' },
      { s: 'Nobody can say where the number in the deck came from.',                   to: '/diagnostics/three-questions/', t: 'The Three Questions' },
      { s: 'You want agents acting on your goals, and nobody can say who stops them.', to: '/programs/reach-read-run/', t: 'Reach, Read, Run Installation' }
    ],
    instrument: 'three-questions',
    note: 'There is no number on the cover of this book — no multiple, no percentage, no transformation figure. A book about measurement honesty that opened with a fabricated multiple would have lost its argument on the front.',
    cautions: [
      'Read Chapter 18 first. It is the chapter about when not to do this — where work is novel, unmeasured or irreducibly qualitative — and the enterprise reader’s path through the book begins there.',
      'The part about agents is new. Reading goals from systems of record, routing misses to named people and gating irreversible actions rest on practice watched over many years. Goal systems run partly by agents have no long-run public evidence yet, and the book says so where it matters.',
      'It must not be used to judge people. The baseline measures the system, never the person, and no Reach is ever tied to anyone’s compensation.'
    ]
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
    slug: 'constitution-engine',
    altitude: 'PROOF',
    layer: 'The Case',
    layerShort: 'The Case',
    horizon: '5 years',
    title: 'The Constitution Engine',
    subtitle: 'How a Company Wrote Its Limits Before It Had Anything to Lose — and Grew Faster Than Any Business in History',
    titleLines: ['The', 'Constitution', 'Engine'],
    colour: '#F4F2EC',
    question: 'What stops it — and who decides?',
    prop: 'A constraint is cheapest, most credible and most binding at the exact moment it is least necessary.',
    makes: 'The proof — and the correction. A five-year case that tests all five frameworks and reports where they break.',
    status: 'forthcoming',
    coverWords: ['THE', 'CONSTITUTION', 'ENGINE'],
    coverRule: 'THE CASE · FORTHCOMING',

    onePage: `Every book above this one answers a question about acceleration. None of them answers the question every reader of all five eventually asks: <em>when we are moving this fast, what keeps the structure from tearing itself apart — and who decides?</em> The five gesture at it. None makes it the subject. This one inverts the arrangement: <strong>the rim is the engine.</strong> Three <strong>Locks</strong> fixed before growth — a published capability ceiling with a trigger and a signatory, a legal structure that makes abandoning the mission expensive, and a named list of refusals with a price beside each line. Three <strong>Loops</strong> that only turn because the Locks are real — trust, recursion, evidence. And one governing rule: the price of installing a Lock rises with the square of what you have to lose, so install early, hold long, and never renegotiate under pressure. A Lock renegotiated once is not a Lock. It is a preference.`,

    origin: `I owe you a correction before the book starts.

In an earlier draft I called this *The Constitution Company*. That was half right and half lazy. It named a **noun** when every book I have written names a **mechanism** — *Copy, Customize, Innovate* is a verb sequence, *The Accelerated Organization* is a state produced by twelve traits, *The AI Flywheel* is a machine, *Milk, Mountain, Moonshot* is three layers, *Reach, Read, Run* is three moves of one goal. "The Constitution Company" named a thing a company **is**, not a thing a reader can **run on Monday**. So it became *The Constitution Engine*, and fixing the title fixed the book.

The subject is a company that wrote down what it would not do — a published capability ceiling, a purpose-locked legal structure, a named list of refusals — **before it had a product, customers, or anything at all to lose.** Every account treats those constraints as a tax it chose to pay and the growth as something that happened despite them. Read the mechanism rather than the narrative and the opposite is true. When the underlying capability is rented and identical for everyone, the only thing you cannot buy is the credibility of a limit you set before it cost you anything.

Three locks, three loops, one law — and a debit column I have not hidden.`,

    contents: [
      'Prologue · The Policy Nobody Had to Publish',
      'Part I · The Anomaly — why this should not be possible',
      'Part II · The Three Locks — the Limit, the Purpose Lock, the Refusal',
      'Ch. 7 · Why Locks Are Cheap Early and Unpassable Late',
      'Part III · The Three Loops — Trust, Recursion, Evidence',
      'Ch. 9 · The Recursive Loop — the product that builds the product',
      'Part IV · The Record, Fact-Checked',
      'Ch. 15 · Where the Locks Bent — the chapter that saves the book',
      'Ch. 17 · Three Counter-Cases — when a Lock becomes a bureaucracy',
      'Part V · The Stack Applied — all five frameworks, run against one case',
      'Ch. 22 · One Company, Five Frameworks — and Two Corrections',
      'Part VI · The Build — writing your own, in ninety days',
      'Part VII · The Honest Limits — five predictions, with the test that refutes each',
      'Back matter · The Ledger of Open Questions'
    ],

    situations: [
      { s: 'You are moving fast and nothing tells you when to stop.',              to: '/diagnostics/constitution-canvas/', t: 'The Constitution Canvas' },
      { s: 'You are being told governance will slow you down.',                    to: '/programs/ai-flywheel/', t: 'AI Flywheel: The 90-Day Start' },
      { s: 'You run a ₹200-crore business with no AI in it at all.',               to: '/diagnostics/constitution-canvas/', t: 'The Constitution Canvas' }
    ],
    instrument: 'constitution-canvas',
    note: 'This is the capstone, not the sixth item. Part V runs all five prior frameworks against one live case as falsification testing — and Chapter 22 issues the two places the case corrects me.',
    cautions: [
      'The title names the mechanism, not the company. No trademark on the cover, and no number either — figures go inside, tagged and dated.',
      'Chapter 15 and Chapter 16 get written before Chapter 1. If the debit column can be written honestly and the framework still stands, there is a book. If not, that is worth discovering early.',
      'The useful life of the narrative is twelve to eighteen months, anchored to the listing. Ship inside that window or it becomes a history rather than an argument.'
    ]
  }
];

const byId = Object.fromEntries(stack.map(b => [b.id, b]));
const bySlug = Object.fromEntries(stack.map(b => [b.slug, b]));

/* The boxed-set line is derived from publication status, so marking a book
   forthcoming can never leave the shop promising it inside the box. */
const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];
const published = stack.filter(b => b.status === 'available');
const forthcoming = stack.filter(b => b.status === 'forthcoming');
const boxLine = `${WORDS[published.length]} books, one argument, one box. ` +
  (forthcoming.length === 1 ? 'The sixth ships on publication.'
    : `The other ${WORDS[forthcoming.length].toLowerCase()} ship on publication.`);

module.exports = { stack, byId, bySlug, published, forthcoming, boxLine, WORDS };
