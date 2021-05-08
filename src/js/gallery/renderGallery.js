import refs from '../refs';
import filmsGalleryTemplate from '../../templates/filmgallery.hbs';
import imgPlaceholder from '../../images/img/noimage.jpg';

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

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function renderGallery(films) {
  const galleryMarkup = filmsGalleryTemplate(normalizeFilmsData(films));

  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
}

function normalizeFilmsData(films) {
  return films.map(film => {
    const filmGenre = [...film.genre_ids];
    const filmPoster = film.poster_path;
    const filmDate = film.release_date;

    const normalizeGenre = filmGenre.map(genre => (genre = genreDB[genre]));
    const normalizePoster = filmPoster
      ? `${posterBaseURL}${filmPoster}`
      : imgPlaceholder;
    const normalizeDate = filmDate ? filmDate.slice(0, 4) : 'no date';

    delete film.genre_ids, film.poster_path, film.release_date;

    film.genre_ids = normalizeGenre;
    film.poster_path = normalizePoster;
    film.release_date = normalizeDate;

    return { ...film };
  });
}
