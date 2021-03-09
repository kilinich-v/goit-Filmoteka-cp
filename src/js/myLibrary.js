import refs from '../js/refs';
import openQueueListFn from './queueList';
import inputTemplate from '../templates/header/home.hbs';
import inputTemplateMyLibrary from '../templates/header/myLibrary.hbs';

const input = inputTemplate();

refs.header.insertAdjacentHTML('beforeend', input);

function toLibrary() {
  //! Не удалять
  const inputIndexRef = document.querySelector('[data-index="form"]');
  //****************** */

  const inputMyLibrary = inputTemplateMyLibrary();
  refs.headerButtons.addEventListener('click', event => {
    event.preventDefault();

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
      openQueueListFn();
    }
    if (buttonId === 'home') {
      refs.pageHeader.classList.remove('header__watched');
      refs.pageHeader.classList.add('header__home');
      inputIndexRef.classList.remove('is__hidden');
      refs.markupMyLibraty.innerHTML = '';
    }
  });
}
// коментарий готов

toLibrary();
