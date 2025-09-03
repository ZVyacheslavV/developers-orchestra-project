import { addNewFeedback } from './artists-api.js';

import { toastSuccessFeedbacks, toastErrorFeedbacks } from './helpers.js';

import 'css-star-rating/css/star-rating.css';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.querySelector('.feedback-backdrop');
  const form = document.querySelector('.feedback-modal-form');
  const nameInput = document.getElementById('user-name');
  const messageInput = document.getElementById('user-feedback');
  const ratingInput = document.getElementById('ratingValue');
  const submitBtn = form.querySelector('.feedback-modal-btn');
  const stars = document.querySelectorAll('.modal-star');
  const ratingError = document.getElementById('ratingError');

  function showRatingError(message) {
    ratingError.textContent = message;
  }

  function clearRatingError() {
    ratingError.textContent = '';
  }

  const wrapper = document.querySelector('.stars-wrapper');

  function fillStars(value) {
    stars.forEach((s, i) => {
      if (i + 1 <= value) {
        s.style.setProperty('--star-fill', '#764191');
      } else if (i < value) {
        const fraction = value - i;
        s.style.setProperty(
          '--star-fill',
          `linear-gradient(to right, #764191 ${fraction * 100}%, #ffffff ${
            fraction * 100
          }%)`
        );
      } else {
        s.style.setProperty('--star-fill', '#ffffff');
      }
    });
  }

  function updateStars() {
    const rating = parseFloat(ratingInput.value) || 0;
    fillStars(rating);
  }

  wrapper.addEventListener('mousemove', e => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const starWidth = rect.width / stars.length;
    const value = Math.min(stars.length, Math.ceil((x / starWidth) * 10) / 10);
    fillStars(value);
  });

  wrapper.addEventListener('click', e => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const starWidth = rect.width / stars.length;
    const value = Math.min(stars.length, Math.ceil((x / starWidth) * 10) / 10);
    ratingInput.value = value;
    updateStars();
  });

  wrapper.addEventListener('mouseleave', updateStars);

  updateStars();

  const openBtn = document.querySelector('.leave-feedback-button');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      form.reset();
      ratingInput.value = '0';
      updateStars();
      clearRatingError();
      clearError(nameInput);
      clearError(messageInput);
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeModal = () => {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  document
    .querySelector('.feedback-modal-close')
    .addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  const showError = (input, message) => {
    let errorEl = input.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('field-error')) {
      errorEl = document.createElement('div');
      errorEl.classList.add('field-error');
      input.insertAdjacentElement('afterend', errorEl);
    }

    errorEl.textContent = message;
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
  };

  const showErrorMessage = (input, message) => {
    let errorEl = input.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('field-error')) {
      errorEl = document.createElement('div');
      errorEl.classList.add('field-error');
      input.insertAdjacentElement('afterend', errorEl);
    }

    errorEl.style.position = 'absolute';
    errorEl.style.top = window.matchMedia('(min-width: 1440px)').matches
      ? '448px'
      : window.matchMedia('(min-width: 768px)').matches
      ? '428px'
      : '366px';

    errorEl.textContent = message;
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
  };

  const showErrorName = (input, message) => {
    let errorEl = input.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('field-error')) {
      errorEl = document.createElement('div');
      errorEl.classList.add('field-error');
      input.insertAdjacentElement('afterend', errorEl);
    }

    errorEl.style.position = 'absolute';
    errorEl.style.top = window.matchMedia('(min-width: 1440px)').matches
      ? '259px'
      : window.matchMedia('(min-width: 768px)').matches
      ? '239px'
      : '169px';

    errorEl.textContent = message;
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
  };

  const clearError = input => {
    let errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('field-error'))
      errorEl.textContent = '';
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearError(nameInput);
    clearError(messageInput);
    clearRatingError();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const rating = parseFloat(ratingInput.value);

    let hasError = false;

    if (name.length < 2 || name.length > 16) {
      showErrorName(nameInput, 'Name must be between 2 and 16 characters');
      hasError = true;
    }

    if (message.length < 10 || message.length > 512) {
      showErrorMessage(
        messageInput,
        'Message must be between 10 and 512 characters'
      );
      hasError = true;
    }

    if (rating < 0.25 || rating > 5) {
      showRatingError('Please provide a rating between 0.25 and 5');
      hasError = true;
    }

    if (hasError) return;

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
        'Server error: ' + (err.response?.data?.message || err.message)
      );
    } finally {
      submitBtn.disabled = false;
    }
  });

  updateStars();
});
