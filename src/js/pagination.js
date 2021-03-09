import apiFetch from './apiService';
import refs from './refs';
import {
  genreDB,
  startPopularFilms,
  genreTransform,
  handlePopularFilmMarkup,
  handleSearchQuery,
  failureMarkup,
  modalMatchesFounder,
  modalGenreEditor,
  handleModalMarkup,
} from '../index';
import 'paginationjs';

export default function paginationJs() {
  const trendingsUrl = apiFetch.trendingUrl;
  const trendingUrlApiKey = `${trendingsUrl}${apiFetch.apiKey}`;
  const galleryRef = refs.galleryRef;
  $('#pagination-container').pagination({
    dataSource: trendingUrlApiKey,
    locator: 'results',
    totalNumber: 20000,
    pageSize: 20,
    alias: {
      pageNumber: 'page',
    },
    prevText: '',
    nextText: '',
    callback: function (data, pagination) {
      galleryRef.innerHTML = '';
      handlePopularFilmMarkup(genreTransform(data, genreDB));
      window.scrollTo(pageXOffset, 0);
    },
  });
}
