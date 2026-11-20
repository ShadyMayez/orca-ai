/* Orca AI homepage interactions. No dependencies. */
(function () {
  'use strict';

  var EMAIL = 'orcaaiofficial1@gmail.com';
  var INBOX = 'shadymayezs@gmail.com'; // where every brief is delivered
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + INBOX;
  var WHATSAPP = '201002743113';
  var root = document.documentElement;
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

  /* ---------- Year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Intro: hero enters, then the sheet rises ---------- */
  function intro() {
    if (reduce.matches) { body.classList.add('entered', 'settled'); return; }
    requestAnimationFrame(function () {
      body.classList.add('entered');
      setTimeout(function () { body.classList.add('settled'); }, 350);
    });
  }
  var introDone = false;
  function startIntro() { if (introDone) return; introDone = true; intro(); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(startIntro);
  setTimeout(startIntro, 300); // never wait long on fonts
  setTimeout(function () { body.classList.add('entered', 'settled'); }, 1200); // safety net

  /* ---------- Nav dropdown + mobile sheet ---------- */
  var navItem = $('.nav-item');
  var navTop = navItem && $('.nav-top', navItem);
  function setPanel(open) {
    if (!navItem) return;
    navItem.classList.toggle('open', open);
    navTop.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (navItem) {
    navTop.addEventListener('click', function (e) { e.stopPropagation(); setPanel(!navItem.classList.contains('open')); });
    navItem.addEventListener('mouseenter', function () { if (window.matchMedia('(hover: hover)').matches) setPanel(true); });
    navItem.addEventListener('mouseleave', function () { if (window.matchMedia('(hover: hover)').matches) setPanel(false); });
    document.addEventListener('click', function (e) { if (!navItem.contains(e.target)) setPanel(false); });
  }
  var menuBtn = $('.nav-menu');
  var sheetNav = $('#nav-sheet');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    sheetNav.hidden = !open;
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(sheetNav.hidden); });
    $$('a', sheetNav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    setPanel(false);
    if (menuBtn && !sheetNav.hidden) { setMenu(false); menuBtn.focus(); }
  });

  /* ---------- Rotating prompt placeholder ---------- */
  var heroInput = $('#prompt-input');
  var ideas = [
    'Answer WhatsApp leads in Arabic and English',
    'Turn emailed invoices into ERP entries',
    'Book demos straight from the website chat',
    'Write the weekly ops report from our sheets',
    'Sort and route every support ticket'
  ];
  if (heroInput && !reduce.matches) {
    var ii = 0;
    setInterval(function () {
      if (document.activeElement === heroInput || heroInput.value) return;
      heroInput.classList.add('ph-fade');
      setTimeout(function () {
        ii = (ii + 1) % ideas.length;
        heroInput.placeholder = ideas[ii];
        heroInput.classList.remove('ph-fade');
      }, 320);
    }, 3200);
  }

  /* ---------- Reel: 3D carousel ---------- */
  (function reel() {
    var track = $('.reel-track');
    if (!track) return;
    var cards = $$('.reel-card', track);
    var n = cards.length, pos = 0, timer = null, dragging = false, startX = 0, startPos = 0, moved = 0;
    if (reduce.matches) { track.classList.add('static'); cards.forEach(function (c) { c.classList.add('is-front'); }); return; }

    function wrap(d) { d = ((d % n) + n) % n; return d > n / 2 ? d - n : d; }
    function layout() {
      var w = cards[0].offsetWidth || 220;
      var front = Math.round(pos);
      cards.forEach(function (c, i) {
        var d = wrap(i - pos);
        var a = Math.abs(d);
        var x = d * w * 0.82;
        var z = -a * 150;
        var ry = Math.max(-55, Math.min(55, -d * 26));
        c.style.transform = 'translateX(' + x + 'px) translateZ(' + z + 'px) rotateY(' + ry + 'deg)';
        c.style.opacity = a > 3.2 ? 0 : (1 - a * 0.12);
        c.style.zIndex = String(100 - Math.round(a * 10));
        c.style.filter = a > 0.5 ? 'saturate(0.85)' : 'none';
        var isFront = wrap(i - front) === 0;
        if (isFront && !c.classList.contains('is-front')) {
          c.classList.remove('is-front'); void c.offsetWidth; c.classList.add('is-front');
        } else if (!isFront) c.classList.remove('is-front');
      });
    }
    function go(p) { pos = p; layout(); }
    function auto() { stop(); timer = setInterval(function () { go(Math.round(pos) + 1); }, 2800); }
    function stop() { if (timer) clearInterval(timer); timer = null; }

    track.addEventListener('pointerdown', function (e) {
      dragging = true; moved = 0; startX = e.clientX; startPos = pos; stop();
      track.classList.add('is-dragging');
      cards.forEach(function (c) { c.style.transition = 'none'; });
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var w = cards[0].offsetWidth * 0.82;
      moved = e.clientX - startX;
      go(startPos - moved / w);
    });
    function end() {
      if (!dragging) return;
      dragging = false; track.classList.remove('is-dragging');
      cards.forEach(function (c) { c.style.transition = ''; });
      go(Math.round(pos)); auto();
    }
    track.addEventListener('pointerup', end);
    track.addEventListener('pointercancel', end);
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(Math.round(pos) + 1); auto(); }
      if (e.key === 'ArrowLeft') { go(Math.round(pos) - 1); auto(); }
    });
    cards.forEach(function (c, i) {
      c.addEventListener('click', function () { if (Math.abs(moved) < 6) { go(Math.round(pos) + wrap(i - pos)); auto(); } });
    });
    window.addEventListener('resize', layout);
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) auto(); else stop(); }); });
    io.observe(track);
    layout();
  })();

  /* ---------- Solutions and How we work: curved, drifting card rows ---------- */
  $$('[data-arc]').forEach(function arcRow(arc) {
    var track = $('.arc-track', arc);
    if (reduce.matches) { arc.classList.add('static'); return; }
    // Extra copies (at least 12 cards in all) so the loop never shows a gap.
    var originals = $$('.arc-card', track);
    var copies = Math.max(2, Math.ceil(12 / originals.length) - 1);
    for (var c = 0; c < copies; c++) originals.forEach(function (card) {
      var copy = card.cloneNode(true); copy.setAttribute('aria-hidden', 'true'); track.appendChild(copy);
    });
    var cards = $$('.arc-card', track);
    var offset = 0, last = 0, running = false, dragging = false, startX = 0, startOff = 0, raf = 0;
    var SPEED = 0.045; // px per ms
    var w = 0, step = 0, total = 0, half = 600;
    function measure() { w = cards[0].offsetWidth; step = w + 26; total = step * cards.length; half = arc.clientWidth / 2 || 600; }
    function place() {
      if (!w) measure();
      cards.forEach(function (card, i) {
        var x = (((i * step + offset) % total) + total) % total - total / 2;
        var d = x / (half + w * 0.2);
        var a = Math.min(1.6, Math.abs(d));
        if (Math.abs(x) > half + w * 1.4) { if (!card._off) { card.style.visibility = 'hidden'; card._off = true; } return; }
        if (card._off) { card.style.visibility = ''; card._off = false; }
        var ry = Math.max(-48, Math.min(48, -d * 34));
        card.style.transform = 'translateX(' + (x * 0.94).toFixed(1) + 'px) translateZ(' + (a * a * 190).toFixed(1) + 'px) rotateY(' + ry.toFixed(2) + 'deg)';
        card.style.zIndex = String(Math.round(a * 100));
      });
    }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      var dt = last ? Math.min(64, now - last) : 16; last = now;
      if (!dragging) offset -= SPEED * dt; // always moving, hover never pauses it
      place();
    }
    function start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(frame); }
    function stop() { running = false; cancelAnimationFrame(raf); }
    arc.addEventListener('pointerdown', function (e) {
      dragging = true; startX = e.clientX; startOff = offset; arc.classList.add('is-dragging');
      arc.setPointerCapture(e.pointerId);
    });
    arc.addEventListener('pointermove', function (e) { if (dragging) offset = startOff + (e.clientX - startX); });
    function end() { dragging = false; arc.classList.remove('is-dragging'); }
    arc.addEventListener('pointerup', end);
    arc.addEventListener('pointercancel', end);
    window.addEventListener('resize', function () { measure(); place(); });
    new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) start(); else stop(); });
    }, { rootMargin: '100px 0px' }).observe(arc);
    place();
  });

  /* ---------- Scroll reveal ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce.matches) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); rio.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { rio.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });

  /* ---------- Tabs with stage: auto-advance + progress ---------- */
  var tabSets = [];
  $$('[data-pv]').forEach(function (pv) {
    var tabs = $$('.pv-step', pv);
    var scenes = $$('.scene', pv);
    var more = $('.pv-more-name', pv);
    var panel = $('.pv-stage', pv);
    var ms = parseInt(pv.getAttribute('data-ms'), 10) || 6000;
    var idx = 0, t0 = 0, raf = 0, visible = false, paused = false, elapsed = 0;

    function select(i, focus) {
      idx = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, k) {
        var on = k === idx;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        $('.pv-bar i', t).style.setProperty('--p', 0);
      });
      scenes.forEach(function (s, k) {
        var on = k === idx;
        s.classList.toggle('is-front', on);
        s.classList.toggle('is-next', k === (idx + 1) % scenes.length);
        s.classList.remove('play');
        if (on) { void s.offsetWidth; s.classList.add('play'); }
      });
      panel.setAttribute('aria-labelledby', tabs[idx].id);
      if (more) { var nm = $('.pv-name', tabs[idx]).textContent.trim(); if (more.closest('.ways') && !/^AI/.test(nm)) nm = nm.charAt(0).toLowerCase() + nm.slice(1); more.textContent = nm; }
      if (focus) tabs[idx].focus();
      elapsed = 0; t0 = performance.now();
    }
    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (!visible || paused || reduce.matches) { t0 = now - elapsed; return; }
      elapsed = now - t0;
      var p = Math.min(1, elapsed / ms);
      $('.pv-bar i', tabs[idx]).style.setProperty('--p', p);
      if (p >= 1) select(idx + 1);
    }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { select(k); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select(idx + 1, true); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select(idx - 1, true); }
      });
    });
    new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var was = visible; visible = en.isIntersecting;
        if (visible && !was) select(idx);
      });
    }, { threshold: 0.35 }).observe(pv);
    select(0);
    raf = requestAnimationFrame(tick);
    tabSets.push({ el: pv, select: select });
  });

  // Links that jump to a specific solution tab
  $$('[data-way]').forEach(function (a) {
    a.addEventListener('click', function () {
      var set = tabSets[0];
      if (set) set.select(parseInt(a.getAttribute('data-way'), 10));
      setPanel(false);
    });
  });

  /* ---------- Match grid: tasks completing in a cycle ---------- */
  (function cycle() {
    var stage = $('[data-cycle]');
    if (!stage) return;
    var tiles = $$('.mf', stage);
    var on = [];
    var running = false, timer = null;
    function visibleTiles() { return tiles.filter(function (t) { return t.offsetParent !== null; }); }
    function step() {
      var pool = visibleTiles().filter(function (t) { return on.indexOf(t) < 0; });
      if (!pool.length) return;
      var t = pool[Math.floor(Math.random() * pool.length)];
      t.classList.add('on'); on.push(t);
      if (on.length > 4) on.shift().classList.remove('on');
    }
    if (reduce.matches) { tiles.slice(0, 4).forEach(function (t) { t.classList.add('on'); }); return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting && !running) { running = true; step(); timer = setInterval(step, 900); }
        if (!en.isIntersecting && running) { running = false; clearInterval(timer); }
      });
    }, { threshold: 0.2 }).observe(stage);
  })();

  /* ---------- Message helpers ---------- */
  function mailto(subject, text) {
    return 'mailto:' + INBOX + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
  }
  function wa(text) { return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text); }
  // Deliver a brief to the Orca inbox. Resolves true when the service accepted it.
  function deliver(fields) {
    var payload = Object.assign({
      _subject: fields._subject || 'New Orca AI brief',
      _template: 'table',
      _captcha: 'false',
      page: location.href
    }, fields);
    return fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return r.ok && String(j.success) === 'true'; }); })
      .catch(function () { return false; });
  }
  function setBusy(btn, busy, label) {
    if (!btn) return;
    if (busy) { btn.dataset.label = btn.textContent; btn.textContent = label || 'Sending...'; btn.disabled = true; }
    else { btn.textContent = btn.dataset.label || btn.textContent; btn.disabled = false; }
  }

  /* ---------- Studio: brief wizard ---------- */
  var studio = $('#studio');
  var brief = { text: '', tools: [], blocks: [] };
  var lastFocus = null;
  var BLOCKS = [
    { k: /whats ?app|chat|customer|support|reply|answer|lead|sales|website|bot/i, ico: 'i-bot', b: 'Customer agent', s: 'Answers, qualifies and hands over on your channels' },
    { k: /crm|lead|hubspot|zoho|salesforce|pipeline|sales/i, ico: 'i-db', b: 'CRM sync', s: 'Every conversation logged and updated' },
    { k: /invoice|data entry|erp|copy|enter|form|pdf|document|receipt/i, ico: 'i-file', b: 'Document reader', s: 'Pulls fields from files into your systems' },
    { k: /report|summary|weekly|dashboard|kpi|numbers/i, ico: 'i-gauge', b: 'Report writer', s: 'Turns your data into a readable update' },
    { k: /book|meeting|calendar|appointment|demo|schedule/i, ico: 'i-cal', b: 'Scheduler', s: 'Finds the slot and sends the invite' },
    { k: /team|internal|knowledge|docs|documents|policy|question|assistant|hr/i, ico: 'i-search', b: 'Knowledge assistant', s: 'Answers from your own documents' },
    { k: /email|inbox|mail|follow/i, ico: 'i-mail', b: 'Inbox triage', s: 'Sorts, drafts and routes email' },
    { k: /ticket|support|complaint|refund/i, ico: 'i-tag', b: 'Ticket triage', s: 'Tags, prioritises and drafts replies' },
    { k: /approve|approval|manager|refund|policy/i, ico: 'i-approve', b: 'Approval step', s: 'A person signs off where it matters' },
    { k: /call|voice|phone/i, ico: 'i-wave', b: 'Call notes', s: 'Summaries and next steps from calls' }
  ];
  var TOOL_BLOCKS = {
    'WhatsApp': { ico: 'i-chat', b: 'WhatsApp channel', s: 'Your agent on WhatsApp Business' },
    'Website': { ico: 'i-globe', b: 'Website widget', s: 'Embedded on your site, in your brand' },
    'ERP': { ico: 'i-db', b: 'ERP connector', s: 'Reads and writes your ERP records' },
    'Google Sheets': { ico: 'i-layers', b: 'Sheets connector', s: 'Live data in and out of your sheets' },
    'Slack or Teams': { ico: 'i-chat', b: 'Team notifications', s: 'Updates and approvals where your team talks' },
    'Shopify': { ico: 'i-cart', b: 'Store connector', s: 'Orders, stock and customers in context' },
    'Custom system': { ico: 'i-code', b: 'Custom integration', s: 'We connect to your API' }
  };

  function step(name) {
    var panels = $$('.sp', studio);
    var p = $('[data-panel="' + name + '"]', studio);
    panels.forEach(function (x) { x.classList.toggle('on', x === p); });
    var s = parseInt(p.getAttribute('data-step'), 10);
    $$('.studio-steps li', studio).forEach(function (li, k) {
      li.classList.toggle('done', k < s);
      li.classList.toggle('now', k === s);
    });
    var f = $('textarea, input:not([type=checkbox])', p) || $('input, button.pill', p);
    if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 60);
  }
  function openStudio(text) {
    lastFocus = document.activeElement;
    studio.hidden = false;
    body.style.overflow = 'hidden';
    var ta = $('#studio-text');
    if (text) ta.value = text;
    step('describe');
  }
  function closeStudio() {
    studio.hidden = true;
    body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function planBlocks() {
    var t = brief.text;
    var out = [];
    BLOCKS.forEach(function (b) { if (b.k.test(t) && out.length < 4) out.push(b); });
    brief.tools.forEach(function (tool) { if (TOOL_BLOCKS[tool] && out.length < 6) out.push(TOOL_BLOCKS[tool]); });
    if (out.length < 3) out.push({ ico: 'i-flow', b: 'Workflow engine', s: 'Runs each step and logs it' });
    if (out.length < 3) out.push({ ico: 'i-approve', b: 'Approval step', s: 'A person signs off where it matters' });
    if (out.length % 2) out.push({ ico: 'i-refresh', b: 'Weekly tuning', s: 'Orca reviews and improves it after launch' });
    brief.blocks = out;
    var grid = $('.bp-grid', studio);
    grid.innerHTML = '';
    out.forEach(function (b, i) {
      var li = document.createElement('li');
      li.style.setProperty('--i', i);
      li.innerHTML = '<svg class="ico"><use href="#' + b.ico + '"/></svg><div><b></b><span></span></div>';
      $('b', li).textContent = b.b;
      $('span', li).textContent = b.s;
      grid.appendChild(li);
    });
    var count = $('.bp-count', studio);
    var c = 0;
    var iv = setInterval(function () { c++; count.textContent = c; if (c >= out.length) clearInterval(iv); }, 110);
  }
  function runLoading(done) {
    step('loading');
    var items = $$('.sp-checks li', studio);
    items.forEach(function (li) { li.className = ''; });
    var i = 0;
    var gap = reduce.matches ? 60 : 280;
    (function next() {
      if (i > 0) { items[i - 1].classList.remove('busy'); items[i - 1].classList.add('ok'); }
      if (i === items.length) { setTimeout(done, gap / 2); return; }
      items[i].classList.add('busy'); i++;
      setTimeout(next, gap);
    })();
  }

  if (studio) {
    $$('[data-studio-open]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var v = $('input', f).value.trim();
        openStudio(v || $('input', f).placeholder);
      });
    });
    $$('[data-close]', studio).forEach(function (b) { b.addEventListener('click', closeStudio); });
    studio.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeStudio();
      if (e.key === 'Tab') {
        var f = $$('button, input, textarea, [href]', $('.studio-card', studio)).filter(function (el) { return el.offsetParent !== null && !el.disabled; });
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    $$('[data-fill]', studio).forEach(function (b) {
      b.addEventListener('click', function () { var ta = $('#studio-text'); ta.value = b.getAttribute('data-fill'); ta.focus(); });
    });
    $$('[data-to]', studio).forEach(function (b) { b.addEventListener('click', function () { step(b.getAttribute('data-to')); }); });

    $('[data-panel="describe"]', studio).addEventListener('submit', function (e) {
      e.preventDefault();
      brief.text = $('#studio-text').value.trim();
      runLoading(function () { step('stack'); });
    });
    $('[data-panel="stack"]', studio).addEventListener('submit', function (e) {
      e.preventDefault();
      brief.tools = $$('input[name=tools]:checked', studio).map(function (i) { return i.value; });
      planBlocks();
      step('blueprint');
    });
    var ct = $('[data-panel="contact"]', studio);
    ct.addEventListener('submit', function (e) {
      e.preventDefault();
      var via = (e.submitter && e.submitter.value) || 'email';
      var d = new FormData(ct);
      if (d.get('_honey')) return;
      var plan = brief.blocks.map(function (b) { return b.b; }).join(', ');
      var text = 'Hi Orca AI,\n\nWhat I want to automate:\n' + brief.text +
        '\n\nTools involved: ' + (brief.tools.length ? brief.tools.join(', ') : 'not sure yet') +
        '\nBuilding blocks: ' + plan +
        '\n\nName: ' + d.get('name') + '\nCompany: ' + (d.get('company') || '-') + '\nEmail: ' + d.get('email') + '\nPhone: ' + (d.get('phone') || '-');
      if (via === 'whatsapp') { window.open(wa(text), '_blank', 'noopener'); showDone('whatsapp'); return; }
      var btn = e.submitter;
      setBusy(btn, true);
      deliver({
        _subject: 'Plan my build: ' + d.get('name') + (d.get('company') ? ' (' + d.get('company') + ')' : ''),
        name: d.get('name'), email: d.get('email'), company: d.get('company') || '-', phone: d.get('phone') || '-',
        brief: brief.text, tools: brief.tools.join(', ') || 'not sure yet', blueprint: plan, form: 'Plan my build'
      }).then(function (ok) {
        setBusy(btn, false);
        showDone(ok ? 'sent' : 'failed', mailto('New AI build brief from ' + d.get('name'), text), d.get('email'));
      });
    });
    function showDone(state, fallback, email) {
      var done = $('[data-panel="done"]', studio);
      var title = $('.sp-title', done), note = $('.sp-note', done), alt = $('.done-alt', done);
      alt.hidden = true;
      if (state === 'sent') {
        title.textContent = 'Your brief is with Orca AI.';
        note.textContent = 'The Orca team will reach out at ' + email + ' to plan your build.';
      } else if (state === 'whatsapp') {
        title.textContent = 'Your brief is ready on WhatsApp.';
        note.textContent = 'Press send in WhatsApp and the Orca team will take it from there.';
      } else {
        title.textContent = 'We could not send that just now.';
        note.textContent = 'Your brief is safe. Send it by email instead and the Orca team will reply.';
        alt.href = fallback; alt.hidden = false;
      }
      step('done');
    }
  }

  /* ---------- Closing form: brief, then contact details ---------- */
  var demo = $('[data-demo]');
  var demoStep = $('[data-demo-step]');
  if (demo && demoStep) {
    demo.addEventListener('submit', function (e) {
      e.preventDefault();
      demoStep.hidden = false;
      $('input', demoStep).focus();
    });
    demoStep.addEventListener('submit', function (e) {
      e.preventDefault();
      var via = (e.submitter && e.submitter.value) || 'email';
      var d = new FormData(demoStep);
      if (d.get('_honey')) return;
      var briefText = $('#demo-brief').value.trim();
      var text = 'Hi Orca AI,\n\nWhat I want to automate:\n' + briefText +
        '\n\nName: ' + d.get('name') + '\nCompany: ' + (d.get('company') || '-') + '\nEmail: ' + d.get('email');
      var done = $('.demo-done', demoStep);
      if (via === 'whatsapp') {
        window.open(wa(text), '_blank', 'noopener');
        done.textContent = 'WhatsApp has opened with your brief. Press send and the Orca team will take it from there.';
        done.hidden = false; return;
      }
      var btn = e.submitter;
      setBusy(btn, true);
      deliver({
        _subject: 'Call request: ' + d.get('name') + (d.get('company') ? ' (' + d.get('company') + ')' : ''),
        name: d.get('name'), email: d.get('email'), company: d.get('company') || '-', brief: briefText, form: 'Contact section'
      }).then(function (ok) {
        setBusy(btn, false);
        if (ok) {
          done.textContent = 'Thanks, ' + d.get('name') + '. Your brief is with the Orca team and we will reach out at ' + d.get('email') + '.';
          demoStep.reset();
        } else {
          done.innerHTML = 'We could not send that just now. <a class="done-link" href="' + mailto('Orca AI call request from ' + d.get('name'), text) + '">Send it by email instead</a>.';
        }
        done.hidden = false;
      });
    });
  }
  // Playbook cards prefill the closing brief
  $$('[data-brief]').forEach(function (a) {
    a.addEventListener('click', function () {
      var input = $('#demo-brief');
      if (input) input.value = a.getAttribute('data-brief');
    });
  });
})();
