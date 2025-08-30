/* Artists */

import { getArtists } from './artists-api.js';
import { refs } from './refs.js';
import { page } from './storage.js';
import { toastError } from './helpers.js';

export async function loadArtists() {
  try {
    const { artists } = await getArtists(page.currentPage);
    renderArtists(artists);
  } catch {
    toastError('Failed to fetch artists');
  }
}

export function renderArtists(artists = []) {
  const markup = artists
    .map(
      ({
        _id,
        strArtist = 'Unknown',
        strArtistThumb,
        strBiographyEN = '',
        genres = [],
      }) => {
        const img =
          strArtistThumb || 'https://placehold.co/736x414?text=No+Image';

        return `
            <li class="artists-item">
              <div class="artist-card" data-id="${_id}">
                <img
                  src="${img}"
                  alt="${strArtist} — portrait"
                  class="artist-img"
                  loading="lazy"
                  decoding="async"
                  width="736" height="414"
                >
                ${
                  Array.isArray(genres) && genres.length
                    ? `<ul class="artist-tags">${genres
                        .map(g => `<li class="tag">${g}</li>`)
                        .join('')}</ul>`
                    : ''
                }

                <h3 class="artist-name">${strArtist}</h3>
                ${
                  strBiographyEN
                    ? `<p class="artist-desc text-clamp-3">${strBiographyEN}</p>`
                    : ''
                }

                <button class="artist-cta" type="button" data-artist-id="${_id}" aria-label="Learn more about ${strArtist}">
                  Learn More
                </button>
              </div>
            </li>`;
      }
    )
    .join('');

  refs.artistsList.insertAdjacentHTML('beforeend', markup);
}

loadArtists();
