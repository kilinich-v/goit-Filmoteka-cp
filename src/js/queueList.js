import refs from './refs';
import filmGalleryTemplate from '../templates/filmgallery.hbs';

function openQueueListFn() {
  const queueBtn = document.querySelector('[data-index="queue"]');
  queueBtn.addEventListener('click', createQueueListFn);
}

function createQueueListFn() {
  refs.galleryRef.innerHTML = '';
  const queue = JSON.parse(localStorage.getItem('queue'));
  if (!queue || queue.length === 0) {
    refs.galleryRef.insertAdjacentHTML(
      'beforeend',
      '<p> Please add films to your Queue list:) </p>',
    );
    return;
  }
  // console.log(queue);

  refs.galleryRef.insertAdjacentHTML(
    'beforeend',
    filmGalleryTemplate({ queue }),
  );
}
export default openQueueListFn;
