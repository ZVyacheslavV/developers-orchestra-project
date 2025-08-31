/* Feedback */

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { getFeedbacks } from './artists-api';
import { refs } from './refs';
import { Pagination, Navigation } from 'swiper/modules';

// ! ===========================================================================================

function renderRating(rating) {
  const val = normalizeRating(rating);
  const { full, frac } = splitRating(val);
  const percents = starPercents(full, frac, 5);
  const stars = renderStars(percents);
  const label = ariaLabelForRating(val, frac);

  return `
    <div class="rating" role="img" aria-label="Rating ${label}">
      ${stars}
    </div>`;
}

function feedbackTemplate({ descr, name, rating }) {
  return `
    <div class="swiper-slide feedback-card">
      ${renderRating(rating)}
      <p class="feedback-text">"${descr}"</p>
      <p class="feedback-author">${name}</p>
    </div>`;
}

function createFeedbacks(feedbacks) {
  const markup = feedbacks.map(feedbackTemplate).join('');
  refs.feedbacksContainer.insertAdjacentHTML('beforeend', markup);
}

// TODO ======================================

function normalizeRating(input) {
  const n = Number(input);
  if (Number.isNaN(n)) return 0;
  return Math.min(5, Math.max(0, n));
}

function splitRating(val) {
  const full = Math.floor(val);
  const frac = val - full;
  return { full, frac };
}

function starPercents(full, frac, maxStars = 5) {
  return Array.from({ length: maxStars }, (_, i) => {
    if (i < full) return 100;
    if (i === full) return Math.round(frac * 100);
    return 0;
  });
}

function renderStar(percent) {
  return `
    <span class="star" style="--p:${percent}%">
      <svg class="star-base" width="20" height="20" aria-hidden="true">
        <use href="img/icons.svg#icon-star"></use>
      </svg>
      <svg class="star-fill" width="20" height="20" aria-hidden="true">
        <use href="img/icons.svg#icon-star"></use>
      </svg>
    </span>`;
}

function renderStars(percents) {
  return percents.map(renderStar).join('');
}

function ariaLabelForRating(val, frac) {
  return frac === 0
    ? `${Math.floor(val)} out of 5`
    : `${val.toFixed(1)} out of 5`;
}

// ! ===========================================================================================

let swiperInstance = null;

async function renderFeedbacks() {
  try {
    if (swiperInstance) return;

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const resp = await getFeedbacks(1);
    await fontsReady;

    const list = Array.isArray(resp?.data) ? resp.data : [];
    createFeedbacks(list);

    swiperInstance = new Swiper('.swiper', {
      modules: [Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 30,
      observer: true,
      observeParents: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: false,
        renderBullet: renderCustomBullets,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      on: { slideChange: handleSlideChange },
    });

    handleSlideChange(swiperInstance);
    swiperInstance.update();

    const section = document.querySelector('#reviews');
    section?.classList.add('is-ready');
    section?.setAttribute('role', 'region');
    section?.setAttribute('aria-label', 'User feedback carousel');
  } catch (e) {
    console.error(e);
  }
}

renderFeedbacks();

// ! ===========================================================================================

function renderCustomBullets(index, className) {
  return index < 3 ? `<span class="${className}"></span>` : '';
}

// ! ===========================================================================================

function handleSlideChange(swiper) {
  updateNavigationButtons(swiper);
  updateBullets(swiper);
}

function updateNavigationButtons(swiper) {
  const prevBtn = document.querySelector('.swiper-button-prev');
  const nextBtn = document.querySelector('.swiper-button-next');

  prevBtn.classList.toggle('swiper-button-disabled', swiper.activeIndex === 0);
  nextBtn.classList.toggle(
    'swiper-button-disabled',
    swiper.activeIndex === swiper.slides.length - 1
  );
}

function updateBullets(swiper) {
  const bullets = document.querySelectorAll('.swiper-pagination span');
  if (!bullets.length) return;

  bullets.forEach(b => b.classList.remove('swiper-pagination-bullet-active'));

  if (bullets.length === 1) {
    bullets[0].classList.add('swiper-pagination-bullet-active');
    return;
  }

  const isFirst = swiper.activeIndex === 0;
  const isLast = swiper.activeIndex === swiper.slides.length - 1;

  if (bullets.length >= 3) {
    (isFirst ? bullets[0] : isLast ? bullets[2] : bullets[1]).classList.add(
      'swiper-pagination-bullet-active'
    );
  } else {
    (isFirst ? bullets[0] : bullets[1]).classList.add(
      'swiper-pagination-bullet-active'
    );
  }
}

// ! ===========================================================================================
