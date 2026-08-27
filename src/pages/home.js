const { site } = require('../data/site');
const { stack } = require('../data/stack');
const { programs } = require('../data/programs');
const { events } = require('../data/events');
const { coaching } = require('../data/coaching');
const { diagnostics } = require('../data/diagnostics');
const K = require('../kit');

module.exports = function home() {
  const upcoming = ['cci-live', 'chairmans-table', 'clinics', 'summit']
    .map(s => events.find(e => e.slug === s));

  const audiences = [
    {
      k: 'Audience 01', t: 'Family business groups',
      q: 'Nine businesses, one direction — or nine businesses and no direction. The second is the more expensive problem, and it looks fine on the P&L for a decade.',
      to: '/programs/coherence-audit/', cta: 'The Coherence Audit',
      meta: ['2nd & 3rd generation', '₹500cr – ₹10,000cr', 'TN · Gulf · SEA']
    },
    {
      k: 'Audience 02', t: 'Founders scaling to category leader',
      q: 'You cannot out-model your competitors. You can out-implement them — and that lead compounds.',
      to: '/programs/ai-flywheel/', cta: 'AI Flywheel: The 90-Day Start',
      meta: ['Unicorn & soonicorn', 'India · SEA · Gulf', 'AI budget, no compounding']
    },
    {
      k: 'Audience 03', t: 'Organisations that need to move',
      q: 'Your company isn’t slow because your people are slow. It is slow because it is running 1980s CPU architecture in 2026.',
      to: '/programs/accelerated-organization/', cta: 'The Accelerated Organization',
      meta: ['200 – 20,000 people', 'CXO & PSU leadership', 'Decision velocity']
    }
  ];

  return `
<!-- ═════════════════════════════════════════════ 1 · HERO ═══════════════ -->
<section class="hero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    <div class="hero__grid">
      <div>
        ${K.kicker('M. K. Elango · Strategist')}
        <h1 class="d0 lines" style="margin-top:1.5rem">
          <span><span>Make the</span></span>
          <span><span>impossible</span></span>
          <span><span class="d-it">inevitable.</span></span>
        </h1>
        <p class="lede lede--wide rv" style="--d:.45s;margin-top:1.75rem;max-width:46ch">
          Most ambition fails for want of structure, not courage. I install the five systems that turn
          an impossible objective into a schedule — for founders, family business groups, and organisations
          that intend to move at the speed the technology now allows.
        </p>
        <div class="flex ac wrapf gap-sm rv" style="--d:.58s;margin-top:2.25rem">
          ${K.btn('Take the AQ Score — 12 questions, 4 minutes', '/diagnostics/aq-score/', 'btn--brass btn--lg')}
          ${K.btn('Start a conversation', '/contact/', 'btn--ghost btn--lg')}
        </div>
        <p class="mono faint rv" style="--d:.68s;margin-top:2rem">${site.lines.reject}</p>
      </div>

      <div class="rv" style="--d:.3s">
        <div class="hero-stack">
          <div class="flex ac jb mb-sm" style="padding-inline:.15rem">
            ${K.kicker('The Elango Stack')}
            <span class="mono faint">FIVE ALTITUDES · ONE ARGUMENT</span>
          </div>
          ${K.stackLadder(stack, {})}
          <p class="xs faint" style="margin-top:1.1rem;padding-inline:.15rem">
            You do not need to read them in order. You do need to know which altitude your problem lives at —
            because a portfolio problem solved with an organisational tool will look like progress for about two years.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═════════════════════════════════════ 2 · WHO I WORK WITH ═══════════ -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({
      k: 'Who this is for',
      h: 'Three problems, at three altitudes.',
      lede: 'The ambition is real and the capital is real. What is missing is structure — and structure is not a mood you can be talked into.'
    })}

    <div class="grid g-3" data-stagger="0.09">
      ${audiences.map(a => `
        <article class="card">
          <div class="card__body">
            ${K.kicker(a.k)}
            <p class="card__ttl" style="font-size:1.5rem">${a.t}</p>
            <p class="card__txt" style="font-size:.9rem">${a.q}</p>
            <div class="chiprow" style="margin-top:.5rem">${a.meta.map(m => `<span class="chip">${m}</span>`).join('')}</div>
            <div class="card__foot">${K.tlink(a.cta, a.to)}</div>
          </div>
        </article>`).join('')}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════ 3 · THE INSTRUMENTS ═════════ -->
<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.shead({
      k: 'The instruments',
      h: 'Don’t take my word for it.<br>Run the tests.',
      lede: 'Six diagnostics from the six books. All free, all instant, all playable on the page. There is no email gate to start one — the gate is on the detailed report, where it belongs.',
      cta: K.tlink('All six instruments', '/diagnostics/')
    })}

    <div class="grid g-3" data-stagger="0.07">
      ${diagnostics.map(d => `
        <a class="card card--link inst-card" href="/diagnostics/${d.slug}/" style="--c:${d.colour}">
          <div class="card__body">
            <div class="flex ac jb gap-sm">
              <span class="idx">${d.n}</span>
              <span class="chip chip--free">Free</span>
            </div>
            <p class="card__ttl">${d.title}</p>
            <p class="card__txt">${d.what}</p>
            <div class="card__foot">
              <span class="mono faint">${d.time}</span>
              <span class="stk__go">${K.icon.arr}</span>
            </div>
          </div>
        </a>`).join('')}
    </div>

    <div class="note note--live mt-lg rv">
      <span class="kicker note__k">How this works</span>
      Your score is shown immediately, in full, with the benchmark and the method. If you want the detailed
      report we ask for an email at that point — after you already have the answer, not before.
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════ 4 · PROOF, WITH TAGS ═══════ -->
<section class="band on-paper" id="proof">
  <div class="wrap wrap--wide">
    ${K.shead({
      k: 'Proof',
      h: 'Every figure carries a grade and a date.',
      lede: 'This is the evidence standard from <em>Milk, Mountain, Moonshot</em>, applied to my own website first. Hover any tag. If a number cannot be graded, it is not published — it is not softened, it is removed.',
      cta: K.tlink('The Evidence Log', '/evidence/')
    })}

    <div class="stats g-4 rv">
      ${K.figure({ n: 5, label: 'Books complete in manuscript, with a sixth in draft', g: 'A', note: 'Five manuscripts complete and held in project, verifiable on request. None yet carries an ISBN. The sixth is in draft and marked forthcoming everywhere it appears.' })}
      ${K.figure({ n: 10, suffix: '+', label: 'Years at StartNet, working with founders and MSMEs', g: 'B', note: 'Self-reported operating history. Company registration is public; the engagement count is not independently audited.' })}
      ${K.figure({ n: 8, suffix: ' cr', label: 'CoirGarden online sales in under two years, applying CCi', g: 'B', note: 'The origin case for the CCi framework. Regraded from a flat claim to [B] pending sight of the underlying sales record. See the Evidence Log.' })}
      ${K.figure({ n: 4, label: 'Ventures operating across the three layers', g: 'A', note: 'StartNet, elan1, Publytics and Think TN Foundation. Each is a registered entity with its own live property, listed on The Portfolio.' })}
    </div>

    <div class="mt-lg rv">
      ${K.rule()}
      <div class="flex ac jb wrapf gap mt">
        <div class="elegend">
          <span class="elegend__i">${K.etag('A', K.GRADE_DEF.A)} <span>Verified</span></span>
          <span class="elegend__i">${K.etag('B', K.GRADE_DEF.B)} <span>Claimed</span></span>
          <span class="elegend__i">${K.etag('C', K.GRADE_DEF.C)} <span>Estimate</span></span>
        </div>
        <p class="xs faint">As at ${site.asAt}. ${site.lines.founded}</p>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════ 5 · PROGRAMS ════════ -->
<section class="band on-ink">
  <div class="wrap wrap--wide">
    ${K.shead({
      k: 'Programs',
      h: 'Six installations, ordered by altitude.',
      lede: 'A Program has a curriculum and a defined outcome, and it runs again. That is the whole test. Prices are published as bands — “contact for pricing” reads to a family office as <em>the price depends on how rich you look</em>.',
      cta: K.tlink('All programs', '/programs/')
    })}

    <div class="ledger">
      ${programs.map(p => {
        const b = stack.find(s => s.id === p.book);
        return K.lrow({
          n: p.n,
          title: p.title,
          desc: p.lede,
          meta: [p.duration, p.cohort, p.price, b ? b.altitude : ''].filter(Boolean),
          href: `/programs/${p.slug}/`
        });
      }).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════ 6 · UPCOMING ════════ -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.railX({
      k: 'Upcoming',
      h: 'A date and a room.',
      cta: K.tlink('Full calendar', '/events/calendar/'),
      items: upcoming.map(e => `
        <article class="card" style="--c:${e.colour}">
          <div class="card__body">
            <div class="flex ac jb gap-sm">
              <span class="chip ${e.format === 'VIRTUAL' ? 'chip--live' : 'chip--brass'}">${e.format}</span>
              <span class="idx">${e.n}</span>
            </div>
            <p class="card__ttl">${e.title}</p>
            <p class="card__txt">${e.leaveWith}</p>
            <div style="margin-top:.5rem">
              ${K.fields([['Next date', K.time(e.next.date, e.dateISO)], ['Place', e.next.place], ['Timezone', e.next.tz]])}
            </div>
            <div class="card__foot" style="flex-direction:column;align-items:stretch;gap:.75rem">
              ${K.seats(e.seats)}
              ${K.tlink(`About ${e.title}`, `/events/${e.slug}/`)}
            </div>
          </div>
        </article>`)
    })}
  </div>
</section>

<!-- ══════════════════════════════════════════════ 7 · COACHING ════════ -->
<section class="band on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,5rem);align-items:center">
      <div class="rv">
        ${K.kicker('Coaching')}
        <h2 class="d1" style="margin-top:1.25rem">Six seats.<br>That is the entire<br>coaching practice.</h2>
        <p class="lede lede--wide" style="margin-top:1.5rem">
          The Founder’s Table is one-to-one, annual, and applied for. If you are building something that will
          take twenty years and you need someone who will tell you when the ladder is wrong, this is what it is for.
        </p>
        <div class="flex ac wrapf gap-sm mt">
          ${K.btn('Apply', '/coaching/founders-table/', 'btn--brass')}
          ${K.btn('All three tiers', '/coaching/', 'btn--ghost')}
        </div>
        <p class="mt-sm">${K.seats(coaching[0].seats)}</p>
      </div>

      <div class="ledger rv" style="--d:.15s">
        ${coaching.map(c => K.lrow({
          n: c.n, title: c.title, desc: c.lede,
          meta: [c.volume, c.priceShort], href: `/coaching/${c.slug}/`
        })).join('')}
      </div>
    </div>

    <div class="note mt-lg rv">
      <span class="kicker note__k">Why the number is small on purpose</span>
      A bench of coaches selling packages would destroy the family-office positioning inside a year. The
      Programs layer, delivered by <a href="/coaching/practitioners/">Certified Practitioners</a> under licence,
      is what makes this a business rather than a job with good margins.
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════ 8 · THE BOOKS ═══════ -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({
      k: 'The stack',
      h: 'Five books. One argument.<br>Read at five altitudes.',
      lede: 'Not a shelf. Each book answers one question at one altitude, and the sixth is the case that all five ran at once in a single organisation.',
      cta: K.tlink('How the stack works', '/the-stack/')
    })}

    <div class="covers rv">
      ${stack.map((b, i) => `
        <a class="cover-slot ${b.flagship ? 'is-flag' : ''}" href="/books/${b.slug}/"
           style="--d:${(i * 0.06).toFixed(2)}s" aria-label="${b.title}">
          ${K.cover(b, { w: b.flagship ? 300 : 240 })}
          <span class="cover-meta">
            <span class="mono" style="color:${b.colour}">${b.altitude}</span>
            <span class="cover-ttl">${b.title}</span>
            ${b.status === 'forthcoming' ? '<span class="chip">Forthcoming</span>' : ''}
          </span>
        </a>`).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════ 9 · THE NEWSLETTER ══════ -->
<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      ${K.kicker('The newsletter', 'kicker--plain')}
      <h2 class="d2" style="margin-top:1.1rem">The Inevitable — one structural idea, every Tuesday.</h2>
      <p class="lede mx-auto" style="margin-top:1.25rem;max-width:44ch">
        No motivation. No news roundup. One mechanism, explained well enough to use on Monday.
      </p>
      <form class="sub jc mt" data-form="subscribe" data-ref="home" style="max-width:30rem;margin-inline:auto">
        <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
        <button class="btn btn--brass" type="submit">Subscribe</button>
      ${K.honeypot()}
      </form>
      <p class="xs faint mt-sm">One email a week. Unsubscribe in one click. The list is never sold or shared.</p>
    </div>
  </div>
</section>

<!-- ═════════════════════════════════════════ 10 · CLOSING BAND ════════ -->
<section class="band on-paper closing">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:center">
      <div class="rv">
        <p class="pull">I don’t make people more ambitious.<br>I make their ambition <em>inevitable.</em></p>
      </div>
      <div class="rv" style="--d:.12s">
        <p class="lede lede--wide">${site.lines.capital}</p>
        <div class="flex ac wrapf gap-sm mt">
          ${K.btn('Start a conversation', '/contact/', 'btn--solid btn--lg')}
          ${K.btn('Read the story', '/about/', 'btn--ghost btn--lg')}
        </div>
      </div>
    </div>
  </div>
</section>`;
};
