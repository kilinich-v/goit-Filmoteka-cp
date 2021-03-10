import refs from './refs';
import filmGalleryTemplate from '../templates/filmgallery.hbs';

// для Влада
// в myLibrary після рядка з openQueueListFn() додай це:
//
// const queueBtn = document.querySelector('[data-index="queue"]');
// queueBtn.addEventListener('click', openQueueListFn);

function openQueueListFn() {
  refs.galleryRef.innerHTML = '';
  const queue = JSON.parse(localStorage.getItem('queue'));
  if (!queue || queue.length === 0) {
    refs.galleryRef.insertAdjacentHTML(
      'beforeend',
      '<p> Please add films to your Queue list:) </p>',
    );
    return;
  }
  refs.galleryRef.insertAdjacentHTML('beforeend', filmGalleryTemplate(queue));
}
export default openQueueListFn;
