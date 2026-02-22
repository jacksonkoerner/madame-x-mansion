/* ================================================
   MADAME X MANSION — Shared JavaScript
   ================================================ */

(function() {
  'use strict';

  // --- Navigation ---
  var nav = document.getElementById('site-nav');
  var toggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('nav-mobile');

  window.addEventListener('scroll', function() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  // --- Texture Background Scroll Fading ---
  var textureBgs = document.querySelectorAll('.texture-bg');
  var textureMap = {
    'gold-leaf': 'images/textures/bg-gold-leaf.jpg',
    'damask': 'images/textures/bg-damask.jpg',
    'brick': 'images/textures/bg-brick.jpg',
    'inkwash': 'images/textures/bg-inkwash.jpg',
    'ironwork': 'images/textures/bg-ironwork.jpg'
  };

  textureBgs.forEach(function(el) {
    var name = el.getAttribute('data-texture');
    if (name && textureMap[name]) {
      el.style.backgroundImage = 'url(' + textureMap[name] + ')';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.position = 'absolute';
      el.style.inset = '0';
      el.style.opacity = '0';
      el.style.transition = 'opacity 1.2s ease';
      el.style.zIndex = '0';
    }
  });

  // Fade textures in as their section enters viewport
  function handleTextureScroll() {
    textureBgs.forEach(function(el) {
      var section = el.parentElement;
      if (!section) return;
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight;
      // Start fading in when section is 20% into viewport
      var progress = 1 - (rect.top / (vh * 0.8));
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      el.style.opacity = progress;
    });
  }

  window.addEventListener('scroll', handleTextureScroll, { passive: true });
  handleTextureScroll(); // Initial check

  // --- Reveal Animations ---
  var revealElements = document.querySelectorAll('[data-reveal], .beat-card, .apartment-card, .story-inline-image');

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' });

  revealElements.forEach(function(el) {
    revealObserver.observe(el);
  });

  // --- Smooth scroll for hero arrow ---
  var heroScroll = document.querySelector('.hero-scroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', function() {
      var next = document.querySelector('.hero').nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- Contact form (placeholder handler) ---
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.btn-submit');
      if (btn) {
        btn.textContent = 'Inquiry Submitted ✓';
        btn.style.background = 'var(--gold)';
        btn.style.color = 'var(--black)';
        btn.disabled = true;
      }
      // In the future, this will POST to the backend
    });
  }

})();
