import refs from '../refs';
import apiService from '../apiService';
import {
  renderModal,
  closeModal,
  currentFilm,
  renderModalBtnText,
} from './renderFilmModal';
import { apiStorage, storageControle } from '../localStorage';

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
    apiStorage.addToQueue(currentFilm);
    renderModalBtnText();
    return;
  }

  if (target.dataset.watched === 'addToList') {
    apiStorage.addToWatched(currentFilm);
    renderModalBtnText();
    return;
  }

  if (target.dataset.queue === 'isList') {
    apiStorage.removeToQueue(currentFilm.id);
    renderModalBtnText();
    return;
  }

  if (target.dataset.watched === 'isList') {
    apiStorage.removeToWatched(currentFilm.id);
    renderModalBtnText();
    return;
  }
}

export function handleModalKeypress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
