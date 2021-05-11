import refs from '../refs';
import modalTemplate from '../../templates/modal.hbs';
import { handleModalKeypress } from './handleFilmModal';

export let currentFilm = {};

export function renderModal(filmData) {
  currentFilm = { ...filmData };
  const modalMarkup = modalTemplate(currentFilm);

  clearModal();
  refs.modal.insertAdjacentHTML('afterbegin', modalMarkup);

  openModal();
}

export function closeModal() {
  window.removeEventListener('keydown', handleModalKeypress);

  refs.backdrop.classList.add('is-hidden');
  refs.body.classList.remove('modal-open');

  clearModal();
}

export function openModal() {
  window.addEventListener('keydown', handleModalKeypress);

  refs.backdrop.classList.remove('is-hidden');
  refs.body.classList.add('modal-open');
}

export function renderModalBtnText() {
  if (refs.queue().dataset.queue === 'isList') {
    refs.queue().textContent = 'In Queue';
  } else {
    refs.queue().textContent = 'Add to Queue';
  }

  if (refs.watched().dataset.watched === 'isList') {
    refs.watched().textContent = 'In Watched';
  } else {
    refs.watched().textContent = 'Add to Watched';
  }
}

function clearModal() {
  refs.modal.innerHTML = '';
}
