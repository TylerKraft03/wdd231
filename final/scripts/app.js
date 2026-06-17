const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearSpan = document.getElementById('year');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const modal = document.querySelector('.modal');
if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const openModal = document.querySelector('.modal[open]');
    if (openModal) {
      openModal.close();
    }
  }
});
