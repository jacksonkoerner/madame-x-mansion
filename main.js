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
    // Toggle menu open/close
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      } else {
        toggle.classList.add('open');
        mobileMenu.classList.add('open');
      }
    });

    // Make sure toggle works on touch too
    toggle.addEventListener('touchend', function(e) {
      e.preventDefault();
      toggle.click();
    });

    // Close menu and navigate when a link is tapped
    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        // Let the default navigation happen
      });
    });
  }

  // --- Fixed Texture Background System ---
  // Textures are evenly distributed across the total scroll length of the page.
  // Brick is always last. The JS measures page height and divides evenly.

  // Fixed order: gold-leaf → damask → ironwork → inkwash → brick (always last)
  var textureOrder = ['gold-leaf', 'damask', 'ironwork', 'inkwash', 'brick'];
  var texturePaths = {
    'gold-leaf': 'images/textures/bg-gold-leaf.jpg',
    'damask': 'images/textures/bg-damask.jpg',
    'ironwork': 'images/textures/bg-ironwork.jpg',
    'inkwash': 'images/textures/bg-inkwash.jpg',
    'brick': 'images/textures/bg-brick.jpg'
  };

  var fixedLayers = {};
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
  document.body.insertBefore(container, document.body.firstChild);

  textureOrder.forEach(function(name) {
    var div = document.createElement('div');
    div.className = 'texture-bg-fixed';
    div.style.backgroundImage = 'url(' + texturePaths[name] + ')';
    div.style.opacity = '0';
    container.appendChild(div);
    fixedLayers[name] = div;
  });

  // Single fixed overlay on top of textures, below content
  var overlay = document.createElement('div');
  overlay.className = 'texture-overlay-fixed';
  container.appendChild(overlay);

  var currentTextureIndex = -1;

  function updateFixedBg() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight;
    var viewHeight = window.innerHeight;
    var maxScroll = docHeight - viewHeight;

    if (maxScroll <= 0) {
      // Page fits in viewport, show first texture
      if (currentTextureIndex !== 0) {
        currentTextureIndex = 0;
        textureOrder.forEach(function(name, i) {
          fixedLayers[name].style.opacity = (i === 0) ? '1' : '0';
        });
      }
      return;
    }

    // Calculate which texture we should be showing based on scroll position
    var progress = scrollTop / maxScroll; // 0 to 1
    var count = textureOrder.length;
    var index = Math.floor(progress * count);
    if (index >= count) index = count - 1;

    if (index !== currentTextureIndex) {
      currentTextureIndex = index;
      textureOrder.forEach(function(name, i) {
        fixedLayers[name].style.opacity = (i === index) ? '1' : '0';
      });
    }
  }

  window.addEventListener('scroll', updateFixedBg, { passive: true });
  window.addEventListener('resize', updateFixedBg, { passive: true });
  updateFixedBg();
  setTimeout(updateFixedBg, 100);
  // Recalculate after images load (page height may change)
  window.addEventListener('load', updateFixedBg);

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
