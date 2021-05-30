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
  if (refs.queueModalBtn().dataset.queue === 'isList') {
    refs.queueModalBtn().textContent = 'In Queue';
  } else {
    refs.queueModalBtn().textContent = 'Add to Queue';
  }

  if (refs.watchedModalBtn().dataset.watched === 'isList') {
    refs.watchedModalBtn().textContent = 'In Watched';
  } else {
    refs.watchedModalBtn().textContent = 'Add to Watched';
  }
}

function clearModal() {
  refs.modal.innerHTML = '';
}
