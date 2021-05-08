import refs from '../refs';
import modalTemplate from '../../templates/modal.hbs';
import { handleModalKeypress } from './handleFilmModal';

export let currentFilm = {};

export function renderModal(filmData) {
  currentFilm = { ...filmData };
  const modalMarkup = modalTemplate(currentFilm);

  refs.modal.innerHTML = '';
  refs.modal.insertAdjacentHTML('afterbegin', modalMarkup);

  openModal();
}

export function closeModal() {
  window.removeEventListener('keydown', handleModalKeypress);

  refs.backdrop.classList.add('is-hidden');
  refs.body.classList.remove('modal-open');
}

export function openModal() {
  window.addEventListener('keydown', handleModalKeypress);

  refs.backdrop.classList.remove('is-hidden');
  refs.body.classList.add('modal-open');
}
