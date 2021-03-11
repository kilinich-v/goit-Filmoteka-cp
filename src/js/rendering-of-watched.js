import refs from './refs';
import rendering from '../templates/film-watched-queue.hbs';
export default function (data) {
  const markup = rendering(data);

  refs.galleryRef.innerHTML = '';
  refs.galleryRef.insertAdjacentHTML('afterbegin', markup);
}
