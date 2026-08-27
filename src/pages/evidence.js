const { site } = require('../data/site');
const { evidenceStandard, evidenceLog } = require('../data/misc');
const K = require('../kit');
const SEO = require('../seo');

module.exports = function evidence() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore/' }, { label: 'The Evidence Log' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('The Evidence Log')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Published</span></span>
          <span><span>corrections,</span></span>
          <span><span class="d-it">tagged and dated.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">Nobody else in this category does this, which is exactly why it is here. Every figure published anywhere under my name carries a grade and an as-at date, and every change to one is recorded below.</p>
        <p class="mono faint mt">${site.lines.tags}</p>
      </div>
    </div>
  </div>
</section>

<section class="band band--sm on-ink band--flush-t">
  <div class="wrap wrap--wide">
    <div class="grid g-3 rv" style="gap:1rem">
      ${evidenceStandard.map(s => `
        <div class="mark-box" style="border-left:2px solid ${s.g === 'A' ? 'var(--teal-hi)' : s.g === 'B' ? 'var(--brass)' : 'var(--fg-faint)'}">
          <p class="stat__n" style="font-size:2.2rem">${K.etag(s.g, s.def)}</p>
          <p class="g3" style="margin-top:.6rem">${s.name}</p>
          <p class="sm mute" style="margin-top:.45rem">${s.def}</p>
        </div>`).join('')}
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'The register', h: 'Every entry, newest first.',
      lede: 'Corrections, downgrades, withheld figures and restated methods. Entries are never deleted — a correction that can disappear is not a correction.' })}

    <div class="ledger">
      ${evidenceLog.map((e, i) => `
        <div class="lrow rv" ${e.alert ? 'style="--note-c:var(--sienna)"' : ''}>
          <span class="idx">${String(evidenceLog.length - i).padStart(3, '0')}</span>
          <div>
            <div class="flex ac wrapf gap-sm" style="margin-bottom:.5rem">
              <span class="chip ${e.alert ? 'chip--alert' : e.grade ? 'chip--brass' : ''}">${e.type}</span>
              ${K.time(e.date, SEO.isoDate(e.date), "mono faint")}
              ${e.grade ? K.etag(e.grade, 'Grade applied to the figure in this entry.', e.date) : ''}
            </div>
            <p class="lrow__t">${e.title}</p>
            <p class="lrow__d">${e.body}</p>
          </div>
          <div></div>
        </div>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    <div class="artgrid artgrid--l">
      <aside class="aside-sticky rv">
        ${K.kicker('How this works')}
        <h2 class="d3" style="margin-top:.75rem">The rules of the log.</h2>
      </aside>
      <div class="rv" style="--d:.1s">
        <div class="ledger">
          ${[
            ['01', 'Entries are added, never removed', 'A correction that can quietly disappear is not a correction. If a figure is later verified, that is a new entry, not an edit to the old one.'],
            ['02', 'A figure that cannot be graded is not published', 'It is not softened into a range or hedged with “approximately”. It is removed, and where it mattered, its removal is logged.'],
            ['03', 'The standard applies to me first', 'Milk, Mountain, Moonshot builds its entire authority on catching repeated-until-true numbers. The one person whose figures must survive that standard is the author.'],
            ['04', 'Corrections from readers are welcome and credited', 'If you can show a figure here is wrong, it gets an entry with your name on it unless you ask otherwise.']
          ].map(([n, t, d]) => K.lrow({ n, title: t, desc: d })).join('')}
        </div>

        <form class="f-grid mt-lg" data-form="correction" data-ref="evidence">
          <div class="f"><label for="ce">Your email</label><input id="ce" name="email" type="email" autocomplete="email" required placeholder="you@company.com"></div>
          <div class="f"><label for="cf">Which figure, and where you saw it</label><input id="cf" required placeholder="e.g. the AQ benchmark of 27, on /diagnostics/aq-score/"></div>
          <div class="f"><label for="cw">What is wrong with it, and your source</label><textarea id="cw" required></textarea></div>
          <div class="flex ac wrapf gap-sm">
            <button class="btn btn--brass" type="submit">Submit a correction</button>
            <span class="xs faint">Answered within ten working days, and logged either way.</span>
          </div>
        ${K.honeypot()}
        </form>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper closing">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      <p class="pull">Founded 2026.<br><em>Here is everything, including what I got wrong.</em></p>
      <div class="flex ac jc wrapf gap-sm mt-lg">
        ${K.btn('The Stack', '/the-stack/', 'btn--solid btn--lg')}
        ${K.btn('The Portfolio', '/the-portfolio/', 'btn--ghost btn--lg')}
      </div>
    </div>
  </div>
</section>`;
};
