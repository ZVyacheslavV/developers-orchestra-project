/* Artists */

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../css/artists.css';

import { getArtists, searchArtist } from './artists-api.js';
import { query } from './artists-additional.js';
import { refs } from './refs.js';
import { toastError, showLoaderArtists, hideLoaderArtists } from './helpers.js';
import { ARTISTS_PER_PAGE } from './constants.js';

const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
const visiblePages = isMobile ? 3 : 5;

let pager = null;
let inFlight = false;
let suppressScroll = false;

// -------------- Placeholder ------------//

function getNoArtistsMarkup() {
  const sprite = new URL('../img/icons.svg', import.meta.url).href;
  return `
    <div class="no-artists is-hidden" data-no-artists>
      <svg class="no-artists-icon" width="40" height="40" aria-hidden="true">
        <use href="${sprite}#icon-error"></use>
      </svg>
      <h2 class="no-artists-title">Silence on the stage…</h2>
      <p class="no-artists-text">
        Looks like no artists match your filters.<br />
        Try changing them or hit “Reset Filters” to bring back the beat.
      </p>
      <button class="btn-reset-filters" type="button">Reset filters</button>
    </div>
  `;
}

function ensureNoArtistsBlock() {
  let el = document.querySelector('[data-no-artists]');
  if (!el) {
    refs.artistsList.insertAdjacentHTML('afterend', getNoArtistsMarkup());
    el = document.querySelector('[data-no-artists]');
    el.addEventListener('click', e => {
      if (!e.target.closest('.btn-reset-filters')) return;
      document.querySelector('[data-action="filters-reset"]')?.click();
      document.dispatchEvent(new CustomEvent('filters:reset'));
    });
  }
  return el;
}

function showNoArtists() {
  ensureNoArtistsBlock().classList.remove('is-hidden');
}

function hideNoArtists() {
  document.querySelector('[data-no-artists]')?.classList.add('is-hidden');
}

function togglePager(visible, totalItems = 0) {
  const box = document.querySelector('#tui-pagination');
  if (!box) return;

  box.classList.toggle('hidden', !visible || totalItems <= 0);
}

function isSearchActive() {
  return Boolean(
    (query.name && query.name.trim().length) ||
      (query.genre && query.genre !== 'all') ||
      (query.sorted && Number(query.sorted) !== 0)
  );
}

//---------------- Data flow -------------//

export async function loadArtists({ init = false } = {}) {
  showLoaderArtists();
  try {
    if (init) query.page = 1;

    const usingSearch = isSearchActive();
    const payload = usingSearch
      ? await searchArtist(query)
      : await getArtists(query.page);

    const artists = payload.artists ?? [];
    const totalArtists = Number(payload.totalArtists) || 0;

    refs.artistsList.innerHTML = '';
    renderArtists(artists);

    if (init) {
      if (!pager) {
        suppressScroll = true;

        pager = new Pagination('#tui-pagination', {
          totalItems: totalArtists,
          itemsPerPage: ARTISTS_PER_PAGE,
          page: query.page || 1,
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
          showLoaderArtists();

          try {
            query.page = next;
            refs.artistsList.innerHTML = '';

            const searchNow = isSearchActive();
            const nextPayload = searchNow
              ? await searchArtist(query)
              : await getArtists(next);

            const nextArtists = nextPayload.artists ?? [];
            renderArtists(nextArtists);

            togglePager(
              nextArtists.length > 0,
              Number(nextPayload?.totalArtists) || 0
            );

            if (!suppressScroll) requestAnimationFrame(scrollToArtistsTop);
          } catch (e) {
            toastError('Failed to fetch artists');
            renderArtists([]);
            togglePager(false, 0);
          } finally {
            inFlight = false;
            suppressScroll = false;
            hideLoaderArtists();
          }
        });
      }

      pager.reset(totalArtists);
      const target = query.page || 1;
      if (pager.getCurrentPage() !== target) {
        suppressScroll = true;
        pager.movePageTo(target);
      } else {
        suppressScroll = true;
      }
    } else {
      if (pager) {
        pager.reset(totalArtists);
        const target = query.page || 1;
        if (pager.getCurrentPage() !== target) {
          suppressScroll = true;
          pager.movePageTo(target);
        } else {
          suppressScroll = true;
        }
      }
    }

    togglePager(totalArtists > 0, totalArtists);
  } catch (e) {
    if (isSearchActive()) toastError('Failed to fetch artists');
    refs.artistsList.innerHTML = '';
    renderArtists([]);
    togglePager(false, 0);
  } finally {
    hideLoaderArtists();
  }
}

export function renderArtists(artists = []) {
  const sprite = new URL('../img/icons.svg', import.meta.url).href;

  if (!Array.isArray(artists) || artists.length === 0) {
    hideNoArtists();
    refs.artistsList.innerHTML = '';
    showNoArtists();
    document.dispatchEvent(new Event('artists:updated'));
    return;
  }

  hideNoArtists();

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
                  <use href="${sprite}#icon-arrow-1"></use>
                </svg>
              </button>
            </div>
          </li>`;
      }
    )
    .join('');

  refs.artistsList.insertAdjacentHTML('beforeend', markup);
  document.dispatchEvent(new Event('artists:updated'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    query.page = 1;
    loadArtists({ init: true });
  });
} else {
  query.page = 1;
  loadArtists({ init: true });
}

// --------- Smooth scroll ----------

function scrollToArtistsTop() {
  const anchor = document.querySelector('.js-artists-top');
  if (!anchor) return;

  let cssOffset = parseFloat(getComputedStyle(anchor).scrollMarginTop) || 0;
  if (!cssOffset) {
    cssOffset = window.matchMedia('(min-width:1440px)').matches
      ? 112
      : window.matchMedia('(min-width:768px)').matches
      ? 96
      : 120;
    anchor.style.scrollMarginTop = `${cssOffset}px`;
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  anchor.scrollIntoView({
    block: 'start',
    inline: 'nearest',
    behavior: reduced ? 'auto' : 'smooth',
  });
}
