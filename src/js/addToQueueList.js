import refs from './refs';
import filmGalleryTemplate from '../templates/filmgallery.hbs';
// localStorage.clear();

function addToQueueList(element) {
  const { poster_path, original_title, genre_ids, release_date } = element;
  const data = { poster_path, original_title, genre_ids, release_date };

  const addToQueueBtn = document.querySelector('.js-queue');
  const watchedBtn = document.querySelector('.js-watched');
  const storage = localStorage.getItem('queue');

  if (storage) {
    if (storage.includes(element.poster_path)) {
      addToQueueBtn.classList.add('added-to-storage');
    }
  }

  addToQueueBtn.addEventListener('click', () => {
    document.querySelector('.js-watched').classList.remove('added-to-storage');
    document.querySelector('.js-watched').textContent = 'add to watched';
    if (!addToQueueBtn.disabled) {
      deletingFromLocalStorage('watched', element),
        (document.querySelector('.js-watched').textContent = 'add to watched');

      document.querySelector('.js-queue').classList.add('added-to-storage');
      if (document.querySelector('[data-index="watched"]')) {
        refs.galleryRef.textContent = '';
        refs.galleryRef.insertAdjacentHTML(
          'beforeend',
          filmGalleryTemplate(JSON.parse(localStorage.getItem('watched'))),
        );

        if (!JSON.parse(localStorage.getItem('watched'))) {
          refs.galleryRef.insertAdjacentHTML(
            'afterbegin',
            'No Watched moovies to show',
          );
        }
      }
    }
    addToQueueBtn.classList.add('added-to-storage');
    btnText(addToQueueBtn);
    if (!localStorage.getItem('queue')) {
      return localStorage.setItem('queue', JSON.stringify([data]));
    }
    const newStorage = JSON.parse(localStorage.getItem('queue'));
    newStorage.push(data);

    return localStorage.setItem('queue', JSON.stringify(newStorage));
  });

  watchedBtn.addEventListener('click', () => {
    addToQueueBtn.classList.remove('added-to-storage');
    btnText(addToQueueBtn);
    deletingFromLocalStorage('queue', element);

    if (document.querySelector('[data-index="watched"].is__active--btn')) {
      refs.galleryRef.textContent = '';
      refs.galleryRef.insertAdjacentHTML(
        'beforeend',
        filmGalleryTemplate(JSON.parse(localStorage.getItem('watched'))),
      );
      if (!JSON.parse(localStorage.getItem('watched'))) {
        refs.galleryRef.insertAdjacentHTML(
          'afterbegin',
          'No Watched moovies  to show',
        );
      }
    }
    if (document.querySelector('[data-index="queue"].is__active--btn')) {
      refs.galleryRef.textContent = '';
      refs.galleryRef.insertAdjacentHTML(
        'beforeend',
        filmGalleryTemplate(JSON.parse(localStorage.getItem('queue'))),
      );
      if (!JSON.parse(localStorage.getItem('queue'))) {
        refs.galleryRef.insertAdjacentHTML(
          'afterbegin',
          'No moovies in Queue to show',
        );
      }
    }
  });
}
function deletingFromLocalStorage(key, element) {
  const newStorage = JSON.parse(localStorage.getItem(key));
  if (!localStorage.getItem(key)) {
    return;
  }
  if (
    newStorage.length < 2 &&
    localStorage.getItem(key).includes(`${element.poster_path}`)
  ) {
    localStorage.removeItem(key);
    return;
  }
  const updatedStorage = newStorage.filter(
    el => el.poster_path !== element.poster_path,
  );
  return localStorage.setItem(key, JSON.stringify(updatedStorage));
}

function btnText(btn) {
  if (btn.classList.contains('added-to-storage')) {
    btn.textContent = 'In queue';
  } else {
    btn.textContent = 'Add to queue';
  }
  return btn.textContent;
}
export default addToQueueList;
