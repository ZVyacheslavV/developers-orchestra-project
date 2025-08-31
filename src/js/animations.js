import { gsap } from 'gsap';
import { refs } from './refs';

export const timeLines = {
  tlOpenSearch: !window.matchMedia('(min-width: 1440px)').matches
    ? gsap
        .timeline({ paused: true })
        .to(
          refs.iconSearch,
          { rotate: 180, duration: 0.35, ease: 'power2.out' },
          0
        )
        .fromTo(
          refs.panelSearch,
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
          refs.panelSearch.children,
          {
            opacity: 0,
            y: -6,
            stagger: 0.05,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.1
        )
    : null,

  tlCloseSearch: !window.matchMedia('(min-width: 1440px)').matches
    ? gsap
        .timeline({ paused: true })
        .to(refs.iconSearch, { rotate: 0, duration: 0.3, ease: 'power2.in' }, 0)
        .to(
          refs.panelSearch,
          {
            opacity: 0,
            y: -10,
            duration: 0.3,
            pointerEvents: 'none',
            ease: 'power2.in',
          },
          0
        )
    : null,

  tlOpenSort: gsap
    .timeline({ paused: true })
    .to(refs.iconSort, { rotate: 180, duration: 0.35, ease: 'power2.out' }, 0)
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
    ),

  tlCloseSort: gsap
    .timeline({ paused: true })
    .to(refs.iconSort, { rotate: 0, duration: 0.3, ease: 'power2.in' }, 0)
    .to(
      refs.menuSort,
      {
        opacity: 0,
        y: -10,
        duration: 0.3,
        pointerEvents: 'none',
        ease: 'power2.in',
      },
      0
    ),

  tlOpenGenres: gsap
    .timeline({ paused: true })
    .to(refs.iconGenres, { rotate: 180, duration: 0.35, ease: 'power2.out' }, 0)
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
    ),

  tlCloseGenres: gsap
    .timeline({ paused: true })
    .to(refs.iconGenres, { rotate: 0, duration: 0.3, ease: 'power2.in' }, 0)
    .to(
      refs.menuGenres,
      {
        opacity: 0,
        y: -10,
        duration: 0.3,
        pointerEvents: 'none',
        ease: 'power2.in',
      },
      0
    ),
};
