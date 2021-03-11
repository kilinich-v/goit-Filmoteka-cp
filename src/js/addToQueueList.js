import storage from './libraryControll';
import createQueueListFn from './queueList';

function addToQueueList(element) {
  const { poster_path, original_title, genre_ids, release_date } = element;
  const data = { poster_path, original_title, genre_ids, release_date };

  const addToQueueBtn = document.querySelector('.js-queue');
  const watchedBtn = document.querySelector('.js-watched');
  const storage = localStorage.getItem('queue');

  if (storage) {
    if (storage.includes(element.poster_path)) {
      addToQueueBtn.disabled = true;
    }
  }

  addToQueueBtn.addEventListener('click', () => {
    if (!addToQueueBtn.disabled) {
      addToQueueBtn.addEventListener(
        'click',
        deletingFromLocalStorage('watched', element),
      );
    }
    addToQueueBtn.disabled = true;
    btnText(addToQueueBtn);
    if (!localStorage.getItem('queue')) {
      return localStorage.setItem('queue', JSON.stringify([data]));
    }
    const newStorage = JSON.parse(localStorage.getItem('queue'));
    newStorage.push(data);
    return localStorage.setItem('queue', JSON.stringify(newStorage));
  });

  watchedBtn.addEventListener('click', () => {
    addToQueueBtn.disabled = false;
    btnText(addToQueueBtn);
    deletingFromLocalStorage('queue', element);
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
  if (btn.disabled) {
    btn.textContent = 'In queue';
  } else {
    btn.textContent = 'Add to queue';
  }
  return btn.textContent;
}

export default addToQueueList;
