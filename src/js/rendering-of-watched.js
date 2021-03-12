import refs from './refs';
import rendering from '../templates/film-watched-queue.hbs';
export default function (data) {
  const markup = rendering(data);

  refs.galleryRef.innerHTML = '';
  if (JSON.parse(localStorage.getItem('watched')) === 0) {
    refs.galleryRef.insertAdjacentHTML(
      'afterbegin',
      'No Watched moovies to show',
    );
    return;
  }
  refs.galleryRef.insertAdjacentHTML('afterbegin', markup);
}
