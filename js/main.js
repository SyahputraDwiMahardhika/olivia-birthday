/* Olivia Birthday Website — Vanilla JS (tanpa dependensi, tanpa backend) */
(function () {
  "use strict";

  var C = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- Konten dasar ---------- */
  document.querySelectorAll('[data-bind="name"]').forEach(function (n) { n.textContent = C.name || ""; });
  document.querySelectorAll('[data-bind="nickname"]').forEach(function (n) { n.textContent = C.nickname || C.name || ""; });
  document.title = "Selamat Ulang Tahun, " + (C.name || "") + "!";
  $("#hero-tagline").textContent = C.heroTagline || "";
  if (C.birthdayDate) { var hd = $("#hero-date"); hd.textContent = "🗓 " + C.birthdayDate; hd.hidden = false; }

  /* ---------- Marquee ---------- */
  (function () {
    var items = C.marquee && C.marquee.length ? C.marquee : ["Selamat Ulang Tahun"];
    var track = $("#marquee");
    for (var r = 0; r < 4; r++) items.forEach(function (t) { track.appendChild(el("span", null, t)); });
  })();

  /* ---------- Galeri polaroid + lightbox ---------- */
  var lightbox = $("#lightbox"), lbMedia = $("#lb-media"), lbCaption = $("#lb-caption"), lastFocus = null;

  function mediaNode(photo) {
    if (photo.src) {
      var img = el("img"); img.src = photo.src; img.alt = photo.alt || photo.caption || ""; img.loading = "lazy";
      img.addEventListener("error", function () { img.replaceWith(placeholder()); });
      return img;
    }
    return placeholder();
  }
  function placeholder() {
    var p = el("div", "placeholder"); p.appendChild(el("span", null, "📷 Tempat foto")); return p;
  }
  function openLightbox(photo, trigger) {
    lastFocus = trigger;
    lbMedia.textContent = ""; lbMedia.appendChild(mediaNode(photo));
    lbCaption.textContent = photo.caption || "";
    if (typeof lightbox.showModal === "function") lightbox.showModal(); else lightbox.setAttribute("open", "");
    $("#lb-close").focus();
  }
  function closeLightbox() {
    if (typeof lightbox.close === "function") lightbox.close(); else lightbox.removeAttribute("open");
    if (lastFocus) lastFocus.focus();
  }
  $("#lb-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  lightbox.addEventListener("cancel", function () { if (lastFocus) lastFocus.focus(); });

  (function () {
    var list = $("#polaroids");
    (C.photos || []).forEach(function (ph, i) {
      var li = el("li", "polaroid reveal");
      var btn = el("button", "polaroid__btn");
      btn.type = "button";
      btn.setAttribute("aria-label", "Perbesar: " + (ph.caption || "foto " + (i + 1)));
      var frame = el("span", "polaroid__img"); frame.appendChild(mediaNode(ph));
      btn.appendChild(frame);
      btn.appendChild(el("span", "polaroid__cap", ph.caption || ""));
      btn.addEventListener("click", function () { openLightbox(ph, btn); });
      li.appendChild(btn); list.appendChild(li);
    });
  })();

  /* ---------- Kartu apresiasi (flip) ---------- */
  (function () {
    var list = $("#cards");
    (C.cards || []).forEach(function (c, i) {
      var li = el("li", "reveal");
      var b = el("button", "flip"); b.type = "button"; b.setAttribute("aria-pressed", "false");
      var inner = el("span", "flip__inner");
      var front = el("span", "flip__face flip__front");
      front.appendChild(document.createTextNode(c.front || ""));
      front.appendChild(el("small", null, "ketuk untuk membuka"));
      var back = el("span", "flip__face flip__back", c.back || "");
      inner.appendChild(front); inner.appendChild(back); b.appendChild(inner);
      b.setAttribute("aria-label", "Kartu " + (i + 1) + ": " + (c.front || ""));
      b.addEventListener("click", function () {
        var on = b.getAttribute("aria-pressed") === "true";
        b.setAttribute("aria-pressed", String(!on));
        b.setAttribute("aria-label", "Kartu " + (i + 1) + ": " + (!on ? (c.back || "") : (c.front || "")));
        if (!on) confettiBurst(b.getBoundingClientRect().left + b.offsetWidth / 2, b.getBoundingClientRect().top + 40, 24);
      });
      li.appendChild(b); list.appendChild(li);
    });
  })();

  /* ---------- Surat interaktif ---------- */
  (function () {
    var L = C.letter || {};
    var env = $("#envelope"), letter = $("#letter");
    $("#letter-greeting").textContent = L.greeting || "";
    var body = $("#letter-body");
    (L.paragraphs || []).forEach(function (t, i) {
      var p = el("p", null, t); p.style.animationDelay = (0.25 + i * 0.5) + "s"; body.appendChild(p);
    });
    $("#letter-closing").textContent = L.closing || "";
    $("#letter-sign").textContent = L.signature || "";
    env.addEventListener("click", function () {
      var open = env.getAttribute("aria-expanded") === "true";
      env.setAttribute("aria-expanded", String(!open));
      env.querySelector(".envelope__label").textContent = open ? "Buka surat" : "Tutup surat";
      letter.hidden = open;
      if (!open) {
        var r = env.getBoundingClientRect();
        confettiBurst(r.left + r.width / 2, r.top + 40, 30);
        letter.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    });
  })();

  /* ---------- Kejutan: lilin ---------- */
  (function () {
    var S = C.surprise || {};
    var count = Math.max(1, Math.min(12, S.candleCount || 5));
    var wrap = $("#candles"), status = $("#candle-status"), fin = $("#final");
    var blowAll = $("#blow-all"), relight = $("#relight");
    $("#wish-prompt").textContent = S.wishPrompt || "";
    $("#final-text").textContent = S.finalMessage || "";
    var candles = [];

    function remaining() { return candles.filter(function (c) { return c.getAttribute("aria-pressed") !== "true"; }).length; }
    function update(fromUser) {
      var left = remaining();
      if (left === 0) {
        status.textContent = "Semua lilin padam. Semoga permintaanmu terkabul!";
        fin.hidden = false; blowAll.hidden = true; relight.hidden = false;
        if (fromUser !== false) confettiRain();
      } else {
        status.textContent = "Lilin menyala: " + left + " dari " + count + ".";
      }
    }
    for (var i = 0; i < count; i++) {
      (function (n) {
        var b = el("button", "candle"); b.type = "button"; b.setAttribute("aria-pressed", "false");
        b.setAttribute("aria-label", "Lilin " + (n + 1) + " — ketuk untuk memadamkan");
        b.appendChild(el("span", "candle__flame", "🔥")); b.appendChild(el("span", "candle__stick"));
        b.firstChild.setAttribute("aria-hidden", "true");
        b.addEventListener("click", function () {
          if (b.getAttribute("aria-pressed") === "true") return;
          b.setAttribute("aria-pressed", "true"); update();
        });
        candles.push(b); wrap.appendChild(b);
      })(i);
    }
    blowAll.addEventListener("click", function () {
      candles.forEach(function (c) { c.setAttribute("aria-pressed", "true"); });
      update();
    });
    relight.addEventListener("click", function () {
      candles.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      fin.hidden = true; relight.hidden = true; blowAll.hidden = false;
      status.textContent = "Lilin dinyalakan lagi."; candles[0].focus();
    });
  })();

  /* ---------- Konfeti (canvas) ---------- */
  var canvas = $("#confetti"), ctx = canvas.getContext && canvas.getContext("2d");
  var parts = [], raf = null, COLORS = ["#ff7eb6", "#ffe14d", "#9be8c8", "#8ec5ff", "#141414", "#ffffff"];
  function resize() {
    var d = window.devicePixelRatio || 1;
    canvas.width = innerWidth * d; canvas.height = innerHeight * d;
    if (ctx) ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  window.addEventListener("resize", resize); resize();

  function spawn(x, y, n, spread, rain) {
    for (var i = 0; i < n; i++) {
      var a = rain ? Math.PI / 2 + (Math.random() - .5) * .6 : Math.random() * Math.PI * 2;
      var v = rain ? 2 + Math.random() * 4 : 3 + Math.random() * spread;
      parts.push({
        x: rain ? Math.random() * innerWidth : x, y: rain ? -20 - Math.random() * 200 : y,
        vx: Math.cos(a) * v, vy: rain ? Math.abs(Math.sin(a) * v) : Math.sin(a) * v - 3,
        s: 6 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
        c: COLORS[(Math.random() * COLORS.length) | 0], life: 0, max: 140 + Math.random() * 80, sq: Math.random() > .4
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(function (p) { return p.life < p.max && p.y < innerHeight + 30; });
    parts.forEach(function (p) {
      p.life++; p.vy += .12; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
      ctx.fillStyle = p.c; ctx.strokeStyle = "#141414"; ctx.lineWidth = 1.5;
      if (p.sq) { ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); ctx.strokeRect(-p.s / 2, -p.s / 2, p.s, p.s); }
      else { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 6.3); ctx.fill(); ctx.stroke(); }
      ctx.restore();
    });
    raf = parts.length ? requestAnimationFrame(tick) : null;
    if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
  function confettiBurst(x, y, n) { if (!ctx || reduceMotion) return; spawn(x, y, n || 60, 9, false); }
  function confettiRain() { if (!ctx || reduceMotion) return; spawn(0, 0, 140, 0, true); confettiBurst(innerWidth / 2, innerHeight / 2, 60); }


  /* ---------- Musik (otomatis, bisa dimatikan) ---------- */
  var musicBtn = $("#music-toggle"), musicOn = false, musicWanted = false;
  var audioEl = null, ac = null, master = null, timer = null, step = 0, armed = false;
  // Melodi lembut orisinal (pentatonik C) — dibuat langsung dengan Web Audio.
  var NOTES = [523.25, 659.25, 783.99, 659.25, 880, 783.99, 659.25, 587.33, 523.25, 587.33, 659.25, 392, 440, 523.25, 440, 392];
  var UNLOCK_EVENTS = ["pointerup", "touchend", "click", "keydown"];

  function playTone(freq, t) {
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = "triangle"; o.frequency.value = freq;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.5, t + .02); g.gain.exponentialRampToValueAtTime(.001, t + .55);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + .6);
  }
  function ensureTimer() {
    if (timer) return;
    timer = setInterval(function () { playTone(NOTES[step++ % NOTES.length], ac.currentTime + .02); }, 420);
  }
  function startSynth() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    if (!ac) {
      ac = new AC(); master = ac.createGain(); master.gain.value = .12; master.connect(ac.destination);
      ac.onstatechange = function () {
        if (ac.state === "running" && musicWanted) { ensureTimer(); musicOn = true; renderMusic(); }
      };
    }
    try { var p = ac.resume && ac.resume(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    if (ac.state === "running") { ensureTimer(); return true; }
    return false; // diblokir browser sampai ada interaksi pertama
  }
  var fileFailed = false;
  function useFile() { return !!(C.music && C.music.src) && !fileFailed; }
  function startFile() {
    if (!audioEl) {
      audioEl = new Audio(C.music.src);
      audioEl.loop = true; // diputar berulang tanpa henti
      audioEl.preload = "auto";
      audioEl.volume = .6;
      audioEl.addEventListener("error", function () {
        // File tidak ditemukan / tidak bisa diputar -> pakai melodi sintesis
        fileFailed = true;
        if (musicWanted) { musicOn = startSynth(); if (!musicOn) armUnlock(); renderMusic(); }
      });
      audioEl.addEventListener("ended", function () { // jaga-jaga bila loop tidak jalan di browser tertentu
        if (musicWanted) { audioEl.currentTime = 0; audioEl.play().catch(function () {}); }
      });
    }
    var p = audioEl.play();
    if (p && p.then) {
      p.then(function () {
        if (musicWanted) { musicOn = true; renderMusic(); } else { audioEl.pause(); }
      }).catch(function () { musicOn = false; renderMusic(); });
    }
    return false; // status diperbarui setelah play() berhasil
  }
  function unlock(e) {
    if (!musicWanted || musicOn) { disarmUnlock(); return; }
    if (e && e.target && musicBtn.contains(e.target)) return; // biarkan tombol musik yang menangani
    setMusic(true);
  }
  function armUnlock() {
    if (armed) return; armed = true;
    UNLOCK_EVENTS.forEach(function (ev) { document.addEventListener(ev, unlock, true); });
  }
  function disarmUnlock() {
    if (!armed) return; armed = false;
    UNLOCK_EVENTS.forEach(function (ev) { document.removeEventListener(ev, unlock, true); });
  }
  function setMusic(on) {
    musicWanted = on;
    if (on) {
      musicOn = useFile() ? startFile() : startSynth();
      if (!musicOn) armUnlock(); else disarmUnlock();
    } else {
      musicOn = false; disarmUnlock();
      if (audioEl) audioEl.pause();
      if (timer) { clearInterval(timer); timer = null; }
    }
    renderMusic();
  }
  function renderMusic() {
    musicBtn.setAttribute("aria-pressed", String(musicOn));
    musicBtn.setAttribute("aria-label", musicOn ? "Matikan musik" : "Putar musik");
    $(".music-toggle__label").textContent = musicOn ? "Musik: nyala" : (musicWanted ? "Ketuk layar untuk musik" : "Musik: mati");
  }
  musicBtn.addEventListener("click", function () { setMusic(!musicOn); });

  var resumeAfterHide = false;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { resumeAfterHide = musicOn; if (musicOn) setMusic(false); }
    else if (resumeAfterHide) { resumeAfterHide = false; setMusic(true); }
  });

  /* ---------- Reveal saat scroll ---------- */
  function observe() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { items.forEach(function (n) { n.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { threshold: .12 });
    items.forEach(function (n, i) { n.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(n); });
  }

  /* ---------- Mulai langsung ---------- */
  $("#hero-confetti").addEventListener("click", function () { confettiRain(); });
  $("#to-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); $("#hero").focus({ preventScroll: true });
  });

  /* ---------- Opening: satu tombol Buka ---------- */
  var openBtn = $("#open-btn");
  openBtn.addEventListener("click", function () {
    var op = $("#opening");
    setMusic(true); // klik ini adalah interaksi pengguna, jadi musik boleh langsung diputar
    op.classList.add("is-leaving");
    document.body.classList.remove("is-locked");
    $("#main").hidden = false; $("#footer").hidden = false; musicBtn.hidden = false;
    setTimeout(function () { op.hidden = true; }, reduceMotion ? 0 : 500);
    $("#hero").focus({ preventScroll: true }); window.scrollTo(0, 0);
    observe();
    if (!reduceMotion) setTimeout(function () { confettiBurst(innerWidth / 2, innerHeight / 3, 90); }, 350);
  });
  openBtn.focus();
})();
