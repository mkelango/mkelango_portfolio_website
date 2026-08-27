const { site } = require('../data/site');
const { portfolio } = require('../data/misc');
const K = require('../kit');

module.exports = function thePortfolio() {
  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }, { label: 'The Portfolio' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('The Portfolio · one page')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Three layers.</span></span>
          <span><span class="d-it">I did not invent this framework</span></span>
          <span><span class="d-it">and then go looking for</span></span>
          <span><span class="d-it">somewhere to apply it.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">A man selling portfolio architecture to family business groups who cannot show his own portfolio is selling a theory. So here is mine, presented in the framework I sell.</p>
        <p class="mono faint mt">THIS PAGE IS THE AUDIT</p>
      </div>
    </div>
  </div>
</section>

<section class="band band--sm on-ink band--flush-t">
  <div class="wrap wrap--wide">
    <div class="mark-box mark-box--plate rv" style="max-width:44rem">
      ${K.layersMark(560)}
      <div class="mark-box__cap">${site.lines.capital}</div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid" style="gap:clamp(1.25rem,2.5vw,2rem)" data-stagger="0.09">
      ${portfolio.layers.map(l => `
        <section class="lay" style="--lc:${l.colour === '#F4F2EC' ? '#8E7130' : l.colour}">
          <div class="lay__h">
            <div>
              <span class="lay__n">${l.label}</span>
              <p class="g2" style="margin-top:.35rem">${l.role}</p>
            </div>
            <p class="sm mute" style="max-width:46ch">${l.note}</p>
          </div>
          <div class="lay__b">
            ${l.entities.map(e => `
              <div class="ent">
                <div>
                  <p class="ent__n">${e.name}${e.pending ? K.etag('C', 'One-line description pending. Supplied by the founder before launch — an unwritten line is left visibly unwritten rather than invented.') : ''}</p>
                  <p class="ent__l">${e.line}</p>
                </div>
                <a class="tlink" href="${e.href}" rel="noopener" target="_blank">${e.domain}${K.icon.ext}</a>
              </div>`).join('')}

            ${l.pendingSentence ? `
              <div class="pending">
                <span class="kicker pending__k note__k">Awaiting the founder’s sentence</span>
                <p class="sm" style="color:var(--fg)"><strong>The Moonshot sentence is not yet published.</strong></p>
                <p class="sm mute" style="margin-top:.5rem;max-width:62ch">
                  Under the standard applied everywhere else on this site, this sentence has to be one sentence,
                  physically specific, and unchanged for a decade before it appears. It is the single most important
                  sentence on this website. Writing a placeholder here would break the one rule the whole page exists to demonstrate —
                  so the slot is left visibly empty until the sentence exists.
                </p>
                <p class="xs faint" style="margin-top:.7rem">
                  <em>Milk, Mountain, Moonshot</em>, Ch. 17: if it has been rewritten twice this year, it was never an objective.
                </p>
              </div>` : ''}
          </div>
        </section>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    <div class="artgrid artgrid--l">
      <aside class="aside-sticky rv">
        ${K.kicker('The rules')}
        <h2 class="d3" style="margin-top:.75rem">Five rules that stop this becoming a holding-company website.</h2>
        <p class="sm mute">They are published because a rule nobody can check is a preference.</p>
      </aside>
      <div class="ledger rv" style="--d:.1s">
        ${portfolio.rules.map((r, i) => K.lrow({ n: String(i + 1).padStart(2, '0'), title: r })).join('')}
      </div>
    </div>

    <div class="note note--alert mt-lg rv">
      <span class="kicker note__k">Disclosure, stated before anyone asks</span>
      Delivery for Flywheel installations is by <b>StartNet</b>, and goal1 instrumentation is by <b>ElanOne</b>.
      I am the founder of both. The disclosure appears on each affected programme page above the pricing band, not in a footnote.
    </div>
  </div>
</section>

<section class="band on-paper closing">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:center">
      <div class="rv">
        <p class="pull">If you want to see what that looks like when someone actually does it rather than diagrams it — <em>this page is the audit.</em></p>
      </div>
      <div class="rv" style="--d:.12s">
        <p class="lede lede--wide">The same instruments are available to run against your own group, free, before any conversation with me.</p>
        <div class="flex ac wrapf gap-sm mt">
          ${K.btn('The Coherence Matrix, lite', '/diagnostics/coherence-matrix/', 'btn--solid btn--lg')}
          ${K.btn('The Coherence Audit', '/programs/coherence-audit/', 'btn--ghost btn--lg')}
        </div>
      </div>
    </div>
  </div>
</section>`;
};
