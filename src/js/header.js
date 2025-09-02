import { refs } from './refs.js';

document.addEventListener('DOMContentLoaded', () => {
  const { toggleBtn, mobileMenu, menuLinks } = refs;

  function lockBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  function unlockBodyScroll() {
    document.body.style.overflow = '';
  }

  function openMenu() {
    mobileMenu.classList.add('active');
    toggleBtn.classList.add('active');
    lockBodyScroll();
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    toggleBtn.classList.remove('active');
    unlockBodyScroll();
  }

  toggleBtn?.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuLinks?.forEach(link => link.addEventListener('click', closeMenu));
});
