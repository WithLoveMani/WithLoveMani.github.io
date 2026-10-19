(function () {
  var S = window.SITE || {};
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) { var d = document.createElement('div'); d.textContent = t == null ? '' : t; return d.innerHTML; };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ---- work the right player out of whatever she pasted ---- */
  function ytId(v) {
    var m = String(v || '').match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/);
    return m ? m[1] : (/^[\w-]{11}$/.test(v) ? v : '');
  }
  function igRef(v) {
    var m = String(v || '').match(/instagram\.com\/(?:[\w.]+\/)?(p|reel|reels|tv)\/([\w-]+)/);
    if (m) return { type: m[1] === 'reels' ? 'reel' : m[1], code: m[2] };
    return /^[\w-]{5,}$/.test(v || '') ? { type: 'reel', code: v } : null;
  }
  function media(w) {
    var y = ytId(w.youtube), ig = igRef(w.instagram);
    if (y) return { kind: 'yt', id: y };
    // an uploaded file always wins: it is the only option that plays fully inside the page
    if (w.video) return { kind: 'file', src: w.video, wide: !!w.wide };
    if (ig) return { kind: 'ig', type: ig.type, code: ig.code };
    return null;
  }
  function thumbOf(w) {
    if (w.thumb) return w.thumb;
    var y = ytId(w.youtube);
    return y ? 'https://i.ytimg.com/vi/' + y + '/hqdefault.jpg' : '';
  }
  function linkOf(w) {
    if (w.url) return w.url;
    var ig = igRef(w.instagram);
    if (ig) return 'https://www.instagram.com/' + ig.type + '/' + ig.code + '/';
    return S.socials && S.socials.instagram || '#';
  }

  /* ---- poster markup, shared by hero phone and work grid ---- */
  function poster(w, i) {
    var t = thumbOf(w);
    var img = t ? '<img src="' + esc(t) + '" alt="" loading="lazy">' : '';
    return '<div class="poster t-' + esc(w.tone || 'maple') + '">' +
      '<span class="p-fmt">' + esc(w.format) + '</span>' +
      '<span class="p-num">' + pad(i + 1) + '</span>' + img + '</div>';
  }

  /* ---- nav ---- */
  var nav = $('#nav'), toggle = $('.nav-toggle'), menu = $('#menu');
  // On iPhones the page scrolls inside #page instead of the window (see index.html)
  var page = $('#page'), inner = document.documentElement.classList.contains('ios');
  var onScroll = function () {
    var y = Math.max(window.scrollY || 0, document.documentElement.scrollTop || 0, inner ? page.scrollTop : 0);
    nav.classList.toggle('scrolled', y > 20);
  };
  // capture on document so scrolling in ANY container (window or #page) is noticed
  document.addEventListener('scroll', onScroll, { passive: true, capture: true }); onScroll();
  var lockScroll = function (on) { (inner ? page : document.body).style.overflow = on ? 'hidden' : ''; };
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---- hero rotating sub-headline ---- */
  var rot = $('#rotator'), lines = S.rotating || [], ri = 0;
  if (lines.length > 1 && !reduce) {
    setInterval(function () {
      rot.classList.add('swap');
      setTimeout(function () { ri = (ri + 1) % lines.length; rot.textContent = lines[ri]; rot.classList.remove('swap'); }, 350);
    }, 3600);
  } else if (lines.length) { rot.textContent = lines[0]; }

  /* ---- hero phone: story-style reel teaser ---- */
  var work = S.work || [];
  var slidesEl = $('#heroSlides'), barsEl = $('#storyBars');
  var heroWork = work.slice(0, 6);
  if (heroWork.length) {
    slidesEl.innerHTML = heroWork.map(function (w, i) { return '<div class="slide">' + poster(w, i) + '</div>'; }).join('');
    barsEl.innerHTML = heroWork.map(function () { return '<i></i>'; }).join('');
    var slides = slidesEl.children, bars = barsEl.children, cur = -1, DUR = 3400;
    var show = function (n) {
      cur = n % slides.length;
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.toggle('on', i === cur);
        bars[i].className = i < cur ? 'done' : '';
      }
      void barsEl.offsetWidth;
      bars[cur].style.setProperty('--dur', DUR + 'ms');
      bars[cur].className = 'run';
    };
    show(0);
    if (!reduce) setInterval(function () { show(cur + 1); }, DUR);
  }

  /* ---- work grid + filters ---- */
  var grid = $('#workGrid'), filters = $('#filters');
  var soc0 = S.socials || {};
  var current = 'All';
  var count = {}, cats = [];
  work.forEach(function (w) { count[w.format] = (count[w.format] || 0) + 1; });
  ['Food', 'Lifestyle', 'Fitness'].concat(Object.keys(count)).forEach(function (c) {
    if (count[c] && cats.indexOf(c) < 0) cats.push(c);
  });
  cats.unshift('All'); count.All = work.length;
  filters.innerHTML = cats.map(function (c, i) {
    return '<button class="chip' + (i ? '' : ' on') + '" data-f="' + esc(c) + '" aria-pressed="' + (i ? 'false' : 'true') + '">' +
      esc(c) + ' <small>' + count[c] + '</small></button>';
  }).join('');
  grid.innerHTML = work.map(function (w, i) {
    var tag = media(w) ? 'button' : 'a';
    var attrs = media(w)
      ? 'type="button" data-i="' + i + '"'
      : 'href="' + esc(linkOf(w)) + '" target="_blank" rel="noopener"';
    return '<' + tag + ' class="card reveal" data-cat="' + esc(w.format) + '" ' + attrs + ' aria-label="' + esc(w.title) + ' on ' + esc(w.platform) + '">' +
      '<div class="cover">' + poster(w, i) + (thumbOf(w) ? '<span class="fmt-tag">' + esc(w.format) + '</span>' : '') +
      '<span class="play"><svg><use href="#i-play"/></svg></span></div>' +
      '<div class="meta"><div class="meta-top"><span>' + esc(w.platform) + '</span><span>' + esc(w.metric) + '</span></div>' +
      '<h3>' + esc(w.title) + '</h3><p>' + esc(w.blurb) + '</p></div></' + tag + '>';
  }).join('');
  /* ---- horizontal rail: filter, arrows, drag ---- */
  var prevBtn = $('#railPrev'), nextBtn = $('#railNext');
  var visibleCards = function () { return [].filter.call(grid.children, function (c) { return !c.classList.contains('hide'); }); };
  function updateArrows() {
    prevBtn.disabled = grid.scrollLeft <= 2;
    nextBtn.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 2;
  }
  function applyFilter() {
    var k = 0;
    [].forEach.call(grid.children, function (c) {
      var vis = current === 'All' || c.getAttribute('data-cat') === current;
      c.classList.toggle('hide', !vis);
      if (vis) { c.dataset.par = k % 2; k++; }
    });
    grid.scrollLeft = 0;
    updateArrows();
  }
  filters.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    current = b.getAttribute('data-f');
    [].forEach.call(filters.children, function (c) { var on = c === b; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); });
    applyFilter();
  });
  function stepRail(dir) {
    var first = visibleCards()[0], w = first ? first.getBoundingClientRect().width + 22 : 300;
    var per = Math.max(1, Math.floor(grid.clientWidth / w) - 1);
    grid.scrollBy({ left: dir * w * per, behavior: reduce ? 'auto' : 'smooth' });
  }
  prevBtn.addEventListener('click', function () { stepRail(-1); });
  nextBtn.addEventListener('click', function () { stepRail(1); });
  grid.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  window.addEventListener('load', updateArrows);
  // mouse drag to scroll (touch already swipes natively)
  var drag = null, moved = false;
  grid.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = { x: e.clientX, left: grid.scrollLeft }; moved = false;
  });
  window.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    if (!moved && Math.abs(dx) > 6) { moved = true; grid.classList.add('dragging'); }
    if (moved) grid.scrollLeft = drag.left - dx;
  });
  window.addEventListener('pointerup', function () { drag = null; grid.classList.remove('dragging'); });
  grid.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  applyFilter();

  var wl = $('#workLinks');
  if (wl) {
    var parts = [];
    if (soc0.instagram) parts.push('<a href="' + esc(soc0.instagram) + '" target="_blank" rel="noopener">Instagram</a>');
    if (soc0.youtube) parts.push('<a href="' + esc(soc0.youtube) + '" target="_blank" rel="noopener">YouTube</a>');
    wl.innerHTML = parts.length ? 'Want to see it all? Find more on ' + parts.join(' and ') + '.' : '';
  }

  /* ---- modal: YouTube, Instagram posts/reels, or a video file ---- */
  var modal = $('#modal'), box = $('.modal-box'), frame = $('#modalFrame'), lastFocus = null, openIdx = -1;
  var mPrev = $('#modalPrev'), mNext = $('#modalNext'), mCount = $('#modalCount');
  var playable = function () {
    return visibleCards().filter(function (c) { return c.hasAttribute('data-i'); }).map(function (c) { return +c.getAttribute('data-i'); });
  };
  function openModal(i) {
    var w = work[i], m = media(w); if (!m) return;
    openIdx = i;
    box.className = 'modal-box';
    if (m.kind === 'yt') {
      frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(m.id) +
        '?autoplay=1&rel=0" title="' + esc(w.title) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    } else if (m.kind === 'ig') {
      box.classList.add('tall');
      // scrolling stays on so the caption and comments underneath the reel can be reached
      frame.innerHTML = '<iframe src="https://www.instagram.com/' + m.type + '/' + encodeURIComponent(m.code) +
        '/embed/" title="' + esc(w.title) + '" allowtransparency="true" allowfullscreen></iframe>';
    } else {
      box.classList.add(m.wide ? 'wide' : 'tall', 'file');
      frame.innerHTML = '<video src="' + esc(m.src) + '" controls autoplay playsinline></video>';
    }
    frame.scrollTop = 0;
    var open = $('#modalOpen'), yt = m.kind === 'yt';
    var href = w.url || (yt ? 'https://www.youtube.com/watch?v=' + m.id : (w.instagram ? linkOf(w) : ''));
    if (!href) { open.hidden = true; }
    else {
      open.href = href;
      open.innerHTML = 'Open on ' + (yt ? 'YouTube' : (w.platform || 'Instagram')) + ' <svg><use href="#i-arrow"/></svg>';
      open.hidden = false;
    }
    var order = playable(), pos = order.indexOf(i);
    mCount.textContent = w.format + (order.length > 1 && pos > -1 ? '  ·  ' + (pos + 1) + ' of ' + order.length : '');
    mPrev.hidden = mNext.hidden = order.length < 2;
    modal.hidden = false;
    lockScroll(true);
  }
  function closeModal() {
    modal.hidden = true; frame.innerHTML = ''; lockScroll(false);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }
  function go(dir) {
    var order = playable(), pos = order.indexOf(openIdx);
    if (order.length < 2 || pos < 0) return;
    openModal(order[(pos + dir + order.length) % order.length]);
  }
  grid.addEventListener('click', function (e) {
    var c = e.target.closest('[data-i]'); if (!c) return;
    lastFocus = c; openModal(+c.getAttribute('data-i'));
    $('.modal-close').focus();
  });
  mPrev.addEventListener('click', function () { go(-1); });
  mNext.addEventListener('click', function () { go(1); });
  modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  });

  /* ---- socials ---- */
  var soc = S.socials || {};
  var defs = [
    ['instagram', 'i-ig', 'Instagram', S.handle || ''],
    ['youtube', 'i-yt', 'YouTube', '@manishainCanada'],
    ['tiktok', 'i-tt', 'TikTok', 'Watch on TikTok']
  ];
  $('#socials').innerHTML = defs.filter(function (d) { return soc[d[0]]; }).map(function (d) {
    return '<a href="' + esc(soc[d[0]]) + '" target="_blank" rel="noopener"><svg><use href="#' + d[1] + '"/></svg><div><span>' + d[2] + '</span><b>' + esc(d[3]) + '</b></div></a>';
  }).join('') + '<a href="mailto:' + esc(S.email) + '"><svg><use href="#i-mail"/></svg><div><span>Email</span><b>' + esc(S.email) + '</b></div></a>';

  /* ---- contact form: "Send email" (Google Apps Script) + "DM on Instagram" ---- */
  var form = $('#contactForm'), status = $('#formStatus'), sendBtn = $('#sendBtn'), dmBtn = $('#dmBtn');
  var dmUrl = (S.socials || {}).instagramDM;
  if (dmUrl) dmBtn.href = dmUrl; else dmBtn.hidden = true;

  function mailtoUrl(d) {
    var subject = 'Collab inquiry: ' + d.type + ' (' + d.name + ')';
    var body = 'Hi Manisha,\n\n' + d.message + '\n\n' + d.name + (d.brand ? '\n' + d.brand : '') + '\n' + d.email;
    return 'mailto:' + S.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }
  function openEmailApp(d) {
    sendBtn.disabled = false;
    status.textContent = 'Opening your email app to send this. If nothing opens, write to ' + S.email + ' or use the Instagram DM button.';
    window.location.href = mailtoUrl(d);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = {}; new FormData(form).forEach(function (v, k) { d[k] = v; });
    if (d.company_site) return; // honeypot
    var bad = false;
    ['name', 'email', 'message'].forEach(function (k) {
      var f = form.elements[k], ok = f.value.trim() && (k !== 'email' || /^\S+@\S+\.\S+$/.test(f.value));
      f.parentNode.classList.toggle('err', !ok); if (!ok) bad = true;
    });
    if (bad) { status.textContent = 'Please fill in your name, a valid email and a short message.'; return; }

    if (!S.formEndpoint) { openEmailApp(d); return; }
    status.textContent = 'Sending...'; sendBtn.disabled = true;
    var google = /\/macros\/s\//.test(S.formEndpoint);   // Google Apps Script web app
    var opts = google
      ? { method: 'POST', body: new URLSearchParams(d) }
      : { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(d) };
    fetch(S.formEndpoint, opts)
      .then(function (r) { return google ? r.json() : { ok: r.ok }; })
      .then(function (res) {
        if (!res || !res.ok) throw new Error('not sent');
        sendBtn.disabled = false; form.reset();
        status.textContent = 'Thank you! Your message is on its way. I will reply soon.';
      })
      .catch(function () { openEmailApp(d); });
  });

  /* ---- scroll reveal ---- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    io.observe(el);
  });

  /* ---- count-up on stats ---- */
  var counters = document.querySelectorAll('[data-count]');
  var cio = new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (!x.isIntersecting) return; cio.unobserve(x.target);
      var el = x.target, end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', dec = String(end).indexOf('.') > -1 ? 1 : 0;
      if (reduce) return;
      var t0 = performance.now();
      (function tick(t) {
        var p = Math.min((t - t0) / 1400, 1), v = end * (1 - Math.pow(1 - p, 3));
        el.textContent = v.toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(tick); else el.textContent = end.toFixed(dec) + suf;
      })(t0);
    });
  }, { threshold: .6 });
  counters.forEach(function (c) { cio.observe(c); });

  /* ---- magnetic buttons (tactile micro-interaction) ---- */
  if (!reduce && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.magnetic').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .18) + 'px,' + ((e.clientY - r.top - r.height / 2) * .28) + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  $('#year').textContent = new Date().getFullYear();
})();
