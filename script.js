/* ===========================================================
   CREATOR 360 — interações
   Sem dependências. Tudo degrada bem se o JS falhar.
   =========================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- ano no rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- nav: fundo ao rolar ---------- */
  var nav = document.getElementById('nav');
  var sticky = document.querySelector('.sticky-cta');
  var hero = document.querySelector('.hero');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;

    if (nav) nav.classList.toggle('is-stuck', y > 24);

    // CTA fixo aparece depois do hero e some quando a oferta está na tela
    if (sticky && hero) {
      var passouHero = y > hero.offsetHeight * 0.8;
      var oferta = document.getElementById('oferta');
      var naOferta = false;
      if (oferta) {
        var r = oferta.getBoundingClientRect();
        naOferta = r.top < window.innerHeight && r.bottom > 0;
      }
      sticky.classList.toggle('is-visible', passouHero && !naOferta);
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');

  // delay escalonado declarado no HTML
  reveals.forEach(function (el) {
    var d = el.getAttribute('data-reveal-delay');
    if (d) el.style.setProperty('--d', d);
  });

  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ: abre um por vez ---------- */
  var qas = document.querySelectorAll('.qa');
  qas.forEach(function (qa) {
    qa.addEventListener('toggle', function () {
      if (!qa.open) return;
      qas.forEach(function (outro) {
        if (outro !== qa) outro.open = false;
      });
    });
  });

  /* ---------- scroll suave com offset do header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var alvo = document.querySelector(id);
      if (!alvo) return;

      e.preventDefault();
      var offset = nav ? nav.offsetHeight + 12 : 0;
      var top = alvo.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  /* ---------- marquee: pausa fora da tela ---------- */
  var track = document.querySelector('.marquee__track');
  if (track && !reduced && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      track.style.animationPlayState = entries[0].isIntersecting ? 'running' : 'paused';
    }).observe(track);
  }

  /* ---------- CTA: ponto único de tracking + checkout ----------
     Quando o link de checkout existir, defina CHECKOUT_URL abaixo.
     Todos os botões com data-cta passam por aqui.
  ------------------------------------------------------------- */
  var CHECKOUT_URL = 'https://pay.cakto.com.br/ypczsar_1021437';

  document.querySelectorAll('[data-cta]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var origem = btn.getAttribute('data-cta');

      // tracking (dataLayer / Meta Pixel entram aqui)
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'cta_click', cta_origem: origem });
      }

      // botão da oferta leva direto ao checkout, se configurado
      if (btn.hasAttribute('data-checkout-url')) {
        if (CHECKOUT_URL) {
          e.preventDefault();
          window.location.href = CHECKOUT_URL;
        } else {
          e.preventDefault();
          console.warn('[Creator 360] CHECKOUT_URL ainda não configurada em script.js');
        }
      }
    });
  });

  /* ---------- aviso de pendências no console ---------- */
  var slots = document.querySelectorAll('[data-slot]').length;
  var campos = document.querySelectorAll('[data-fill]').length;
  if (slots || campos) {
    console.info(
      '%c[CREATOR 360] Pendências: ' + slots + ' imagem(ns) e ' + campos + ' dado(s) a preencher.',
      'background:#C9F94D;color:#060606;padding:4px 10px;border-radius:6px;font-weight:700'
    );
  }
})();
