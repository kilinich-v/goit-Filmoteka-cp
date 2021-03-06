import './styles.scss';
import refs from './js/refs';
import inputTemplate from './templates/header/home.hbs';

import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './js/modal-team';

const input = inputTemplate();

refs.header.insertAdjacentHTML('beforeend', input);
