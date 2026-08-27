const { site } = require('../data/site');
const { diagnostics } = require('../data/diagnostics');
const { ideas, showEpisodes, evidenceLog } = require('../data/misc');
const K = require('../kit');

module.exports = function explore() {
  const sections = [
    { n: '01', t: 'Diagnostics', h: '/diagnostics/', d: 'Six instruments, one per book. Free, instant, playable on the page. The crown jewels of the free layer and the whole top of the funnel.', meta: ['6 instruments', 'No email to start'], c: '#2FA592' },
    { n: '02', t: 'Ideas', h: '/ideas/', d: 'One structural argument each. Not blog posts, not listicles, not a content calendar. A fortnightly essay that has to earn its own existence.', meta: [`${ideas.length} essays`, 'Fortnightly'], c: '#C8A24A' },
    { n: '03', t: 'The Inevitable', h: '/show/', d: 'Conversations with people who made something certain — plus one recurring format: show me your portfolio and I will show you what it is actually optimising for.', meta: [`${showEpisodes.length} episodes`, 'Monthly'], c: '#5B8DEF' },
    { n: '04', t: 'The Evidence Log', h: '/evidence/', d: 'Published corrections and updated figures, tagged and dated. Nobody else in this category does this, which is exactly why it is here.', meta: [`${evidenceLog.length} entries`, 'Live'], c: '#B4472E' },
    { n: '05', t: 'தமிழ் / Tamil', h: '/ta/', d: 'Copy, Customize, Innovate in Tamil, the CCi Live workshop archive, and the home of the base that made all of this real.', meta: ['CCi Live', 'Workshop archive'], c: '#8E7130' },
    { n: '06', t: 'The Inevitable, weekly', h: '/newsletter/', d: 'One structural idea, every Tuesday. No motivation. No news roundup. One mechanism, explained well enough to use on Monday.', meta: ['Weekly', 'Tuesdays'], c: '#C8A24A' }
  ];

  return `
<section class="phero on-ink">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Explore' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('Explore')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>Free. No</span></span>
          <span><span class="d-it">transaction.</span></span>
        </h1>
      </div>
      <div class="rv" style="--d:.3s">
        <p class="lede">Everything here costs nothing and asks for nothing at the door. It is the layer that feeds the rest — and it is also the layer that will occasionally tell you not to buy anything.</p>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(1.25rem,2.5vw,2rem)" data-stagger="0.07">
      ${sections.map(s => `
        <a class="prog-card card--link" href="${s.h}" style="--c:${s.c}">
          <div class="prog-card__top">
            <span class="idx">${s.n}</span>
            ${s.meta.map(m => `<span class="chip">${m}</span>`).join('')}
          </div>
          <h2 class="d3" style="margin-top:1rem">${s.t}</h2>
          <p class="card__txt" style="margin-top:.7rem;font-size:.92rem;max-width:46ch">${s.d}</p>
          <div class="prog-card__foot">
            <span class="mono faint">Free</span>
            <span class="stk__go">${K.icon.arr}</span>
          </div>
        </a>`).join('')}
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="wrap wrap--wide">
    ${K.railX({
      k: 'Latest essays', h: 'One structural argument each.',
      cta: K.tlink('All essays', '/ideas/'),
      items: ideas.slice(0, 4).map(i => `
        <a class="card card--link" href="/ideas/${i.slug}/">
          <div class="card__body">
            <div class="flex ac jb gap-sm">
              <span class="mono faint">${i.layer}</span>
              <span class="mono faint">${i.read}</span>
            </div>
            <p class="card__ttl">${i.title}</p>
            <p class="card__txt">${i.dek}</p>
            <div class="card__foot"><span class="mono faint">${i.date}</span><span class="stk__go">${K.icon.arr}</span></div>
          </div></a>`)
    })}
  </div>
</section>

<section class="band on-paper closing">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      ${K.kicker('The newsletter', 'kicker--plain')}
      <h2 class="d2" style="margin-top:1rem">The Inevitable — one structural idea, every Tuesday.</h2>
      <form class="sub jc mt" data-form="explore-newsletter" style="max-width:30rem;margin-inline:auto">
        <input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">
        <button class="btn btn--solid" type="submit">Subscribe</button>
      </form>
      <p class="xs faint mt-sm">${site.lines.reject}</p>
    </div>
  </div>
</section>`;
};
