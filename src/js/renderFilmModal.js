import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import apiService from './apiService';
import modalTemplate from '../templates/modal.hbs';

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

  if (target.classList.value === 'backdrop') {
    closeModal();
  }

  if (target.id === 'close') {
    closeModal();
  }
}

export function handleModalKeypress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function renderModal(filmData) {
  const modalMarkup = modalTemplate(filmData);

  refs.modal.innerHTML = '';
  refs.modal.insertAdjacentHTML('afterbegin', modalMarkup);

  openModal();
}

function closeModal() {
  refs.backdrop.classList.add('is-hidden');
  refs.body.classList.remove('modal-open');
}

function openModal() {
  refs.backdrop.classList.remove('is-hidden');
  refs.body.classList.add('modal-open');
}
