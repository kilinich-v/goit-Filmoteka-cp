import './styles.scss';
import './js/myLibrary';
import refs from './js/refs';
import './js/open-close-modal';
import './js/watched';
import './js/libraryControll';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './js/modal-team';
import { getPopularFilms, getSearchingFilms } from './js/renderGallery';

getPopularFilms();

refs.inputSubmit().addEventListener('submit', getSearchingFilms);
// refs.galleryRef.addEventListener('click', modalMatchesFounder);
