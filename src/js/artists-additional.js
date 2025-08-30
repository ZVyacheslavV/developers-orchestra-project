/* Artists additional */
import { getGenres } from './artists-api';
import { toastError } from './helpers';
import { refs } from './refs.js';
import { gsap } from 'gsap';

export const initArtistsFilter = async () => {
  try {
    const genres = await getGenres();
    const markup =
      '<li data-value="all">All Genres</li>' +
      genres
        .map(
          ({ genre }) => `<li data-value="${genre.toLowerCase()}">${genre}</li>`
        )
        .join('');
    refs.menuGenres.insertAdjacentHTML('beforeend', markup);
  } catch (err) {
    toastError(`While loading genres ${err}`);
  }
};

//Init
initArtistsFilter();

document.querySelectorAll('.artists-dropdown-genres').forEach(dropdown => {
  const btnGenres = dropdown.querySelector('.dropdown-toggle-genres');
  // const menu = dropdown.querySelector('.dropdown-menu-genres');
  const iconGenres = btnGenres.querySelector('.dropdown-icon');

  const tlOpen = gsap.timeline({ paused: true });
  tlOpen
    .to(iconGenres, { rotate: 180, duration: 0.35, ease: 'power2.out' }, 0)
    .fromTo(
      refs.menuGenres,
      { opacity: 0, y: -10, pointerEvents: 'none' },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        pointerEvents: 'auto',
        ease: 'power3.out',
      },
      0
    )
    .from(
      refs.menuGenres.children,
      {
        opacity: 0,
        y: -6,
        stagger: 0.05,
        duration: 0.25,
        ease: 'power2.out',
      },
      0.1
    );

  const tlClose = gsap.timeline({ paused: true });
  tlClose.to(iconGenres, { rotate: 0, duration: 0.3, ease: 'power2.in' }, 0).to(
    refs.menuGenres,
    {
      opacity: 0,
      y: -10,
      duration: 0.3,
      pointerEvents: 'none',
      ease: 'power2.in',
    },
    0
  );

  const outsideClickHandler = e => {
    if (!dropdown.contains(e.target)) {
      tlClose.play(0);
      document.removeEventListener('click', outsideClickHandler);
    }
  };

  btnGenres.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen =
      gsap.isTweening(refs.menuGenres) ||
      refs.menuGenres.style.pointerEvents === 'auto';

    if (!isOpen) {
      tlClose.pause(0);
      tlOpen.restart();
      document.addEventListener('click', outsideClickHandler);
    } else {
      tlOpen.pause(0);
      tlClose.restart();
      document.removeEventListener('click', outsideClickHandler);
    }
  });

  refs.menuGenres.addEventListener('click', e => {
    const item = e.target.closest('li');
    if (!item) return;

    btnGenres.querySelector('.dropdown-label').textContent = item.textContent;
    btnGenres.dataset.value = item.dataset.value;

    tlOpen.pause(0);
    tlClose.restart();
    document.removeEventListener('click', outsideClickHandler);
  });
});
