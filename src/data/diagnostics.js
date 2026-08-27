/* EXPLORE · THE DIAGNOSTICS
   No email gate at entry. Score shown immediately. Gate the detailed report.
   This is the whole top of the funnel — built properly or not at all. */

const L = (label, value) => ({ label, value });

/* Standard five-level maturity ladder used by the AQ instrument. */
const lvl = (a, b, c, d, e) => [L(a, 1), L(b, 2), L(c, 3), L(d, 4), L(e, 5)];

const diagnostics = [
  /* ------------------------------------------------------------ AQ SCORE */
  {
    slug: 'aq-score',
    n: '01',
    title: 'The AQ Score',
    short: 'AQ Score',
    book: 'tao',
    kicker: 'From The Accelerated Organization',
    lede: 'Twelve architectural traits, five maturity levels, one score out of sixty — benchmarked against published industry averages.',
    time: '12 questions · about 4 minutes',
    what: 'Where your organisation sits on the twelve properties that let a machine improve a million-fold in a decade.',
    why: `Your company is not slow because your people are slow. It is slow because of how it is arranged. This instrument scores the arrangement — twelve traits, five levels each, sixty points total. It is the same instrument used in the Accelerated Organization Program, run on your own reading rather than an assessor's.

Answer as the organisation actually behaves, not as the policy says it should. Every score is worth exactly as much as the honesty of the answer.`,
    primary: true,
    colour: '#2FA592',
    engine: {
      id: 'aq-score',
      unit: 'AQ Score',
      max: 60,
      benchmark: 27,
      benchmarkNote: 'Mean of published organisational maturity assessments across mid-to-large enterprises. Grade [B] — composite of secondary sources, as at 26 August 2026.',
      reportName: 'AQ Deep Report',
      weakNote: 'Move the lowest-scoring Foundation or Quick-Win trait first. Not the most interesting one.',
      showTraits: true,
      book: { title: 'The Accelerated Organization', href: '/books/accelerated-organization/', why: 'The twelve traits, the five levels, and the case for architecture over exhortation.' },
      program: { title: 'The Accelerated Organization Program', href: '/programs/accelerated-organization/', why: '90 days: assess, pick three traits, run a parallel-processing pilot, re-score.' },
      questions: [
        { trait: 'Parallel processing', q: 'When your organisation faces a decision that touches four functions, what happens?',
          help: 'Answer for the last real one, not the ideal one.',
          options: lvl(
            'It goes function to function, in sequence, and takes weeks',
            'It goes in sequence but someone chases it',
            'Two functions work in parallel; the rest wait',
            'All four work in parallel against a shared brief',
            'Parallel is the default and sequential needs a reason') },
        { trait: 'Distributed intelligence', q: 'Where does the authority to decide sit?',
          help: 'Not where the org chart says. Where it actually sits.',
          options: lvl(
            'One person, and everything queues behind them',
            'A small executive group, meeting weekly',
            'Delegated by value threshold, reviewed after',
            'Delegated by domain, with published limits',
            'Decisions are made where the information is, by default') },
        { trait: 'Scalable architecture', q: 'When volume doubles, what breaks first?',
          options: lvl(
            'Everything — we would rebuild',
            'The people; we would hire proportionally',
            'One or two known bottlenecks we have listed',
            'Little; we scale most things without redesign',
            'Nothing structural. We have already run at that volume') },
        { trait: 'Data as infrastructure', q: 'If I asked for your last quarter’s operating numbers, where do they come from?',
          options: lvl(
            'Someone assembles them from spreadsheets',
            'A monthly pack, built by hand from several systems',
            'A dashboard, with known gaps people work around',
            'Systems of record, queried directly, mostly trusted',
            'A single governed layer everything reads from') },
        { trait: 'Continuous learning', q: 'What happens after a project ends?',
          options: lvl(
            'Nothing formal. We move to the next one',
            'A retrospective document nobody reads again',
            'A retrospective, and sometimes a process change',
            'A retrospective that must produce a named change',
            'Changes are made mid-project and the standard updates itself') },
        { trait: 'Pattern recognition', q: 'How does your organisation notice a recurring problem?',
          options: lvl(
            'When someone senior happens to notice it',
            'When it appears in a monthly report',
            'We track recurrence on the big categories',
            'Recurrence is instrumented and reviewed on a cadence',
            'Patterns surface automatically and trigger a route') },
        { trait: 'Feedback loops', q: 'How long between an action and knowing whether it worked?',
          options: lvl(
            'A quarter or more, if at all',
            'A month',
            'A fortnight for most things',
            'Days, for the decisions that matter',
            'Hours. The loop is instrumented and closed') },
        { trait: 'Transfer learning', q: 'When one unit solves something hard, what happens elsewhere?',
          options: lvl(
            'Nothing. Other units solve it again later',
            'It spreads if the two leaders happen to talk',
            'We circulate it; adoption is voluntary and low',
            'There is a mechanism to port it, and it is used',
            'Solutions are packaged for reuse as a matter of course') },
        { trait: 'Network effects', q: 'Does each new customer, partner or unit make the others more valuable?',
          options: lvl(
            'No. Each is served independently',
            'Marginally, through brand',
            'In one area — data or channel — deliberately',
            'Yes, in several areas, and we can point at the mechanism',
            'Yes, and the mechanism is measured and managed') },
        { trait: 'Self-optimisation', q: 'Who improves your processes?',
          options: lvl(
            'A consultant, occasionally',
            'A central improvement function, on a programme',
            'Team leads, when they have capacity',
            'The teams themselves, with a standing mandate',
            'The system adjusts within governed limits, and reports what it changed') },
        { trait: 'Modular composability', q: 'How much of what you do could be recombined into a new offer in a quarter?',
          options: lvl(
            'None. Everything is bespoke and entangled',
            'A little, with significant rework',
            'Perhaps a third, in known combinations',
            'Most of it. Components are defined and documented',
            'Recombination is how we launch, and it takes weeks') },
        { trait: 'Emergent intelligence', q: 'Does your organisation produce answers no individual in it held?',
          help: 'This is the hardest trait to score honestly.',
          options: lvl(
            'No. Output tracks whoever is most senior in the room',
            'Rarely, and by accident',
            'Sometimes, in the teams that work well',
            'Often. We have arranged for it deliberately',
            'Routinely, and we can describe the arrangement that produces it') }
      ],
      bands: [
        { min: 0,  max: 23, title: 'Level 1–2 · Sequential', text: 'The organisation is arranged for sequential decisions. The good news is that at this level the first three moves are cheap and highly visible — usually one approval layer and one instrumented feedback loop. The gap to a peer at level four is not effort. It is arrangement.' },
        { min: 24, max: 35, title: 'Level 2–3 · Transitional', text: 'Some traits have moved and others have not, which is the most common and most frustrating position — because the accelerated traits are held to the pace of the traditional ones. A machine is held back by its weakest part. Fix the laggards, not the leaders.' },
        { min: 36, max: 47, title: 'Level 3–4 · Accelerating', text: 'The architecture is genuinely different from a traditional organisation, and the compounding has begun. The risk at this level is the opposite of the usual one: you will be tempted to add capability rather than remove the two remaining structural brakes.' },
        { min: 48, max: 60, title: 'Level 4–5 · Accelerated', text: 'This is a rare score, and the honest first question is whether it was scored generously. Re-run it with a sceptic and compare. If it holds, the useful work is now benchmarking decision velocity externally rather than improving traits internally.' }
      ]
    }
  },

  /* ---------------------------------------------------- FLYWHEEL LOCATOR */
  {
    slug: 'flywheel-locator',
    n: '02',
    title: 'The Flywheel Locator',
    short: 'Flywheel Locator',
    book: 'flywheel',
    kicker: 'From The AI Flywheel',
    lede: 'Mark your four stages and two layers. Leave with one sentence: we are strongest at ___ and our weakest part is ___.',
    time: '6 questions · about 3 minutes',
    what: 'Where your AI capability actually sits on the powertrain — and which part is holding the wheel.',
    why: `Foundation, Generative, Agentic, Physical. Plus DRIVE — the hub — and CORE — the rim. Six readings, one sentence.

The sentence is the deliverable. If you cannot say where you are strongest and where you are weakest in one line, you cannot brief a board, and you certainly cannot sequence ninety days of work.`,
    colour: '#5B8DEF',
    engine: {
      id: 'flywheel-locator',
      unit: 'Flywheel reading',
      max: 30,
      benchmark: 13,
      benchmarkNote: 'Mean self-reported reading across organisations with a named AI budget. Grade [C] — estimate from workshop sampling, as at 26 August 2026.',
      reportName: 'Flywheel Locator report',
      weakNote: 'The next ninety days belong to the weakest part. Everything else waits.',
      showTraits: true,
      book: { title: 'The AI Flywheel', href: '/books/ai-flywheel/', why: 'The powertrain, DRIVE, CORE, and why the framework survives the next model release.' },
      program: { title: 'AI Flywheel: The 90-Day Start', href: '/programs/ai-flywheel/', why: 'One workflow into production, measured honestly, with a named human owner.' },
      questions: [
        { trait: 'Foundation AI', q: 'How much of your operational data is clean, connected and queryable?',
          options: lvl('Almost none', 'One domain', 'Two or three domains', 'Most domains, with known gaps', 'A governed layer everything reads from') },
        { trait: 'Generative AI', q: 'Are any generative use cases producing measured value in production?',
          options: lvl('No, pilots only', 'One, value unmeasured', 'One, value measured', 'Several, measured', 'Several, measured, and funding the next stage') },
        { trait: 'Agentic AI', q: 'Do you run agents that take actions, not just produce text?',
          options: lvl('No', 'Prototypes only', 'One in production, tightly scoped', 'Several in production with human gates', 'Agents are an operating model with named owners') },
        { trait: 'Physical AI', q: 'Does operational data from production systems train anything physical or embedded?',
          help: 'Answer 1 without hesitation if this is not your sector. It is not a deficiency.',
          options: lvl('Not applicable or not started', 'Exploring', 'A pilot exists', 'One production system', 'A closed loop, operating data to physical system') },
        { trait: 'DRIVE · the hub', q: 'Before a build starts, is success written down and is there a data gate?',
          options: lvl('Neither', 'Sometimes, informally', 'Success is written; no data gate', 'Both, on the important builds', 'Both, always, and a build has been stopped by the gate') },
        { trait: 'CORE · the rim', q: 'Is governance treated as an unlock or as a brake?',
          options: lvl('It is a brake and everyone routes around it', 'A brake, formally complied with', 'Neutral — a checklist', 'An enabler on some workstreams', 'The unlock. Governance is why we can ship to regulated customers') }
      ],
      bands: [
        { min: 0,  max: 11, title: 'The wheel is not turning', text: 'There are parts, but no powertrain — one stage’s output is not another stage’s input. That is not a failure of ambition; it is a sequencing problem, and it is the most fixable state on this instrument.' },
        { min: 12, max: 19, title: 'Turning, slipping', text: 'Something compounds and something else leaks. Typically a strong generative layer sitting on a weak foundation, which caps how far the agentic stage can go. Name the weakest part and give it the next ninety days.' },
        { min: 20, max: 25, title: 'Compounding', text: 'The wheel turns and each stage is feeding the next. At this reading the binding constraint usually moves from technology to governance — which is the CORE argument, and it is good news.' },
        { min: 26, max: 30, title: 'The road is yours', text: 'A rare reading. The engine is model-invariant, which means the next model release is a fuel swap rather than a roadmap reset. Re-score with a sceptic and then go and standardise the win.' }
      ]
    }
  },

  /* ------------------------------------------------------- MOONSHOT TEST */
  {
    slug: 'moonshot-test',
    n: '03',
    title: 'Do You Actually Have a Moonshot?',
    short: 'The Moonshot Test',
    book: 'mmm',
    kicker: 'From Milk, Mountain, Moonshot, Ch. 17',
    lede: 'Seven questions that separate an objective from an aspiration. Most people discover they hold the second.',
    time: '7 questions · about 3 minutes',
    what: 'Whether the thing at the top of your ladder is an objective you could be held to, or a sentence that sounds good in a deck.',
    why: `An objective has properties. It is physically specific, it has a date, it is subordinated to by everything else, and it has not been rewritten twice this year. An aspiration has none of these and is much more comfortable to hold.

There is nothing wrong with discovering you do not have one. It is considerably better than discovering it in year nine.`,
    colour: '#C8A24A',
    engine: {
      id: 'moonshot-test',
      unit: 'Moonshot reading',
      max: 35,                 /* 7 properties × 5 levels */
      benchmark: 15,
      benchmarkNote: 'Median across principals who have taken this test at Moonshot Day, rescaled to the 35-point ladder. Grade [C] — small sample, as at 26 August 2026.',
      reportName: 'Moonshot Test report',
      weakNote: 'The weakest property is where the objective will fail first — usually under a succession or a bad year.',
      showTraits: true,
      book: { title: 'Milk, Mountain, Moonshot', href: '/books/milk-mountain-moonshot/', why: 'The three layers, the ladder derived backwards, and the Chapter 17 test in full.' },
      program: { title: 'The Moonshot Intensive', href: '/programs/moonshot-intensive/', why: 'Six months to a one-page portfolio with a funded gating rung.' },
      questions: [
        { trait: 'Specificity', q: 'Can your objective be photographed when it is achieved?',
          help: '"Become the most respected group in South India" cannot be photographed. "A working X at Y by Z" can.',
          options: lvl('No, it is a quality or a reputation', 'Partly — some of it is visible', 'Mostly, with interpretation', 'Yes, though the edges are fuzzy', 'Yes. Anyone would agree from the photograph') },
        { trait: 'The date', q: 'Does it have a year, and does that year sit twenty or more years out?',
          options: lvl('No year', 'A year, under five out', 'A year, five to ten out', 'A year, ten to twenty out', 'A year, twenty or more out') },
        { trait: 'Stability', q: 'How many times has it been rewritten in the last twelve months?',
          help: 'If it has been rewritten twice this year, it was never an objective.',
          options: lvl('Three or more times', 'Twice', 'Once, materially', 'Once, wording only', 'Not at all') },
        { trait: 'Subordination', q: 'What proportion of your assets are subordinated to it?',
          options: lvl('None. They predate it', 'A minority', 'About half', 'Most, and we can say why', 'All of them, and the exceptions have exit dates') },
        { trait: 'The ladder', q: 'Are the rungs between here and there named?',
          options: lvl('No ladder exists', 'The first rung only', 'Two or three rungs', 'The full ladder, derived forwards from today', 'The full ladder, derived backwards from the objective') },
        { trait: 'The gating rung', q: 'Do you know which single rung, unbuilt, blocks everything above it?',
          options: lvl('No', 'A guess', 'A view, not tested', 'Identified and agreed', 'Identified, agreed, funded, with an owner') },
        { trait: 'Who pays', q: 'Is there a business that pays for the climb, independent of the objective succeeding?',
          options: lvl('No. We fund it from the objective itself', 'Partly, from one lumpy source', 'Yes, but it is thin', 'Yes, and it passes the Transfer Test', 'Yes, and it supplies capital, data and reference clients') }
      ],
      bands: [
        { min: 0,  max: 13, title: 'You hold an aspiration', text: 'That is a finding, not a failure — and it is the finding that saves the most money. An aspiration held for a decade costs more than a bad objective corrected in year two, because nothing was ever subordinated to it and nothing was ever ruled out by it.' },
        { min: 14, max: 22, title: 'An objective, under-built', text: 'The sentence exists and some of the structure does not. Almost always the missing piece is the gating rung — identified but unfunded, which means it is not identified. Fund it or admit the objective has moved.' },
        { min: 23, max: 29, title: 'An objective with a ladder', text: 'This is a genuinely uncommon position. The pressure now comes from succession and from a bad year: an objective survives both only if it is written into a governing document rather than held in one person’s head.' },
        { min: 30, max: 35, title: 'A schedule, not a gamble', text: 'At this reading the objective is not a bet. It is a schedule with a funded gate and a business paying the bill. The remaining risk is almost entirely governance: what happens to the sentence when you are not in the room.' }
      ]
    }
  },

  /* ---------------------------------------------------- COHERENCE MATRIX */
  {
    slug: 'coherence-matrix',
    n: '04',
    title: 'The Coherence Matrix, lite',
    short: 'Coherence Matrix',
    book: 'mmm',
    kicker: 'From Milk, Mountain, Moonshot, Ch. 22',
    lede: 'Five assets, five mechanisms. The lite version of the instrument that finds the businesses that serve nothing.',
    time: '5 questions · about 3 minutes',
    what: 'Whether the things your group holds build anything the objective needs — or merely make money.',
    why: `Presence is not coherence. A group can be profitable in every unit and structurally incoherent, because profitability is measured per unit and coherence is only visible across them.

The full instrument runs on your entire asset inventory with published weightings. This lite version runs on five and gives you the shape of the answer.`,
    colour: '#B4472E',
    engine: {
      id: 'coherence-matrix',
      unit: 'Coherence reading',
      max: 25,
      benchmark: 11,
      benchmarkNote: 'Median lite-matrix reading among diversified groups at first audit. Grade [C] — estimate, as at 26 August 2026.',
      reportName: 'Coherence Matrix worksheet',
      weakNote: 'The lowest-scoring dimension is where the divestment conversation starts.',
      showTraits: true,
      book: { title: 'Milk, Mountain, Moonshot', href: '/books/milk-mountain-moonshot/', why: 'Chapter 22 is the full matrix, including the weightings and the correlation audit.' },
      program: { title: 'The Coherence Audit', href: '/programs/coherence-audit/', why: '8–12 weeks, board level, ending in a ranked list of what to stop.' },
      questions: [
        { trait: 'The mechanism test', q: 'For each business you hold, can you say what it builds that the objective needs?',
          help: 'Not "is it profitable". What does it build.',
          options: lvl('For none of them', 'For one', 'For about half', 'For most', 'For every single one, in a sentence each') },
        { trait: 'Correlation', q: 'How many of your businesses would have a bad year for the same reason?',
          options: lvl('Almost all of them', 'Most', 'About half', 'A few', 'They fail for genuinely different reasons') },
        { trait: 'The Transfer Test', q: 'Does your cash business supply anything beyond cash — data, clients, capability?',
          options: lvl('Cash only', 'Cash and a little brand', 'Cash and one other thing', 'Cash, data and clients', 'Cash, data, clients and tested capability') },
        { trait: 'Orphans', q: 'How many assets exist mainly because someone acquired them years ago?',
          options: lvl('Several, and we do not discuss them', 'Two or three', 'One, and it is known', 'One, with an exit date', 'None') },
        { trait: 'The stopping conversation', q: 'When did the board last agree to stop something?',
          options: lvl('Never', 'More than five years ago', 'Within five years', 'Within two years', 'Within the last year, on the evidence') }
      ],
      bands: [
        { min: 0,  max: 9,  title: 'Nine businesses, no direction', text: 'This is the expensive condition, and it looks entirely fine on the P&L for about a decade. The cost is not in the units — it is in every decision that could not be made because there was no criterion to make it against.' },
        { min: 10, max: 15, title: 'Partial coherence', text: 'Some assets pass the mechanism test and some are there for historical reasons everyone is too polite to raise. The full audit is worth running because the correlation map usually surprises the board more than the coherence score does.' },
        { min: 16, max: 20, title: 'Coherent, uncorrelated', text: 'A strong position. Most of what you hold builds something the objective needs, and the portfolio does not all fail on the same Tuesday. The remaining work is usually one orphan asset and one overdue stopping conversation.' },
        { min: 21, max: 25, title: 'A portfolio, not a collection', text: 'Rare. Every asset has a mechanism sentence, correlation is managed, and the board has demonstrated it can stop things. Re-run the full matrix annually with the as-at date published — coherence decays quietly.' }
      ]
    }
  },

  /* ------------------------------------------------------ THREE QUESTIONS */
  {
    slug: 'three-questions',
    n: '05',
    title: 'The Three Questions',
    short: 'The Three Questions',
    book: 'goal1',
    kicker: 'From goal1',
    lede: 'Ask any goal you currently hold: where does the number come from, who decides when it moves, and what happens next. Almost everyone fails the third.',
    time: '3 questions · under 2 minutes',
    what: 'Whether the goals you hold are grounded instruments or typed assertions.',
    why: `Three questions, asked of one real goal you currently hold. Not a hypothetical one — pick the one on the slide.

The third question is where systems fail. Organisations can usually say where the number comes from and who owns it. Very few can say what automatically happens when it goes off-track, which is why the answer is nearly always "a meeting, eleven days from now."`,
    colour: '#B4472E',
    engine: {
      id: 'three-questions',
      unit: 'Grounding reading',
      max: 15,
      benchmark: 6,
      benchmarkNote: 'Median across founders and chiefs of staff asked in workshop settings. Grade [C] — estimate, as at 26 August 2026.',
      reportName: 'Mission conversion worksheet',
      weakNote: 'If question three is your weakest, you hold an objective, not a mission.',
      showTraits: true,
      book: { title: 'goal1', href: '/books/goal1/', why: 'Five failure modes, one gap — and the mission object that closes it.' },
      program: { title: 'goal1 Installation', href: '/programs/goal1/', why: '365 days, four movements, and an honest year-one scorecard.' },
      questions: [
        { trait: 'Where does the number come from?', q: 'Pick one goal you hold today. Where does its number come from?',
          help: 'Be exact. "The CRM" is a good answer. "Sales" is not.',
          options: lvl(
            'Someone types it in a planning tool',
            'It is assembled by hand each period from several places',
            'It comes from one system, adjusted by a human',
            'It is read from a system of record, with an override log',
            'It is read from a system of record and cannot be overridden') },
        { trait: 'Who decides when it moves?', q: 'Who has the authority to say the measure has changed?',
          options: lvl(
            'Whoever is presenting that week',
            'The goal owner, unilaterally',
            'The goal owner, with a review',
            'A named owner under published rules',
            'Nobody. The system reads it; humans decide the response, not the reading') },
        { trait: 'What happens next?', q: 'When it goes off-track, what happens automatically?',
          help: 'This is the question almost everyone fails.',
          options: lvl(
            'A meeting, eventually',
            'It is flagged in the next review',
            'The owner is notified',
            'A defined action is routed to a named owner',
            'A routed action with a named owner and a governed approval gate') }
      ],
      bands: [
        { min: 0,  max: 5,  title: 'Typed, not computed', text: 'The goal and the work live in different systems, and between them a person types a number. Every OKR failure mode you have experienced lives in that gap — they are not five problems, they are one.' },
        { min: 6,  max: 9,  title: 'Partly grounded', text: 'The measure has a source and an owner, which puts you ahead of most. The break is almost certainly the third question: going off-track produces a conversation rather than a routed action, so the response time is set by the calendar.' },
        { min: 10, max: 12, title: 'Nearly a mission', text: 'Intent, Measure and Level are in place. What is missing is Route — the governed action that fires without anyone deciding to convene. Adding it is the smallest change with the largest effect in this instrument.' },
        { min: 13, max: 15, title: 'A mission, not an objective', text: 'Read rather than typed, owned under published rules, with a governed route on the downside. The quarterly ritual is now optional for this goal. The work is repeating it for the other thirty-nine — and knowing what breaks at eight and again at forty.' }
      ]
    }
  },

  /* ------------------------------------------------------- CCi READINESS */
  {
    slug: 'cci-readiness',
    n: '06',
    title: 'The CCi Readiness Assessment',
    short: 'CCi Readiness',
    book: 'cci',
    kicker: 'From Copy, Customize, Innovate',
    lede: 'Six questions on whether your team is ready to enter a market from a proven base rather than a blank page.',
    time: '6 questions · about 3 minutes',
    what: 'Whether your entry plan is a sequence problem, a research problem, or ready to run.',
    why: `Most entry failures are sequence failures — teams innovate first, on a base nobody has proven, in a market they have not localised for.

This checks the sequence. It is deliberately the least intimidating instrument on the site, because it is the on-ramp and it should be.`,
    tamil: true,
    colour: '#8E7130',
    engine: {
      id: 'cci-readiness',
      unit: 'Readiness reading',
      max: 30,
      benchmark: 14,
      benchmarkNote: 'Median across CCi Live participants. Grade [C] — workshop sampling, as at 26 August 2026.',
      reportName: 'CCi Readiness worksheet',
      weakNote: 'Fix the earliest weak stage first. Copy before Customize, Customize before Innovate.',
      showTraits: true,
      book: { title: 'Copy, Customize, Innovate', href: '/books/cci/', why: 'The three moves, in order, with the tear-down and the five localisation axes.' },
      program: { title: 'The CCi Sprint', href: '/programs/cci-sprint/', why: 'Six weeks to a validated entry plan with a customisation map.' },
      questions: [
        { trait: 'Model selection', q: 'Have you identified a model that has already been proven somewhere?',
          options: lvl('No, we are designing from scratch', 'We admire one but have not studied it', 'One candidate, lightly studied', 'Two or three candidates, compared', 'One chosen against written criteria') },
        { trait: 'The tear-down', q: 'Have you taken the reference model apart properly?',
          help: 'A screenshot is not a tear-down.',
          options: lvl('No', 'We have used the product', 'A feature list exists', 'A feature map with priorities', 'A full tear-down including what its marketing overstates') },
        { trait: 'Localisation', q: 'How many of the five axes have you worked — culture, economics, regulation, logistics, language?',
          options: lvl('None', 'One', 'Two', 'Three or four', 'All five, in writing') },
        { trait: 'Go-to-market', q: 'Can you name your first hundred customers?',
          options: lvl('No', 'A segment, not names', 'A list under twenty', 'A list approaching a hundred', 'A named list and the sequence to reach them') },
        { trait: 'The innovate layer', q: 'Do you know what you will add on top, and why it waits?',
          options: lvl('We intend to innovate first', 'Unclear', 'Some ideas, unsequenced', 'Named, and deliberately deferred', 'Named, deferred, with the trigger for starting it written down') },
        { trait: 'Entry metrics', q: 'What will tell you the entry is working before revenue does?',
          options: lvl('Nothing. We will watch revenue', 'Anecdotes from the field', 'One leading indicator', 'Two or three leading indicators, tracked', 'A defined metric set with thresholds and a stop rule') }
      ],
      bands: [
        { min: 0,  max: 11, title: 'Blank page risk', text: 'Right now the plan depends on originality carrying the entry, which is the most expensive way to enter a market. Find a proven model and take it apart. The week you spend doing that is the cheapest week of the whole entry.' },
        { min: 12, max: 19, title: 'Copied, not customised', text: 'A reference model exists and the localisation work has not been done. This is where most entries actually die — not on the model, on the payment rail, the regulation or the register of the language.' },
        { min: 20, max: 25, title: 'Ready to sprint', text: 'The sequence is right and the gaps are specific rather than structural. Six weeks of disciplined work converts this into an entry plan with a customisation map.' },
        { min: 26, max: 30, title: 'Entry-ready', text: 'Model chosen against criteria, torn down properly, localised across the axes, with named customers and a stop rule. The remaining risk is execution speed, not entry design.' }
      ]
    }
  },

  /* ------------------------------------------------ CONSTITUTION CANVAS */
  {
    slug: 'constitution-canvas',
    n: '07',
    title: 'The Constitution Canvas',
    short: 'Constitution Canvas',
    book: 'constitution',
    kicker: 'From The Constitution Engine',
    lede: 'Three Locks and three Loops. Six readings on whether your limits are written, priced and load-bearing — or decorative.',
    time: '6 questions · about 3 minutes',
    what: 'Whether the things you say you will not do are actually binding, and whether anything compounds because of them.',
    why: `Most organisations have values. Almost none have Locks. A value is *we care about safety*. A Lock is *here is the threshold, here is the test that detects it, here is what happens when it fires, and here is who signs.*

The difference shows up under pressure, which is the only time it matters. This instrument reads three Locks — the Limit, the Purpose Lock, the Refusal — and the three Loops that only turn if the Locks are real.

Answer for what is written down and would survive a bad quarter, not for what everyone in the room believes.`,
    colour: '#F4F2EC',
    engine: {
      id: 'constitution-canvas',
      unit: 'Constitution reading',
      max: 30,
      benchmark: 11,
      benchmarkNote: 'Median reading across founders and principals asked these six questions in workshop settings. Grade [C] — small sample, as at 26 August 2026.',
      reportName: 'Constitution Canvas worksheet',
      weakNote: 'A Lock is only as real as its weakest field. Fix the missing trigger, test or signatory before adding a second Lock.',
      showTraits: true,
      book: { title: 'The Constitution Engine', href: '/books/constitution-engine/', why: 'Three Locks, three Loops, and why a constraint is cheapest at the moment it is least necessary.' },
      program: { title: 'The Moonshot Intensive', href: '/programs/moonshot-intensive/', why: 'Six months to a portfolio with a governance instrument — the constitution that outlives the meeting.' },
      questions: [
        { trait: 'The Limit', q: 'Is there a number your business will not cross to make a quarter — written down, with the test that detects it and the person who signs?',
          help: 'Not a value. A ceiling. "No client above 20% of revenue." "No credit beyond 60 days."',
          options: lvl(
            'Nothing is written. We would decide in the moment',
            'A stated principle, but no number and no test',
            'A number exists, informally held by one or two people',
            'Written, with a number and a named owner',
            'Written, versioned, with the trigger, the evaluation and the signatory named') },

        { trait: 'The Purpose Lock', q: 'How expensive would it be, structurally, to abandon the mission?',
          help: 'Not how unlikely — how expensive. Ownership, charter, board appointment rights.',
          options: lvl(
            'Costless. The owners could redirect it on a Monday',
            'Awkward but easy — it would need a conversation',
            'A shareholder agreement makes it inconvenient',
            'The charter or trust deed makes it materially expensive',
            'Structurally locked: a body with no financial stake controls the change') },

        { trait: 'The Refusal', q: 'Can you name what you will not build, sell or monetise — and what each line has cost you?',
          help: 'A refusal with no price attached is a preference.',
          options: lvl(
            'No such list exists',
            'We have a sense of it, unwritten',
            'A written list, but no price beside any line',
            'A written list, and we can price some of it',
            'A written list, and we can name the revenue each line has cost') },

        { trait: 'The Trust Loop', q: 'Does the constraint win you work you would otherwise lose?',
          help: 'The test: does a buyer choose you because of a limit you published?',
          options: lvl(
            'No. The constraint is pure cost',
            'It helps the story, not the sale',
            'It has closed one or two deals',
            'It is on the procurement checklist and we win on it',
            'It is why the regulated, mission-critical work comes to us at all') },

        { trait: 'The Recursive Loop', q: 'Does what you sell make you faster at building the next thing you sell?',
          help: 'Not "we use our own product". Does R&D velocity depend on product quality?',
          options: lvl(
            'No connection at all',
            'We use our own product, but it changes nothing',
            'It saves some internal time',
            'It measurably shortens our build cycle',
            'Our next release is a direct function of the current one’s quality') },

        { trait: 'The Evidence Loop', q: 'Do you publish what does not work — the failures, the limits, the corrections?',
          help: 'The counter-intuitive result: disclosure of limitation increases willingness to buy.',
          options: lvl(
            'No. We publish results only',
            'We admit limits privately, when asked',
            'Some caveats are published',
            'We publish a method and its known weaknesses',
            'We publish a dated corrections log, and buyers cite it') }
      ],
      bands: [
        { min: 0,  max: 11, title: 'Values, not Locks', text: 'What you have is a set of intentions, and intentions are renegotiated by whoever is in the room during a bad quarter. That is not a failure of character — almost nobody writes a limit at the moment it is free, because at that moment it seems unnecessary. It will never be this cheap again.' },
        { min: 12, max: 18, title: 'Written, not binding', text: 'Something is on paper, and the missing pieces are usually the same three: no trigger that detects the breach, no named signatory, no version number. A limit without those is a sentence, not a Lock. Adding them costs a morning.' },
        { min: 19, max: 24, title: 'Locks holding, loops slack', text: 'The constraints are real and survive contact with pressure. What is not yet happening is compounding — nothing is being won *because* of them. The Trust Loop is the one to start: find the buyer who chooses you for a limit you published, and make that limit legible in the sale.' },
        { min: 25, max: 30, title: 'An engine, not a brake', text: 'Rare. The Locks are written, priced and versioned, and at least one Loop turns because of them. The remaining risk is the one this instrument cannot read: whether the Locks survive their first genuinely expensive test. A Lock renegotiated once is not a Lock — it is a preference.' }
      ]
    }
  }

];

module.exports = { diagnostics, bySlug: Object.fromEntries(diagnostics.map(d => [d.slug, d])) };
