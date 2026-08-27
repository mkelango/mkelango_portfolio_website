const { site } = require('../data/site');
const { stack } = require('../data/stack');
const K = require('../kit');

module.exports = function press() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }, { label: 'Press Kit' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Press kit')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Everything a</span></span>
          <span><span class="d-it">journalist can check.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">Bio, portrait, framework diagrams, and a fact sheet where every figure carries a grade and an as-at date. If something here cannot be sourced, it is marked, not smoothed.</p>
        <div class="mt">${K.btn('Media enquiries', '/contact/', 'btn--brass')}</div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <div class="rv">
        ${K.kicker('Approved biography')}
        <h2 class="d2" style="margin-top:1rem">Three lengths. Use any of them verbatim.</h2>

        <div class="mark-box mt" style="background:var(--surface)">
          <span class="mono faint">25 WORDS</span>
          <p class="body-lg" style="margin-top:.8rem">M. K. Elango is a strategist working with family business groups and AI-era founders on portfolio architecture, organisational velocity and computed goal systems. He is the author of five books.</p>
        </div>

        <div class="mark-box mt-sm" style="background:var(--surface)">
          <span class="mono faint">60 WORDS</span>
          <p class="body-lg" style="margin-top:.8rem">M. K. Elango is a strategist family business groups and AI-era founders call when the ambition is real, the capital is real, and the structure is missing. He installs five named systems — portfolio architecture, organisational velocity, an AI engine, a computed goal system and a fast-entry method — and publishes the evidence standard he holds himself to. He founded StartNet, ElanOne, Publytics and the Think TN Foundation.</p>
        </div>

        <div class="mark-box mt-sm" style="background:var(--surface)">
          <span class="mono faint">140 WORDS</span>
          <p class="body-lg" style="margin-top:.8rem">M. K. Elango is a strategist and author working with family business groups, unicorn and soonicorn founders, and large organisations across India, the Gulf and South-East Asia.</p>
          <p class="body-lg" style="margin-top:.9rem">His work began with ten years at StartNet, where a single pattern across several hundred founders became <em>Copy, Customize, Innovate</em>. Four books followed, each answering one question at one altitude: <em>Milk, Mountain, Moonshot</em> on portfolio architecture, <em>The Accelerated Organization</em> on organisational velocity, <em>The AI Flywheel</em> on compounding AI capability, and <em>goal1</em> on computed goal systems. A sixth, <em>The Constitution Company</em>, is in manuscript.</p>
          <p class="body-lg" style="margin-top:.9rem">He publishes an A/B/C evidence standard against every figure he prints, including on his own website, and maintains a public corrections log. He founded StartNet, ElanOne and Publytics, and the independent Think TN Foundation.</p>
        </div>

        <div class="note note--alert mt-lg">
          <span class="kicker note__k">A note to editors on credentials</span>
          <b>No academic or investment credentials are claimed anywhere in the approved biographies above,
          and none should be attributed.</b> Where an earlier manuscript draft carried credential text that does not
          reconcile with the operating record, it has been withheld pending verification and is listed openly in the
          <a href="/evidence/">Evidence Log</a>. If you have seen a bio elsewhere that includes such claims, treat this page
          as the correction and please write to us so the source can be traced.
        </div>
      </div>

      <aside class="aside-sticky rv">
        ${K.portraitSlot('PRESS PORTRAIT')}
        <div class="mark-box">
          <span class="kicker">Fact sheet</span>
          <div class="stats" style="margin-top:1rem;gap:1.25rem">
            ${K.figure({ n: 5, label: 'Books complete in manuscript', g: 'A', note: 'Five manuscripts complete and held in project, verifiable on request. None yet carries an ISBN. The sixth is in draft.' })}
            ${K.figure({ n: 4, label: 'Ventures operating', g: 'A', note: 'StartNet, ElanOne, Publytics and Think TN Foundation. Each a registered entity with a live property.' })}
            ${K.figure({ n: 2026, dec: 0, label: 'Year this practice was founded', g: 'A', note: 'The advisory practice under this name. The underlying operating history at StartNet runs longer.' })}
          </div>
          <div class="mark-box__cap">Every figure above is graded. Hover a tag for the source.</div>
        </div>
        <div>
          ${K.btn('Media enquiries', '/contact/', 'btn--brass btn--block')}
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Assets', h: 'Framework diagrams, cleared for publication.',
      lede: 'Reproduce these with attribution. They are drawn rather than photographed, which means they reproduce cleanly in print at any size.' })}

    <div class="grid g-2" data-stagger="0.08">
      <div class="mark-box mark-box--plate">${K.layersMark(520)}<div class="mark-box__cap"><strong style="color:var(--fg)">The three layers</strong> — from <em>Milk, Mountain, Moonshot</em>. Selection runs backwards; capital runs forwards.</div></div>
      <div class="mark-box mark-box--plate">${K.flywheelMark(400)}<div class="mark-box__cap"><strong style="color:var(--fg)">The AI Flywheel</strong> — four stages as a powertrain, DRIVE as the hub, CORE as the rim.</div></div>
      <div class="mark-box mark-box--plate">${K.traitsMark(520)}<div class="mark-box__cap"><strong style="color:var(--fg)">Twelve architectural traits</strong> — from <em>The Accelerated Organization</em>, scored on five maturity levels.</div></div>
      <div class="mark-box mark-box--plate">${K.missionMark(520)}<div class="mark-box__cap"><strong style="color:var(--fg)">The mission object</strong> — from <em>goal1</em>. Intent, Measure, Level, Route.</div></div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Book covers', h: 'High-resolution covers.', lede: 'Available for review coverage. The sixth is marked forthcoming and must be described as unpublished.' })}
    <div class="covers rv">
      ${stack.map(b => `<div class="cover-slot">${K.cover(b, { w: 240 })}
        <span class="cover-meta"><span class="mono" style="color:${b.colour}">${b.altitude}</span>
        <span class="cover-ttl">${b.title}</span>
        ${b.status === 'forthcoming' ? '<span class="chip chip--alert">Unpublished</span>' : ''}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:42rem;margin-inline:auto">
      <h2 class="d2">Media enquiries</h2>
      <p class="lede mx-auto mt-sm" style="max-width:44ch">Interviews, review copies, and fact-checking. Corrections are welcomed and published — that is what the log is for.</p>
      <div class="flex ac jc wrapf gap-sm mt">
        ${K.btn('Contact', '/contact/', 'btn--brass btn--lg')}
        ${K.btn('The Evidence Log', '/evidence/', 'btn--ghost btn--lg')}
      </div>
    </div>
  </div>
</section>`;
};
