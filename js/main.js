/**
 * El Mayor Mexican Restaurant — Main JavaScript
 * Mobile-first, smooth, accessible
 */

(function () {
  'use strict';

  /* ─── Navbar scroll behaviour ─────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ─── Mobile nav toggle ────────────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── Scroll-reveal ────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ─── Back to top ──────────────────────────────────────────── */
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Menu tabs ────────────────────────────────────────────── */
  const tabs  = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card[data-category]');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const cat = tab.getAttribute('data-cat');

      // Update active tab
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      // Filter cards
      cards.forEach(function (card) {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = '';
          card.classList.add('reveal');
          // Trigger re-animation
          card.classList.remove('visible');
          requestAnimationFrame(function () {
            card.classList.add('visible');
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ─── Current day highlight in hours ──────────────────────── */
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today    = dayNames[new Date().getDay()];
  const hoursRow = document.querySelector('.hours-row[data-day="' + today + '"]');

  if (hoursRow) {
    hoursRow.classList.add('hours-today');
  }

  /* ─── Current day highlight in specials ───────────────────── */
  const todayCard = document.querySelector(`.special-card[data-day="${today}"]`);
  if (todayCard) {
    todayCard.classList.add('today');
  }

  /* ─── Contact form submit ──────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn  = contactForm.querySelector('.form-submit');
      const orig = btn.textContent;
      btn.textContent = 'Message Sent! ✓';
      btn.disabled = true;
      btn.style.background = '#007329';
      setTimeout(function () {
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  /* ─── Smooth anchor links ──────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 8 : 0;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
