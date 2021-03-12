// import storage from './libraryControll';
import refs from './refs';
// import createQueueListFn from './queueList';
import rendering from './rendering';
import deletingFromLocalStorage from './deletingFromLocaleStorage';

function addToQueueList(element) {
  const {
    poster_path,
    original_title,
    genre_ids,
    release_date,
    vote_average,
  } = element;
  const data = {
    poster_path,
    original_title,
    genre_ids,
    release_date,
    vote_average,
  };

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
      return localStorage.setItem('queue', JSON.stringify([data]));
    }

    if (localStorage.getItem('queue').includes(element.poster_path)) {
      addToQueueBtn.classList.remove('added-to-watched');
      btnText(addToQueueBtn);
      deletingFromLocalStorage('queue', element);
      renderingQueue();
      return;
    }
    const newStorage = JSON.parse(localStorage.getItem('queue'));
    newStorage.push(data);
    renderingQueue();
    return localStorage.setItem('queue', JSON.stringify(newStorage));
  });

  watchedBtn.addEventListener('click', () => {
    addToQueueBtn.classList.remove('added-to-watched');
    if (!localStorage.getItem('queue')) {
      return;
    }
    if (localStorage.getItem('queue').includes(element.poster_path)) {
      btnText(addToQueueBtn);
      deletingFromLocalStorage('queue', element);
    }

    if (refs.myLibraryBtn.classList.contains('current')) {
      renderingQueue();
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
  }
}

function renderingQueue() {
  const queueArray = JSON.parse(localStorage.getItem('queue'));
  if (refs.myLibraryBtn.classList.contains('current')) {
    rendering(queueArray);
  }
}

export default addToQueueList;
