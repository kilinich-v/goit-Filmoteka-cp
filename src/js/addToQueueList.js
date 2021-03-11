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
    addToQueueBtn.disabled = true;
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
    const newStorage = JSON.parse(localStorage.getItem('queue'));

    if (!localStorage.getItem('queue') || newStorage.length <= 2) {
      localStorage.removeItem('queue');
      return;
    }
    const updatedStorage = newStorage.filter(
      el => el.poster_path !== element.poster_path,
    );
    // if (event.target.getAttribute('id') === 'myLibrary') {
    //   createQueueListFn(
    //     localStorage.setItem('queue', JSON.stringify(updatedStorage)),
    //   );
    // }
    return localStorage.setItem('queue', JSON.stringify(updatedStorage));
  });
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
