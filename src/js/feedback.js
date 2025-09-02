import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'css-star-rating/css/star-rating.css';

import { getFeedbacks } from './artists-api';
import { refs } from './refs';
import { Pagination, Navigation } from 'swiper/modules';

import {
  hideLoaderFeedback,
  showLoaderFeedback,
  toastErrorFeedbacks,
} from './helpers';

// ! ===========================================================================================

function ratingMarkup(rating) {
  const cls = ratingClasses(rating);
  const aria = roundToHalf(rating);
  const starSvg = `
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
        1.402 8.173L12 18.897l-7.336 3.86 
        1.402-8.173L.132 9.21l8.2-1.192z"></path>
    </svg>`;

  return `
    <div class="${cls}" aria-label="Rating ${aria} out of 5">
      <div class="star-container">
        <div class="star"><span class="star-empty">${starSvg}</span><span class="star-half">${starSvg}</span><span class="star-filled">${starSvg}</span></div>
        <div class="star"><span class="star-empty">${starSvg}</span><span class="star-half">${starSvg}</span><span class="star-filled">${starSvg}</span></div>
        <div class="star"><span class="star-empty">${starSvg}</span><span class="star-half">${starSvg}</span><span class="star-filled">${starSvg}</span></div>
        <div class="star"><span class="star-empty">${starSvg}</span><span class="star-half">${starSvg}</span><span class="star-filled">${starSvg}</span></div>
        <div class="star"><span class="star-empty">${starSvg}</span><span class="star-half">${starSvg}</span><span class="star-filled">${starSvg}</span></div>
      </div>
    </div>`;
}

function renderRating(rating) {
  return ratingMarkup(rating);
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

function clamp01to5(x) {
  const n = Number(x);
  return Math.min(5, Math.max(0, Number.isNaN(n) ? 0 : n));
}

function roundToHalf(x) {
  return Math.round(clamp01to5(x) * 2) / 2;
}

function ratingClasses(rating) {
  const val = roundToHalf(rating);
  const intPart = Math.floor(val);
  const hasHalf = val % 1 !== 0;
  return `rating medium star-icon ${
    hasHalf ? 'half' : ''
  } value-${intPart} label-hidden`;
}

// ! ===========================================================================================

let swiperInstance = null;

async function renderFeedbacks() {
  showLoaderFeedback();

  try {
    if (swiperInstance) return;

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const resp = await getFeedbacks(1);
    await fontsReady;

    const list = Array.isArray(resp?.data) ? resp.data : [];

    if (!list.length) {
      renderEmptyState();
    } else {
      createFeedbacks(list);
    }

    swiperInstance = new Swiper('.swiper', {
      modules: [Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 30,

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
  } catch (err) {
    toastErrorFeedbacks();
    renderEmptyState();
  } finally {
    hideLoaderFeedback();
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

function renderEmptyState() {
  refs.feedbacksContainer.insertAdjacentHTML(
    'beforeend',
    `
    <div class="swiper-slide feedback-card">
      <p class="feedback-text">
        We are waiting for your feedback! Be the first to share your impressions.
      </p>
    </div>`
  );
  const swiperNav = document.querySelector('.swiper-nav');
  swiperNav?.classList.add('hidden');
}

// ! ===========================================================================================
