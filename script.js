/* =========================================================
   CREATIVE CODE HUB — Master Script
   Handles: theme, mobile nav, floating social, scroll reveal,
   hero slider (8 slides) with autoplay, dots, arrows, swipe,
   keyboard and progress bar.
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. Theme (dark / light) ---------- */
  function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- 2. Mobile nav ---------- */
  function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');
    if (!navToggle || !navLinks) return;
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  /* ---------- 3. Floating social ---------- */
  function initFloatingSocial() {
    const fs = document.getElementById('floatingSocial');
    const st = document.getElementById('socialToggle');
    if (!fs || !st) return;
    st.addEventListener('click', (e) => {
      e.stopPropagation();
      fs.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!fs.contains(e.target)) fs.classList.remove('active');
    });
  }

  /* ---------- 4. Scroll reveal ---------- */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  /* ---------- 5. Hero slider ---------- */
  function initHeroSlider() {
    const slider = document.getElementById('heroSlider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const dots   = Array.from(slider.querySelectorAll('.slider-dot'));
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    const progress = document.getElementById('slideProgress');

    if (!slides.length) return;

    const TOTAL = slides.length;
    const INTERVAL = 7500; // ms per slide
    let current = 0;
    let rafId = null;
    let startTime = 0;
    let paused = false;

    function goTo(i) {
      current = (i + TOTAL) % TOTAL;
      slides.forEach((s, idx) => s.classList.toggle('active', idx === current));
      dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
      restart();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function restart() {
      if (rafId) cancelAnimationFrame(rafId);
      if (progress) progress.style.width = '0%';
      startTime = performance.now();
      paused = false;
      tick();
    }
    function tick() {
      if (paused) return;
      const elapsed = performance.now() - startTime;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      if (progress) progress.style.width = pct + '%';
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        next();
      }
    }
    function stopAuto() {
      paused = true;
      if (rafId) cancelAnimationFrame(rafId);
    }

    // Controls
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    // Pause on hover
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', restart);

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.target && e.target.matches && e.target.matches('input, textarea, select')) return;
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft')  goTo(current - 1);
    });

    // Touch swipe
    let touchX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchX = e.touches[0].clientX;
    }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 60) {
        dx < 0 ? next() : prev();
      }
    }, { passive: true });

    // Boot
    restart();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stopAuto();
      if (progress) progress.style.width = '100%';
    }
  }

  /* ---------- 6. Boot ---------- */
  function boot() {
    initTheme();
    initMobileNav();
    initFloatingSocial();
    initScrollReveal();
    initHeroSlider();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();