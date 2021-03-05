import refs from '../js/refs';
import inputTemplate from '../templates/header/home.hbs';
import inputTemplateMyLibrary from '../templates/header/myLibrary.hbs';
const input = inputTemplate();

refs.header.insertAdjacentHTML('beforeend', input);
//********************************** */

function toLibrary() {
  const inputFilmSearch = document.querySelector('.filmSearch');
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
      inputFilmSearch.classList.add('is__hidden');
      refs.markupMyLibraty.insertAdjacentHTML('beforeend', inputMyLibrary);
    }
    if (buttonId === 'home') {
      refs.pageHeader.classList.remove('header__watched');
      refs.pageHeader.classList.add('header__home');
      inputFilmSearch.classList.remove('is__hidden');
      refs.markupMyLibraty.innerHTML = '';
    }
  });
}

toLibrary();
