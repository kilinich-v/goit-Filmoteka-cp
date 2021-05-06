import Pagination from 'tui-pagination';
import { getCurrentPageFilms } from './renderGallery';

const paginationContainer = document.getElementById('pagination');

const paginationOptions = {
  itemsPerPage: 20,
  visiblePages: 5,
};

function pagination(totalResults, page) {
  if (totalResults < 20) {
    paginationContainer.innerHTML = '';
    return;
  }

  const pagination = new Pagination(paginationContainer, paginationOptions);

  pagination.setTotalItems(totalResults);
  pagination.movePageTo(page);

  pagination.on('afterMove', getCurrentPageFilms);
}

export default pagination;
