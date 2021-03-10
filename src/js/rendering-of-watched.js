import refs from './refs';
import rendering from '../templates/film-from-local.hbs';
export default function (data) {
  const markup = rendering(data);
  refs.galleryRef.insertAdjacentHTML('afterbegin', markup);
}
