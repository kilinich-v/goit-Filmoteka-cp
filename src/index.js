import './styles.scss';
import './js/myLibrary';
import _ from 'lodash';
import refs from './js/refs';
import './js/paginJS';
import apiFetch from './js/apiService.js';
import addToQueueList from './js/addToQueueList';
import './js/open-close-modal';
import './js/watched';
import './js/libraryControll';
import popularFilmsGalerryTpl from './templates/filmgallery.hbs';
import modalTpl from './templates/modal.hbs';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './js/modal-team';
import pnotify from './js/notification';

//============== вставка Dr.Frame======================
//=====================================================

// мои ссылки для корректной работы впихнутого кода
const inputRef = document.querySelector('.filmSearch__input');
const formRef = document.querySelector('.filmSearch');
const galleryRef = refs.galleryRef;
const modalRef = refs.modalRef;
const backdropRef = document.querySelector('#js-backdrop');

startPopularFilms();
formRef.addEventListener('submit', handleSearchQuery);
galleryRef.addEventListener('click', modalMatchesFounder);

// ============= функции отвечает за стартовую загрузку популярных фильмов =============================

//массив жанров от АПИ
export let genreDB = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

// берут значение после фетча
const resultData = {
  currentPage: 1,
  totalPages: null,
  totalResults: null,
};

//заходит сюда отрендеренный масив
let moviesArr;
//заходит обьект для рендера модалки
let currentFilmObj = {};

export function startPopularFilms() {
  formRef.firstElementChild.value = '';
  refs.spinner.classList.remove('is-hidden'); //добавляет спиннер
  refs.galleryRef.classList.remove('movie__list--error');
  paginationJsPopular();
  refs.spinner.classList.add('is-hidden'); //прячет спиннер
}

function paginationJsPopular() {
  const trendingsUrl = apiFetch.trendingUrl;
  const trendingUrlApiKey = `${trendingsUrl}${apiFetch.apiKey}`;
  const galleryRef = refs.galleryRef;

  $('#pagination-container').pagination({
    dataSource: trendingUrlApiKey,
    locator: 'results',
    totalNumberLocator: data => data.total_results,
    pageSize: 20,
    alias: {
      pageNumber: 'page',
    },
    prevText: '',
    nextText: '',
    callback: function (data, pagination) {
      galleryRef.innerHTML = '';
      handlePopularFilmMarkup(genreTransform(data, genreDB));
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  });
}

//функции отвечающие за отрисовку запроса

function handleSearchQuery(event) {
  refs.paginationRef.classList.remove('pagination-is-hide');
  event.preventDefault();
  apiFetch.searchQuerry = '';
  apiFetch.searchQuerry = inputRef.value;

  if (inputRef.value) {
    galleryRef.innerHTML = '';
    refs.spinner.classList.remove('is-hidden'); //добавляет спиннер
    paginationJsSearch();
    refs.spinner.classList.add('is-hidden'); //прячет спиннер
  } else {
    // galleryRef.innerHTML = '';
    // startPopularFilms();
    pnotify.showNotice();
  }
}

function paginationJsSearch() {
  const searchUrl = apiFetch.searchUrl;
  const querry = apiFetch.searchQuerry;
  const searchUrlApiKey = `${searchUrl}${apiFetch.apiKey}&query=${querry}`;
  const galleryRef = refs.galleryRef;

  $('#pagination-container').pagination({
    dataSource: searchUrlApiKey,
    locator: 'results',
    totalNumberLocator: data => data.total_results,
    pageSize: 20,
    alias: {
      pageNumber: 'page',
    },
    prevText: '',
    nextText: '',
    callback: function (data, pagination) {
      if (data.length === 0) {
        pnotify.showError();
        failureMarkup(galleryRef);
        refs.paginationRef.classList.add('pagination-is-hide');
      } else {
        galleryRef.innerHTML = '';
        handlePopularFilmMarkup(genreTransform(data, genreDB));
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    },
  });
}

// меняет числа жанров на название и дату релиза
function genreTransform(moviesDB, genreDB) {
  const transferedGenreArr = moviesDB.map(film => {
    //ставим заглушку если нету фото
    if (film.poster_path === null) {
      film.poster_path = 'https://i.ibb.co/hWJT4yj/noImage.jpg';
    } else {
      const newPosterPath = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;
      film.poster_path = newPosterPath;
    }

    //изменяем дату
    const newDate = film.release_date.slice(0, 4);

    //изменяем жанр
    let genreArr = [];
    film.genre_ids.forEach(genreId => {
      for (const genre of genreDB) {
        if (genre.id === genreId) {
          genreArr.push(genre.name);
        }
      }
    });
    return { ...film, genre_ids: genreArr, release_date: newDate };
  });
  moviesArr = transferedGenreArr;

  return transferedGenreArr;
}

//ставит разметку популярных фильмов
function handlePopularFilmMarkup(popularFilms) {
  const popularMarkup = popularFilmsGalerryTpl(popularFilms);
  galleryRef.insertAdjacentHTML('beforeend', popularMarkup);
}

// =================================================================================================

// рисует разметку когда нету результатов запроса
function failureMarkup(placeToInsert) {
  const failureMarkup = `<div class="error">
  <div class="error-img"><img class="js-img-error" src="https://i.ibb.co/4WvT00q/caterror.jpg" alt="" width="300"></div>

  <p class="gallery__failure"> Unfortunately, no matches found. <span>Try again!</span> </p>
</div>`;
  placeToInsert.insertAdjacentHTML('afterbegin', failureMarkup);
}

// =================== модалка вывод фильма по клику =======================================

function modalMatchesFounder(event) {
  if (
    event.target.nodeName !== 'IMG' ||
    event.target.classList.contains('js-img-error')
  ) {
    return;
  }
  //вызов рендеринга модалки
  const toMatch = event.target.dataset.compare;

  moviesArr.forEach(item => {
    if (item.poster_path === toMatch) {
      currentFilmObj = { ...item };
    } else {
      return;
    }
  });
  handleModalMarkup(currentFilmObj);
  changeBtnWatchedText(event);
  backdropRef.classList.remove('is-hidden');
  addToQueueList(currentFilmObj);
}

//изменяет жанр при рендере модалки
function modalGenreEditor(movie, genreDB) {
  //изменяем жанр
  let genreArr = [];
  movie.genre_ids.forEach(genreId => {
    for (const genre of genreDB) {
      if (genre.id === genreId) {
        genreArr.push(genre.name);
      }
    }
  });
  movie.genre_ids = genreArr;
  return movie;
}

//рендерит разметку модального окна
function handleModalMarkup(currentMovie) {
  const modalMarkup = modalTpl(currentMovie);
  refs.modalBoxRef.insertAdjacentHTML('afterbegin', modalMarkup);
  refs.body.classList.add('hide-overflow');
}
function changeBtnWatchedText(event) {
  if (
    localStorage.getItem('watched') != null &&
    localStorage.getItem('watched').includes(`${event.target.src}`)
  ) {
    document.querySelector('.js-watched').textContent = 'already watched';
    document.querySelector('.js-watched').classList.add('added-to-storage');
  }
  if (
    localStorage.getItem('queue') != null &&
    localStorage.getItem('queue').includes(`${event.target.src}`)
  ) {
    document.querySelector('.js-queue').textContent = 'in queue';
    document.querySelector('.js-queue').classList.add('added-to-storage');
  }
}

// ======================== конец кода  Dr.Frame  =============================================
//==================================================================================
