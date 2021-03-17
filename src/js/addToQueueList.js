import refs from './refs';
import rendering from './rendering';
import deletingFromLocalStorage from './deletingFromLocalStorage';

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
    deleteWatched(element);
    addToQueueBtn.classList.add('added-to-storage');
    btnText(addToQueueBtn, 'queue');
    watchedBtn.classList.remove('added-to-storage');
    btnText(watchedBtn, 'watched');

    if (!localStorage.getItem('queue')) {
      localStorage.setItem('queue', JSON.stringify([data]));
      return renderingFn();
    }

    if (localStorage.getItem('queue').includes(element.poster_path)) {
      addToQueueBtn.classList.remove('added-to-storage');
      btnText(addToQueueBtn, 'queue');
      deletingFromLocalStorage('queue', element);
      renderingFn();
      return;
    }
    const newStorage = JSON.parse(localStorage.getItem('queue'));
    newStorage.push(data);
    localStorage.setItem('queue', JSON.stringify(newStorage));
    renderingFn();
  });

  watchedBtn.addEventListener('click', () => {
    if (!localStorage.getItem('queue')) {
      return;
    }
    if (localStorage.getItem('queue').includes(element.poster_path)) {
      addToQueueBtn.classList.remove('added-to-storage');
      btnText(addToQueueBtn, 'queue');
      deletingFromLocalStorage('queue', element);
      renderingFn();
    }
  });
}

function btnText(btn, text) {
  if (btn.classList.contains('added-to-storage')) {
    btn.textContent = `in ${text}`;
  } else {
    btn.textContent = `add to ${text}`;
  }
}

function deleteWatched(element) {
  if (!localStorage.getItem('watched')) {
    return;
  }
  if (localStorage.getItem('watched').includes(element.poster_path)) {
    deletingFromLocalStorage('watched', element);
    renderingFn();
  }
}

function renderingFn() {
  if (refs.myLibraryBtn.classList.contains('current')) {
    if (
      document
        .querySelector('[data-index="watched"]')
        .classList.contains('is__active--btn')
    ) {
      return rendering('watched');
    }
    return rendering('queue');
  }
}

export default addToQueueList;
