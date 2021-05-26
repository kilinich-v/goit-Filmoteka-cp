import apiService from '../apiService';
import { apiStorage } from '../localStorage';
import spinner from '../spinner';
import pagination from '../pagination';
import { renderGallery, clearGallery } from './renderGallery';

export function getPopularFilms() {
  clearGallery();

  spinner.add();

  apiService.page = 1;
  apiService
    .fetchPopularMovieGallery()
    .then(data => {
      pagination(data.total_results, apiService.page);

      return renderGallery(data.results);
    })
    .catch(err => console.log(err))
    .finally(spinner.remove());
}

export function getSearchingFilms(event) {
  event.preventDefault();

  const query = event.target.elements.query.value;

  if (apiService.searchQuerry === query) {
    return;
  }

  apiService.page = 1;
  apiService.searchQuerry = query;

  clearGallery();
  spinner.add();

  apiService
    .fetchSearchRequestGallery()
    .then(data => {
      pagination(data.total_results, apiService.page);

      return renderGallery(data.results);
    })
    .catch(err => console.log(err))
    .finally(spinner.remove());
}

export function getCurrentPageFilms(event) {
  clearGallery();
  spinner.add();

  const currentPage = event.page;
  apiService.page = currentPage;

  if (!apiService.searchQuerry) {
    apiService
      .fetchPopularMovieGallery()
      .then(data => renderGallery(data.results))
      .catch(err => console.log(err))
      .finally(spinner.remove());
    return;
  }

  apiService
    .fetchSearchRequestGallery()
    .then(data => renderGallery(data.results))
    .catch(err => console.log(err))
    .finally(spinner.remove());
}

export function getFilmsFromQueue() {
  clearGallery();

  apiStorage.page = 1;

  const queue = apiStorage.getQueue();

  renderGallery(queue?.results);
  pagination(queue?.total_results, apiStorage.page);
}

export function getFilmsFromWatched() {
  clearGallery();

  apiStorage.page = 1;

  const queue = apiStorage.getWatched();

  renderGallery(queue?.results);
  pagination(queue?.total_results, apiStorage.page);
}
