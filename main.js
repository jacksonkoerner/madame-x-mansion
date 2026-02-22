/* ================================================
   MADAME X MANSION — Shared JavaScript
   Fixed texture crossfade + UI
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
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close menu when a link is tapped
    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // --- Fixed Texture Background System ---
  // Create fixed background layers (one per texture) that sit behind everything.
  // As you scroll, the texture assigned to the current section fades in, others fade out.

  var textureMap = {
    'gold-leaf': 'images/textures/bg-gold-leaf.jpg',
    'damask': 'images/textures/bg-damask.jpg',
    'brick': 'images/textures/bg-brick.jpg',
    'inkwash': 'images/textures/bg-inkwash.jpg',
    'ironwork': 'images/textures/bg-ironwork.jpg'
  };

  var fixedLayers = {};
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
  document.body.insertBefore(container, document.body.firstChild);

  Object.keys(textureMap).forEach(function(name) {
    var div = document.createElement('div');
    div.className = 'texture-bg-fixed';
    div.style.backgroundImage = 'url(' + textureMap[name] + ')';
    div.style.opacity = '0';
    container.appendChild(div);
    fixedLayers[name] = div;
  });

  // Single fixed overlay on top of textures, below content
  var overlay = document.createElement('div');
  overlay.className = 'texture-overlay-fixed';
  container.appendChild(overlay);

  // Build a list of sections and which texture they use
  var sectionTextures = [];
  var allSections = document.querySelectorAll('section');
  allSections.forEach(function(sec) {
    var texEl = sec.querySelector('[data-texture]');
    if (texEl) {
      sectionTextures.push({
        el: sec,
        texture: texEl.getAttribute('data-texture')
      });
    }
  });

  var currentTexture = null;

  function updateFixedBg() {
    var vh = window.innerHeight;
    var midY = vh * 0.4; // check what's at 40% of viewport height
    var activeTexture = null;

    for (var i = sectionTextures.length - 1; i >= 0; i--) {
      var rect = sectionTextures[i].el.getBoundingClientRect();
      if (rect.top <= midY && rect.bottom > 0) {
        activeTexture = sectionTextures[i].texture;
        break;
      }
    }

    if (activeTexture && activeTexture !== currentTexture) {
      currentTexture = activeTexture;
      Object.keys(fixedLayers).forEach(function(name) {
        fixedLayers[name].style.opacity = (name === activeTexture) ? '1' : '0';
      });
    }
  }

  window.addEventListener('scroll', updateFixedBg, { passive: true });
  // Run once on load
  updateFixedBg();
  // Also run after a short delay for initial paint
  setTimeout(updateFixedBg, 100);

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
    });
  }

})();
