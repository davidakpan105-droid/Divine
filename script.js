/* =================================================================
   DIVINE VA — PORTFOLIO SCRIPT
   ================================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- YEAR ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- NAVBAR SCROLL STATE ---------- */
  var navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);

  /* ---------- MOBILE MENU ---------- */
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('navMenu');
  var navBackdrop = document.getElementById('navBackdrop');
  var body = document.body;

  function openMenu() {
    navMenu.classList.add('active');
    hamburger.classList.add('active');
    navBackdrop.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
  }
  function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    navBackdrop.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }
  hamburger.addEventListener('click', function () {
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
  });
  navBackdrop.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  function setActiveLink() {
    var current = '';
    sections.forEach(function (sec) {
      var rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) current = sec.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', setActiveLink);

  /* ---------- SCROLL REVEAL (lightweight AOS) ---------- */
  var aosEls = document.querySelectorAll('[data-aos]');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(function () { entry.target.classList.add('aos-animate'); }, parseInt(delay, 10));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  aosEls.forEach(function (el) { observer.observe(el); });

  /* ---------- COUNT-UP STATS ---------- */
  var statNumbers = document.querySelectorAll('.stat-number');
  var statsAnimated = false;
  function animateStats() {
    statNumbers.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var current = 0;
      var increment = Math.max(1, Math.ceil(target / 60));
      var timer = setInterval(function () {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 25);
    });
  }
  var heroStats = document.getElementById('heroStats');
  if (heroStats) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(heroStats);
  }

  /* ---------- SHOW MORE: SKILLS / SERVICES / PROJECTS ---------- */
  function setupShowMore(buttonId, gridSelector, expandedLabel, collapsedLabel) {
    var btn = document.getElementById(buttonId);
    var grid = document.querySelector(gridSelector);
    if (!btn || !grid) return;
    btn.addEventListener('click', function () {
      var isExpanded = grid.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', String(isExpanded));
      btn.innerHTML = isExpanded
        ? expandedLabel + ' <i class="fa-solid fa-chevron-up"></i>'
        : collapsedLabel + ' <i class="fa-solid fa-chevron-down"></i>';
      if (isExpanded) {
        grid.querySelectorAll('[data-aos]').forEach(function (el) { el.classList.add('aos-animate'); });
      }
    });
  }
  setupShowMore('showMoreSkills', '#skillsGrid', 'Show Less Skills', 'Show More Skills');
  setupShowMore('showMoreServices', '#servicesGrid', 'Show Less Services', 'Show More Services');
  setupShowMore('viewMoreProjects', '#casesGrid', 'View Fewer Projects', 'View More Projects');

  /* ---------- CASE STUDY DATA & MODAL ---------- */
  var caseData = {
    1: {
      tag: 'Data Analysis',
      title: 'California Parks Distribution Analysis',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      challenge: 'Stakeholders had raw data on California cities showing parks, area, and population, with no clear way to compare access across the state.',
      role: 'Analyzed the data, calculated park density metrics, and created visual insights and comparisons across cities.',
      results: 'Identified Los Angeles as the city with the highest total parks, San Francisco as the highest density, and Fresno/Bakersfield as underserved areas.',
      tools: ['Excel', 'Google Sheets'],
      doc: 'https://docs.google.com/spreadsheets/d/1Mp98SdgZIOY9a5bYYgf00AIp6GYFaQ_PdZZ-QXDdE7I/edit?usp=sharing',
      docLabel: 'Review Spreadsheet'
    },
    2: {
      tag: 'Email Systems',
      title: 'Email Organization System',
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1200&auto=format&fit=crop',
      challenge: 'An inbox contained 99+ unread emails with mixed priorities, making it difficult to respond on time.',
      role: 'Created Gmail labels, filters, priority workflows, and a security review process to bring order to the inbox.',
      results: 'Transformed a cluttered inbox into a structured system that saves time every day.',
      tools: ['Gmail', 'Google Workspace']
    },
    3: {
      tag: 'Coordination',
      title: 'Team Meeting Coordination',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
      challenge: 'Virtual meetings lacked structure and efficiency, leading to wasted time.',
      role: 'Created meeting agendas, scheduled attendees, assigned time blocks, and distributed meeting materials in advance.',
      results: 'Meetings became focused, shorter, and noticeably more productive.',
      tools: ['Zoom', 'Google Docs', 'Google Calendar'],
      doc: 'https://docs.google.com/document/d/15GVYerKwGASKVqyE8VKHwmuq39phLFDjSkHbe28iyIc/edit?usp=drive_link',
      docLabel: 'Review Agenda Document'
    },
    4: {
      tag: 'Productivity',
      title: 'Weekly Time Blocking & Productivity Planning',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop',
      challenge: 'Balancing coursework, client work, training, and personal activities was becoming overwhelming.',
      role: 'Built a complete productivity scheduling framework using calendar time blocking.',
      results: 'Improved productivity, reduced overwhelm, and increased task completion.',
      tools: ['Google Calendar']
    }
  };

  var modalOverlay = document.getElementById('caseModalOverlay');
  var modalClose = document.getElementById('modalClose');

  function openCaseModal(id) {
    var data = caseData[id];
    if (!data) return;
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalImage').alt = data.title;
    document.getElementById('modalTag').textContent = data.tag;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalChallenge').textContent = data.challenge;
    document.getElementById('modalRole').textContent = data.role;
    document.getElementById('modalResults').textContent = data.results;

    var toolsWrap = document.getElementById('modalTools');
    toolsWrap.innerHTML = '';
    data.tools.forEach(function (tool) {
      var span = document.createElement('span');
      span.textContent = tool;
      toolsWrap.appendChild(span);
    });

    var docLink = document.getElementById('modalDocLink');
    if (data.doc) {
      docLink.href = data.doc;
      docLink.style.display = 'inline-flex';
      docLink.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> ' + (data.docLabel || 'Review Document');
    } else {
      docLink.style.display = 'none';
    }

    modalOverlay.classList.add('active');
    body.classList.add('menu-open');
  }
  function closeCaseModal() {
    modalOverlay.classList.remove('active');
    body.classList.remove('menu-open');
  }

  document.querySelectorAll('[data-case-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openCaseModal(this.getAttribute('data-case-open'));
    });
  });
  modalClose.addEventListener('click', closeCaseModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeCaseModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCaseModal();
  });

  /* ---------- TESTIMONIAL AUTO-SLIDING CAROUSEL ---------- */
  var track = document.getElementById('testimonialTrack');
  var carousel = document.getElementById('testimonialCarousel');
  if (track && carousel) {
    var originalCards = Array.from(track.children);
    originalCards.forEach(function (card) {
      track.appendChild(card.cloneNode(true));
    });

    var speed = 0.6;
    var position = 0;
    var paused = false;
    var trackWidth = 0;

    function calcWidth() { trackWidth = track.scrollWidth / 2; }
    calcWidth();
    window.addEventListener('resize', calcWidth);

    function step() {
      if (!paused) {
        position -= speed;
        if (Math.abs(position) >= trackWidth) position = 0;
        track.style.transform = 'translateX(' + position + 'px)';
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    carousel.addEventListener('mouseenter', function () { paused = true; });
    carousel.addEventListener('mouseleave', function () { paused = false; });

    /* Swipe support */
    var startX = 0;
    carousel.addEventListener('touchstart', function (e) {
      paused = true;
      startX = e.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchmove', function (e) {
      var deltaX = e.touches[0].clientX - startX;
      track.style.transform = 'translateX(' + (position + deltaX) + 'px)';
    }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      var deltaX = e.changedTouches[0].clientX - startX;
      position += deltaX;
      if (position > 0) position = 0;
      if (Math.abs(position) >= trackWidth) position = 0;
      paused = false;
    });
  }

  /* ---------- CONTACT FORM VALIDATION ---------- */
  var contactForm = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var formSuccess = document.getElementById('formSuccess');

  function showError(fieldId, message) {
    var group = document.getElementById(fieldId).closest('.form-group');
    var errorEl = document.getElementById(fieldId + 'Error');
    group.classList.toggle('invalid', !!message);
    errorEl.textContent = message || '';
  }

  function validateForm() {
    var valid = true;
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) { showError('name', 'Please enter your name.'); valid = false; }
    else showError('name', '');

    if (!email) { showError('email', 'Please enter your email.'); valid = false; }
    else if (!emailRegex.test(email)) { showError('email', 'Please enter a valid email.'); valid = false; }
    else showError('email', '');

    if (!subject) { showError('subject', 'Please enter a subject.'); valid = false; }
    else showError('subject', '');

    if (!message) { showError('message', 'Please enter a message.'); valid = false; }
    else showError('message', '');

    return valid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm()) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      formSuccess.classList.remove('active');

      setTimeout(function () {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        formSuccess.classList.add('active');
        contactForm.reset();
        setTimeout(function () { formSuccess.classList.remove('active'); }, 6000);
      }, 1400);
    });

    ['name', 'email', 'subject', 'message'].forEach(function (id) {
      document.getElementById(id).addEventListener('blur', validateForm);
    });
  }

  /* ---------- BACK TO TOP ---------- */
  var backToTop = document.getElementById('backToTop');
  function toggleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});