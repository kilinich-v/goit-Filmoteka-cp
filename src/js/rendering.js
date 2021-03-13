import refs from './refs';
import filmGalleryTemplate from '../templates/filmgallery.hbs';

function rendering(key) {
  refs.galleryRef.innerHTML = '';
  const storage = JSON.parse(localStorage.getItem(key));
  const markup = filmGalleryTemplate(storage);
  if (!storage || storage.length === 0) {
    refs.galleryRef.insertAdjacentHTML(
      'beforeend',
      '<p> This list is empty. Please add something:) </p>',
    );
    return;
  }
  return refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default rendering;
