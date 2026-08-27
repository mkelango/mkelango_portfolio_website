const { site } = require('../data/site');
const { events } = require('../data/events');
const { byId } = require('../data/stack');
const K = require('../kit');

module.exports = function tamil() {
  const cci = byId.cci;
  const live = events.find(e => e.slug === 'cci-live');

  return `
<section class="phero on-ink ta-band">
  <div class="field-bg" aria-hidden="true"></div>
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    ${K.crumb([{ label: 'Home', href: '/' }, { label: 'Explore', href: '/explore/' }, { label: 'தமிழ்' }])}
    <div class="phero__grid">
      <div>
        ${K.kicker('தமிழ் · The base')}
        <h1 class="d1 lines" style="margin-top:1.25rem">
          <span><span>காலி பக்கம்</span></span>
          <span><span>ஒரு வரி.</span></span>
        </h1>
        <p class="lede lede--wide rv ta" style="--d:.35s;margin-top:1.5rem;max-width:44ch">
          வெற்றி பெற்றவர்களில் கிட்டத்தட்ட யாரும் காலியான பக்கத்திலிருந்து தொடங்கவில்லை.
          நிரூபிக்கப்பட்ட ஒரு மாதிரியை எடுத்து, உங்கள் சந்தைக்கு ஏற்ப மாற்றி, அதன் மேல் புதுமை செய்யுங்கள்.
        </p>
      </div>
      <div class="rv" style="--d:.28s">
        <div class="mark-box">
          <span class="kicker">The word, in Tamil</span>
          <p class="d2 ta" style="margin-top:.8rem">உறுதி</p>
          <p class="sm mute" style="margin-top:.7rem">Certainty. Resolve. The Tamil register for <em>Inevitable</em> — not a translation, an equivalent that carries the same weight.</p>
          <div class="mark-box__cap">சாத்தியமற்றதை உறுதியாக்குங்கள்.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    <div class="artgrid">
      <div class="rv">
        ${K.kicker('Copy, Customize, Innovate')}
        <h2 class="d2 ta" style="margin-top:1rem;font-family:var(--f-tamil);font-weight:800;line-height:1.24">நகலெடு · மாற்றியமை · புதுமை செய்</h2>
        <p class="lede lede--wide mt" style="max-width:52ch">Three moves, in order. The order is the method — most entry failures are sequence failures.</p>

        <div class="mark-box mark-box--plate mt-lg">${K.cciMark(520)}</div>

        <div class="phases mt-lg">
          ${[
            ['நகலெடு · COPY', 'ஏற்கனவே நிரூபிக்கப்பட்ட ஒரு மாதிரியைத் தேர்வு செய்யுங்கள். ரசிப்பதற்குப் பதிலாக முறையாக ஆய்வு செய்யுங்கள் — ஒரு திரைப்பிடிப்பு ஆய்வு அல்ல.'],
            ['மாற்றியமை · CUSTOMIZE', 'ஐந்து அச்சுகள்: மொழி, பொருளாதாரம், ஒழுங்குமுறை, தளவாடம், பண்பாடு. இவற்றில் ஒவ்வொன்றும் மற்ற நான்கையும் சரியாகச் செய்த ஒரு நுழைவைக் கொன்றிருக்கிறது.'],
            ['புதுமை செய் · INNOVATE', 'அடித்தளம் ஏற்கனவே பாதுகாப்பானதாக இருப்பதால், இப்போது புதுமை மலிவானது. இங்கே தவறு செய்ய உங்களால் முடியும்.']
          ].map(([t, d]) => `<div class="phase rv"><span class="phase__n"></span>
            <div><p class="phase__t ta" style="font-family:var(--f-tamil);font-weight:600">${t}</p>
            <p class="phase__d ta" style="font-family:var(--f-tamil)">${d}</p></div></div>`).join('')}
        </div>
      </div>

      <aside class="aside-sticky rv">
        <a class="card card--link" href="/books/cci/">
          <div class="card__body">
            <span class="kicker">The book</span>
            <div style="margin:.6rem 0">${K.cover(cci, { w: 150 })}</div>
            <p class="card__ttl">${cci.title}</p>
            <p class="card__txt">தமிழ் நாட்டில் மக்கள் இன்னும் என்னை நிறுத்தி பேசும் புத்தகம்.</p>
            <div class="card__foot"><span class="mono faint">${cci.altitude}</span><span class="stk__go">${K.icon.arr}</span></div>
          </div>
        </a>
        <a class="card card--link inst-card" href="/diagnostics/cci-readiness/" style="--c:#8E7130">
          <div class="card__body">
            <span class="chip chip--free">இலவசம் · Free</span>
            <p class="card__ttl">The CCi Readiness Assessment</p>
            <p class="card__txt">ஆறு கேள்விகள். உங்கள் நுழைவுத் திட்டம் தயாரா என்பதைச் சரிபாருங்கள்.</p>
            <div class="card__foot"><span class="mono faint">3 minutes</span><span class="stk__go">${K.icon.arr}</span></div>
          </div>
        </a>
      </aside>
    </div>
  </div>
</section>

<section class="band on-ink">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap wrap--wide">
    <div class="grid g-2" style="gap:clamp(2rem,5vw,4.5rem);align-items:center">
      <div class="rv">
        ${K.kicker('CCi Live')}
        <h2 class="d2 ta" style="margin-top:1rem;font-family:var(--f-tamil);font-weight:800;line-height:1.24">அடுத்த பட்டறை</h2>
        <p class="lede lede--wide mt-sm">${live.lede}</p>
        <div class="mt">${K.fields([['அடுத்த தேதி · Next', live.next.date], ['இடம் · Place', live.next.place], ['கட்டணம் · Price', live.price]])}</div>
        <p class="mt-sm">${K.seats(live.seats)}</p>
        <div class="flex ac wrapf gap-sm mt">
          ${K.btn('இடம் பதிவு செய் · Request a seat', '/events/cci-live/', 'btn--brass')}
          ${K.btn('Full calendar', '/events/calendar/', 'btn--ghost')}
        </div>
      </div>
      <div class="rv" style="--d:.12s">
        <div class="mark-box">
          <span class="kicker">Why the price is low, and stays low</span>
          <p class="sm mute" style="margin-top:.8rem">
            The base is not a funnel. It is the reason any of the rest of this is real — ten years of CCi Live is where
            the framework was tested against people who had to make it work on Monday with the money they actually had.
          </p>
          <p class="sm mute" style="margin-top:.7rem">
            Student rate ₹500. Concessions exist, are never advertised as scarce, and are not a marketing device.
            <strong style="color:var(--fg)">If price is still the reason you cannot come, write in.</strong>
          </p>
          <div class="mark-box__cap ta">விலை ஒருபோதும் தடையாக இருக்கக்கூடாது.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band on-paper">
  <div class="wrap wrap--wide">
    ${K.shead({ k: 'Workshop archive', h: 'பட்டறை காப்பகம்',
      lede: 'Past CCi Live sessions, the model torn down in each, and the city. Slides are released to attendees; the tear-downs are published here in full.' })}
    <div class="ledger">
      ${[
        ['2026 · ஆகஸ்ட்', 'கோயம்புத்தூர் · Coimbatore', 'D2C subscription model, torn down live', '380 attended'],
        ['2026 · ஜூலை', 'மதுரை · Madurai', 'Quick-commerce dark-store economics', '420 attended'],
        ['2026 · ஜூன்', 'திருப்பூர் · Tirupur', 'Export marketplace listing and logistics', '340 attended'],
        ['2026 · மே', 'சேலம் · Salem', 'Agri-input distribution, three markets compared', '290 attended'],
        ['2026 · ஏப்ரல்', 'திருச்சி · Trichy', 'Vernacular edtech pricing and retention', '360 attended']
      ].map(([d, c, m, a], i) => K.lrow({
        n: String(5 - i).padStart(2, '0'),
        title: `<span class="ta">${c}</span>`,
        desc: m, meta: [d, a]
      })).join('')}
    </div>
    <p class="xs faint mt">Attendance figures are venue counts recorded on the day${K.etag('B', 'Recorded by the host venue at each session. Not independently audited.')} — as at ${site.asAt}.</p>
  </div>
</section>

<section class="band on-ink closing" style="border-top:1px solid var(--hair)">
  <div class="wrap">
    <div class="tc rv" style="max-width:44rem;margin-inline:auto">
      <p class="pull ta" style="font-family:var(--f-tamil);font-weight:400;line-height:1.3">சாத்தியமற்றதை <em>உறுதியாக்குங்கள்.</em></p>
      <p class="lede mx-auto mt-lg" style="max-width:44ch">Everything else on this site is in English. This section is not a translation of it — it is the part that came first.</p>
      <div class="flex ac jc wrapf gap-sm mt">
        ${K.btn('CCi Live', '/events/cci-live/', 'btn--brass btn--lg')}
        ${K.btn('The CCi Sprint', '/programs/cci-sprint/', 'btn--ghost btn--lg')}
      </div>
    </div>
  </div>
</section>`;
};
