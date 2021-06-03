import refs from '../refs';
import storageControle from './localStorageControle';

export default {
  page: 1,

  getQueue() {
    const parsedFilms = JSON.parse(localStorage.getItem('queue'));
    if (!parsedFilms) return;

    const total_results = parsedFilms.length;

    return { results: [...parsedFilms], total_results: total_results };
  },

  getWatched() {
    const parsedFilms = JSON.parse(localStorage.getItem('watched'));
    if (!parsedFilms) return;

    const total_results = parsedFilms.length;

    return { results: [...parsedFilms], total_results: total_results };
  },

  addToQueue(filmData) {
    this.addToLocalStorage('queue', filmData);
    storageControle.checkFilmFromQueue(filmData);
    refs.queueModalBtn().dataset.queue = 'isList';
  },

  removeToQueue(filmID) {
    this.removeToLocalStorage('queue', filmID);
    refs.queueModalBtn().dataset.queue = 'addToList';
  },

  addToWatched(filmData) {
    this.addToLocalStorage('watched', filmData);
    storageControle.checkFilmFromWatched(filmData);
    refs.watchedModalBtn().dataset.watched = 'isList';
  },

  removeToWatched(filmID) {
    this.removeToLocalStorage('watched', filmID);
    refs.watchedModalBtn().dataset.watched = 'addToList';
  },

  addToLocalStorage(storageItemName, filmData) {
    if (!localStorage.getItem(storageItemName)) {
      localStorage.setItem(storageItemName, '[]');
    }

    const parseFromStorage = JSON.parse(localStorage.getItem(storageItemName));
    const updatingStorage = [...parseFromStorage, ...filmData];
    localStorage.setItem(storageItemName, JSON.stringify(updatingStorage));
  },

  removeToLocalStorage(storageItemName, filmID) {
    const parseFromStorage = JSON.parse(localStorage.getItem(storageItemName));

    const filteringStorage = parseFromStorage.filter(({ id }) => id !== filmID);

    const updatingStorage = [...filteringStorage];

    updatingStorage.length
      ? localStorage.setItem(storageItemName, JSON.stringify(updatingStorage))
      : localStorage.removeItem(storageItemName);
  },
};
