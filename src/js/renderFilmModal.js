import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import apiService from './apiService';
import modalTemplate from '../templates/modal.hbs';

function renderModal(filmData) {
  const modalMarkup = modalTemplate(filmData);

  refs.modal.insertAdjacentHTML('afterbegin', modalMarkup);
}

export function handleFilmModal(event) {
  event.preventDefault();

  if (event.target.dataset.movieid) {
    apiService.movieID = event.target.dataset.movieid;
  }

  apiService.fetchMovieInfo().then(data => {
    renderModal(data);
    console.log(refs.backdrop);
    refs.backdrop.classList.remove('is-hidden');
  });
}

export function handleCloseModal(event) {}
