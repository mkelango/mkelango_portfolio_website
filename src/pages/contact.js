const { site } = require('../data/site');
const { programs } = require('../data/programs');
const K = require('../kit');

module.exports = function contact() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Start a conversation' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Start a conversation')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>What you are building,</span></span>
          <span><span>what you hold, and what</span></span>
          <span><span class="d-it">has already not worked.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">Three questions. The third is the useful one, and it is the one most enquiry forms are careful not to ask.</p>
        <p class="sm mute mt-sm">Every enquiry is read and answered within five working days — including the ones where the answer is that this is the wrong altitude, or the wrong year.</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <div class="rv">
        <form class="f-grid" data-form="contact" data-ref="contact">
          <div class="grid g-2" style="gap:1.05rem">
            <div class="f"><label for="cname">Name</label><input id="cname" name="name" autocomplete="name" required placeholder="Your name"></div>
            <div class="f"><label for="cmail">Email</label><input id="cmail" name="email" type="email" autocomplete="email" required placeholder="you@company.com"></div>
          </div>
          <div class="grid g-2" style="gap:1.05rem">
            <div class="f"><label for="corg">Organisation</label><input id="corg" name="organization" autocomplete="organization" required placeholder="Group or company"></div>
            <div class="f"><label for="crole">Your role</label><input id="crole" name="jobTitle" autocomplete="organization-title" required placeholder="Principal, founder, CXO…"></div>
          </div>

          <div class="f">
            <label for="ctopic">What are you writing about?</label>
            <select id="ctopic">
              <option>A programme — I know which one</option>
              <option>A programme — I am not sure which altitude</option>
              <option>Coaching — The Founder's Table or The Board Seat</option>
              <option>An event or a seat</option>
              <option>Speaking — a date and a room</option>
              <option>Media, press or a fact-check</option>
              <option>A correction to a figure on this site</option>
              <option>Certified Practitioner programme</option>
              <option>Something else</option>
            </select>
          </div>

          <div class="f">
            <label for="cq1">01 · What are you building, in one sentence?</label>
            <textarea id="cq1" required placeholder="The objective, not the plan."></textarea>
            <span class="f__hint">If this sentence has been rewritten twice this year, say so. That is itself the finding.</span>
          </div>
          <div class="f">
            <label for="cq2">02 · What do you currently hold?</label>
            <textarea id="cq2" required placeholder="The honest inventory — including the entities nobody lists on the website."></textarea>
          </div>
          <div class="f">
            <label for="cq3">03 · What have you already tried that did not work?</label>
            <textarea id="cq3" required placeholder="This is the most useful answer on the form."></textarea>
          </div>
          <div class="f">
            <label for="cq4">Have you run any of the free instruments?</label>
            <input id="cq4" placeholder="e.g. AQ Score 31, Coherence lite 12 — optional">
            <span class="f__hint">Optional, but it means the first conversation starts from a reading rather than an introduction.</span>
          </div>

          <div class="flex ac wrapf gap-sm">
            <button class="btn btn--brass btn--lg" type="submit">Send</button>
            <span class="xs faint">Answered within five working days.</span>
          </div>
        ${K.honeypot()}
        </form>
      </div>

      <aside class="aside-sticky rv">
        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">Before you write</span>
          <p class="sm mute" style="margin-top:.7rem">Running the relevant instrument first is genuinely worth four minutes. It is free, there is no email gate, and it occasionally saves a conversation neither of us needed to have.</p>
          <div style="margin-top:1rem">${K.btn('Take the AQ Score', '/diagnostics/aq-score/', 'btn--teal btn--sm btn--block')}</div>
          <div class="mark-box__cap">${K.tlink('All six instruments', '/diagnostics/')}</div>
        </div>

        <div class="mark-box" style="background:var(--surface)">
          <span class="kicker">Other routes</span>
          <div style="margin-top:.9rem">
            ${K.fields([
              ['Media & press', '<a href="/press/" style="border-bottom:1px solid var(--hair-str)">Press kit</a>'],
              ['Corrections', '<a href="/evidence/" style="border-bottom:1px solid var(--hair-str)">The Evidence Log</a>'],
              ['Speaking', '<a href="/speaking/" style="border-bottom:1px solid var(--hair-str)">Formats and fees</a>'],
              ['தமிழ் / Tamil', '<a href="/ta/" style="border-bottom:1px solid var(--hair-str)">CCi Live</a>']
            ])}
          </div>
        </div>

        <div class="note note--alert">
          <span class="kicker note__k">Not yet connected</span>
          This form is not wired to a mail platform. Connect it before launch — nothing submitted here is currently delivered anywhere.
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Or go straight to a programme', h: 'Six installations, ordered by altitude.', cta: K.tlink('All programs', '/programs/') })}
    <div class="grid g-3" data-stagger="0.06">
      ${programs.slice(0, 3).map(p => `<a class="card card--link" href="/programs/${p.slug}/">
        <div class="card__body">
          <span class="idx">${p.n}</span>
          <p class="card__ttl">${p.title}</p>
          <p class="card__txt">${p.lede}</p>
          <div class="card__foot"><span class="mono faint">${p.price}</span><span class="stk__go">${K.icon.arr}</span></div>
        </div></a>`).join('')}
    </div>
  </div>
</section>`;
};
