import queryString from 'query-string';
import apiService from '../apiService';
import { apiStorage } from '../localStorage';
import spinner from '../spinner';
import pagination from '../pagination';
import { renderGallery, clearGallery } from './renderGallery';
import notification from '../notification';

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
  const currentQuery = event.target.elements.query.value;

  if (apiService.query === currentQuery) {
    notification.repeatedQuery();
    return;
  }

  if (currentQuery === '') {
    notification.voidQuery();
    return;
  }

  apiService.page = 1;
  apiService.query = currentQuery;

  clearGallery();
  spinner.add();

  apiService
    .fetchSearchRequestGallery()
    .then(data => {
      if (!data.total_results) {
        notification.notFound();
      }

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

  if (!apiService.searchQuery) {
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

  const watched = apiStorage.getWatched();

  renderGallery(watched?.results);
  pagination(watched?.total_results, apiStorage.page);
}
