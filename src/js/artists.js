/*-------------- Imports ------------*/
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../css/artists.css';

import { getArtists, searchArtist } from './artists-api.js';
import { handleResetQuery, query } from './artists-additional.js';
import { refs } from './refs.js';
import { toastError, showLoaderArtists, hideLoaderArtists } from './helpers.js';
import { ARTISTS_PER_PAGE } from './constants.js';

/*------------ Globals --------------*/
const isMobile = window.matchMedia('(max-width: 767.98px)').matches;
const visiblePages = isMobile ? 3 : 5;

let pager = null;
let inFlight = false;
/* let skipScrollOnce = false; */
/* let suppressExternalNormalize = false; */
/* let suppressPagerEventOnce = false; */
let lastKnownTotal = 0;
let userTriggeredMove = false;

function querySignature(q) {
  return `${q.name?.trim() || ''}|${q.genre || ''}|${Number(q.sorted) || 0}`;
}
let lastQuerySig = '';

/*------------ Placeholder ---------------- */
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
  const block = ensureNoArtistsBlock();
  block.classList.remove('is-hidden');

  const btn = block.querySelector('.btn-reset-filters');
  if (btn) {
    btn.addEventListener(
      'click',
      () => {
        query.page = 1;
        document.querySelector('#tui-pagination')?.classList.remove('hidden');
        if (pager) {
          /* suppressPagerEventOnce = true; */
          pager.movePageTo(1);
          /* setTimeout(() => (suppressPagerEventOnce = false), 0); */
        }
        handleResetQuery();
      },
      { once: true }
    );
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

  const SPRITE = new URL('../img/icons.svg', import.meta.url).href;
  const icon = `
    <svg class="tui-ico-svg" width="24" height="24" aria-hidden="true">
      <use href="${SPRITE}#icon-right-arrow-alt"></use>
    </svg>
  `;

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
      moveButton: `<a href="#" class="tui-page-btn tui-{{type}}">${icon}</a>`,
      disabledMoveButton: `<span class="tui-page-btn is-disabled tui-{{type}}">${icon}</span>`,
      moreButton: '<span class="tui-page-btn tui-ellipsis">…</span>',
    },
  });

  pager.on('afterMove', handlePagerMove);

  const box = document.querySelector('#tui-pagination');
  if (box) {
    box.addEventListener('click', e => {
      const a = e.target.closest('a.tui-page-btn');
      if (!a || a.classList.contains('is-disabled')) return;
      userTriggeredMove = true;
    });
  }
}

function normalizeAndMovePager(total) {
  if (!pager) return;
  const totalPages = Math.max(1, Math.ceil(total / ARTISTS_PER_PAGE));
  const target = Math.min(Math.max(query.page || 1, 1), totalPages);

  if (pager.getCurrentPage() !== target) {
    /* skipScrollOnce = true; */
    pager.movePageTo(target);
  }
  togglePager(totalPages > 1, total);

  if (isMobile) {
    renderMobilePagerCompact();
  } else {
    renderDesktopEnsureLast();
  }
}

/*---------------- loader ------------------*/
export async function loadArtists({ init = false } = {}) {
  showLoaderArtists();
  try {
    if (init) query.page = 1;

    const sig = querySignature(query);
    const filtersChanged = sig !== lastQuerySig;
    const needResetPager = init || filtersChanged;

    if (filtersChanged && query.page !== 1) {
      query.page = 1;
    }

    const usingSearch = isSearchActive();
    const payload = await searchArtist(query); /* usingSearch
      ? await searchArtist(query)
      : await getArtists(query.page) */

    const artists = payload.artists ?? [];
    const totalArtists = +payload.totalArtists || 0;

    /* suppressExternalNormalize = true; */
    refs.artistsList.innerHTML = '';
    renderArtists(artists);
    /* suppressExternalNormalize = false; */

    ensurePager(totalArtists);
    lastKnownTotal = totalArtists;

    if (needResetPager) {
      /* suppressPagerEventOnce = true; */
      /* skipScrollOnce = true; */
      pager.reset(totalArtists);
      if (pager.getCurrentPage() !== 1) pager.movePageTo(1);
      /* setTimeout(() => (suppressPagerEventOnce = false), 0); */
      query.page = 1;
    } else {
      pager.setTotalItems(totalArtists);
      normalizeAndMovePager(totalArtists);
    }

    const totalPages = Math.ceil(totalArtists / ARTISTS_PER_PAGE);
    togglePager(totalPages > 1, totalArtists);
    if (!isMobile) renderDesktopEnsureLast();

    lastQuerySig = sig;
  } catch (e) {
    if (isSearchActive()) toastError(`Silence due problem ${e}`);
    refs.artistsList.innerHTML = '';
    renderArtists([]);
    togglePager(false, 0);
  } finally {
    hideLoaderArtists();
  }
}

function renderMobilePagerCompact() {
  try {
    if (!isMobile || !pager) return;
    const box = document.querySelector('#tui-pagination');
    if (!box) return;

    let totalItems = 0;
    if (typeof pager.getTotalItems === 'function') {
      totalItems = Number(pager.getTotalItems()) || 0;
    }
    if (!totalItems) totalItems = lastKnownTotal || 0;

    const totalPages = Math.max(1, Math.ceil(totalItems / ARTISTS_PER_PAGE));
    const cur = pager.getCurrentPage();

    const SPRITE = new URL('../img/icons.svg', import.meta.url).href;
    const ico = `
      <svg class="tui-ico-svg" width="24" height="24" aria-hidden="true">
        <use href="${SPRITE}#icon-right-arrow-alt"></use>
      </svg>`;

    const btn = (label, page, extra = '') =>
      `<a href="#" class="tui-page-btn${extra}" data-page="${page}">${label}</a>`;

    const ellipsis = `<span class="tui-page-btn tui-ellipsis">…</span>`;

    const prevDisabled = cur <= 1 ? ' is-disabled' : '';
    const nextDisabled = cur >= totalPages ? ' is-disabled' : '';

    const html = [
      `<a href="#" class="tui-page-btn tui-prev${prevDisabled}" data-page="${Math.max(
        1,
        cur - 1
      )}">${ico}</a>`,
      btn('1', 1, cur === 1 ? ' is-active' : ''),
      cur > 3 ? ellipsis : '',
      cur > 1 && cur < totalPages ? btn(String(cur), cur, ' is-active') : '',
      cur < totalPages - 2 ? ellipsis : '',
      totalPages > 1
        ? btn(
            String(totalPages),
            totalPages,
            cur === totalPages ? ' is-active' : ''
          )
        : '',
      `<a href="#" class="tui-page-btn tui-next${nextDisabled}" data-page="${Math.min(
        totalPages,
        cur + 1
      )}">${ico}</a>`,
    ].join('');

    box.innerHTML = html;

    box.onclick = e => {
      const a = e.target.closest('a.tui-page-btn:not(.is-disabled)');
      if (!a) return;
      e.preventDefault();
      const p = Number(a.dataset.page);
      if (Number.isFinite(p) && p >= 1 && p <= totalPages && p !== cur) {
        userTriggeredMove = true;
        pager.movePageTo(p);
      }
    };
  } catch {}
}

function renderDesktopEnsureLast() {
  if (isMobile || !pager) return;
  const box = document.querySelector('#tui-pagination');
  if (!box) return;

  let totalItems = 0;
  if (typeof pager.getTotalItems === 'function') {
    totalItems = Number(pager.getTotalItems()) || 0;
  }
  if (!totalItems) totalItems = lastKnownTotal || 0;

  const totalPages = Math.max(1, Math.ceil(totalItems / ARTISTS_PER_PAGE));
  if (totalPages <= 1) return;

  const btns = Array.from(box.querySelectorAll('.tui-page-btn'));
  const hasLast = btns.some(
    el =>
      !el.classList.contains('tui-prev') &&
      !el.classList.contains('tui-next') &&
      !el.classList.contains('tui-ellipsis') &&
      el.textContent.trim() === String(totalPages)
  );
  if (hasLast) return;

  const next = box.querySelector('.tui-next');

  const a = document.createElement('a');
  a.href = '#';
  a.className = 'tui-page-btn';
  a.textContent = String(totalPages);
  a.addEventListener('click', e => {
    e.preventDefault();
    userTriggeredMove = true;
    pager.movePageTo(totalPages);
  });

  box.insertBefore(a, next || null);
}

/*---------------------- Pager ------------------------*/
async function handlePagerMove({ page: next }) {
  scrollToArtistsTop();
  /*   if (suppressPagerEventOnce) {
    suppressPagerEventOnce = false;
    skipScrollOnce = false;
    return;
  } */
  /*   if (userTriggeredMove) {
    skipScrollOnce = false;
    userTriggeredMove = false;
  } */
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
    const nextTotal = +payload.totalArtists || 0;

    /* suppressExternalNormalize = true; */
    renderArtists(nextArtists);
    /*  suppressExternalNormalize = false; */

    pager.setTotalItems(nextTotal);
    lastKnownTotal = nextTotal;
    normalizeAndMovePager(nextTotal);
    if (!isMobile) renderDesktopEnsureLast();

    /*     if (!skipScrollOnce) {
      smartScrollAfterRender();
    } else {
      skipScrollOnce = false;
    } */
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
/* let lastRenderExternal = false; */

export function renderArtists(artists = []) {
  /* lastRenderExternal = !suppressExternalNormalize; */

  const sprite = new URL('../img/icons.svg', import.meta.url).href;

  if (!Array.isArray(artists) || artists.length === 0) {
    hideNoArtists();
    refs.artistsList.innerHTML = '';
    showNoArtists();
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
                <svg class="artist-cta-icon" width="24" height="24" aria-hidden="true">
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
  /* scrollAfterImages(); */
  setTimeout(scrollToArtistsTop, 400);
}

/* -------------------Filters animation ------------*/
const FILTERS_STICKY_TOP = 112;
const filtersState = {
  enabled: false,
  firstTop: 0,
  lastRowTop: 0,
  maxShift: 0,
  rafId: 0,
};

function getColumnsCount(listEl) {
  const gtc = getComputedStyle(listEl).gridTemplateColumns || '';
  const cols = gtc.split(' ').filter(Boolean).length;
  return Math.max(1, cols || 1);
}
function absTop(el) {
  const r = el.getBoundingClientRect();
  return Math.round(r.top + window.pageYOffset);
}
function enableFiltersFollow() {
  if (filtersState.enabled) return;
  filtersState.enabled = true;
  onScrollFiltersFollow();
  window.addEventListener('scroll', scheduleFiltersRaf, { passive: true });
  window.addEventListener('resize', recomputeFiltersBounds, { passive: true });
}
function disableFiltersFollow() {
  if (!filtersState.enabled) return;
  filtersState.enabled = false;
  window.removeEventListener('scroll', scheduleFiltersRaf);
  window.removeEventListener('resize', recomputeFiltersBounds);
  cancelAnimationFrame(filtersState.rafId);
  document
    .querySelector('.filters-panel')
    ?.style.setProperty('--filters-shift', '0px');
}
function scheduleFiltersRaf() {
  cancelAnimationFrame(filtersState.rafId);
  filtersState.rafId = requestAnimationFrame(onScrollFiltersFollow);
}
function onScrollFiltersFollow() {
  if (!filtersState.enabled) return;
  const panel = document.querySelector('.filters-panel');
  if (!panel) return;

  const rawShift =
    window.pageYOffset + FILTERS_STICKY_TOP - filtersState.firstTop;
  const clamped = Math.round(
    Math.max(0, Math.min(rawShift, filtersState.maxShift))
  );
  panel.style.setProperty('--filters-shift', `${clamped}px`);
}
function recomputeFiltersBounds() {
  if (!window.matchMedia('(min-width:1440px)').matches) {
    disableFiltersFollow();
    return;
  }
  const list = refs.artistsList;
  const panel = document.querySelector('.filters-panel');
  if (!list || !panel || list.children.length === 0) {
    disableFiltersFollow();
    return;
  }
  const cols = getColumnsCount(list);
  const total = list.children.length;
  if (total <= cols) {
    disableFiltersFollow();
    return;
  }
  const firstTop = absTop(list.children[0]);
  const lastRowFirstIndex = total - (total % cols || cols);
  const lastRowTop = absTop(list.children[lastRowFirstIndex]);

  filtersState.firstTop = firstTop;
  filtersState.lastRowTop = lastRowTop;
  filtersState.maxShift = Math.max(0, lastRowTop - firstTop);

  enableFiltersFollow();
  scheduleFiltersRaf();
}

/* ------- Sync after external renders (filters/search) ------- */
async function syncPagerAfterExternalRender() {
  const sig = querySignature(query);
  if (sig === lastQuerySig) return;

  try {
    const payload = await searchArtist({ ...query, page: 1 });
    const total = +payload.totalArtists || 0;

    ensurePager(total);
    lastKnownTotal = total;

    /* suppressPagerEventOnce = true; */
    /*  skipScrollOnce = true; */
    pager.reset(total);
    if (pager.getCurrentPage() !== 1) pager.movePageTo(1);
    /* setTimeout(() => (suppressPagerEventOnce = false), 0); */
    query.page = 1;

    const totalPages = Math.ceil(total / ARTISTS_PER_PAGE);
    togglePager(totalPages > 1, total);
    if (isMobile) renderMobilePagerCompact();
    else renderDesktopEnsureLast();

    lastQuerySig = sig;
  } catch {}
}

document.addEventListener('artists:updated', () => {
  const hasCards = refs.artistsList?.children.length > 0;
  if (!hasCards) {
    disableFiltersFollow();
  } else {
    requestAnimationFrame(() => {
      setTimeout(recomputeFiltersBounds, 50);
    });
  }

  if (!pager) return;

  if (
    /* lastRenderExternal && */ query.page === 1 &&
    pager.getCurrentPage() !== 1
  ) {
    /* suppressPagerEventOnce = true; */
    pager.movePageTo(1);
    /*  setTimeout(() => (suppressPagerEventOnce = false), 0); */
  }

  if (isMobile) {
    renderMobilePagerCompact();
  } else {
    renderDesktopEnsureLast();
  }

  /*   if (lastRenderExternal) {
    syncPagerAfterExternalRender();
  } */

  /* lastRenderExternal = false; */
});
