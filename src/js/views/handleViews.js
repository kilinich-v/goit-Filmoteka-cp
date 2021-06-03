import queryString from 'query-string';
import refs from '../refs';
import apiService from '../apiService';
import { renderGallery, clearGallery } from '../gallery';
import spinner from '../spinner';
import pagination from '../pagination';
import {
  getPopularFilms,
  getFilmsFromQueue,
  getFilmsFromWatched,
} from '../gallery/handleGallery';
import { renderHomeHeader, renderLibraryHeader } from './renderViews';

function home() {
  renderHomeHeader();

  if (apiService.query) {
    refs.inputQuery().value = apiService.query;
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

    return;
  }

  getPopularFilms();
}

function queue() {
  renderLibraryHeader();
  getFilmsFromQueue();
  refs.watchedLibraryBtn().classList.remove('current-mylibrary');
  refs.queueLibraryBtn().classList.add('current-mylibrary');
}

function watched() {
  renderLibraryHeader();
  getFilmsFromWatched();
  refs.queueLibraryBtn().classList.remove('current-mylibrary');
  refs.watchedLibraryBtn().classList.add('current-mylibrary');
}

export default { home, queue, watched };
