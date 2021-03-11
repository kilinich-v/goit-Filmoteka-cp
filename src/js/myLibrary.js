import refs from '../js/refs';
import openQueueListFn from './queueList';
import inputTemplate from '../templates/header/home.hbs';
import inputTemplateMyLibrary from '../templates/header/myLibrary.hbs';
// import apiFetch from '../js/apiService.js';
// import popularFilmsGalerryTpl from '../templates/film-from-local.hbs';

const input = inputTemplate();

refs.myLibraryBtn.addEventListener('click', libraryMarkup);
refs.header.insertAdjacentHTML('beforeend', input);
refs.headerButtons.addEventListener('click', toLibrary);

function toLibrary(event) {
  event.preventDefault();

  const inputIndexRef = document.querySelector('[data-index="form"]');

  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  const currentActiveBtn = refs.headerButtons.querySelector('.current');

  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('current');
  }

  const controlBtn = event.target;
  controlBtn.classList.add('current');

  const buttonId = controlBtn.getAttribute('id');
  if (buttonId === 'myLibrary') {
    refs.pageHeader.classList.remove('header__home');
    refs.pageHeader.classList.add('header__watched');
    inputIndexRef.classList.add('is__hidden');
    refs.galleryRef.innerHTML = '';
    openQueueListFn();
  }
  if (buttonId === 'home') {
    refs.pageHeader.classList.remove('header__watched');
    refs.pageHeader.classList.add('header__home');
    inputIndexRef.classList.remove('is__hidden');
    refs.markupMyLibraty.innerHTML = '';
    window.location.reload();
  }
}

function libraryMarkup() {
  const inputMyLibrary = inputTemplateMyLibrary();
  refs.markupMyLibraty.innerHTML = '';
  refs.markupMyLibraty.insertAdjacentHTML('beforeend', inputMyLibrary);
}
