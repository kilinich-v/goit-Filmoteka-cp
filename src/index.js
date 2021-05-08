import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './styles.scss';
import './js/myLibrary';
import refs from './js/refs';
import './js/watched';
import './js/libraryControll';
import './js/modal-team';
import { getPopularFilms, getSearchingFilms } from './js/gallery';
import { handleCreateModal, handleModalClick } from './js/modal';
import { handlePagesClick } from './js/renderPages';

getPopularFilms();

refs.headerButtons.addEventListener('click', handlePagesClick);
refs.inputSubmit().addEventListener('submit', getSearchingFilms);
refs.gallery.addEventListener('click', handleCreateModal);
refs.backdrop.addEventListener('click', handleModalClick);
