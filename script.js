const menuToggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navbar__menu');
const heroButtons = document.querySelectorAll('.hero__actions a');
const outlineButtons = document.querySelectorAll('.card .btn--outline');
const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal__title');
const modalBody = document.querySelector('.modal__body');
const modalClose = document.querySelector('.modal__close');

const heroDetails = {
  Orisa:
    'Orisa nutzt eine Fusionstreibergatling und eine Speerspin-Fähigkeit, um Verbündete zu schützen und die Front zu halten.',
  Sojourn:
    'Sojourn setzt auf Mobilität und Präzisionsschüsse. Ihre Disruptor-Schusszone kontrolliert Räume, während der Railgun-Laser Finishers ermöglicht.',
  Kiriko:
    'Kiriko kombiniert Heilung mit Mobilität. Ihre Schutzglocke negiert tödliche Effekte, während Kunai hohe kritische Treffer verursachen.',
};

const body = document.body;

function toggleMenu() {
  const isOpen = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) {
    menuToggle.classList.add('is-active');
  } else {
    menuToggle.classList.remove('is-active');
  }
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

document.addEventListener('click', (event) => {
  if (
    menu.classList.contains('is-open') &&
    !menu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    toggleMenu();
  }
});

heroButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const targetId = btn.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

outlineButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const hero = btn.dataset.hero;
    modalTitle.textContent = hero;
    modalBody.textContent = heroDetails[hero] || '';
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll('.section, .card, .timeline__item, .event-card, .community__card').forEach((element) => {
  element.classList.add('is-reveal');
  observer.observe(element);
});