/*----------- Imports ------------*/

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../css/artists.css';

import { getArtists, searchArtist } from './artists-api.js';
import { handleResetQuery, query } from './artists-additional.js';
import { refs } from './refs.js';
import { toastError, showLoaderArtists, hideLoaderArtists } from './helpers.js';
import { ARTISTS_PER_PAGE } from './constants.js';

/*------------ Globals ------------*/

const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
const visiblePages = isMobile ? 3 : 5;

let pager = null;
let inFlight = false;
let skipScrollOnce = false;
let suppressExternalNormalize = false;

/*------------ Placeholder ----------- */

function noArtistsMarkup() {
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
    refs.artistsList.insertAdjacentHTML('afterend', noArtistsMarkup());
    el = document.querySelector('[data-no-artists]');
  }
  return el;
}

function showNoArtists() {
  ensureNoArtistsBlock().classList.remove('is-hidden');
  const btn = document.querySelector('.btn-reset-filters');
  if (btn) {
    btn.addEventListener('click', handleResetQuery, { once: true });
  }
}
function hideNoArtists() {
  document.querySelector('[data-no-artists]')?.classList.add('is-hidden');
}

/*--------------- Helpers ---------------*/

function togglePager(visible, totalItems = 0) {
  const box = document.querySelector('#tui-pagination');
  if (!box) return;
  box.classList.toggle('hidden', !visible || totalItems <= 0);
}

function isSearchActive() {
  return Boolean(
    (query.name && query.name.trim().length) ||
      (query.genre && query.genre !== 'all' && query.genre !== '') ||
      (query.sorted && Number(query.sorted) !== 0)
  );
}

function ensurePager(total = 0) {
  if (pager) return;
  pager = new Pagination('#tui-pagination', {
    totalItems: total,
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

  pager.on('afterMove', handlePagerMove);
}

function normalizeAndMovePager(total) {
  if (!pager) return;
  const totalPages = Math.max(1, Math.ceil(total / ARTISTS_PER_PAGE));
  const target = Math.min(Math.max(query.page || 1, 1), totalPages);

  if (pager.getCurrentPage() !== target) {
    skipScrollOnce = true;
    pager.movePageTo(target);
  }
  togglePager(totalPages > 1, total);
}

/*---------------- loader ------------------*/

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

    suppressExternalNormalize = true;
    refs.artistsList.innerHTML = '';
    renderArtists(artists);
    suppressExternalNormalize = false;

    ensurePager(totalArtists);
    pager.setTotalItems(totalArtists);
    normalizeAndMovePager(totalArtists);

    if (!init) {
      const totalPages = Math.ceil(totalArtists / ARTISTS_PER_PAGE);
      togglePager(totalPages > 1, totalArtists);
      if (!skipScrollOnce) smartScrollAfterRender();
    }
  } catch (e) {
    if (isSearchActive()) toastError('Failed to fetch artists');
    refs.artistsList.innerHTML = '';
    renderArtists([]);
    togglePager(false, 0);
  } finally {
    hideLoaderArtists();
  }
}

/*---------------------- Pager ------------------------*/

async function handlePagerMove({ page: next }) {
  if (inFlight) return;
  inFlight = true;
  showLoaderArtists();
  try {
    query.page = next;
    refs.artistsList.innerHTML = '';

    const usingSearch = isSearchActive();
    const payload = usingSearch
      ? await searchArtist(query)
      : await getArtists(next);

    const nextArtists = payload.artists ?? [];
    const nextTotal = Number(payload.totalArtists) || 0;

    suppressExternalNormalize = true;
    renderArtists(nextArtists);
    suppressExternalNormalize = false;

    pager.setTotalItems(nextTotal);
    normalizeAndMovePager(nextTotal);

    if (!skipScrollOnce) {
      smartScrollAfterRender();
    } else {
      skipScrollOnce = false;
    }
  } catch (e) {
    toastError('Failed to fetch artists');
    renderArtists([]);
    togglePager(false, 0);
  } finally {
    inFlight = false;
    hideLoaderArtists();
  }
}

/*---------------- Render --------------------*/

export function renderArtists(artists = []) {
  const sprite = new URL('../img/icons.svg', import.meta.url).href;

  if (!Array.isArray(artists) || artists.length === 0) {
    hideNoArtists();
    refs.artistsList.innerHTML = '';
    showNoArtists();
    pager?.setTotalItems(0);
    togglePager(false, 0);
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

/*----------------- Scroll -------------------*/

function scrollToArtistsTop() {
  const anchor =
    document.querySelector('.js-artists-top') ||
    document.querySelector('#artists');
  if (!anchor) return;

  let offset = parseFloat(getComputedStyle(anchor).scrollMarginTop) || 0;
  if (!offset) {
    offset = window.matchMedia('(min-width:1440px)').matches
      ? 112
      : window.matchMedia('(min-width:768px)').matches
      ? 96
      : 120;
  }

  let targetY = Math.round(
    anchor.getBoundingClientRect().top + window.pageYOffset - offset
  );

  if (Math.abs(window.pageYOffset - targetY) < 2) {
    targetY = Math.max(0, targetY - 1);
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({
    top: targetY,
    left: 0,
    behavior: reduced ? 'auto' : 'smooth',
  });
}

function scrollAfterImages() {
  const container = document.querySelector('.artists-list');
  if (!container) return;

  const images = Array.from(container.querySelectorAll('img'));
  if (images.length === 0) {
    scrollToArtistsTop();
    return;
  }

  let loaded = 0;
  const done = () => {
    loaded++;
    if (loaded === images.length) scrollToArtistsTop();
  };

  images.forEach(img => {
    if (img.complete) {
      done();
    } else {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    }
  });
}

function smartScrollAfterRender() {
  requestAnimationFrame(scrollToArtistsTop);

  scrollAfterImages();

  setTimeout(scrollToArtistsTop, 400);
}
