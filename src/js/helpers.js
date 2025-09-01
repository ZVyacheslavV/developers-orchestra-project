import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs';

//!======================================================

/* Helpers */
export function toastError() {
  iziToast.error({
    title: '',
    message: 'Something went wrong. Please try again later.',
    position: 'topRight',
    timeout: 5000,
  });
}

export function toastErrorFeedbacks() {
  iziToast.error({
    title: '',
    message: 'We couldn’t load the reviews. Please try again later.',
    position: 'topRight',
    timeout: 5000,
  });
}

export function toastSuccessFeedbacks() {
  iziToast.success({
    title: '',
    message: 'Thank you! Your feedback means a lot to us.',
    position: 'topRight',
    timeout: 5000,
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
  refs.feedbackLoader.classList.add('hidden');
  refs.feedbackLoader.setAttribute('aria-hidden', 'true');
}

export function showLoaderFeedback() {
  refs.feedbackLoader.classList.remove('hidden');
  refs.feedbackLoader.setAttribute('aria-hidden', 'false');
}

//!======================================================
