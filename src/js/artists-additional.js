/* Artists additional */
import iziToast from 'izitoast';
import { getGenres } from './artists-api';
import 'izitoast/dist/css/iziToast.min.css';

export const initArtistsFilter = async () => {
  try {
    const genres = await getGenres();
    const menu = document.querySelector('.dropdown-menu');

    const markup =
      '<li data-value="all">All Genres</li>' +
      genres
        .map(
          ({ genre }) => `<li data-value="${genre.toLowerCase()}">${genre}</li>`
        )
        .join('');
    menu.insertAdjacentHTML('beforeend', markup);
  } catch (err) {
    iziToast.error({ message: `Error while loading genres ${err}` });
  }
};

document.querySelectorAll('.dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');

  toggle.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  menu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      toggle.textContent = item.textContent;
      toggle.dataset.value = item.dataset.value;
      menu.style.display = 'none';
    });
  });

  // закриваємо, якщо клік поза дропдауном
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
});
