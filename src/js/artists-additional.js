/* Artists additional */
import { timeLines } from './animations.js';
import { getArtists, getGenres, searchArtist } from './artists-api';
import { renderArtists } from './artists.js';
import { hideLoaderArtists, showLoaderArtists, toastError } from './helpers';
import { refs } from './refs.js';
import { gsap } from 'gsap';

export const query = { name: '', page: 1, sorted: 0, genre: '' };

const allDropdowns = [];

//Inits:
initGenresMarkup();

initSearchAndFilters();

initSearchRequest();

initSort();

// initGenres();

/* initDropdown({
  btn: refs.btnGenres,
  menu: refs.menuGenres,
  wrapperSelector: '.artists-dropdown-genres',
});

initDropdown({
  btn: refs.btnSort,
  menu: refs.menuSort,
  wrapperSelector: '.artists-dropdown-sort',
}); */

//Functions:
function initSearchRequest() {
  refs.searchInput.addEventListener('input', () => {
    query.name = refs.searchInput.value.trim();
  });

  refs.searchBtnRequest.addEventListener('click', async () => {
    showLoaderArtists();

    if (!query.name?.length) {
      toastError('Silence from you');
      return;
    }

    try {
      const { artists } = await searchArtist(query);
      refs.artistsList.innerHTML = '';
      renderArtists(artists);
    } catch (err) {
      toastError(`Silence due problem ${err}`);
    }

    hideLoaderArtists();
    timeLines.tlCloseSearch.play(0);
  });
}

async function initGenresMarkup() {
  try {
    const genres = await getGenres();
    const markup =
      '<li data-value="all">All Genres</li>' +
      genres
        .map(
          ({ genre }) => `<li data-value="${genre.toLowerCase()}">${genre}</li>`
        )
        .join('');
    refs.menuGenres.insertAdjacentHTML('beforeend', markup);
  } catch (err) {
    toastError(`While loading genres ${err}`);
  }
}

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
          d.tlClose.pause(0).play(0);
          d.btn.classList.remove('open');
          d.menu.classList.remove('open');
        }
      });

      tlClose.pause(0);
      tlOpen.pause(0).play(0);
      btn.classList.add('open');
      menu.classList.add('open');
      document.addEventListener('click', outsideClickHandler, { once: true });
      // document.body.classList.add('no-scroll');
    } else {
      tlOpen.pause(0);
      tlClose.pause(0).play(0);
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

//================================================================
/* == Init Sort, Init Genres functions == */
function initSort() {
  const outsideClickHandler = e => {
    if (!document.querySelector('.artists-dropdown-sort').contains(e.target)) {
      timeLines.tlCloseSort.restart();
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
      timeLines.tlCloseGenres.pause(0).play(0);
      refs.btnGenres.classList.remove('open');
      refs.menuGenres.classList.remove('open');

      timeLines.tlCloseSort.pause(0);
      timeLines.tlOpenSort.pause(0).play(0);
      refs.btnSort.classList.add('open');
      refs.menuSort.classList.add('open');
      document.addEventListener('click', outsideClickHandler, { once: true });
      // document.body.classList.add('no-scroll');
    } else {
      timeLines.tlOpenSort.pause(0);
      timeLines.tlCloseSort.pause(0).play(0);
      refs.btnSort.classList.remove('open');
      refs.menuSort.classList.remove('open');
      // document.body.classList.remove('no-scroll');
    }
  });

  refs.menuSort.addEventListener('click', e => {
    const item = e.target.closest('li');
    if (!item) return;

    refs.btnSort.querySelector('.dropdown-label').textContent =
      item.textContent;
    refs.btnSort.dataset.value = item.dataset.value;

    timeLines.tlOpenSort.pause(0);
    timeLines.tlCloseSort.restart();
    refs.btnSort.classList.remove('open');
    refs.menuSort.classList.remove('open');
    // document.body.classList.remove('no-scroll');
  });

  // Saving for closing others in future:
  // allDropdowns.push({ btn, menu, tlOpen, tlClose });
}

function initGenres() {
  const outsideClickHandler = e => {
    if (
      !document.querySelector('.artists-dropdown-genres').contains(e.target)
    ) {
      timeLines.tlCloseSort.restart();
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
      timeLines.tlCloseSort.pause(0).play(0);
      refs.btnSort.classList.remove('open');
      refs.menuSort.classList.remove('open');

      timeLines.tlCloseGenres.pause(0);
      timeLines.tlOpenGenres.pause(0).play(0);
      refs.btnGenres.classList.add('open');
      refs.menuGenres.classList.add('open');
      document.addEventListener('click', outsideClickHandler, { once: true });
      // document.body.classList.add('no-scroll');
    } else {
      timeLines.tlOpenGenres.pause(0);
      timeLines.tlCloseGenres.pause(0).play(0);
      refs.btnGenres.classList.remove('open');
      refs.menuGenres.classList.remove('open');
      // document.body.classList.remove('no-scroll');
    }
  });

  refs.menuGenres.addEventListener('click', e => {
    const item = e.target.closest('li');
    if (!item) return;

    refs.btnGenres.querySelector('.dropdown-label').textContent =
      item.textContent;
    refs.btnGenres.dataset.value = item.dataset.value;

    timeLines.tlOpenGenres.pause(0);
    timeLines.tlCloseGenres.restart();
    refs.btnGenres.classList.remove('open');
    refs.menuGenres.classList.remove('open');
    // document.body.classList.remove('no-scroll');
  });

  // Saving for closing others in future:
  // allDropdowns.push({ btn, menu, tlOpen, tlClose });
}

//================================================================

function initSearchAndFilters() {
  // no initialization of animation
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

  /* refs.panelSearch.addEventListener('click', e => {
    refs.btnSearch.classList.remove('open');
    refs.panelSearch.classList.remove('open');
    const item = e.target.closest('li');
    if (!item) return;

    refs.btnSearch.querySelector('.dropdown-label').textContent =
      item.textContent;
    refs.btnSearch.dataset.value = item.dataset.value;

    tlOpen.pause(0);
    tlClose.restart();
    document.removeEventListener('click', outsideClickHandler);
  }); */
}

async function resetQuery() {
  query = { name: '', page: 1, sorted: 0, genre: '' };
  try {
    renderArtists(query.page);
  } catch (err) {
    toastError(`Silence due problem ${err}`);
  }
}

/* == Universal function for sort-genres dropdowns with array == */
/* function initDropdown({ btn, menu, wrapperSelector }) {
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
          d.tlClose.pause(0).play(0);
          d.btn.classList.remove('open');
          d.menu.classList.remove('open');
        }
      });

      tlClose.pause(0);
      tlOpen.pause(0).play(0);
      btn.classList.add('open');
      menu.classList.add('open');
      document.addEventListener('click', outsideClickHandler, { once: true });
      // document.body.classList.add('no-scroll');
    } else {
      tlOpen.pause(0);
      tlClose.pause(0).play(0);
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
} */
