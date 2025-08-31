import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs } from './refs';

/* Helpers */
export function toastError(message, position = 'center') {
  iziToast.error({ /* title: 'Error', */ message, position });
}

export function toastSuccess(message, position = 'center') {
  iziToast.success({ /* title: '🔥', */ message, position });
}

export function hideLoaderArtists() {
  refs.loaderArtistsWrapper.classList.add('hidden');
}

export function showLoaderArtists() {
  refs.loaderArtistsWrapper.classList.remove('hidden');
}
