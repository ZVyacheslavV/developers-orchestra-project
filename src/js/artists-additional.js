/* Artists additional */
import { getGenres } from './artists-api';
import { toastError } from './helpers';
import { refs } from './refs.js';

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

// INIT
initArtistsFilter();

document.querySelectorAll('.artists-dropdown-genres').forEach(dropdown => {
  const btnGenres = dropdown.querySelector('.dropdown-toggle-genres');
  const menu = dropdown.querySelector('.dropdown-menu-genres');

  const outsideClickHandler = e => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      document.removeEventListener('click', outsideClickHandler);
    }
  };

  // Toggle
  btnGenres.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    dropdown.classList.toggle('open');

    if (!isOpen) {
      document.addEventListener('click', outsideClickHandler);
    } else {
      document.removeEventListener('click', outsideClickHandler);
    }
  });

  // Element choosing
  menu.addEventListener('click', e => {
    const item = e.target.closest('li');
    if (!item) return;
    btnGenres.querySelector('.dropdown-label').textContent = item.textContent;
    btnGenres.dataset.value = item.dataset.value;

    dropdown.classList.remove('open');
    document.removeEventListener('click', outsideClickHandler);
  });
});
