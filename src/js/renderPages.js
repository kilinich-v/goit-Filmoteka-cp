import refs from './refs';
import { getPopularFilms, getFilmsFromQueue } from './gallery/handleGallery';
import homeHeaderTemplate from '../templates/header/home.hbs';
import logoSprite from '../images/sprite.svg';

export function renderHomeHeader() {
  const homeHeaderMarkup = homeHeaderTemplate(logoSprite);

  refs.header.innerHTML = '';
  refs.header.insertAdjacentHTML('afterbegin', homeHeaderMarkup);
}

export function handlePagesClick(event) {
  const target = event.target;

  if (target.id === 'home') {
    getPopularFilms();
  }

  if (target.id === 'myLibrary') {
    getFilmsFromQueue();
  }
}
