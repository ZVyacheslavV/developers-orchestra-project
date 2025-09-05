/* Artist details modal */

import {
  clearGenreTitle,
  handleSearchGenresFromCard,
  scrollToArtistsCeil,
} from './artists-additional';
import { getArtistAlbumsById, getArtistById } from './artists-api';
import { toastError } from './helpers';
import { refs } from './refs';

function openModal() {
  refs.artistDetailsModalBackdrope.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onEcsKeyPress);
  refs.artistDetailsModalBackdrope.addEventListener('click', onBackdropClick);
}

function closeModal() {
  refs.artistDetailsModalBackdrope.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onEcsKeyPress);
  removeGenreListeners();
  refs.artistDetailsModalBackdrope.removeEventListener(
    'click',
    onBackdropClick
  );
  refs.artistDetailsModal.innerHTML = '<span class="loader is-hidden"></span>';
  refs.artistDetailsModal.innerHTML = '';
}

function onEcsKeyPress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(e) {
  if (e.target === refs.artistDetailsModalBackdrope) {
    closeModal();
  }
}

function showLoader() {
  refs.artistDetailsModal.innerHTML = '<span class="loader"></span>';
}

function hideLoader() {
  const loader = refs.artistDetailsModal.querySelector('.loader');
  if (loader) loader.remove();
}

async function showArtistDetails(artistId) {
  try {
    openModal();
    showLoader();

    const artist = await getArtistById(artistId);
    const albumsData = await getArtistAlbumsById(artistId);
    const albums = albumsData?.albumsList || [];

    const {
      intFormedYear,
      intDiedYear,
      strArtist,
      strArtistThumb,
      strGender,
      intMembers,
      strCountry,
      strBiographyEN,
      genres,
    } = artist;

    let years;
    if (intFormedYear && intDiedYear) {
      years = `${intFormedYear} - ${artist.intDiedYear}`;
    } else if (intFormedYear && !intDiedYear) {
      years = `${intFormedYear} - present`;
    } else {
      years = 'information missing';
    }

    const formatDuration = ms => {
      if (!ms || isNaN(ms)) return '';
      const totalSec = Math.floor(ms / 1000);
      const min = Math.floor(totalSec / 60);
      const sec = String(totalSec % 60).padStart(2, '0');
      return `${min}:${sec}`;
    };

    const imageUrl = artist.strArtistThumb
      ? artist.strArtistThumb
      : 'https://placehold.co/736x414?text=No+Image';

    const sprite = new URL('../img/icons.svg', import.meta.url).href;

    const markup = `
        <div class="artist-details-modal-content">
            <button class="artist-details-modal-close-btn" type="button" aria-label="Close the detailed information window">
                <svg class="modal-svg" width="32" height="32">
                    <use href="${sprite}#icon-close"></use>
                </svg>
            </button> 

            <h2 class="artist-details-modal-main-title">${strArtist}</h2>
            <div class="artist-details-modal-main-block">
                <img class="artist-details-modal-img" src="${imageUrl}" alt="${
      artist.name
    }" />

                <div class="artist-details-modal-info">
                <ul class="artist-details-modal-list">
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Years active</h3>
                    <p  class="artist-details-modal-text">${years}</p>
                </li>
                ${
                  strGender
                    ? `
                    <li class="artist-details-modal-list-item">
                        <h3 class="artist-details-modal-title">Sex</h3>
                        <p class="artist-details-modal-text">${strGender}</p>
                    </li>
                    `
                    : ''
                }
                ${
                  intMembers
                    ? `
                    <li class="artist-details-modal-list-item">
                        <h3 class="artist-details-modal-title">Members</h3>
                        <p class="artist-details-modal-text">${intMembers}</p>
                    </li>
                    `
                    : ''
                }
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Country</h3>
                    <p class="artist-details-modal-text">${strCountry}</p>
                </li>
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Biography</h3>
                    <p class="artist-details-modal-text">${strBiographyEN}</p>
                </li>
                </ul>
                
                ${
                  Array.isArray(genres) && genres.length
                    ? `<ul class="artist-details-modal-block-genres">${genres
                        .map(
                          g =>
                            `<li class="artist-details-modal-block-genres-item">${g}</li>`
                        )
                        .join('')}</ul>`
                    : ''
                }
            </div>
            </div>
            <h3 class="artist-details-modal-albums">Albums</h3>
            <div class="artist-details-modal-albums-wrap">
            ${
              albums.length > 0
                ? albums
                    .map(
                      album => `
                <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${
                  album.strAlbum
                }</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${
                      album.tracks
                        ?.map(
                          track => `
                    <tr>
                        <td class="artist-details-modal-albums-list-table-text col-1">${
                          track.strTrack
                        }</td>
                        <td class="artist-details-modal-albums-list-table-text col-2">${formatDuration(
                          track.intDuration
                        )}</td>
                        <td class= "col-3">
                            ${
                              track.movie && track.movie !== 'null'
                                ? `
                                <a class="modal-link-youtube" href="${track.movie}" target="_blank" aria-label="Watch a video on YouTube">
                                    <svg class="modal-youtube" width="24" height="20">
                                        <use href="${sprite}#icon-youtube"></use>
                                    </svg>
                                </a>
                            `
                                : ''
                            }
                        </td>
                    </tr>
                    `
                        )
                        .join('') || ''
                    }
                </tbody>
                </table>
            </div>
            `
                    )
                    .join('')
                : '<p>No albums found</p>'
            }
            </div>
        </div>
        `;

    refs.artistDetailsModal.innerHTML = `${markup}`;

    const closeBtn = refs.artistDetailsModalBackdrope.querySelector(
      '.artist-details-modal-close-btn'
    );
    closeBtn.addEventListener('click', closeModal);
    initGenreListeners();
  } catch (err) {
    toastError(err.message);
  } finally {
    hideLoader();
  }
}

refs.artistsList.addEventListener('click', e => {
  const card = e.target.closest('.artist-card');
  if (!card) return;

  if (e.target.nodeName === 'LI') {
    const btnGenres = e.target.closest('.tag');
    handleSearchGenresFromCard(clearGenreTitle(btnGenres.textContent));
    scrollToArtistsCeil();
    return;
  }

  const btnLearnMore = card.querySelector('.artist-cta');
  const artistId = btnLearnMore.dataset.artistId;
  if (artistId) {
    showArtistDetails(artistId);
  }
});

function initGenreListeners() {
  const btnsGenres = document.querySelectorAll(
    '.artist-details-modal-block-genres-item'
  );
  btnsGenres.forEach(btn => {
    btn.addEventListener('click', handleGenresClick);
  });
}

function removeGenreListeners() {
  const btnsGenres = document.querySelectorAll(
    '.artist-details-modal-block-genres-item'
  );
  btnsGenres.forEach(btn => {
    btn.removeEventListener('click', handleGenresClick);
  });
}

function handleGenresClick(e) {
  if (e.target.nodeName !== 'LI') return;

  handleSearchGenresFromCard(clearGenreTitle(e.target.textContent));
  console.log('Click genres');
  closeModal();

  scrollToArtistsCeil();
}
