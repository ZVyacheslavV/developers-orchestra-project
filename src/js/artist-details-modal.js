/* Artist details modal */

import { getArtistAlbumsById, getArtistById } from "./artists-api";
import { toastError } from "./helpers";
import { refs } from "./refs";


function openModal() {
    refs.artistDetailsModal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEcsKeyPress);
    refs.artistDetailsModal.addEventListener('click', onBackdropClick);
}

function closeModal() {
    refs.artistDetailsModal.classList.remove('modal--is-open');
    document.body.style.overflow = '';
    window.removeEventListener('keydown', onEcsKeyPress);
    refs.artistDetailsModal.removeEventListener('click', onBackdropClick);
}

function onEcsKeyPress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(e) {
  if (e.target === refs.artistDetailsModal) {
    closeModal();
  }
}

function showLoader() {
    refs.loader?.classList.remove('is-hidden');
}

function hideLoader() {
    refs.loader?.classList.add('is-hidden');
}

async function showArtistDetails(artistId) {
    
    try {
        showLoader();
        
        const artist = await getArtistById(artistId);
        let albums = await getArtistAlbumsById(artistId);
        
        if(!Array.isArray(albums)) {
            albums = albums?.albums || [];
        }

        const { 
            startYear, 
            endYear, 
            name, 
            image, 
            gender, 
            members, 
            country, 
            biography, 
            genres, 
        } = artist;
   
        let years;
        if (startYear && endYear) {
        years = `${startYear} - ${artist.endYear}`;
        } else if (startYear && !endYear) {
        years = `${startYear} - present`;
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

            <h2 class="artist-details-modal-main-title">${name}</h2>
            <div class="artist-details-modal-main-block">
            <img class="artist-details-modal-img" src="${image}" alt="${artist.name}" />

            <ul class="artist-details-modal-list">
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Years active</h3>
                <p  class="artist-details-modal-text">${years}</p>
            </li>
            ${gender ? `
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Sex</h3>
                    <p class="artist-details-modal-text">${gender}</p>
                </li>
                ` : ''}
            ${members ? `
                <li class="artist-details-modal-list-item">
                    <h3 class="artist-details-modal-title">Members</h3>
                    <p class="artist-details-modal-text">${members.length}</p>
                </li>
                ` : ''}
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Country</h3>
                <p class="artist-details-modal-text">${country}</p>
            </li>
            <li class="artist-details-modal-list-item">
                <h3 class="artist-details-modal-title">Biography</h3>
                <p class="artist-details-modal-text">${biography}</p>
            </li>
            </ul>
           
            <ul class="artist-details-modal-block-genres">
            <li class="artist-details-modal-block-genres-item">
                <p class="artist-details-modal-genres">${genres}</p>
            </li>
            </ul>
            </div>

            <h3 class="artist-details-modal-albums">Albums</h3>
            ${albums.length > 0 ? albums.map(album => `
            <div class="artist-details-modal-albums-list">
                <h4 class="artist-details-modal-albums-list-title">${album.title}</h4>
                <table>
                <thead class="artist-details-modal-albums-list-table-head">
                    <tr>
                    <th class="artist-details-modal-albums-list-table col-1">Track</th>
                    <th class="artist-details-modal-albums-list-table col-2">Time</th>
                    <th class="artist-details-modal-albums-list-table col-3">Link</th>
                    </tr>
                </thead>
                <tbody class="artist-details-modal-albums-list-table-body">
                    ${album.tracks?.map(track => `
                    <tr>
                        <td class="artist-details-modal-albums-list-table-text col-1">${track.title}</td>
                        <td class="artist-details-modal-albums-list-table-text col-2">${track.duration}</td>
                        <td class= "col-3">
                            ${track.youtubeLink ? `
                                <a class="modal-link-youtube" href="${track.youtubeLink}" target="_blank">
                                    <svg class="modal-youtube" width="20" height="14">
                                        <use href="/src/img/icons.svg#icon-youtube"></use>
                                    </svg>
                                </a>
                            ` : ''}
                        </td>
                    </tr>
                    `).join('') || ''}
                </tbody>
                </table>
            </div>
            `).join('') : '<p>No albums found</p>'}
        </div>
        `;

        refs.artistDetailsModal.innerHTML = `
        <button class="artist-details-modal-close-btn" type="button">
            <svg class="modal-svg" width="14" height="14">
            <use href="/src/img/icons.svg#icon-close"></use>
            </svg>
        </button>
        ${markup}
        `;

        const closeBtn = refs.artistDetailsModal.querySelector('.artist-details-modal-close-btn');
        closeBtn.addEventListener('click', closeModal);
  
        openModal();

    } catch (err) {
        // toastError(err.message);
        console.log(err);
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



