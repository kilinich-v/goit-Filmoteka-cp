import refs from '../js/refs';
import createQueueListFn from './queueList';
import inputTemplate from '../templates/header/home.hbs';
import inputTemplateMyLibrary from '../templates/header/myLibrary.hbs';
import { startPopularFilms } from '../index';

const input = inputTemplate();

refs.header.insertAdjacentHTML('beforeend', input);
refs.headerButtons.addEventListener('click', toLibrary);
refs.myLibraryBtn.addEventListener('click', libraryMarkup);

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
    createQueueListFn();
    const queueBtn = document.querySelector('[data-index="queue"]');
    queueBtn.addEventListener('click', createQueueListFn);
    queueBtn.classList.add('is__active--btn');
  }
  if (buttonId === 'home') {
    refs.pageHeader.classList.remove('header__watched');
    refs.pageHeader.classList.add('header__home');
    inputIndexRef.classList.remove('is__hidden');
    refs.markupMyLibraty.innerHTML = '';
    refs.paginationRef.classList.remove('pagination-is-hide');
    refs.galleryRef.innerHTML = '';
    startPopularFilms();
  }
}

function libraryMarkup() {
  const inputMyLibrary = inputTemplateMyLibrary();
  refs.markupMyLibraty.innerHTML = '';
  refs.markupMyLibraty.insertAdjacentHTML('beforeend', inputMyLibrary);
  refs.paginationRef.classList.add('pagination-is-hide');
}
