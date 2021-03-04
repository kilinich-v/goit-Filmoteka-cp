import './styles.scss';
import refs from './js/refs';
import inputTemplate from './templates/header/home.hbs';

const input = inputTemplate();

document.body.insertAdjacentHTML('beforeend', input);
