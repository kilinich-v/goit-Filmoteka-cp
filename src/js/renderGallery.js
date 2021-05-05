import apiFetch from './apiService';
import refs from './refs';
import { saveAllMoviesArr, getAllMoviesArr } from './modal-local-storage';
import modalTpl from '../templates/modal.hbs';
import addToQueueList from './addToQueueList';
import spinner from './spinner';
import pnotify from './notification';
import filmsGalleryTemplate from '../templates/filmgallery.hbs';
import galleryErrorTemplate from '../templates/gallery-error.hbs';

const genreDB = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const posterBaseURL = 'https://image.tmdb.org/t/p/w500/';

export function getPopularFilms() {
  spinner.add();
  apiFetch
    .fetchPopularMovieGallery()
    .then(data => renderGallery(data.results))
    .catch(err => console.log(err))
    .finally(spinner.remove());
}

export function getSearchingFilms(event) {
  event.preventDefault();

  const query = event.target.elements.query.value;

  apiFetch.searchQuerry = query;

  spinner.add();

  apiFetch
    .fetchSearchRequestGallery()
    .then(data => renderGallery(data.results))
    .catch(err => console.log(err))
    .finally(spinner.remove());
}

function renderGallery(films) {
  normalizeFilmsGenre(films);
  normalizeFilmsPoster(films);

  const galleryMarkup = filmsGalleryTemplate(films);
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
}

function normalizeFilmsGenre(films) {
  return films.map(film => {
    const filmGenre = [...film.genre_ids];
    const normalizeGenre = filmGenre.map(genre => (genre = genreDB[genre]));
    delete film.genre_ids;
    film.genre_ids = normalizeGenre;
  });
}

function normalizeFilmsPoster(films) {
  return films.map(film => {
    const filmPoster = [...film.poster_path];
    const normalizePoster = filmPoster.map(
      poster => (poster = `${posterBaseURL}${filmPoster}`),
    );
    delete film.poster_path;
    film.poster_path = normalizePoster;
  });
}
