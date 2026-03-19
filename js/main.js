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

  /* ─── Tomorrow's special preview ──────────────────────────── */
  const specials = [
    { day: 'sunday',    name: 'Mole Sunday',       desc: 'Slow-cooked mole negro over chicken with rice & homemade tortillas.', original: '$26',   price: '$18', savings: 'Save $8'   },
    { day: 'monday',    name: 'Taco Monday',        desc: 'Any 3 tacos + chips & salsa. Mix & match freely.',                   original: '$18',   price: '$12', savings: 'Save $6'   },
    { day: 'tuesday',   name: 'Taco Tuesday',       desc: 'Street tacos 2 for $5 all day. Beef, chicken, or veggie.',           original: '$5 ea', price: '2/$5', savings: 'Best Deal' },
    { day: 'wednesday', name: 'Enchilada Night',    desc: '3 enchiladas, rice, beans & complimentary agua fresca.',             original: '$22',   price: '$15', savings: 'Save $7'   },
    { day: 'thursday',  name: 'Margarita Thursday', desc: 'House margaritas $6 all evening. Classic, strawberry, or mango.',   original: '$14',   price: '$6',  savings: 'Save $8'   },
    { day: 'friday',    name: 'Fiesta Friday',      desc: 'Family combo for 4 — tacos, enchiladas, rice & beans + dessert.',   original: '$75',   price: '$55', savings: 'Save $20'  },
    { day: 'saturday',  name: 'Weekend Brunch',     desc: 'Chilaquiles, huevos rancheros & bottomless horchata. 10 AM–2 PM.',  original: '$28',   price: '$18', savings: 'Save $10'  }
  ];

  function escText(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const tomorrowPreview = document.getElementById('specials-tomorrow');
  if (tomorrowPreview) {
    const todayIndex   = new Date().getDay(); // 0=Sun … 6=Sat
    const tomorrowData = specials[(todayIndex + 1) % 7];
    const dayLabel     = tomorrowData.day.charAt(0).toUpperCase() + tomorrowData.day.slice(1);
    tomorrowPreview.innerHTML = `
      <p class="specials-tomorrow-label">Tomorrow: ${escText(dayLabel)}</p>
      <p class="specials-tomorrow-name">${escText(tomorrowData.name)}</p>
      <p class="specials-tomorrow-desc">${escText(tomorrowData.desc)}</p>
      <p class="specials-tomorrow-prices"><s>${escText(tomorrowData.original)}</s> → ${escText(tomorrowData.price)}</p>
      <span class="specials-tomorrow-savings">${escText(tomorrowData.savings)}</span>
    `;
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
