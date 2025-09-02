import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs';

//!======================================================

/* Helpers */
export function toastError(
  message = 'Something went wrong. Please try again later.',
  position = 'topRight'
) {
  iziToast.error({
    title: '',
    message,
    position,
    timeout: 3000,
    progressBar: false,
  });
}

export function toastSuccess(
  message = 'Thank you! Your feedback means a lot to us.',
  position = 'topRight',
  icon = 'ico-success'
) {
  iziToast.success({
    title: '',
    message,
    position,
    timeout: 3000,
    progressBar: false,
    icon,
  });
}

export function toastErrorFeedbacks(
  message = 'We couldn’t load the reviews. Please try again later.',
  position = 'topRight'
) {
  iziToast.error({
    title: '',
    message,
    position,
    timeout: 3000,
    progressBar: false,
  });
}

export function toastSuccessFeedbacks(
  message = 'Thank you! Your feedback means a lot to us.',
  position = 'topRight'
) {
  iziToast.success({
    title: '',
    message,
    position,
    timeout: 3000,
    progressBar: false,
  });
}

//!======================================================

export function hideLoaderArtists() {
  refs.loaderArtistsWrapper.classList.add('hidden');
}

export function showLoaderArtists() {
  refs.loaderArtistsWrapper.classList.remove('hidden');
}

//!======================================================

export function hideLoaderFeedback() {
  refs.feedbackLoader?.classList.add('hidden');
  refs.feedbackLoaderContainer?.classList.add('hidden');

  refs.feedbackLoaderContainer?.setAttribute('aria-hidden', 'true');
  refs.feedbackLoader?.setAttribute('aria-hidden', 'true');
}

export function showLoaderFeedback() {
  refs.feedbackLoaderContainer?.classList.remove('hidden');
  refs.feedbackLoader?.classList.remove('hidden');

  refs.feedbackLoaderContainer?.setAttribute('aria-hidden', 'false');
  refs.feedbackLoader?.setAttribute('aria-hidden', 'false');
}

//!======================================================
