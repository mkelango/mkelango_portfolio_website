const { site } = require('../data/site');
const { stack, byId } = require('../data/stack');
const { programs } = require('../data/programs');
const { diagnostics } = require('../data/diagnostics');
const K = require('../kit');

module.exports = function program(p) {
  const b = byId[p.book];
  const diag = diagnostics.find(d => d.slug === b.instrument);
  const others = programs.filter(x => x.slug !== p.slug).slice(0, 3);

  return `
<section class="phero on-ink" style="--c:${b.colour}">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Programs', href: '/programs/' }, { label: p.title }])}
    <div class="phero__grid">
      <div>
        <div class="flex ac wrapf gap-sm mb-sm">
          <span class="mono" style="color:${b.colour};font-weight:600">${b.altitude} · ${b.layer}</span>
          ${p.flagship ? '<span class="chip chip--brass">Lead offer</span>' : ''}
        </div>
        <h1 class="d1 lines">
          ${K.headLines(p.title)}
        </h1>
        <p class="lede lede--wide rv" style="--d:.35s;margin-top:1.5rem">${p.lede}</p>
      </div>
      <div class="rv" style="--d:.28s">
        <div class="mark-box">
          <span class="kicker">${p.kicker}</span>
          <div style="margin-top:1rem">${K.cover(b, { w: 150 })}</div>
          <div class="mark-box__cap">${b.prop}</div>
        </div>
      </div>
    </div>

    <dl class="specbar rv mt-lg" style="--d:.4s">
      ${K.field('Duration', p.duration)}
      ${K.field('Format', p.format)}
      ${K.field('Cohort', p.cohort)}
      ${K.field('Price band', `<span class="price">${p.price}</span>`)}
    </dl>
    <p class="xs faint mt-sm rv">${p.priceNote} Bands as at ${site.asAt}.</p>
  </div>
</section>

<!-- Who it is for / not for -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(1.5rem,4vw,3.5rem)">
      <div class="mark-box rv" style="background:var(--surface)">
        <span class="kicker">Who it is for</span>
        <p class="body-lg" style="margin-top:.85rem">${p.forWhom}</p>
      </div>
      <div class="mark-box rv" style="--d:.1s;background:var(--surface);border-left:2px solid var(--sienna)">
        <span class="kicker" style="color:var(--sienna)">Who it is not for</span>
        <p class="body-lg" style="margin-top:.85rem">${p.notFor}</p>
      </div>
    </div>

    <div class="artgrid mt-xl">
      <div class="prose rv">
        <span class="kicker">The problem it solves</span>
        <h2 style="margin-top:.9rem">${b.prop}</h2>
        <p>${p.problem}</p>
      </div>
      <aside class="aside-sticky rv">
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">Where this sits</span>
          <div style="margin-top:.9rem">${K.stackLadder(stack, { current: b.id, compact: true })}</div>
          <div class="mark-box__cap">This programme operates at <strong style="color:var(--fg)">${b.altitude}</strong> — ${b.horizon}.</div>
        </div>
      </aside>
    </div>
  </div>
</section>

<!-- What happens, phase by phase -->
<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'What happens', h: 'Phase by phase.',
      lede: 'Published in full, because a curriculum that cannot be published is not a curriculum. The order matters more than any individual phase.' })}
    <div class="phases">
      ${p.phases.map(ph => `<div class="phase rv">
        <span class="phase__n"></span>
        <div><p class="phase__t">${ph.t}</p><p class="phase__d">${ph.d}</p></div>
      </div>`).join('')}
    </div>
    ${p.variant ? `<div class="note mt-lg rv"><span class="kicker note__k">Scale variant</span>
      <b>${p.variant.t}</b> — ${p.variant.d}</div>` : ''}
  </div>
</section>

<!-- What you leave with -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:start">
      <div class="rv">
        ${K.kicker('What you leave with')}
        <h2 class="d2" style="margin-top:1rem">Named artefacts, not a feeling.</h2>
        <p class="lede lede--wide mt-sm">Each of these is a physical output with an owner and an as-at date on it. If the programme ends and you do not hold all of them, it did not finish.</p>
      </div>
      <div class="rv" style="--d:.1s">
        <div class="outs">
          ${p.outputs.map(o => `<div class="out"><span class="out__m"></span><span>${o}</span></div>`).join('')}
        </div>
        <div class="note note--live mt-lg">
          <span class="kicker note__k">Delivery and disclosure</span>
          ${p.delivery}
        </div>
      </div>
    </div>
    ${p.note ? `<div class="note mt-lg rv"><span class="kicker note__k">A note on positioning</span>${p.note}</div>` : ''}
  </div>
</section>

<!-- The honest case position -->
<section class="band on-ink">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:center">
      <div class="rv">
        ${K.kicker('Published cases', 'kicker--plain')}
        <h2 class="d2" style="margin-top:1rem">No published case yet. Said plainly.</h2>
      </div>
      <div class="rv" style="--d:.1s">
        <p class="lede lede--wide">This practice was founded in 2026. Where a client has consented, the case is named and published. Where consent does not exist, nothing anonymous is offered in its place — an unnamed case study is not evidence, it is decoration.</p>
        <p class="sm mute mt-sm">What is checkable today is the operating record on <a href="/the-portfolio/" style="color:var(--brass);border-bottom:1px solid currentColor">The Portfolio</a>: the frameworks run on live organisations I founded, and you can look at those organisations.</p>
        <p class="mono faint mt">${site.lines.founded}</p>
      </div>
    </div>
  </div>
</section>

<!-- Instrument + apply -->
<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <div class="rv">
        ${K.kicker('Apply')}
        <h2 class="d2" style="margin-top:1rem">Start with what you already hold.</h2>
        <p class="lede lede--wide mt-sm">There is no application fee and no discovery call script. Four questions, honestly answered, tell me whether this is the right altitude — and I will say so if it is not.</p>

        <form class="f-grid mt-lg" data-form="program-${p.slug}">
          <div class="grid g-2" style="gap:1.05rem">
            <div class="f"><label for="n-${p.slug}">Name</label><input id="n-${p.slug}" name="name" autocomplete="name" required placeholder="Your name"></div>
            <div class="f"><label for="e-${p.slug}">Email</label><input id="e-${p.slug}" name="email" type="email" autocomplete="email" required placeholder="you@company.com"></div>
          </div>
          <div class="grid g-2" style="gap:1.05rem">
            <div class="f"><label for="o-${p.slug}">Organisation</label><input id="o-${p.slug}" name="organization" autocomplete="organization" required placeholder="Group or company"></div>
            <div class="f"><label for="r-${p.slug}">Your role</label><input id="r-${p.slug}" name="jobTitle" autocomplete="organization-title" required placeholder="Principal, founder, CXO…"></div>
          </div>
          <div class="f">
            <label for="q1-${p.slug}">What are you building, in one sentence?</label>
            <textarea id="q1-${p.slug}" required placeholder="The objective, not the plan."></textarea>
          </div>
          <div class="f">
            <label for="q2-${p.slug}">What have you already tried that did not work?</label>
            <textarea id="q2-${p.slug}" required placeholder="This is the most useful answer on the form."></textarea>
          </div>
          <div class="f">
            <label for="q3-${p.slug}">Have you run the free instrument? If so, what did it read?</label>
            <input id="q3-${p.slug}" placeholder="${diag ? K.esc(diag.title) + ' — your reading' : 'Optional'}">
            <span class="f__hint">Optional, but it makes the first session start from a reading rather than an introduction.</span>
          </div>
          <div class="flex ac wrapf gap-sm">
            <button class="btn btn--brass btn--lg" type="submit">${p.cta}</button>
            <span class="xs faint">Replies within five working days, including the ones that say no.</span>
          </div>
        </form>
      </div>

      <aside class="aside-sticky rv">
        ${diag ? `<a class="card card--link inst-card" href="/diagnostics/${diag.slug}/" style="--c:${diag.colour}">
          <div class="card__body">
            <span class="chip chip--free">Free · ${diag.time}</span>
            <p class="card__ttl">${diag.title}</p>
            <p class="card__txt">${diag.what}</p>
            <div class="card__foot"><span class="mono faint">Run it first</span><span class="stk__go">${K.icon.arr}</span></div>
          </div>
        </a>` : ''}

        <a class="card card--link" href="/books/${b.slug}/">
          <div class="card__body">
            <span class="kicker">The book behind it</span>
            <p class="card__ttl">${b.title}</p>
            <p class="card__txt">${b.makes}</p>
            <div class="card__foot"><span class="mono faint">Read the argument</span><span class="stk__go">${K.icon.arr}</span></div>
          </div>
        </a>

        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">Price band</span>
          <p class="price" style="margin-top:.6rem">${p.price}</p>
          <div class="mark-box__cap">${p.priceNote}</div>
        </div>
      </aside>
    </div>
  </div>
</section>

<!-- Other programmes -->
<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Other altitudes', h: 'Wrong height for your problem?', lede: 'Six programmes, one per altitude. Using the wrong one looks like progress for about two years.', cta: K.tlink('All programs', '/programs/') })}
    <div class="grid g-3" data-stagger="0.07">
      ${others.map(o => {
        const ob = byId[o.book];
        return `<a class="card card--link inst-card" href="/programs/${o.slug}/" style="--c:${ob.colour}">
          <div class="card__body">
            <span class="mono" style="color:${ob.colour}">${ob.altitude}</span>
            <p class="card__ttl">${o.title}</p>
            <p class="card__txt">${o.lede}</p>
            <div class="card__foot"><span class="mono faint">${o.duration}</span><span class="stk__go">${K.icon.arr}</span></div>
          </div></a>`;
      }).join('')}
    </div>
  </div>
</section>`;
};
