const { site } = require('../data/site');
const { ideas } = require('../data/misc');
const K = require('../kit');

module.exports = function newsletter() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore/' }, { label: 'Newsletter' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('The Inevitable, weekly')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>One structural idea,</span></span>
          <span><span class="d-it">every Tuesday.</span></span>
        </h1>
        <p class="lede lede--wide rv" style="--d:.35s;margin-top:1.5rem">
          No motivation. No news roundup. No “five things I learned this week”. One mechanism,
          explained well enough to use on Monday.
        </p>
        <form class="sub rv mt" style="--d:.45s;max-width:32rem" data-form="subscribe" data-ref="newsletter-hero">
          <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
          <button class="btn btn--brass btn--lg" type="submit">Subscribe</button>
        ${K.honeypot()}
        </form>
        <p class="xs faint mt-sm rv">One email a week. Unsubscribe in one click. The list is never sold, shared or rented.</p>
      </div>
      <div class="rv" style="--d:.28s">
        <div class="mark-box">
          <span class="kicker">What arrives</span>
          <div class="outs" style="margin-top:1rem">
            ${['One mechanism, named and explained',
               'Where it sits in the stack, so you know the altitude',
               'One instrument or worked example you can run',
               'Every figure carrying a grade and a date']
              .map(o => `<div class="out"><span class="out__m"></span><span>${o}</span></div>`).join('')}
          </div>
          <div class="mark-box__cap">Roughly 700 words. Sent Tuesdays, 07:00 IST.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'What it is not', h: 'Four things it will never be.',
      lede: 'A newsletter is a weekly promise. These are the parts of the promise it is worth being explicit about.' })}
    <div class="grid g-4" data-stagger="0.07">
      ${[
        ['Not a news roundup', 'If something happened this week and there is no mechanism to draw from it, it does not appear.'],
        ['Not motivational', 'Motivation is a mood. Structure is a schedule. The newsletter is about the second one.'],
        ['Not a product email', 'Programmes are announced when they open, in one line, at the bottom. Not in the body.'],
        ['Not written by a tool', 'One person, one argument, every week. When a week has nothing worth saying, nothing goes out.']
      ].map(([t, d]) => `<div class="mark-box" style="background:var(--surface)">
        <span class="kicker" style="color:var(--sienna)">${t}</span>
        <p class="sm mute" style="margin-top:.65rem">${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The register', h: 'What it reads like.',
      lede: 'The essays are the long form of the same voice. If these are useful, the weekly will be.',
      cta: K.tlink('All essays', '/ideas/') })}
    <div class="grid g-3" data-stagger="0.07">
      ${ideas.slice(0, 3).map(i => `<a class="card card--link" href="/ideas/${i.slug}/">
        <div class="card__body">
          <span class="mono faint">${i.layer}</span>
          <p class="card__ttl">${i.title}</p>
          <p class="card__txt">${i.dek}</p>
          <div class="card__foot"><span class="mono faint">${i.read}</span><span class="stk__go">${K.icon.arr}</span></div>
        </div></a>`).join('')}
    </div>
  </div>
</section>

<section class="band on-paper closing">
  <div class="wrap">
    <div class="tc rv" style="max-width:42rem;margin-inline:auto">
      <p class="pull">One mechanism, explained well enough to <em>use on Monday.</em></p>
      <form class="sub jc mt-lg" data-form="subscribe" data-ref="newsletter-foot" style="max-width:30rem;margin-inline:auto">
        <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
        <button class="btn btn--solid" type="submit">Subscribe</button>
      ${K.honeypot()}
      </form>
      <p class="xs faint mt-sm">${site.lines.reject}</p>
    </div>
  </div>
</section>`;
};
