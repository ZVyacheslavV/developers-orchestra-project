// feedback-modal.js

import { addNewFeedback } from './artists-api.js';
import { toastSuccessFeedbacks, toastErrorFeedbacks } from './helpers.js';
import 'css-star-rating/css/star-rating.css';

document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.querySelector('.feedback-backdrop');
  const form = document.querySelector('.feedback-modal-form');
  const nameInput = document.getElementById('user-name');
  const messageInput = document.getElementById('user-feedback');
  const ratingInput = document.getElementById('ratingValue');
  const submitBtn = form.querySelector('.feedback-modal-btn');
  const stars = document.querySelectorAll('.modal-star');
  const ratingError = document.getElementById('ratingError');
  const wrapper = document.querySelector('.stars-wrapper');
  const openBtn = document.querySelector('.leave-feedback-button');
  const closeBtn = document.querySelector('.feedback-modal-close');

  const LIMITS = {
    name: { min: 2, max: 16 },
    message: { min: 10, max: 512 },
  };

  const ERROR_TOPS = {
    name: { desktop: '259px', tablet: '239px', mobile: '169px' },
    message: { desktop: '448px', tablet: '428px', mobile: '366px' },
  };

  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

  const currentBreakpoint = () => {
    if (window.matchMedia('(min-width: 1440px)').matches) return 'desktop';
    if (window.matchMedia('(min-width: 768px)').matches) return 'tablet';
    return 'mobile';
  };

  const errorTopFor = field => {
    const bp = currentBreakpoint();
    return ERROR_TOPS[field]?.[bp] ?? '0px';
  };

  const ensureErrorEl = input => {
    const footer = input.parentElement.querySelector('.input-footer');
    let errorEl = footer.querySelector('.field-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.classList.add('field-error');
      footer.insertAdjacentElement('afterbegin', errorEl);
    }
    return errorEl;
  };

  const showFieldError = (input, message) => {
    const el = ensureErrorEl(input);
    el.textContent = message;
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
  };

  const clearError = input => {
    const el = input.parentElement.querySelector('.field-error');
    if (el && el.id !== 'ratingError') {
      el.remove();
    }
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
  };

  const showRatingError = message => {
    ratingError.textContent = message;
    ratingError.style.display = 'block';
  };

  const clearRatingError = () => {
    ratingError.textContent = '';
  };

  const parseRating = () => {
    const r = parseFloat(ratingInput.value);
    return Number.isFinite(r) ? r : 0;
  };

  function detectedMaxLength(input, fallbackMax) {
    const a = parseInt(input.getAttribute('maxlength'), 10);
    return Number.isFinite(a) && a > 0 ? a : fallbackMax;
  }

  function enforceMaxLength(input, max) {
    if (typeof input.value !== 'string') return;
    if (input.value.length > max) {
      input.value = input.value.slice(0, max);
    }
  }

  const ensureCounterEl = input => {
    const footer = input.parentElement.querySelector('.input-footer');
    let counterEl = footer.querySelector('.char-counter');
    if (!counterEl) {
      counterEl = document.createElement('div');
      counterEl.classList.add('char-counter');
      footer.appendChild(counterEl); // справа
    }
    return counterEl;
  };

  function updateCounter(input, max) {
    const counter = ensureCounterEl(input);
    const len = input.value.length;
    counter.textContent = `${len}/${max}`;
  }

  function attachMaxLengthGuardWithCounter(input, fallbackMax, minRequired) {
    const max = detectedMaxLength(input, fallbackMax);

    enforceMaxLength(input, max);
    updateCounter(input, max);

    input.addEventListener('input', () => {
      enforceMaxLength(input, max);
      updateCounter(input, max);

      if (
        typeof minRequired === 'number' &&
        input.value.trim().length >= minRequired
      ) {
        clearError(input);
      }
    });

    input.addEventListener('blur', () => {
      enforceMaxLength(input, max);
      updateCounter(input, max);
    });
  }

  function fillStars(value) {
    stars.forEach((s, i) => {
      if (i + 1 <= value) {
        s.style.setProperty('--star-fill', '#764191');
      } else if (i < value) {
        const fraction = value - i;
        const pct = clamp(fraction * 100, 0, 100);
        s.style.setProperty(
          '--star-fill',
          `linear-gradient(to right, #764191 ${pct}%, #ffffff ${pct}%)`
        );
      } else {
        s.style.setProperty('--star-fill', '#ffffff');
      }
    });
  }

  function updateStars() {
    const rating = clamp(parseRating(), 0, 5);
    fillStars(rating);
    if (rating >= 0.1) ratingError.textContent = '';
  }

  function handleStarsMouseMove(e) {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const starWidth = rect.width / stars.length;
    const value = clamp(Math.ceil((x / starWidth) * 10) / 10, 0, stars.length);
    fillStars(value);
  }

  function handleStarsClick(e) {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const starWidth = rect.width / stars.length;
    const value = clamp(Math.ceil((x / starWidth) * 10) / 10, 0, stars.length);
    ratingInput.value = String(value);
    updateStars();
  }

  function openModal() {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    clearError(nameInput);
    clearError(messageInput);
    clearRatingError();

    updateAllCounters();
    updateStars();
  }

  function closeModal() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function validateForm() {
    clearError(nameInput);
    clearError(messageInput);
    clearRatingError();

    let ok = true;
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const rating = parseRating();

    if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
      showFieldError(
        nameInput,
        `Name must be between ${LIMITS.name.min} and ${LIMITS.name.max} characters`
      );
      ok = false;
    }

    if (
      message.length < LIMITS.message.min ||
      message.length > LIMITS.message.max
    ) {
      showFieldError(
        messageInput,
        `Message must be between ${LIMITS.message.min} and ${LIMITS.message.max} characters`
      );
      ok = false;
    }

    if (rating < 1) {
      showRatingError('Please, provide a rating between 1 and 5');
      ok = false;
    }

    return { ok, name, message, rating };
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { ok, name, message, rating } = validateForm();
    if (!ok) return;

    submitBtn.disabled = true;
    try {
      await addNewFeedback(name, rating, message);
      toastSuccessFeedbacks('Thank you! Your feedback has been submitted.');

      form.reset();
      ratingInput.value = '0';
      updateStars();
      closeModal();
    } catch (err) {
      toastErrorFeedbacks(
        'Server error: ' + (err?.response?.data?.message || err.message)
      );
    } finally {
      submitBtn.disabled = false;
    }
  }

  wrapper.addEventListener('mousemove', handleStarsMouseMove);
  wrapper.addEventListener('click', handleStarsClick);
  wrapper.addEventListener('mouseleave', updateStars);

  // ћодалка
  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  form.addEventListener('submit', handleSubmit);

  function updateAllCounters() {
    updateCounter(nameInput, detectedMaxLength(nameInput, LIMITS.name.max));
    updateCounter(
      messageInput,
      detectedMaxLength(messageInput, LIMITS.message.max)
    );
  }

  attachMaxLengthGuardWithCounter(nameInput, LIMITS.name.max, LIMITS.name.min);
  attachMaxLengthGuardWithCounter(
    messageInput,
    LIMITS.message.max,
    LIMITS.message.min
  );

  updateStars();
});

function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

const textarea = document.getElementById('user-feedback');
if (textarea) {
  textarea.addEventListener('input', () => autoResizeTextarea(textarea));
  autoResizeTextarea(textarea);
}
