import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './styles.scss';
import './js/modal-team';
import refs from './js/refs';
import { route, routeApp } from './js/routing';
import { handleCreateModal, handleModalClick } from './js/modal';
import { getSearchingFilms } from './js/gallery';

window.addEventListener('click', event => {
  const { target } = event;

  if (target.dataset.index === 'home') {
    routeApp.navigate(route.home);
  }

  if (target.dataset.index === 'mylibrary') {
    routeApp.navigate(route.queue);
  }

  if (target.dataset.index === 'watched') {
    routeApp.navigate(route.watched);
  }

  if (target.dataset.index === 'queue') {
    routeApp.navigate(route.queue);
  }

  if (target.dataset.index === 'search') {
    refs.inputSubmit().addEventListener('submit', getSearchingFilms);
  }
});

refs.gallery.addEventListener('click', handleCreateModal);
refs.backdrop.addEventListener('click', handleModalClick);
