document.addEventListener('DOMContentLoaded', () => {
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toISOString();
  }

  const backdrop = document.getElementById('modal-backdrop');
  const modals = document.querySelectorAll('.modal');
  const openLinks = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('.modal-close');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    backdrop.classList.add('open');
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) closeButton.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
  }

  function closeAllModals() {
    modals.forEach(closeModal);
    backdrop.classList.remove('open');
  }

  openLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const modalId = event.currentTarget.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      openModal(modal);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
      backdrop.classList.remove('open');
    });
  });

  backdrop.addEventListener('click', closeAllModals);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  });
});
