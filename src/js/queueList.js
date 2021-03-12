import refs from './refs';
import filmGalleryTemplate from '../templates/filmgallery.hbs';

function createQueueListFn() {
  const queueBtn = document.querySelector('[data-index="queue"]');
  const watchBtn = document.querySelector('[data-index="watched"]');
  watchBtn.classList.remove('is__active--btn');
  queueBtn.classList.add('is__active--btn');
  refs.galleryRef.innerHTML = '';
  const queue = JSON.parse(localStorage.getItem('queue'));
  if (!queue || queue.length === 0) {
    refs.galleryRef.insertAdjacentHTML(
      'beforeend',
      '<p> This list is empty. Please add something:) </p>',
    );
    return;
  }

  return refs.galleryRef.insertAdjacentHTML(
    'beforeend',
    filmGalleryTemplate(queue),
  );
}

export default createQueueListFn;
