import storage from './libraryControll';
import refs from './refs';
import createQueueListFn from './queueList';
import rendering from './rendering-of-watched';

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
    document.querySelector('.js-watched').classList.remove('added-to-watched');
    document.querySelector('.js-watched').textContent = 'add to watched';
    if (!addToQueueBtn.disabled) {
      deletingFromLocalStorage('watched', element);
    }
    addToQueueBtn.classList.add('added-to-watched');
    btnText(addToQueueBtn);
    if (!localStorage.getItem('queue')) {
      return localStorage.setItem('queue', JSON.stringify([data]));
    }
    const newStorage = JSON.parse(localStorage.getItem('queue'));
    newStorage.push(data);
    const dataArray = JSON.parse(localStorage.getItem('watched'));

    if (refs.myLibraryBtn.classList.contains('current')) {
      rendering(dataArray);
    }

    return localStorage.setItem('queue', JSON.stringify(newStorage));
  });

  watchedBtn.addEventListener('click', () => {
    addToQueueBtn.classList.remove('added-to-watched');
    btnText(addToQueueBtn);
    deletingFromLocalStorage('queue', element);

    if (refs.myLibraryBtn.classList.contains('current')) {
      createQueueListFn();
    }
  });
}
function deletingFromLocalStorage(key, element) {
  const newStorage = JSON.parse(localStorage.getItem(key));
  if (!localStorage.getItem(key)) {
    return;
  }
  if (newStorage.length < 2) {
    localStorage.removeItem(key);
    return;
  }
  const updatedStorage = newStorage.filter(
    el => el.poster_path !== element.poster_path,
  );
  return localStorage.setItem(key, JSON.stringify(updatedStorage));
}

function btnText(btn) {
  if (btn.classList.contains('added-to-watched')) {
    btn.textContent = 'In queue';
  } else {
    btn.textContent = 'Add to queue';
  }
  return btn.textContent;
}

export default addToQueueList;
