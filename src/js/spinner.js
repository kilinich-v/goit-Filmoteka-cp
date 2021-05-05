import spinnerTemplate from '../templates/spinner.hbs';
import refs from './refs';

const spinnerMarkup = spinnerTemplate();

const add = () => {
  refs.spinner.textContent = '';

  refs.spinner.insertAdjacentHTML('afterbegin', spinnerMarkup);
};

const remove = () => {
  refs.spinner.textContent = '';
};

export default {
  add,
  remove,
};
