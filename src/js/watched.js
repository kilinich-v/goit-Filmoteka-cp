import refs from './refs';
import rendering from './rendering-of-watched';
import storage from './libraryControll';
import createQueueListFn from './queueList';

// localStorage.clear();
const watched = localStorage.getItem('watched');
const store = watched != null ? JSON.parse(watched) : [];
document.addEventListener('click', addToLocaleStorage);

function addToLocaleStorage(event) {
  if (event.target.classList.contains('js-watched')) {
    if (localStorage.getItem('watched') === null) {
      pushToLocalStorage();
      document.querySelector('.js-watched').textContent = 'already watched';
      document
        .querySelector('.js-watched')
        .setAttribute('style', 'background: #ff6b08; color:#ffffff; border:0;');
    } else if (
      !localStorage
        .getItem('watched')
        .includes(`${document.querySelector('.card__img').src}`)
    ) {
      pushToLocalStorage();
      document.querySelector('.js-watched').textContent = 'already watched';
      document
        .querySelector('.js-watched')
        .setAttribute('style', 'background: #ff6b08; color:#ffffff; border:0;');
    }

    function pushToLocalStorage() {
      const currentFilm = {
        poster_path: document.querySelector('.card__img').src,
        release_date: event.target.dataset.release_date,
        original_title: document.querySelector('.card__title').textContent,
        vote_average: document.querySelector('.js-watched').textContent,
      };
      store.push(currentFilm);

      storage.deleteFilm(currentFilm, storage.queue);
      createQueueListFn();

      localStorage.setItem('watched', JSON.stringify(store));
    }
  }
}

document.addEventListener('click', showAllWatched);

function showAllWatched(event) {
  if (event.target.dataset.index === 'watched') {
    refs.galleryRef.textContent = '';
    if (localStorage.getItem('watched')) {
      const dataArray = JSON.parse(localStorage.getItem('watched'));
      rendering(dataArray);
    } else {
      refs.galleryRef.insertAdjacentHTML(
        'afterbegin',
        'No Watched moovies to show',
      );
    }
  }
}
