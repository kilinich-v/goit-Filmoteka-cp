import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './styles.scss';
import refs from './js/refs';
import './js/modal-team';
import { getPopularFilms, getSearchingFilms } from './js/gallery';
import { handleCreateModal, handleModalClick } from './js/modal';
import { handlePagesClick, renderHomeHeader } from './js/renderPages';

renderHomeHeader();
getPopularFilms();

refs.headerButtons.addEventListener('click', handlePagesClick);
refs.inputSubmit().addEventListener('submit', getSearchingFilms);
refs.gallery.addEventListener('click', handleCreateModal);
refs.backdrop.addEventListener('click', handleModalClick);
