import refs from './refs';

import rendering from './rendering-of-watched';
document.addEventListener('click', addToLocaleStorage);
// localStorage.clear();
const store =
  localStorage.getItem('watched') != null
    ? JSON.parse(localStorage.getItem('watched'))
    : [];
function addToLocaleStorage(event) {
  if (event.target.classList.contains('watched')) {
    if (localStorage.getItem('watched') != null) {
      if (
        !localStorage
          .getItem('watched')
          .includes(`${event.target.dataset.poster}`)
      ) {
        console.log(event.currentTarget);
        store.push({
          poster_path: event.target.dataset.poster,
          release_date: event.target.dataset.release_date,
          original_title: event.target.dataset.original_title,
        });
        localStorage.setItem('watched', JSON.stringify(store));
      }
    } else {
      store.push({
        poster_path: event.target.dataset.poster,
        release_date: event.target.dataset.release_date,
        original_title: event.target.dataset.original_title,
      });
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
