/* Storage */
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const page = { currentPage: 1 };

export function getFromLS(key) {
  try {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : null;
  } catch {
    iziToast.error({
      message: `Error during loading from LS for key "${key}": ${err}`,
    });
    return null;
  }
}

export function saveToLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    iziToast.error(`Error during saving to LS: ${err}`);
  }
}
