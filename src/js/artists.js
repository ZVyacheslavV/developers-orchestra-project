/* Artists */

import { getArtists } from './artists-api.js';

const listEl = document.getElementById('artists-list');
let page = 1;

async function loadArtists() {
  try {
    const data = await getArtists(page);
    renderArtists(data.artists);
  } catch (err) {
    console.error('Failed to fetch artists:', err);
  }
}

function renderArtists(artists) {
  const markup = artists
    .map(a => {
      return `
      <li class="artists-item">
        <div class="artist-card">
          <img src="${a.strArtistThumb}" alt="${
        a.strArtist
      }" class="artist-img" loading="lazy">
          <ul class="artist-tags">
            ${a.genres.map(g => `<li class="tag">${g}</li>`).join('')}
          </ul>
          <h3 class="artist-name">${a.strArtist}</h3>
          <p class="artist-desc">${a.strBiographyEN.slice(0, 120)}...</p>
          <button class="artist-cta" type="button">Learn More</button>
        </div>
      </li>`;
    })
    .join('');

  listEl.insertAdjacentHTML('beforeend', markup);
}

loadArtists();
