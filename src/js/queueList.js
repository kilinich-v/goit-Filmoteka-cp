// В ФАЙЛ MYLIBRARY.JS
// 1) зверху файла:
// import openQueueListFn from './queueList';
// 
// 2) там де  "if (buttonId === 'myLibrary')" в кінець цього if, орієнтовно рядок 37 всnавити:
// openQueueListFn();

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
  refs.galleryRef.insertAdjacentHTML('beforeend', filmGalleryTemplate(queue));
}
export default openQueueListFn;
