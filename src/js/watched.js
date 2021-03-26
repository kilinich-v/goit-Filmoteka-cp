import rendering from './rendering';
import deletingFromLocalStorage from './deletingFromLocalStorage';

document.addEventListener('click', addToLocaleStorage);

function addToLocaleStorage(event) {
  if (event.target.classList.contains('js-watched')) {
    if (localStorage.getItem('watched') === null) {
      pushToStorage();
      changeBtnTxt();
      renderWatched();
    } else if (
      !localStorage
        .getItem('watched')
        .includes(`${document.querySelector('.card__img').src}`)
    ) {
      pushToStorage();
      changeBtnTxt();
      renderWatched();
    } else if (
      localStorage
        .getItem('watched')
        .includes(`${document.querySelector('.card__img').src}`)
    ) {
      deleteFromStorage();
      originalBtnTxt();
      renderWatched();
    }
    function pushToStorage() {
      const currentFilm = {
        poster_path: document.querySelector('.card__img').src,
        release_date: event.target.dataset.release_date,
        original_title: document.querySelector('.card__title').textContent,
        vote_average: document.querySelector('.js-vote').textContent,
      };
      const store =
        localStorage.getItem('watched') != null
          ? JSON.parse(localStorage.getItem('watched'))
          : [];
      store.push(currentFilm);

      localStorage.setItem('watched', JSON.stringify(store));
    }
    function changeBtnTxt() {
      document.querySelector('.js-watched').textContent = 'already watched';
      document.querySelector('.js-watched').classList.add('added-to-storage');
    }
    function deleteFromStorage() {
      const currentFilm = {
        poster_path: document.querySelector('.card__img').src,
        release_date: event.target.dataset.release_date,
        original_title: document.querySelector('.card__title').textContent,
        vote_average: document.querySelector('.js-vote').textContent,
      };
      deletingFromLocalStorage('watched', currentFilm);
    }
    function originalBtnTxt() {
      document.querySelector('.js-watched').textContent = 'add to watched';
      document
        .querySelector('.js-watched')
        .classList.remove('added-to-storage');
    }
  }
}

document.addEventListener('click', showAllWatched);

function showAllWatched(event) {
  if (event.target.dataset.index === 'watched') {
    const queueBtn = document.querySelector('[data-index="queue"]');
    const watchBtn = document.querySelector('[data-index="watched"]');
    watchBtn.classList.add('is__active--btn');
    queueBtn.classList.remove('is__active--btn');
    if (document.querySelector('[data-index="watched"]')) {
      rendering('watched');
    }
  }
}

function renderWatched() {
  if (!document.querySelector('[data-index="watched"]')) {
    return;
  }
  if (
    document
      .querySelector('[data-index="watched"]')
      .classList.contains('is__active--btn')
  ) {
    return rendering('watched');
  }
}
