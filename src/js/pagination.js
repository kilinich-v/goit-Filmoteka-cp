import Pagination from 'tui-pagination';
import { getCurrentPageFilms } from './gallery';

const paginationContainer = document.getElementById('pagination');

const paginationOptions = {
  itemsPerPage: 20,
  visiblePages: 5,
};

function pagination(totalResults, currentPage) {
  if (!totalResults || totalResults < 20) {
    paginationContainer.innerHTML = '';
    return;
  }

  const pagination = new Pagination(paginationContainer, paginationOptions);

  pagination.setTotalItems(totalResults);
  pagination.movePageTo(currentPage);

  pagination.on('afterMove', getCurrentPageFilms);
}

export default pagination;
