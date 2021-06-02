import apiService from '../apiService';
import refs from '../refs';
import {
  renderModal,
  closeModal,
  currentFilm,
  renderModalBtnText,
} from './renderFilmModal';
import { getFilmsFromQueue, getFilmsFromWatched } from '../gallery';
import { apiStorage, storageControle } from '../localStorage';
import { route } from '../routing';

export function handleCreateModal(event) {
  event.preventDefault();

  if (!event.target?.dataset?.movieid) {
    return;
  }

  apiService.movieID = event.target.dataset.movieid;
  apiService.fetchMovieInfo().then(data => {
    renderModal(data);
    storageControle.checkFilmBeforeModalRender(currentFilm);
    renderModalBtnText();
  });
}

export function handleModalClick(event) {
  const target = event.target;

  if (target.dataset.index === 'backdrop') {
    closeModal();
  }

  if (target.id === 'close') {
    closeModal();
  }

  if (target.dataset.queue === 'addToList') {
    refs.queueModalBtn().classList.add('current-mylibrary');
    refs.watchedModalBtn().classList.remove('current-mylibrary');

    apiStorage.addToQueue(currentFilm);
    renderModalBtnText();

    if (location.pathname === route.queue) getFilmsFromQueue();
    if (location.pathname === route.watched) getFilmsFromWatched();

    return;
  }

  if (target.dataset.watched === 'addToList') {
    refs.watchedModalBtn().classList.add('current-mylibrary');
    refs.queueModalBtn().classList.remove('current-mylibrary');

    apiStorage.addToWatched(currentFilm);
    renderModalBtnText();

    if (location.pathname === route.queue) getFilmsFromQueue();
    if (location.pathname === route.watched) getFilmsFromWatched();

    return;
  }

  if (target.dataset.queue === 'isList') {
    refs.queueModalBtn().classList.remove('current-mylibrary');

    apiStorage.removeToQueue(currentFilm.id);
    renderModalBtnText();

    if (location.pathname === route.queue) getFilmsFromQueue();
    if (location.pathname === route.watched) getFilmsFromWatched();

    return;
  }

  if (target.dataset.watched === 'isList') {
    refs.watchedModalBtn().classList.remove('current-mylibrary');

    apiStorage.removeToWatched(currentFilm.id);
    renderModalBtnText();

    if (location.pathname === route.queue) getFilmsFromQueue();
    if (location.pathname === route.watched) getFilmsFromWatched();

    return;
  }
}

export function handleModalKeypress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
