import apiStorage from './localStorageService';
import refs from '../refs';

function checkFilmFromQueue(filmData) {
  const parseWatchedList = JSON.parse(localStorage.getItem('watched'));

  if (
    parseWatchedList &&
    parseWatchedList.find(({ id }) => filmData.id === id)
  ) {
    apiStorage.removeToWatched(filmData.id);
    refs.watched().dataset.watched = 'addToList';
  }
}

function checkFilmFromWatched(filmData) {
  const parseQueueList = JSON.parse(localStorage.getItem('queue'));

  if (parseQueueList && parseQueueList.find(({ id }) => filmData.id === id)) {
    apiStorage.removeToQueue(filmData.id);
    refs.queue().dataset.queue = 'addToList';
  }

  refs.watched().dataset.watched = 'isList';
}

function checkFilmBeforeModalRender(filmData) {
  const parseQueueList = JSON.parse(localStorage.getItem('queue'));
  const parseWatchedList = JSON.parse(localStorage.getItem('watched'));

  if (parseQueueList && parseQueueList.find(({ id }) => filmData.id === id)) {
    refs.queue().dataset.queue = 'isList';
  }

  if (
    parseWatchedList &&
    parseWatchedList.find(({ id }) => filmData.id === id)
  ) {
    refs.watched().dataset.watched = 'isList';
  }
}

export default {
  checkFilmFromQueue,
  checkFilmFromWatched,
  checkFilmBeforeModalRender,
};
