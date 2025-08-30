/* Artist details modal */

import iziToast from "izitoast";
import { getArtistAlbumsById, getArtistById } from "./artists-api";
import { refs } from "./refs";


function openModal() {
    refs.artistDetailsModal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEcsKeyPress);
    refs.artistDetailsModal.addEventListener('click', onBackdropClick);
    refs.artistDetailsModalCloseBtn.addEventListener('click', closeModal);
}

function closeModal() {
    refs.artistDetailsModal.classList.remove('modal--is-open');
    document.body.style.overflow = '';
    window.removeEventListener('keydown', onEcsKeyPress);
    refs.artistDetailsModal.removeEventListener('click', onBackdropClick);
    refs.artistDetailsModalCloseBtn.removeEventListener('click', closeModal);
}

function onEcsKeyPress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(e) {
  if (e.target === refs.modal) {
    closeModal();
  }
}

function showLoader() {
    document.querySelector('.loader').classList.remove('is-hidden');
}

function hideLoader() {
    document.querySelector('.loader').classList.add('is-hidden');
}

async function showArtistDetails(id) {
  try {
    const artist = await getArtistById(id);
    const albums = await getArtistAlbumsById(id);

    let years;
    if (artist.startYear && artist.endYear) {
      years = `${artist.startYear} - ${artist.endYear}`;
    } else if (artist.startYear && !artist.endYear) {
      years = `${artist.startYear} - present`;
    } else {
      years = 'information missing';
    }


    const markup = `
      <div class="artist-details-modal-content">
        <button class="artist-details-modal-close-btn" type="button">
            <svg class="modal-svg" width="14" height="14">
                <use href="/src/img/icons.svg#icon-close"></use>
            </svg>
        </button> 

        <h2 class="artist-details-modal-main-title">${artist.name}</h2>
        <img class="artist-details-modal-img" src="${artist.image}" alt="${artist.name}" />

        <h3 class="artist-details-modal-title">Years active</h3>
        <p  class="artist-details-modal-text">${years}</p>
        ${artist.gender ? `
            <h3 class="artist-details-modal-title">Sex</h3> 
            <p class="artist-details-modal-text">${artist.gender}</p>
            ` : ''}
        ${artist.members ? `
            <h3 class="artist-details-modal-title">Members</h3>
            <p class="artist-details-modal-text">${artist.members.length}</p>
            ` : ''}
        <h3 class="artist-details-modal-title">Country</h3>
        <p class="artist-details-modal-text">${artist.country}</p>
        <h3 class="artist-details-modal-title">Biography</h3>
        <p class="artist-details-modal-text">${artist.biography}</p>
        <p class="artist-details-modal-genres">${artist.genres.join(' ')}</p>

        <h3 class="artist-details-modal-albums">Albums</h3>
        ${albums.map(album => `
          <div class="artist-details-modal-albums-list">
            <h4 class="artist-details-modal-albums-list-title">${album.title}</h4>
            <table>
              <thead>
                <tr>
                  <th class="artist-details-modal-albums-list-table">Track</th>
                  <th class="artist-details-modal-albums-list-table">Time</th>
                  <th class="artist-details-modal-albums-list-table">Link</th>
                </tr>
              </thead>
              <tbody>
                ${album.tracks.map(track => `
                  <tr>
                    <td class="artist-details-modal-albums-list-table-text">${track.title}</td>
                    <td class="artist-details-modal-albums-list-table-text">${track.duration}</td>
                    <td>
                        ${track.youtubeLink ? `
                            <a href="${track.youtubeLink}" target="_blank">
                                <svg class="modal-youtube" width="20" height="14">
                                    <use href="/src/img/icons.svg#icon-youtube"></use>
                                </svg>
                            </a>
                        ` : ''}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}
      </div>
    `;

    const modalContainer = refs.artistDetailsModal.querySelector('.container');
    
    modalContainer.innerHTML = `
      <button class="artist-details-modal-close-btn" type="button">
        <svg class="modal-svg" width="14" height="14">
          <use href="/src/img/icons.svg#icon-close"></use>
        </svg>
      </button>
      ${markup}
    `;

    openModal();
    showLoader();

  } catch (err) {
    iziToast.error('Error loading artist:', err);
  } finally {
    hideLoader();
  }
}


refs.artistsList.addEventListener('click', e => {
    const btn = e.target.closest('.artist-cta');
    if(!btn) return;
    
    const artistId = btn.dataset.artistId;
    if(artistId) {
    showArtistDetails(artistId);
    }
});



