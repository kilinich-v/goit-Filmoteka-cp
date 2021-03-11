import refs from './refs';
import filmGalleryTemplate from '../templates/filmgallery.hbs';

// в mylibrary.js зверху заміни назву функціїї (2 рядок) на:
// import createQueueListFn from './queueList';
//
//і  нижче замість рядка openListFn() (рядок 38) напиши:
// createQueueListFn();
// const queueBtn = document.querySelector('[data-index="queue"]');
// queueBtn.addEventListener('click', createQueueListFn;

function createQueueListFn() {
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
