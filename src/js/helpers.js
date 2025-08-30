import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

/* Helpers */
export function toastError(message, position = 'center') {
  iziToast.error({ title: 'Error', message, position });
}

export function toastSuccess(message, position = 'center') {
  iziToast.success({ title: '🔥', message, position });
}
