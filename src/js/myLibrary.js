import refs from '../js/refs';
import openQueueListFn from './queueList';
import inputTemplate from '../templates/header/home.hbs';
import inputTemplateMyLibrary from '../templates/header/myLibrary.hbs';
// import apiFetch from '../js/apiService.js';
// import popularFilmsGalerryTpl from '../templates/film-from-local.hbs';

const input = inputTemplate();

refs.header.insertAdjacentHTML('beforeend', input);
refs.headerButtons.addEventListener('click', toLibrary);

function toLibrary(event) {
  event.preventDefault();

  // const inputFilmsGallery = popularFilmsGalerryTpl();
  const inputIndexRef = document.querySelector('[data-index="form"]');
  const inputMyLibrary = inputTemplateMyLibrary();

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
    refs.markupMyLibraty.insertAdjacentHTML('beforeend', inputMyLibrary);
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
