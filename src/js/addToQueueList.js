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
      addToQueueBtn.classList.add('added-to-watched');
    }
  }

  addToQueueBtn.addEventListener('click', () => {
    deleteWatched(element);
    document.querySelector('.js-watched').classList.remove('added-to-watched');
    document.querySelector('.js-watched').textContent = 'add to watched';
    addToQueueBtn.classList.add('added-to-watched');
    btnText(addToQueueBtn);
    if (!localStorage.getItem('queue')) {
      localStorage.setItem('queue', JSON.stringify([data]));
      return renderingFn();
    }

    if (localStorage.getItem('queue').includes(element.poster_path)) {
      addToQueueBtn.classList.remove('added-to-watched');
      btnText(addToQueueBtn);
      deletingFromLocalStorage('queue', element);
      renderingFn();
      return;
    }
    const newStorage = JSON.parse(localStorage.getItem('queue'));
    newStorage.push(data);
    localStorage.setItem('queue', JSON.stringify(newStorage));
    deleteWatched(element);
    renderingFn();
    // return;
  });

  watchedBtn.addEventListener('click', () => {
    addToQueueBtn.classList.remove('added-to-watched');
    if (!localStorage.getItem('queue')) {
      return;
    }
    if (localStorage.getItem('queue').includes(element.poster_path)) {
      btnText(addToQueueBtn);
      deletingFromLocalStorage('queue', element);
      renderingFn();
    }
  });
}

function btnText(btn) {
  if (btn.classList.contains('added-to-watched')) {
    btn.textContent = 'in queue';
  } else {
    btn.textContent = 'add to queue';
  }
  return btn.textContent;
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
