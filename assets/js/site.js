/* ============================================================================
   mkelango.com — behaviour
   Motion is subordinate to structure. Nothing moves that doesn't mean something.
   ========================================================================== */
(function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------ 1. HEADER */
  var hdr = $('.hdr');
  var sprog = $('.sprog');

  function onScroll() {
    var y = window.pageYOffset;
    if (hdr) hdr.classList.toggle('is-stuck', y > 12);
    if (sprog) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      sprog.style.transform = 'scaleX(' + (h > 0 ? Math.min(y / h, 1) : 0) + ')';
    }
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(function () { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  onScroll();

  /* Mega menu — hover on pointer devices, click/keyboard everywhere */
  var closeTimer;
  $$('.nav__item').forEach(function (item) {
    if (!$('.mega', item)) return;
    var link = $('.nav__link', item);

    item.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
      $$('.nav__item.is-open').forEach(function (o) { if (o !== item) o.classList.remove('is-open'); });
      item.classList.add('is-open');
    });
    item.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () { item.classList.remove('is-open'); }, 130);
    });
    if (link) {
      link.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { item.classList.remove('is-open'); link.focus(); }
      });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    $$('.nav__item.is-open').forEach(function (o) { o.classList.remove('is-open'); });
    $$('.etag.is-open').forEach(hidePop);
  });

  /* ------------------------------------------------------- 2. MOBILE DRAWER */
  var burger = $('.burger'), drawer = $('.drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var on = drawer.classList.toggle('is-on');
      burger.classList.toggle('is-on', on);
      burger.setAttribute('aria-expanded', on ? 'true' : 'false');
      document.body.style.overflow = on ? 'hidden' : '';
    });
    $$('.drawer__hd').forEach(function (hd) {
      var panel = $('.drawer__pn', hd.closest('.drawer__grp'));
      if (panel) panel.inert = true;          /* collapsed by default */
      hd.addEventListener('click', function () {
        var g = hd.closest('.drawer__grp');
        var on = g.classList.toggle('is-on');
        hd.setAttribute('aria-expanded', on ? 'true' : 'false');
        if (panel) panel.inert = !on;
      });
    });

    /* The page behind a covering drawer must not stay tabbable. */
    function drawerInert(on) {
      ['main', '.ftr', '.ann'].forEach(function (sel) {
        var el = $(sel); if (el) el.inert = on;
      });
    }
    burger.addEventListener('click', function () {
      drawerInert(drawer.classList.contains('is-on'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-on')) burger.click();
    });
  }

  /* --------------------------------------------------------- 3. REVEAL/MOTION */
  var revealables = $$('.rv, .lines, .draw');
  if (RM || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });

    /* Stagger children marked [data-stagger] */
    $$('[data-stagger]').forEach(function (grp) {
      var step = parseFloat(grp.getAttribute('data-stagger')) || 0.07;
      $$(':scope > *', grp).forEach(function (child, i) {
        if (!child.classList.contains('rv')) child.classList.add('rv');
        child.style.setProperty('--d', (i * step).toFixed(3) + 's');
        io.observe(child);
      });
    });
  }

  /* Count-up on tagged figures */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target) || RM) { return; }
    var settle = setTimeout(function () { el.textContent = target.toFixed(el.getAttribute('data-dec') | 0); }, 1600);
    var dec = (el.getAttribute('data-dec') | 0);
    var dur = 1100, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
      else { clearTimeout(settle); el.textContent = target.toFixed(dec); }
    }
    requestAnimationFrame(step);
  }
  /* Figures are never blanked in advance. If the observer never fires, or JS dies
     mid-animation, the correct value is what stays on screen — this site publishes
     numbers, so an animation must not be able to leave a wrong one behind. */
  var counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !RM) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        en.target.textContent = '0';
        countUp(en.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ------------------------------------------------------- 4. ALTITUDE RAIL */
  var rail = $('.rail');
  if (rail) {
    var items = $$('.rail__i', rail);
    var sections = items.map(function (i) { return document.getElementById(i.getAttribute('href').slice(1)); });
    var showAt = 260;
    function railScroll() {
      rail.classList.toggle('is-on', window.pageYOffset > showAt);
      var mid = window.pageYOffset + window.innerHeight * 0.38, active = -1;
      sections.forEach(function (s, i) { if (s && s.offsetTop <= mid) active = i; });
      items.forEach(function (it, i) { it.setAttribute('aria-current', i === active ? 'true' : 'false'); });
    }
    window.addEventListener('scroll', railScroll, { passive: true });
    railScroll();
  }

  /* ----------------------------------------------------------- 5. CARD RAILS */
  $$('[data-rail]').forEach(function (box) {
    var track = $('.rail-x', box);
    var prev = $('[data-rail-prev]', box), next = $('[data-rail-next]', box);
    if (!track) return;
    function amount() { var f = track.firstElementChild; return f ? f.getBoundingClientRect().width + 16 : 320; }
    function sync() {
      if (!prev || !next) return;
      prev.disabled = track.scrollLeft < 8;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    }
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -amount(), behavior: RM ? 'auto' : 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left:  amount(), behavior: RM ? 'auto' : 'smooth' }); });
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  });

  /* ------------------------------------------------------------- 6. FILTERS */
  $$('[data-filter-group]').forEach(function (grp) {
    var targetSel = grp.getAttribute('data-filter-group');
    var pool = $$(targetSel + ' [data-tags]');
    $$('button[data-filter]', grp).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-filter');
        $$('button[data-filter]', grp).forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        pool.forEach(function (el) {
          var tags = (el.getAttribute('data-tags') || '').split(/\s+/);
          el.hidden = !(key === 'all' || tags.indexOf(key) > -1);
        });
        var empty = $(targetSel + ' [data-empty]');
        if (empty) empty.hidden = pool.some(function (el) { return !el.hidden; });
      });
    });
  });

  /* ------------------------------------------------------------ 7. ACCORDION */
  $$('[data-acc]').forEach(function (acc) {
    $$('[data-acc-hd]', acc).forEach(function (hd) {
      hd.addEventListener('click', function () {
        var item = hd.closest('[data-acc-item]');
        var on = item.classList.toggle('is-on');
        hd.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    });
  });

  /* ================================================== 8. INSTRUMENTS ENGINE */
  /*  Diagnostics run inline. No email gate at entry; gate the detailed report. */

  $$('[data-instrument]').forEach(function (root) {
    var data;
    try { data = JSON.parse($('script[type="application/json"]', root).textContent); }
    catch (e) { return; }

    var qs      = data.questions || [];
    var stepEl  = $('[data-step]', root);
    var bar     = $('.prog__b', root);
    var stage   = $('[data-stage]', root);
    var resEl   = $('[data-result]', root);
    var backBtn = $('[data-back]', root);
    var restart = $('[data-restart]', root);
    var counter = $('[data-counter]', root);
    var answers = new Array(qs.length).fill(null);
    var i = 0, started = false;

    function render() {
      var q = qs[i];
      if (!q) return;
      stepEl.innerHTML =
        '<p class="q__t">' + q.q + '</p>' +
        (q.help ? '<p class="q__h">' + q.help + '</p>' : '') +
        '<div class="opts">' + q.options.map(function (o, n) {
          var sel = answers[i] === n;
          return '<button class="opt" type="button" data-o="' + n + '" aria-pressed="' + (sel ? 'true' : 'false') + '">' +
                 '<span class="opt__n">' + (n + 1) + '</span><span>' + o.label + '</span></button>';
        }).join('') + '</div>';

      $$('.opt', stepEl).forEach(function (b) {
        b.addEventListener('click', function () {
          started = true;
          answers[i] = parseInt(b.getAttribute('data-o'), 10);
          $$('.opt', stepEl).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          setTimeout(next, 190);
        });
      });

      /* Move focus to the new question, but never on the initial paint —
         stealing focus on load would be its own failure. */
      if (started) {
        var h = $('.q__t', stepEl);
        if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      }
      if (counter) counter.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(qs.length).padStart(2, '0');
      if (bar) {
        bar.style.width = ((i) / qs.length * 100) + '%';
        var track = bar.parentNode;
        track.setAttribute('role', 'progressbar');
        track.setAttribute('aria-valuemin', '0');
        track.setAttribute('aria-valuemax', String(qs.length));
        track.setAttribute('aria-valuenow', String(i));
        track.setAttribute('aria-label', 'Question ' + (i + 1) + ' of ' + qs.length);
      }
      if (backBtn) backBtn.hidden = i === 0;
      if (q.trait && $('[data-trait]', root)) $('[data-trait]', root).textContent = q.trait;
    }

    function next() {
      if (i < qs.length - 1) { i++; render(); }
      else { finish(); }
    }

    function finish() {
      if (bar) bar.style.width = '100%';
      var total = answers.reduce(function (a, v, n) {
        return a + (qs[n].options[v] ? qs[n].options[v].value : 0);
      }, 0);

      var band = (data.bands || []).find(function (b) { return total >= b.min && total <= b.max; }) || {};
      var pct  = data.max ? Math.round(total / data.max * 100) : 0;

      var traitRows = '';
      if (data.showTraits) {
        traitRows = '<div class="traits">' + qs.map(function (q, n) {
          var v = qs[n].options[answers[n]] ? qs[n].options[answers[n]].value : 0;
          var mx = Math.max.apply(null, q.options.map(function (o) { return o.value; }));
          var p = mx ? v / mx * 100 : 0;
          var cls = p <= 40 ? 'lo' : (p <= 70 ? 'mid' : '');
          return '<div class="trait"><span class="trait__n">' + (q.trait || q.q) + '</span>' +
                 '<span class="trait__bar"><i class="trait__f ' + cls + '" style="width:' + p + '%"></i></span>' +
                 '<span class="trait__v">' + v + '/' + mx + '</span></div>';
        }).join('') + '</div>';
      }

      /* Weakest link — "a machine is held back by its weakest part" */
      var weakest = null, weakScore = Infinity, ratios = [];
      qs.forEach(function (q, n) {
        var v = qs[n].options[answers[n]] ? qs[n].options[answers[n]].value : 0;
        var mx = Math.max.apply(null, q.options.map(function (o) { return o.value; }));
        var r = mx ? v / mx : 1;
        ratios.push(r);
        if (r < weakScore) { weakScore = r; weakest = q.trait || q.q; }
      });
      // A flat reading has no weakest part, and saying otherwise would be false precision.
      var flat = ratios.every(function (r) { return Math.abs(r - ratios[0]) < 1e-9; });
      if (flat) weakest = null;

      resEl.innerHTML =
        '<div class="score">' +
          '<div>' +
            '<span class="kicker">Your ' + (data.unit || 'score') + '</span>' +
            '<p class="score__n" style="margin-top:.9rem">' + total + '<span class="score__d">/' + data.max + '</span></p>' +
          '</div>' +
          (data.benchmark != null ?
          '<div class="bench">' +
            '<div class="bench__t"><span class="mono faint">You</span><span class="mono faint">Published industry mean ' + data.benchmark + '</span></div>' +
            '<div class="bench__bar"><i class="bench__fill" style="width:0"></i>' +
            '<i class="bench__mark" style="left:' + (data.benchmark / data.max * 100) + '%"><b>Mean</b></i></div>' +
            '<p class="xs faint">' + (data.benchmarkNote || '') + '</p>' +
          '</div>' : '') +
          '<div>' +
            '<p class="g2" style="letter-spacing:-.022em">' + (band.title || '') + '</p>' +
            '<p class="mute sm" style="margin-top:.6rem;max-width:52ch">' + (band.text || '') + '</p>' +
          '</div>' +
          (weakest
            ? '<div class="note note--alert"><span class="kicker note__k">The weakest part</span>' +
              '<b>' + weakest + '</b> is where this machine is currently held back. ' +
              (data.weakNote || 'A machine is limited by its weakest part, not its strongest.') + '</div>'
            : '<div class="note"><span class="kicker note__k">No single weakest part</span>' +
              'Every reading came back level, so this instrument cannot name a binding constraint. ' +
              'That is either a genuinely even organisation or a sign the answers were scored from the policy ' +
              'rather than from behaviour. Re-run it with a sceptic in the room.</div>') +
          traitRows +
          '<div class="grid g-2" style="gap:1rem">' +
            (data.book ? '<a class="card card--link" href="' + data.book.href + '"><div class="card__body">' +
              '<span class="kicker">Read next</span><p class="card__ttl">' + data.book.title + '</p>' +
              '<p class="card__txt">' + data.book.why + '</p></div></a>' : '') +
            (data.program ? '<a class="card card--link" href="' + data.program.href + '"><div class="card__body">' +
              '<span class="kicker">Where this gets fixed</span><p class="card__ttl">' + data.program.title + '</p>' +
              '<p class="card__txt">' + data.program.why + '</p></div></a>' : '') +
          '</div>' +
          '<div class="rule"></div>' +
          '<div>' +
            '<p class="g3">Want the detailed report?</p>' +
            '<p class="sm mute" style="margin-top:.4rem;max-width:48ch">The full ' + (data.reportName || 'report') +
            ' — trait-by-trait breakdown, the benchmark set, and the three moves that shift the score fastest. Sent as a PDF.</p>' +
            '<form class="sub" style="margin-top:1rem" data-capture="' + (data.id || 'diagnostic') + '">' +
              '<input type="email" name="email" autocomplete="email" required placeholder="you@company.com" aria-label="Email address">' +
              '<button class="btn btn--teal" type="submit">Send the report</button>' +
            '</form>' +
            '<p class="xs faint" style="margin-top:.7rem">Your score is never published, sold, or shared. One email, then the newsletter if you want it.</p>' +
          '</div>' +
        '</div>';

      stage.hidden = true;
      resEl.hidden = false;
      resEl.setAttribute('role', 'status');
      resEl.setAttribute('tabindex', '-1');
      if (restart) restart.hidden = false;
      if (backBtn) backBtn.hidden = true;

      requestAnimationFrame(function () {
        var f = $('.bench__fill', resEl);
        if (f) setTimeout(function () { f.style.width = pct + '%'; }, 60);
        $$('.trait__f', resEl).forEach(function (el, n) {
          var w = el.style.width; el.style.width = '0';
          setTimeout(function () { el.style.width = w; }, 120 + n * 45);
        });
      });
      bindCapture(resEl);
      root.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
      resEl.focus({ preventScroll: true });
    }

    if (backBtn) backBtn.addEventListener('click', function () { if (i > 0) { i--; render(); } });
    if (restart) restart.addEventListener('click', function () {
      answers = new Array(qs.length).fill(null); i = 0; started = true;
      stage.hidden = false; resEl.hidden = true; restart.hidden = true; render();
    });
    render();
  });

  /* ------------------------------------------------- 9. FORMS (no back end yet) */
  function bindCapture(scope) {
    $$('form[data-capture], form[data-form]', scope || document).forEach(function (f) {
      if (f.__bound) return; f.__bound = true;
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = $('button[type="submit"], .btn', f);
        var ok = document.createElement('p');
        ok.className = 'note note--live';
        ok.style.marginTop = '.9rem';
        ok.setAttribute('role', 'status');
        ok.setAttribute('tabindex', '-1');
        ok.innerHTML = '<b>Received.</b> This site is not yet connected to a mail platform — ' +
                       'wire this form to the list before launch. Nothing was sent.';
        /* Insert first, then disable the button, then move focus — disabling the
           focused element would otherwise drop focus to document.body. */
        f.parentNode.insertBefore(ok, f.nextSibling);
        if (btn) { btn.disabled = true; btn.textContent = 'Received'; }
        ok.focus();
      });
    });
  }
  bindCapture(document);

  /* ------------------------------------------- 9b. EVIDENCE TAG TOOLTIPS */
  /*  Shown on demand and clamped into the viewport, so a tag near the right
      edge does not push a tooltip off-screen on a phone.                    */
  function placePop(tag) {
    var pop = $('.etag__pop', tag);
    if (!pop) return;
    pop.style.setProperty('--pop-x', '0px');
    tag.classList.add('is-open');

    /* Compute the offset directly rather than measuring after a reset — a custom
       property change is not guaranteed to flush layout synchronously. */
    var t = tag.getBoundingClientRect();
    var w = pop.offsetWidth;
    var pad = 12, vw = document.documentElement.clientWidth;
    var wanted = t.left + t.width / 2 - w / 2;
    var clamped = Math.max(pad, Math.min(wanted, vw - pad - w));
    var dx = clamped - wanted;
    if (Math.abs(dx) > 0.5) pop.style.setProperty('--pop-x', dx.toFixed(1) + 'px');
  }
  function hidePop(tag) { tag.classList.remove('is-open'); }

  $$('.etag').forEach(function (tag) {
    tag.addEventListener('mouseenter', function () { placePop(tag); });
    tag.addEventListener('mouseleave', function () { hidePop(tag); });
    tag.addEventListener('focus', function () { placePop(tag); });
    tag.addEventListener('blur', function () { hidePop(tag); });
    tag.addEventListener('click', function (e) {
      e.preventDefault();
      tag.classList.contains('is-open') ? hidePop(tag) : placePop(tag);
    });
    tag.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && tag.classList.contains('is-open')) {
        e.stopPropagation();
        hidePop(tag);
      }
    });
  });

  /* ------------------------------------------------------------- 10. YEAR */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

})();
