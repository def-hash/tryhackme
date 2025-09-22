(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const menuToggle = $('.navbar__toggle');
  const menu = $('.navbar__menu');
  const heroButtons = $$('.hero__actions a');
  const outlineButtons = $$('.card .btn--outline');
  const modal = $('.modal');
  const modalTitle = $('.modal__title');
  const modalBody = $('.modal__body');
  const modalClose = $('.modal__close');
  const body = document.body;

  // Menü-Toggle
  function toggleMenu() {
    if (!menu || !menuToggle) return;
    const isOpen = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.classList.toggle('is-active', isOpen);
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }
  document.addEventListener('click', (e) => {
    if (!menu || !menuToggle) return;
    if (menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      toggleMenu();
    }
  });

  // Smooth Scroll
  heroButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const target = $(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Modal
  function openModal(title, bodyText) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    if (modalTitle) modalTitle.textContent = title || '';
    if (modalBody) modalBody.textContent = bodyText || '';
    body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  }

  const heroDetails = {
    Orisa:
      'Orisa nutzt eine Fusionstreibergatling und eine Speerspin-Fähigkeit, um Verbündete zu schützen und die Front zu halten.',
    Sojourn:
      'Sojourn setzt auf Mobilität und Präzisionsschüsse. Ihre Disruptor-Schusszone kontrolliert Räume, während der Railgun-Laser Finishers ermöglicht.',
    Kiriko:
      'Kiriko kombiniert Heilung mit Mobilität. Ihre Schutzglocke negiert tödliche Effekte, während Kunai hohe kritische Treffer verursachen.',
  };

  outlineButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const hero = btn.dataset.hero || '';
      openModal(hero, heroDetails[hero] || '');
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // Reveal-on-scroll
  const revealTargets = $$('.section, .card, .timeline__item, .event-card, .community__card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach((el) => {
      el.classList.add('is-reveal');
      io.observe(el);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  console.log('JS OK', new Date().toISOString());
})();
