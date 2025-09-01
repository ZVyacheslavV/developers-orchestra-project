/* Artists */

import { getArtists } from './artists-api.js';
import { refs } from './refs.js';
import { page } from './storage.js';
import { toastError } from './helpers.js';
import { ARTISTS_PER_PAGE } from './constants.js';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../css/artists.css';

const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
const visiblePages = isMobile ? 3 : 5;

let pager = null;
let inFlight = false;

export async function loadArtists({ init = false } = {}) {
  try {
    const payload = await getArtists(page.currentPage);
    const artists = payload.artists ?? [];
    const totalArtists = Number(payload.totalArtists) || 0;

    if (init) {
      refs.artistsList.innerHTML = '';
      renderArtists(artists);

      if (!pager) {
        pager = new Pagination('#tui-pagination', {
          totalItems: totalArtists,
          itemsPerPage: ARTISTS_PER_PAGE,
          page: page.currentPage || 1,
          visiblePages,
          centerAlign: true,
          usageStatistics: false,
          template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage:
              '<strong class="tui-page-btn is-active" aria-current="page">{{page}}</strong>',
            moveButton:
              '<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',
            disabledMoveButton:
              '<span class="tui-page-btn is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',
            moreButton: '<span class="tui-page-btn tui-ellipsis">…</span>',
          },
        });

        pager.on('afterMove', async ({ page: next }) => {
          if (inFlight) return;
          inFlight = true;
          try {
            page.currentPage = next;
            refs.artistsList.innerHTML = '';
            const nextPayload = await getArtists(next);
            renderArtists(nextPayload.artists ?? []);

            requestAnimationFrame(scrollToArtistsTop);
          } catch (e) {
            console.error('[artists] fetch/render error:', e);
            toastError('Failed to fetch artists');
          } finally {
            inFlight = false;
          }
        });
      } else {
        pager.reset(totalArtists);
        pager.movePageTo(page.currentPage || 1);
      }
      return;
    }

    refs.artistsList.innerHTML = '';
    renderArtists(artists);
  } catch (e) {
    console.error('[artists] init error:', e);
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

        const tagsHtml =
          Array.isArray(genres) && genres.length
            ? `<ul class="artist-tags">${genres
                .map(g => `<li class="tag">${g}</li>`)
                .join('')}</ul>`
            : `<ul class="artist-tags" aria-hidden="true"></ul>`;

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
              ${tagsHtml}
              <h3 class="artist-name">${strArtist}</h3>
              ${
                strBiographyEN
                  ? `<p class="artist-desc text-clamp-3">${strBiographyEN}</p>`
                  : ''
              }
              <button class="artist-cta" type="button" data-artist-id="${_id}" aria-label="Learn more about ${strArtist}">
                Learn More
                <svg class="artist-cta-icon" width="16" height="16" aria-hidden="true">
                  <use href="/img/icons.svg#icon-arrow-1"></use>
                </svg>
              </button>
            </div>
          </li>`;
      }
    )
    .join('');

  if (refs.artistsList) {
    refs.artistsList.insertAdjacentHTML('beforeend', markup);
  } else {
    console.warn(
      'refs.artistsList is null. Перевір HTML і момент ініціалізації скрипта.'
    );
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    page.currentPage = 1;
    loadArtists({ init: true });
  });
} else {
  page.currentPage = 1;
  loadArtists({ init: true });
}

// ===== Smooth scroll to the section titles =====
function scrollToArtistsTop() {
  if (!window.matchMedia('(min-width: 1440px)').matches) return;

  const anchor = document.querySelector('.js-artists-top');
  if (!anchor) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  anchor.scrollIntoView({
    behavior: reduced ? 'auto' : 'smooth',
    block: 'start',
  });
}
