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

//INIT:
initArtistsFilter();

document.querySelectorAll('.artists-dropdown-genres').forEach(dropdown => {
  const btnGenres = dropdown.querySelector('.dropdown-toggle-genres');

  // Handler for remove outside click listener
  const outsideClickHandler = e => {
    if (!dropdown.contains(e.target)) {
      refs.menuGenres.style.display = 'none';
      document.removeEventListener('click', outsideClickHandler);
    }
  };

  // Open-close menu
  btnGenres.addEventListener('click', e => {
    e.stopPropagation();
    const isOpenMenuGenres = refs.menuGenres.style.display === 'block';

    // Menu toggle:
    refs.menuGenres.style.display = isOpenMenuGenres ? 'none' : 'block';

    isOpenMenuGenres
      ? document.removeEventListener('click', outsideClickHandler)
      : document.addEventListener('click', outsideClickHandler);
  });

  // Delegation of events on li
  refs.menuGenres.addEventListener('click', e => {
    const item = e.target.closest('li');
    if (!item) return;

    btnGenres.textContent = item.textContent;
    btnGenres.dataset.value = item.dataset.value;
    refs.menuGenres.style.display = 'none';

    document.removeEventListener('click', outsideClickHandler);
  });
});
