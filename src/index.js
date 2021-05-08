import './styles.scss';
import './js/myLibrary';
import refs from './js/refs';
import './js/watched';
import './js/libraryControll';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './js/modal-team';
import { getPopularFilms, getSearchingFilms } from './js/renderGallery';
import {
  handleCreateModal,
  handleModalClick,
  handleModalKeypress,
} from './js/renderFilmModal';

getPopularFilms();

refs.inputSubmit().addEventListener('submit', getSearchingFilms);
refs.gallery.addEventListener('click', handleCreateModal);
refs.backdrop.addEventListener('click', handleModalClick);
window.addEventListener('keydown', handleModalKeypress);
