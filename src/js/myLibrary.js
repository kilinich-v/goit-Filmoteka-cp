import refs from '../js/refs';
import inputTemplate from '../templates/header/home.hbs';
import inputTemplateMyLibrary from '../templates/header/myLibrary.hbs';

// for line 34, added be M.Permiakova
import openQueueListFn from './queueList';

function toLibrary() {
  const inputMyLibrary = inputTemplateMyLibrary();
  refs.btn.addEventListener('click', event => {
    event.preventDefault();

    if (event.target.nodeName !== 'BUTTON') {
      return;
    }

    const currentActiveBtn = refs.btn.querySelector('.current');

    if (currentActiveBtn) {
      currentActiveBtn.classList.remove('current');
    }

    const controlBtn = event.target;
    controlBtn.classList.add('current');

    const buttonId = controlBtn.getAttribute('id');
    if (buttonId === 'myLibrary') {
      refs.pageHeader.classList.remove('header__home');
      refs.pageHeader.classList.add('header__watched');
      refs.inputQuery.classList.add('is__hidden');
      refs.markupMyLibraty.insertAdjacentHTML('beforeend', inputMyLibrary);

      // added by M.Permiakova
      openQueueListFn();
    }
    if (buttonId === 'home') {
      refs.pageHeader.classList.remove('header__watched');
      refs.pageHeader.classList.add('header__home');
      refs.inputQuery.classList.remove('is__hidden');
      refs.markupMyLibraty.innerHTML = '';
    }
  });
}

toLibrary();
