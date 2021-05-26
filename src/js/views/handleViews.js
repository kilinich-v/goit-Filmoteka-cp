import refs from '../refs';
import {
  getPopularFilms,
  getFilmsFromQueue,
  getSearchingFilms,
} from '../gallery/handleGallery';
import { renderHomeHeader, renderLibraryHeader } from './renderViews';

function home() {
  renderHomeHeader();
  getPopularFilms();
  refs.inputSubmit().addEventListener('submit', getSearchingFilms);
}

function queue() {
  renderLibraryHeader();
  getFilmsFromQueue();
}

function watches() {
  renderLibraryHeader();
  getFilmsFromQueue();
}

export default { home, queue, watches };
