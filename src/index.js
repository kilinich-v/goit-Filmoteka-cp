import './styles.scss';
import './js/myLibrary';
const _ = require('lodash');
import refs from './js/refs';
import apiFetch from './js/apiService.js';
import './js/open-close-modal';
import popularFilmsGalerryTpl from './templates/filmgallery.hbs';
import modalTpl from './templates/modal.hbs';

//============== вставка Dr.Frame======================
//=====================================================

// мои ссылки для корректной работы впихнутого кода
const inputRef = document.querySelector('.filmSearch__input');
const galleryRef = refs.galleryRef;
const modalRef = refs.modalRef;
const backdropRef = document.querySelector('#js-backdrop');

startPopularFilms();
inputRef.addEventListener('input', _.debounce(handleSearchQuery, 700));
galleryRef.addEventListener('click', modalMatchesFounder);

// ============= функции отвечает за стартовую загрузку популярных фильмов =============================

//массив жанров от АПИ
let genreDB = [
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
let currentPage = 1;
let totalPages;
let totalResults;

//заходит сюда отрендеренный масив
let moviesArr;
//заходит обьект для рендера модалки
let currentFilmObj = {};

function startPopularFilms() {
  apiFetch
    .fetchPopularMovieGallery()
    .then(data => {
      currentPage = data.page;
      totalPages = data.total_pages;
      totalResults = data.total_results;
      return data;
    })
    .then(({ results }) => {
      handlePopularFilmMarkup(genreTransform(results, genreDB));
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
  console.log(moviesArr);
  return transferedGenreArr;
}

//ставит разметку популярных фильмов
function handlePopularFilmMarkup(popularFilms) {
  const popularMarkup = popularFilmsGalerryTpl(popularFilms);
  galleryRef.insertAdjacentHTML('beforeend', popularMarkup);
}

// =================================================================================================

//функции отвечающие за отрисовку запроса
function handleSearchQuery(event) {
  apiFetch.searchQuerry = '';
  apiFetch.searchQuerry = event.target.value;
  if (event.target.value) {
    galleryRef.innerHTML = '';
    apiFetch
      .fetchSearchRequestGallery()
      .then(data => {
        currentPage = data.page;
        totalPages = data.total_pages;
        totalResults = data.total_results;
        return data;
      })
      .then(({ results }) => {
        if (results.length === 0) {
          failureMarkup(refs.galContainerRef);
        } else {
          handlePopularFilmMarkup(genreTransform(results, genreDB));
        }
      })
      .catch(error => console.log(error));
  } else {
    return;
  }
  inputRef.value = '';
}

// рисует разметку когда нету результатов запроса
function failureMarkup(placeToInsert) {
  const failureMarkup = `<div class="error">
  <div class="error-img"><img src="https://i.ibb.co/4WvT00q/caterror.jpg" alt="" width="300"></div>

  <p class="gallery__failure"> Unfortunately, no matches found. <span>Try again!</span> </p>
</div>`;
  placeToInsert.insertAdjacentHTML('afterbegin', failureMarkup);
}

// =================== модалка вывод фильма по клику =======================================

function modalMatchesFounder(event) {
  if (event.target.nodeName !== 'IMG') {
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
  handleModalMarkup(modalGenreEditor(currentFilmObj, genreDB));
  backdropRef.classList.remove('is-hidden');
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
  console.log(movie);
  return movie;
}

//рендерит разметку модального окна
function handleModalMarkup(currentMovie) {
  const modalMarkup = modalTpl(currentMovie);
  modalRef.insertAdjacentHTML('afterbegin', modalMarkup);
}

// ======================== конец кода  Dr.Frame  =============================================
//==================================================================================
