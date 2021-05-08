import refs from '../refs';
import apiService from '../apiService';
import { renderModal, closeModal, currentFilm } from './renderFilmModal';

export function handleCreateModal(event) {
  event.preventDefault();

  if (!event.target?.dataset?.movieid) {
    return;
  }

  apiService.movieID = event.target.dataset.movieid;
  apiService.fetchMovieInfo().then(data => {
    renderModal(data);
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

  if (target.dataset.index === 'queue') {
    console.log(currentFilm);
  }

  if (target.dataset.index === 'watched') {
    console.log(currentFilm);
  }
}

export function handleModalKeypress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
