/* PROGRAMS — "If it has a syllabus, it's a Program."
   Ordered by altitude, which is also roughly by price. */

const programs = [
  {
    slug: 'moonshot-intensive',
    n: '01',
    title: 'The Moonshot Intensive',
    book: 'mmm',
    kicker: 'From Milk, Mountain, Moonshot',
    lede: 'For a founder or family group ready to declare a twenty-year objective and build the architecture underneath it.',
    forWhom: 'For a founder or a family principal who already has the capital and the appetite, and needs the ladder.',
    notFor: 'This is not for organisations still deciding whether a long objective is worth having. It is for the ones who have decided and cannot get the structure to hold.',
    problem: `An enormous ambition with no ladder under it is not a strategy, it is a mood — and it will be quietly abandoned inside three years without anyone naming the moment. The failure is almost never courage. It is that nobody derived the rungs backwards from the objective, nobody identified which rung is the gate, and nobody arranged a cash business to pay for the climb. So the ambition and the P&L run on separate tracks until one of them wins, and it is never the ambition.`,
    duration: '6 months',
    format: 'Closed cohort · in-person intensives + fortnightly working sessions',
    cohort: '6 organisations a year',
    price: '₹45L – ₹2cr',
    priceNote: 'Banded by group size and whether capital architecture is in scope.',
    delivery: 'Elango, directly. Coherence Matrix modelling support by StartNet; I am its founder.',
    phases: [
      { t: 'Do You Actually Have a Moonshot?', d: 'The Chapter 17 test, run properly, on your actual objective. Most groups discover in week one that they hold an aspiration, not an objective. That is a useful week.' },
      { t: 'The ladder, derived backwards', d: 'From the objective, not from today. Each rung named, each rung with a mechanism, each rung dated.' },
      { t: 'The gating rung', d: 'The one rung that, unbuilt, makes every rung above it unreachable. Identify it, fund it, and stop pretending the others are equally urgent.' },
      { t: 'Cost-curve ratios', d: 'What has to get cheaper, by how much, by when — and whether anything in the world is currently on that curve.' },
      { t: 'Mountain selection with correlation audit', d: 'Which hard ventures build a rung you will need, and which are simply interesting. The correlation audit kills the ones that fail together.' },
      { t: 'Milk selection on the Transfer Test', d: 'Which cash business supplies capital, datasets and reference clients to the layers above it — and which merely makes money.' },
      { t: 'The Coherence Matrix', d: 'Every asset scored against the objective. The number is uncomfortable the first time. It is supposed to be.' },
      { t: 'Capital architecture and three constitutions', d: 'How the money moves between layers, and the three governing documents that stop the next generation renegotiating the objective every March.' }
    ],
    outputs: [
      'A one-page portfolio with a named mechanism in every row',
      'A funded gating rung with an owner and a date',
      'A governance instrument — the constitution that outlives the meeting',
      'A scored Coherence Matrix, with the as-at date on it'
    ],
    cta: 'Apply for a cohort seat',
    tags: 'portfolio family-business founder'
  },

  {
    slug: 'coherence-audit',
    n: '02',
    title: 'The Coherence Audit',
    book: 'mmm',
    kicker: 'From Milk, Mountain, Moonshot, Ch. 22',
    lede: 'For diversified family business groups. The diagnostic that finds the businesses that serve nothing.',
    forWhom: 'For a board or a family principal holding five or more operating businesses with no single answer to what they are collectively for.',
    notFor: 'This is not a valuation exercise and it is not a turnaround. If you already know which units to exit, you do not need this.',
    problem: `Nine businesses and no direction is more expensive than nine businesses and one direction — and it looks entirely fine on the P&L for about a decade. Presence is not coherence. A group can be profitable in every unit and still be structurally incoherent, because profitability is measured per unit and coherence is only visible across them. What the audit surfaces is the set of assets that pass no mechanism test: they are not the Milk, they do not build a rung, and they exist because someone acquired them in 2009.`,
    duration: '8–12 weeks',
    format: 'Board-level · document review, principal interviews, two working sessions',
    cohort: 'One group at a time',
    price: '₹18L – ₹60L',
    priceNote: 'Banded by asset count and the number of operating jurisdictions.',
    delivery: 'Elango, directly, with a two-person analysis team.',
    flagship: true,
    phases: [
      { t: 'Asset inventory', d: 'Everything the group holds. Operating businesses, minority stakes, land, licences, brands, dormant entities. Almost every group finds something they had forgotten.' },
      { t: 'The mechanism test, on every asset', d: 'One question per asset: what does this build that the objective needs? Not "is it profitable" — that is a different and much easier question.' },
      { t: 'Weighted coherence score', d: 'A single number for the group, with the weighting published so the board can argue with it. Arguing with it is the point.' },
      { t: 'Correlation matrix', d: 'Which assets fail together. A portfolio of six businesses that all depend on the same monsoon, the same subsidy or the same buyer is one business wearing six coats.' },
      { t: 'The divestment conversation', d: 'A ranked list of what to stop, sequenced so the group can actually do it. This is the session the family remembers.' }
    ],
    outputs: [
      'A scored coherence matrix with published weightings and an as-at date',
      'A correlation map of which assets fail together',
      'A ranked list of what to stop, with sequencing',
      'The mechanism sentence for every asset that survives'
    ],
    cta: 'Request an audit conversation',
    tags: 'portfolio family-business',
    note: 'This is the highest-margin, lowest-competition offer in the Indian market. Nobody else is selling it.'
  },

  {
    slug: 'accelerated-organization',
    n: '03',
    title: 'The Accelerated Organization Program',
    book: 'tao',
    kicker: 'From The Accelerated Organization',
    lede: 'For CXOs of 200–20,000 person organisations that need to move at the speed the technology now allows.',
    forWhom: 'For a CEO, COO or transformation lead with the authority to remove an approval layer — not merely to recommend removing one.',
    notFor: 'This is not for organisations still deciding whether speed matters, and it is not a culture programme. Nothing here is fixed by a workshop on urgency.',
    problem: `Your company is not slow because your people are slow. It is slow because it is arranged for sequential decisions in a period that rewards parallel ones. The symptom everyone reports is "we need to move faster." The actual condition is measurable: decision velocity, approval depth, and how many of the twelve architectural traits your organisation scores below level two on. Exhortation moves none of them. Architecture moves all of them, permanently.`,
    duration: '90 days, then a 12-month track',
    format: 'Assessment · pilot · re-score. In-person kickoff, remote cadence.',
    cohort: 'One organisation at a time',
    price: '₹25L – ₹1.2cr',
    priceNote: 'Banded by headcount and whether the 12-month track is included.',
    delivery: 'Elango leads the assessment and the re-score. Pilot instrumentation by StartNet; I am its founder.',
    phases: [
      { t: 'AQ assessment across 12 traits', d: 'The full instrument, run on your organisation rather than on your self-image. Scored on five maturity levels.' },
      { t: 'Benchmark against industry', d: 'Against published industry averages, with the source and date on every comparison. You will be told where the benchmark is weak.' },
      { t: 'Pick three traits', d: 'The three lowest-scoring traits that are also Foundation or Quick-Win. Not the three most interesting. The scoring decides, not the room.' },
      { t: 'Parallel-processing pilot', d: 'One real workflow, re-architected to run in parallel. Production, not pilot theatre — the distinction is the whole programme.' },
      { t: 'Decision-velocity measurement', d: 'Time from decision-raised to decision-made, measured before and after, on the same class of decision.' },
      { t: 'Re-score at day 90', d: 'The same instrument, same scorer, published internally. If it did not move, that is the finding and you get told.' }
    ],
    outputs: [
      'A measured AQ movement, before and after, same instrument',
      'One eliminated approval layer — named, dated, gone',
      'A decision-velocity baseline your board will accept',
      'A twelve-trait map with the next three moves already chosen'
    ],
    cta: 'Start with the AQ Score',
    ctaHref: '/diagnostics/aq-score/',
    tags: 'organisation corporate cxo'
  },

  {
    slug: 'ai-flywheel',
    n: '04',
    title: 'AI Flywheel: The 90-Day Start',
    book: 'flywheel',
    kicker: 'From The AI Flywheel',
    lede: 'For any organisation with AI budget and nothing compounding.',
    forWhom: 'For an organisation that has spent real money on AI and cannot name one workflow that is measurably better because of it.',
    notFor: 'This is not for organisations still deciding whether AI matters. And it is not a model selection exercise — you rent the car here, you do not buy it.',
    problem: `Eleven pilots is not a strategy. Pilots do not compound because nothing downstream depends on them: a demo that impresses a steering committee produces no operational data, funds no foundation, and trains no agent. The flywheel only turns when one stage's output is the next stage's input. So the first ninety days are not about breadth. They are about getting a single workflow all the way into production, measured honestly, with a named human owner — and then standardising that win so the second one is cheaper.`,
    duration: '90 days',
    format: 'Diagnose → resource → implement → validate → expand. Weekly cadence.',
    cohort: 'Open · rolling starts',
    price: '₹12L – ₹75L',
    priceNote: 'Banded by workflow complexity and whether data instrumentation is in scope.',
    delivery: 'Delivery for Flywheel installations is by StartNet; I am its founder. I lead Diagnose and Validate personally.',
    phases: [
      { t: 'Locate on the flywheel', d: 'Four stages, two layers. Where you are strong, where you are weak, stated in one sentence you can repeat to a board.' },
      { t: 'Name the weakest part', d: 'A machine is held back by its weakest part, not its strongest. Everything in the next eighty days serves the weakest part.' },
      { t: 'D · Diagnose', d: 'The data gate, and success written down before the build starts. If success cannot be written down, the workflow is not ready and we say so.' },
      { t: 'R · Resource', d: 'Neutral architecture. Nothing in the design may assume a specific model stays best, because it will not.' },
      { t: 'I · Implement', d: 'Production-grade, not demo-grade. Error paths, fallbacks, logging, and a named human in the loop.' },
      { t: 'V · Validate', d: 'Measured against the baseline written in Diagnose. Graded honestly, including when it did not work.' },
      { t: 'E · Expand', d: 'Standardise the win so the second workflow costs a third of the first. This is where compounding actually begins.' },
      { t: 'CORE wrapped around it', d: 'Compliance, Openness, Responsibility, Empowerment. Governance is the unlock, not the brake — and this is the part institutions came for.' }
    ],
    outputs: [
      'One workflow in production with a measured, dated baseline',
      'An agent operating model with a named human owner',
      'A CORE governance wrapper your risk function has signed',
      'A standardised pattern for workflow number two'
    ],
    variant: { t: 'Flywheel Certification', d: 'A formal capability track for teams, delivered with StartNet. For organisations that need the pattern in twenty hands, not two.' },
    cta: 'Locate yourself on the flywheel',
    ctaHref: '/diagnostics/flywheel-locator/',
    tags: 'engine ai founder corporate'
  },

  {
    slug: 'goal1',
    n: '05',
    title: 'goal1 Installation',
    book: 'goal1',
    kicker: 'From goal1',
    lede: 'For founders and chiefs of staff replacing a quarterly ritual with a live system.',
    forWhom: 'For the person who owns the planning cadence and has the authority to change it — usually a founder or a chief of staff.',
    notFor: 'This is not an OKR training. If you want your existing OKRs run better, this is the wrong programme; goal1 replaces the object, not the discipline.',
    problem: `The quarterly ritual is a choice, and it is now an expensive one. Every OKR failure mode lives in the same gap: the goal lives in a planning tool and the work lives in the systems of record, and between them a human being types a number on a Friday. Once the measure is read rather than typed, the sandbagged target has nowhere to hide, the vanity metric fails its own definition, and the grading conversation stops being a negotiation — because there is nothing left to negotiate.`,
    duration: '365 days, four movements',
    format: 'Installation, not training. Working sessions with the people who hold the systems.',
    cohort: 'Limited · 10 installations a year',
    price: '₹20L – ₹90L',
    priceNote: 'Platform licence quoted separately. Banded by number of missions and systems of record.',
    delivery: 'Elango leads the mission design. Instrumentation and the control plane by elan1; I am its founder.',
    phases: [
      { t: 'The three questions, on your current goals', d: 'Where does the number come from? Who decides when it moves? What happens next? Almost everyone fails the third. Doing this in public is the intervention.' },
      { t: 'Convert three objectives to missions', d: 'Intent, Measure, Level, Route. Three only. Converting thirty at once is how installations die.' },
      { t: 'Instrumentation missions', d: 'For every measure that does not yet exist in a system of record, a mission whose job is to make it exist. This is usually half the year-one work and nobody budgets for it.' },
      { t: 'The governance gate', d: 'A routed action with a named owner and a governed approval — so going off-track produces a decision, not a meeting eleven days from now.' },
      { t: 'What breaks at 8 missions', d: 'It always breaks at eight. We plan for it in month four rather than discovering it in month seven.' },
      { t: 'What breaks again at 40', d: 'Different failure, different fix. Covered before you get there.' },
      { t: 'The honest year-one scorecard', d: 'Including the missions that failed and the measures that turned out to be unreadable. Published internally.' }
    ],
    outputs: [
      'Grounded missions whose measures are read, never typed',
      'An audit spine — every movement in every measure, traceable',
      'A governed approval gate with named owners',
      'An honest year-one scorecard, including the failures'
    ],
    cta: 'Run the three questions',
    ctaHref: '/diagnostics/three-questions/',
    tags: 'instrument founder corporate'
  },

  {
    slug: 'cci-sprint',
    n: '06',
    title: 'The CCi Sprint',
    book: 'cci',
    kicker: 'From Copy, Customize, Innovate',
    lede: 'For corporate innovation teams and MSMEs entering a new market.',
    forWhom: 'For a team with a market to enter and a deadline, who would rather start from what already worked.',
    notFor: 'This is not for teams whose mandate is original research. CCi is an entry method, not an invention method.',
    problem: `Most entry failures are sequence failures. Teams innovate first — on a foundation nobody has proven, in a market they have not localised for — and then spend the runway discovering things a tear-down would have told them in week one. Starting from a proven model is not a lack of ambition. It is what lets the ambition survive to the part where originality actually pays.`,
    duration: '6 weeks',
    format: 'Sprint · weekly working sessions. Available in Tamil and English.',
    cohort: 'Open · corporate teams and MSME cohorts',
    price: '₹2L – ₹15L',
    priceNote: 'MSME cohort pricing is materially lower and published on the CCi Live page.',
    delivery: 'Delivered by certified CCi practitioners under licence, with Elango reviewing every entry plan.',
    volume: true,
    phases: [
      { t: 'Identify models worth copying', d: 'Proven in another market, another segment, or another decade. Selection criteria, not admiration.' },
      { t: 'Product tear-down and feature map', d: 'What the model actually does, separated from what its marketing says it does. The gap between those two is usually the opportunity.' },
      { t: 'Localisation across five axes', d: 'Culture, economics, regulation, logistics, language. Each one has killed an entry that got the other four right.' },
      { t: 'Go-to-market blueprint', d: 'Channel, price, first hundred customers, and the sequence.' },
      { t: 'The innovate layer', d: 'What you add on top, now that the base is de-risked and you can afford to be wrong about it.' },
      { t: 'CCi metrics', d: 'How you will know the entry is working before the revenue tells you.' }
    ],
    outputs: [
      'A validated entry plan with a customisation map',
      'A tear-down and feature map of the reference model',
      'A go-to-market sequence with the first hundred customers named',
      'Entry metrics that lead revenue rather than lag it'
    ],
    cta: 'Check your CCi readiness',
    ctaHref: '/diagnostics/cci-readiness/',
    tags: 'entry msme corporate tamil'
  }
];

module.exports = { programs, bySlug: Object.fromEntries(programs.map(p => [p.slug, p])) };
