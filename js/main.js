/* ==========================================================================
   MAIN — header/rodapé, links de WhatsApp, hero em vídeo, animações, formulário
   Lê os dados de js/config.js (window.FX_CONFIG).
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.FX_CONFIG;
  if (!cfg) { console.error("FX_CONFIG não encontrado. Confira se js/config.js é carregado antes de main.js."); return; }

  var page = document.body.getAttribute("data-page") || "";
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var get = function (path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, cfg); };

  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.6-4-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.1 1.4z"/></svg>';

  /* ---------- Helpers ---------- */
  function waLink(msgKeyOrText) {
    var text = cfg.messages[msgKeyOrText] || msgKeyOrText || cfg.messages.default;
    return "https://wa.me/" + cfg.contact.whatsapp + "?text=" + encodeURIComponent(text);
  }
  function igLink() { return "https://www.instagram.com/" + cfg.contact.instagram; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- Header ---------- */
  function renderHeader() {
    var host = $("#site-header");
    if (!host) return;
    var links = cfg.nav.map(function (i) {
      return '<a href="' + esc(i.href) + '"' + (i.key === page ? ' aria-current="page"' : "") + ">" + esc(i.label) + "</a>";
    }).join("");
    var brandText = cfg.logo.showText
      ? '<span class="brand__text">' + esc(cfg.site.name) + "<small>Consultoria e gestão</small></span>" : "";
    host.className = "site-header";
    host.innerHTML =
      '<div class="container site-header__inner">' +
        '<a class="brand" href="index.html" aria-label="' + esc(cfg.site.name) + ' — página inicial">' +
          '<img src="' + esc(cfg.logo.src) + '" alt="' + esc(cfg.logo.alt) + '" width="46" height="46">' + brandText +
        "</a>" +
        '<button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menu"><span></span></button>' +
        '<nav class="nav" id="site-nav" aria-label="Principal">' + links +
          '<a class="btn btn--primary btn--sm" data-wa="' + esc(cfg.navCta.message) + '">' + WA_ICON + esc(cfg.navCta.label) + "</a>" +
        "</nav>" +
      "</div>";

    var toggle = $(".nav-toggle", host), nav = $("#site-nav", host);
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    }
    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });

    var onScroll = function () { host.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Footer + WhatsApp flutuante ---------- */
  function renderFooter() {
    var host = $("#site-footer");
    if (!host) return;
    var c = cfg.contact;
    var navLinks = cfg.nav.map(function (i) { return '<li><a href="' + esc(i.href) + '">' + esc(i.label) + "</a></li>"; }).join("");
    var contacts =
      '<li><a data-wa="default">WhatsApp: ' + esc(c.whatsappDisplay) + "</a></li>" +
      (c.email ? '<li><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li>" : "") +
      '<li><a href="' + igLink() + '" target="_blank" rel="noopener">Instagram @' + esc(c.instagram) + "</a></li>" +
      (c.city ? "<li>" + esc(c.city) + "</li>" : "") +
      (c.hours ? "<li>" + esc(c.hours) + "</li>" : "");
    var brandText = cfg.logo.showText ? '<span class="brand__text">' + esc(cfg.site.name) + "<small>Consultoria e gestão</small></span>" : "";

    host.className = "site-footer";
    host.innerHTML =
      '<div class="container">' +
        '<div class="site-footer__grid">' +
          "<div>" +
            '<a class="brand" href="index.html"><img src="' + esc(cfg.logo.src) + '" alt="' + esc(cfg.logo.alt) + '" width="46" height="46">' + brandText + "</a>" +
            '<p class="site-footer__about">' + esc(cfg.site.footerAbout) + "</p>" +
          "</div>" +
          "<div><h4>Navegação</h4><ul>" + navLinks + "</ul></div>" +
          "<div><h4>Contato</h4><ul>" + contacts + "</ul></div>" +
        "</div>" +
        '<div class="site-footer__bottom"><span>© ' + new Date().getFullYear() + " " + esc(cfg.site.legalName) + ". Todos os direitos reservados.</span></div>" +
      "</div>";

    var fab = document.createElement("a");
    fab.className = "wa-float";
    fab.setAttribute("data-wa", "default");
    fab.setAttribute("aria-label", "Falar no WhatsApp");
    fab.innerHTML = WA_ICON;
    document.body.appendChild(fab);
  }

  /* ---------- Preenche links/textos a partir do config ---------- */
  function bindConfig() {
    // <a data-wa="budget"> → link do WhatsApp com mensagem pronta (chave do config.messages ou texto livre)
    $$("[data-wa]").forEach(function (el) {
      el.setAttribute("href", waLink(el.getAttribute("data-wa")));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
    $$("[data-ig]").forEach(function (el) {
      el.setAttribute("href", igLink()); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener");
    });
    // <span data-cfg="contact.whatsappDisplay"></span> → texto
    $$("[data-cfg]").forEach(function (el) { var v = get(el.getAttribute("data-cfg")); if (v) el.textContent = v; });
    // <a data-cfg-href="contact.email" data-href-prefix="mailto:"> → href
    $$("[data-cfg-href]").forEach(function (el) {
      var v = get(el.getAttribute("data-cfg-href"));
      if (v) el.setAttribute("href", (el.getAttribute("data-href-prefix") || "") + v);
    });
    // <div data-show-if="contact.email"> → some se o valor estiver vazio
    $$("[data-show-if]").forEach(function (el) { if (!get(el.getAttribute("data-show-if"))) el.hidden = true; });
  }

  /* ---------- Hero em vídeo ----------
     O poster (<img class="hero__poster">) já está no HTML e aparece na hora.
     O vídeo só é carregado se a tela for grande, sem economia de dados e sem "reduzir movimento". */
  function initHeroVideo() {
    var video = $(".hero__video");
    if (!video) return;
    var v = cfg.hero && cfg.hero.video;
    var conn = navigator.connection || {};
    var allowed = v && v.enabled &&
      window.matchMedia("(min-width:" + (v.minWidth || 768) + "px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !conn.saveData && !/(^|-)2g$/.test(conn.effectiveType || "");
    if (!allowed) { video.remove(); return; }

    var sources = [];
    if (v.webm) sources.push([v.webm, "video/webm"]);
    if (v.mp4) sources.push([v.mp4, "video/mp4"]);
    if (!sources.length) { video.remove(); return; }

    sources.forEach(function (s, i) {
      var el = document.createElement("source");
      el.src = s[0]; el.type = s[1];
      // se a ÚLTIMA fonte falhar, nenhuma funcionou: mantém só o poster
      if (i === sources.length - 1) el.addEventListener("error", function () { video.remove(); });
      video.appendChild(el);
    });
    video.muted = true; video.loop = true; video.playsInline = true; video.preload = "auto";
    video.addEventListener("playing", function () { video.classList.add("is-playing"); }, { once: true });
    video.load();
    var p = video.play();
    if (p && p.catch) p.catch(function () { /* autoplay bloqueado: fica o poster */ });
  }

  /* ---------- Revelar ao rolar ---------- */
  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Formulário de contato → WhatsApp ---------- */
  function initContactForm() {
    var form = $("#contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var lines = ["Olá! Vim pelo site da FX Sustentabilidade."];
      if (d.get("nome")) lines.push("Nome: " + d.get("nome"));
      if (d.get("empresa")) lines.push("Empresa/Instituição: " + d.get("empresa"));
      if (d.get("segmento")) lines.push("Segmento: " + d.get("segmento"));
      if (d.get("interesse")) lines.push("Interesse: " + d.get("interesse"));
      if (d.get("mensagem")) lines.push("Mensagem: " + d.get("mensagem"));
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
    });
  }
    /* ---------- Imagem do topo das páginas internas (config.js → pageHero) ---------- */
  function initPageHero() {
    var hero = $(".page-hero");
    var conf = cfg.pageHero && cfg.pageHero[page];
    if (!hero || !conf) return;
    var src = typeof conf === "string" ? conf : conf.src;
    if (!src) return;
    var img = new Image();
    img.className = "page-hero__img";
    img.alt = "";
    img.decoding = "async";
    if (conf.position) img.style.objectPosition = conf.position;
    img.addEventListener("load", function () { hero.classList.add("has-img"); });
    img.addEventListener("error", function () { img.remove(); });
    img.src = src;
    hero.insertBefore(img, hero.firstChild);
  }

  /* ---------- Abre o <details> indicado na URL (ex.: servicos.html#pgrss) ---------- */
  function openFromHash() {
    var id = decodeURIComponent((location.hash || "").slice(1));
    if (!id) return;
    var el = document.getElementById(id);
    if (el && el.tagName === "DETAILS") {
      el.open = true;
      setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
    }
  }

  /* ---------- Start ---------- */
  renderHeader();
  renderFooter();
  bindConfig();
  initHeroVideo();
  initPageHero();
  initReveal();
  initContactForm();
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
