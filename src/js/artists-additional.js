/* Artists additional */
import { getGenres } from './artists-api';
import { toastError } from './helpers';
import { refs } from './refs.js';
import { gsap } from 'gsap';

export const query = { name: '', page: 1, sorted: 0, genre: '' };

const allDropdowns = [];

//Inits:
initGenresMarkup();

initDropdown({
  btn: refs.btnGenres,
  menu: refs.menuGenres,
  wrapperSelector: '.artists-dropdown-genres',
});

initDropdown({
  btn: refs.btnSort,
  menu: refs.menuSort,
  wrapperSelector: '.artists-dropdown-sort',
});

//Functions:
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

/*
const handleGenres = () => {
  const iconGenres = refs.btnGenres.querySelector('.dropdown-icon');

  const tlOpen = gsap.timeline({ paused: true });
  tlOpen
    .to(iconGenres, { rotate: 180, duration: 0.35, ease: 'power2.out' }, 0)
    .fromTo(
      refs.menuGenres,
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
      refs.menuGenres.children,
      {
        opacity: 0,
        y: -6,
        stagger: 0.05,
        duration: 0.25,
        ease: 'power2.out',
      },
      0.1
    );

  const tlClose = gsap.timeline({ paused: true });
  tlClose.to(iconGenres, { rotate: 0, duration: 0.3, ease: 'power2.in' }, 0).to(
    refs.menuGenres,
    {
      opacity: 0,
      y: -10,
      duration: 0.3,
      pointerEvents: 'none',
      ease: 'power2.in',
    },
    0
  );

  const outsideClickHandler = e => {
    if (
      !document.querySelector('.artists-dropdown-genres').contains(e.target)
    ) {
      tlClose.play(0);
      document.removeEventListener('click', outsideClickHandler);
    }
    refs.btnGenres.classList.remove('open');
    refs.menuGenres.classList.remove('open');
  };

  refs.btnGenres.addEventListener('click', e => {
    e.stopPropagation();
    const isOpenGenres =
      gsap.isTweening(refs.menuGenres) ||
      refs.menuGenres.style.pointerEvents === 'auto';

    if (!isOpenGenres) {
      tlClose.pause(0);
      tlOpen.restart();
      document.addEventListener('click', outsideClickHandler);
      refs.btnGenres.classList.add('open');
      refs.menuGenres.classList.add('open');
      refs.btnSort.classList.remove('open');
      refs.menuSort.classList.remove('open');
    } else {
      tlOpen.pause(0);
      tlClose.restart();
      document.removeEventListener('click', outsideClickHandler);
      refs.btnGenres.classList.remove('open');
      refs.menuGenres.classList.remove('open');
    }
  });

  refs.menuGenres.addEventListener('click', e => {
    refs.btnGenres.classList.remove('open');
    refs.menuGenres.classList.remove('open');
    const item = e.target.closest('li');
    if (!item) return;

    refs.btnGenres.querySelector('.dropdown-label').textContent =
      item.textContent;
    refs.btnGenres.dataset.value = item.dataset.value;

    tlOpen.pause(0);
    tlClose.restart();
    document.removeEventListener('click', outsideClickHandler);
  });
};

handleGenres();

//Sort:
const handleSort = () => {
  const iconSort = refs.btnSort.querySelector('.dropdown-icon');

  const tlOpen = gsap.timeline({ paused: true });
  tlOpen
    .to(iconSort, { rotate: 180, duration: 0.35, ease: 'power2.out' }, 0)
    .fromTo(
      refs.menuSort,
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
      refs.menuSort.children,
      {
        opacity: 0,
        y: -6,
        stagger: 0.05,
        duration: 0.25,
        ease: 'power2.out',
      },
      0.1
    );

  const tlClose = gsap.timeline({ paused: true });
  tlClose.to(iconSort, { rotate: 0, duration: 0.3, ease: 'power2.in' }, 0).to(
    refs.menuSort,
    {
      opacity: 0,
      y: -10,
      duration: 0.3,
      pointerEvents: 'none',
      ease: 'power2.in',
    },
    0
  );

  const outsideClickHandler = e => {
    if (!document.querySelector('.artists-dropdown-sort').contains(e.target)) {
      tlClose.play(0);
      document.removeEventListener('click', outsideClickHandler);
    }
    refs.btnSort.classList.remove('open');
    refs.menuSort.classList.remove('open');
  };

  refs.btnSort.addEventListener('click', e => {
    e.stopPropagation();
    const isOpenSort =
      gsap.isTweening(refs.menuSort) ||
      refs.menuSort.style.pointerEvents === 'auto';

    if (!isOpenSort) {
      tlClose.pause(0);
      tlOpen.restart();
      document.addEventListener('click', outsideClickHandler);
      refs.btnSort.classList.add('open');
      refs.menuSort.classList.add('open');
      refs.btnGenres.classList.remove('open');
      refs.menuGenres.classList.remove('open');
    } else {
      tlOpen.pause(0);
      tlClose.restart();
      document.removeEventListener('click', outsideClickHandler);
      refs.btnSort.classList.remove('open');
      refs.menuSort.classList.remove('open');
    }
  });

  refs.menuSort.addEventListener('click', e => {
    refs.btnSort.classList.remove('open');
    refs.menuSort.classList.remove('open');
    const item = e.target.closest('li');
    if (!item) return;

    refs.btnSort.querySelector('.dropdown-label').textContent =
      item.textContent;
    refs.btnSort.dataset.value = item.dataset.value;

    tlOpen.pause(0);
    tlClose.restart();
    document.removeEventListener('click', outsideClickHandler);
  });
};

handleSort();
 */
