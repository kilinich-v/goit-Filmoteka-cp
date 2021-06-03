import refs from '../refs';
import homeHeaderTemplate from '../../templates/header/home.hbs';
import myLibraryHeaderTemplate from '../../templates/header/myLibrary.hbs';
import logoSprite from '../../images/film.svg';

export function renderHomeHeader() {
  const homeHeaderMarkup = homeHeaderTemplate();

  refs.header.innerHTML = '';
  refs.header.insertAdjacentHTML('afterbegin', homeHeaderMarkup);
}

export function renderLibraryHeader() {
  const myLibraryHeaderMarkup = myLibraryHeaderTemplate();

  refs.header.innerHTML = '';
  refs.header.insertAdjacentHTML('afterbegin', myLibraryHeaderMarkup);
}
