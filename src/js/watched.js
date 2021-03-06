import refs from './refs';

import rendering from './rendering-of-watched';
document.addEventListener('click', addToLocaleStorage);

const store =
  localStorage.getItem('watched') != null
    ? JSON.parse(localStorage.getItem('watched'))
    : [];
JSON.stringify(store);

function addToLocaleStorage(event) {
  if (event.target.classList.contains('watched')) {
    if (JSON.parse(localStorage.getItem('watched')) !== null) {
      if (
        !JSON.parse(localStorage.getItem('watched')).includes(
          event.target.dataset.watched,
        )
      ) {
        store.push(event.target.dataset.watched);
        localStorage.setItem('watched', JSON.stringify(store));
      }
    } else {
      store.push(event.target.dataset.watched);
      localStorage.setItem('watched', JSON.stringify(store));
    }
  }
}

document.addEventListener('click', showAllWatched);
function showAllWatched(event) {
  if (event.target.dataset.index === 'watched') {
    refs.galleryRef.textContent = '';
    if (localStorage.getItem('watched')) {
      JSON.parse(localStorage.getItem('watched')).forEach(element => {
        return fetch(
          `https://api.themoviedb.org/3/movie/${element}?api_key=3550330ecc32a34c7342dbd44dd96d6e&language=en-US`,
        )
          .then(res => res.json())
          .then(res => rendering(res))
          .catch(error => console.log(error));
      });
    } else {
      refs.galleryRef.insertAdjacentHTML(
        'afterbegin',
        'No Watched moovies to show',
      );
    }
  }
}
