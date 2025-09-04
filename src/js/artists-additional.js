/* Artists additional */
import { timeLines } from './animations.js';
import { getGenres, searchArtist } from './artists-api';
import { loadArtists, renderArtists } from './artists.js';
import {
  hideLoaderArtists,
  showLoaderArtists,
  toastError,
  toastSuccess,
} from './helpers';
import { refs } from './refs.js';
import { gsap } from 'gsap';

export let query = { name: '', page: 1, sorted: 0, genre: '' };

// const allDropdowns = [];

//============================ Inits ============================
initGenresMarkup();

initSearchAndFilters();

initSearchRequest();

initSort();

initGenres();

initReset();

execHeroBtnClick();

helpClearHoverOnButtons();

//============================ Functions ============================
/* == Search and Filters menu == */
function initSearchAndFilters() {
  // no animation initialization on desktop
  if (window.matchMedia('(min-width: 1440px)').matches) {
    return;
  }

  const outsideClickHandler = e => {
    if (!document.querySelector('.filters-content').contains(e.target)) {
      timeLines.tlCloseSearch.play(0);
      document.removeEventListener('click', outsideClickHandler);
    }
    // refs.btnSearch.classList.remove('open');
    // refs.panelSearch.classList.remove('open');
  };

  refs.btnSearch.addEventListener('click', e => {
    e.stopPropagation();
    const isOpenSearch =
      gsap.isTweening(refs.panelSearch) ||
      refs.panelSearch.style.pointerEvents === 'auto';

    if (!isOpenSearch) {
      timeLines.tlCloseSearch.pause(0);
      timeLines.tlOpenSearch.restart();
      document.addEventListener('click', outsideClickHandler);
      // refs.btnSearch.classList.add('open');
      // refs.panelSearch.classList.add('open');
    } else {
      timeLines.tlOpenSearch.pause(0);
      timeLines.tlCloseSearch.restart();
      document.removeEventListener('click', outsideClickHandler);
      // refs.btnSearch.classList.remove('open');
      // refs.panelSearch.classList.remove('open');
    }
  });
}

/* == Searching input submenu == */
function initSearchRequest() {
  refs.searchInput.addEventListener('input', () => {
    query.name = refs.searchInput.value.trim();
  });

  const handleSearchBtnRequest = async () => {
    if (!query.name?.length) {
      toastSuccess('Silence from you', 'topRight', null);
      return;
    }
    scrollToArtistsCeil();

    showLoaderArtists();

    try {
      /* const { artists } = await searchArtist(query);
      refs.artistsList.innerHTML = '';
      renderArtists(artists); */
      await loadArtists({ init: true });
    } catch (err) {
      toastError(`Silence due problem ${err}`);
    }

    hideLoaderArtists();
    timeLines?.tlCloseSearch?.play(0);
  };

  refs.searchBtnRequest.addEventListener('click', handleSearchBtnRequest);

  refs.searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      handleSearchBtnRequest();
    }
  });
}

/* == Genres menu markup == */
async function initGenresMarkup() {
  try {
    const genres = await getGenres();
    const markup =
      '<li data-value="all">All Genres</li>' +
      genres
        .map(({ genre }) => `<li data-value="${genre}">${genre}</li>`)
        .join('');
    refs.menuGenres.insertAdjacentHTML('beforeend', markup);
  } catch (err) {
    toastError(`While loading genres ${err}`);
  }
}

/* == Sorting submenu  == */
function initSort() {
  const outsideClickHandler = e => {
    if (!document.querySelector('.artists-dropdown-sort').contains(e.target)) {
      timeLines.tlCloseSort.restart();
      timeLines.tlCloseGenres.restart(); //try
      refs.btnSort.classList.remove('open');
      refs.menuSort.classList.remove('open');
      // document.body.classList.remove('no-scroll');
    }
  };

  refs.btnSort.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = refs.menuSort.classList.contains('open');

    if (!isOpen) {
      //Closing genres
      timeLines.tlOpenGenres.pause(0);
      timeLines.tlCloseGenres.restart();
      refs.btnGenres.classList.remove('open');
      refs.menuGenres.classList.remove('open');

      timeLines.tlCloseSort.pause(0);
      timeLines.tlOpenSort.restart();
      refs.btnSort.classList.add('open');
      refs.menuSort.classList.add('open');
      document.addEventListener('click', outsideClickHandler, { once: true });
      // document.body.classList.add('no-scroll');
    } else {
      timeLines.tlOpenSort.pause(0);
      timeLines.tlCloseSort.restart();
      refs.btnSort.classList.remove('open');
      refs.menuSort.classList.remove('open');
      // document.body.classList.remove('no-scroll');
    }
  });

  refs.menuSort.addEventListener('click', async e => {
    scrollToArtistsCeil();

    const item = e.target.closest('li');
    if (!item) return;

    refs.btnSort.querySelector('.dropdown-label').textContent =
      item.textContent;
    refs.btnSort.dataset.value = item.dataset.value;

    query.sorted = item.dataset.value;

    showLoaderArtists();
    try {
      /* const { artists } = await searchArtist(query);
      refs.artistsList.innerHTML = '';
      renderArtists(artists); */
      await loadArtists({ init: true });
    } catch (err) {
      toastError(`Silence due problem ${err}`);
    }
    hideLoaderArtists();

    timeLines.tlOpenSort.pause(0);
    timeLines.tlCloseSort.restart();
    refs.btnSort.classList.remove('open');
    refs.menuSort.classList.remove('open');
    timeLines?.tlCloseSearch?.play(0);
    // document.body.classList.remove('no-scroll');
  });
}

/* == Genres submenu == */
async function initGenres() {
  const outsideClickHandler = e => {
    if (
      !document.querySelector('.artists-dropdown-genres').contains(e.target)
    ) {
      timeLines.tlCloseGenres.restart();
      timeLines.tlCloseSort.restart(); //try
      refs.btnGenres.classList.remove('open');
      refs.menuGenres.classList.remove('open');
      // document.body.classList.remove('no-scroll');
    }
  };

  refs.btnGenres.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = refs.menuGenres.classList.contains('open');

    if (!isOpen) {
      //Closing sort
      timeLines.tlOpenSort.pause(0);
      timeLines.tlCloseSort.restart();
      refs.btnSort.classList.remove('open');
      refs.menuSort.classList.remove('open');

      timeLines.tlCloseGenres.pause(0);
      timeLines.tlOpenGenres.restart();
      refs.btnGenres.classList.add('open');
      refs.menuGenres.classList.add('open');
      document.addEventListener('click', outsideClickHandler, { once: true });
      // document.body.classList.add('no-scroll');
    } else {
      timeLines.tlOpenGenres.pause(0);
      timeLines.tlCloseGenres.restart();
      refs.btnGenres.classList.remove('open');
      refs.menuGenres.classList.remove('open');
      // document.body.classList.remove('no-scroll');
    }
  });

  refs.menuGenres.addEventListener('click', async e => {
    scrollToArtistsCeil();

    const item = e.target.closest('li');
    if (!item) return;

    refs.btnGenres.querySelector('.dropdown-label').textContent =
      item.textContent;
    refs.btnGenres.dataset.value = item.dataset.value;

    query.genre = item.textContent === 'All Genres' ? '' : item.textContent;

    showLoaderArtists();
    try {
      /* const { artists } = await searchArtist(query);
      refs.artistsList.innerHTML = '';
      renderArtists(artists); */
      await loadArtists({ init: true });
    } catch (err) {
      toastError(`Silence due problem ${err}`);
    }
    hideLoaderArtists();

    timeLines.tlOpenGenres.pause(0);
    timeLines.tlCloseGenres.restart();
    refs.btnGenres.classList.remove('open');
    refs.menuGenres.classList.remove('open');
    timeLines?.tlCloseSearch?.play(0);
    // document.body.classList.remove('no-scroll');
  });
}

/* == Handle genres click on cards == */
export async function handleSearchGenresFromCard(genre = 'All Genres') {
  query.page = 1;
  query.genre = genre;

  refs.btnGenres.querySelector('.dropdown-label').textContent = genre;

  showLoaderArtists();
  try {
    await loadArtists({ init: true });
  } catch (err) {
    toastError(`Silence due problem ${err}`);
  }
  hideLoaderArtists();

  timeLines.tlCloseGenres.restart();
  timeLines.tlCloseSort.restart();
  timeLines?.tlCloseSearch?.play(0);
  refs.btnGenres.classList.remove('open');
  refs.menuGenres.classList.remove('open');
  refs.btnSort.classList.remove('open');
  refs.menuSort.classList.remove('open');
}

/* == Reset == */
export async function handleResetQuery() {
  query = { name: '', page: 1, sorted: 0, genre: '' };

  scrollToArtistsCeil();

  refs.btnGenres.querySelector('.dropdown-label').textContent = 'Genre';
  refs.btnSort.querySelector('.dropdown-label').textContent = 'Sorting';
  refs.searchInput.value = '';

  showLoaderArtists();
  try {
    refs.artistsList.innerHTML = '';
    /* const { artists } = await searchArtist(query);
    renderArtists(artists); */
    await loadArtists({ init: true });
  } catch (err) {
    toastError(`Silence due problem ${err}`);
  }
  hideLoaderArtists();

  timeLines.tlCloseGenres.play(0);
  timeLines.tlCloseSort.play(0);
}

function initReset() {
  refs.resetBtn.addEventListener('click', handleResetQuery);
}

//============================ Helpers ============================
/* -- Scroll to top of artists -- */
export function scrollToArtistsCeil() {
  const top =
    /* refs.artistsList */ document
      .querySelector('.artists-subtitle')
      .getBoundingClientRect().bottom +
    window.scrollY +
    100 -
    (window.matchMedia('(min-width: 1440px)').matches
      ? 100
      : window.matchMedia('(min-width: 768px)').matches
      ? 165
      : 160);

  window.scrollTo({ top, behavior: 'smooth' });
}

/* -- Hero button scrolling -- */
function execHeroBtnClick() {
  refs.heroBtn.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#artists').scrollIntoView({ behavior: 'smooth' });
  });
}

/* -- Clear problems with hovers on buttons -- */
function helpClearHoverOnButtons() {
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.blur();
    });
  });
}

//================================================================
// Universal function for several menus - with animation timelines overlaying unsolved problem
function initDropdown({ btn, menu, wrapperSelector }) {
  const icon = btn.querySelector('.dropdown-icon');
  const tlOpen = gsap.timeline({ paused: true });
  const tlClose = gsap.timeline({ paused: true });

  const outsideClickHandler = e => {
    if (!document.querySelector(wrapperSelector).contains(e.target)) {
      tlClose.restart();
      btn.classList.remove('open');
      menu.classList.remove('open');
      // document.body.classList.remove('no-scroll');
    }
  };

  tlOpen
    .to(icon, { rotate: 180, duration: 0.35, ease: 'power2.out' }, 0)
    .fromTo(
      menu,
      { opacity: 0, y: -10, pointerEvents: 'none' },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        pointerEvents: 'auto',
        ease: 'power3.out',
      },
      0
    )
    .from(
      menu.children,
      {
        opacity: 0,
        y: -6,
        stagger: 0.05,
        duration: 0.25,
        ease: 'power2.out',
      },
      0.1
    );

  tlClose.to(icon, { rotate: 0, duration: 0.3, ease: 'power2.in' }, 0).to(
    menu,
    {
      opacity: 0,
      y: -10,
      duration: 0.3,
      pointerEvents: 'none',
      ease: 'power2.in',
    },
    0
  );

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = menu.classList.contains('open');

    // Closing others:
    if (!isOpen) {
      allDropdowns.forEach(d => {
        if (d.menu !== menu) {
          d.tlOpen.pause(0);
          d.tlClose.restart();
          d.btn.classList.remove('open');
          d.menu.classList.remove('open');
        }
      });

      tlClose.pause(0);
      tlOpen.restart();
      btn.classList.add('open');
      menu.classList.add('open');
      document.addEventListener('click', outsideClickHandler, { once: true });
      // document.body.classList.add('no-scroll');
    } else {
      tlOpen.pause(0);
      tlClose.restart();
      btn.classList.remove('open');
      menu.classList.remove('open');
      // document.body.classList.remove('no-scroll');
    }
  });

  menu.addEventListener('click', e => {
    const item = e.target.closest('li');
    if (!item) return;

    btn.querySelector('.dropdown-label').textContent = item.textContent;
    btn.dataset.value = item.dataset.value;

    tlOpen.pause(0);
    tlClose.restart();
    btn.classList.remove('open');
    menu.classList.remove('open');
    // document.body.classList.remove('no-scroll');
  });

  // Saving for closing others in future:
  allDropdowns.push({ btn, menu, tlOpen, tlClose });
}

/* async function searching() {
  try {
    const { artists } = await searchArtist(query);
    refs.artistsList.innerHTML = '';
    renderArtists(artists);
  } catch (err) {
    toastError(`Silence due problem ${err}`);
  }
  return artists;
} */
