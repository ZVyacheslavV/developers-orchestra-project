import { refs } from './refs.js';

document.addEventListener('DOMContentLoaded', () => {
  const { toggleBtn, mobileMenu, menuLinks } = refs;

  function openMenu() {
    mobileMenu.classList.add('active');
    toggleBtn.classList.add('active');
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    toggleBtn.classList.remove('active');
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
