function addToQueueList(element) {
  const { poster_path, original_title, genre_ids, release_date } = element;
  const data = { poster_path, original_title, genre_ids, release_date };
  const addToQueueBtn = document.querySelector('.js-queue');
  const storage = localStorage.getItem('queue');
  if (storage) {
    if (storage.includes(element.original_title)) {
      deleteFilm(storage, element);
      return;
    }
  }
  addToQueueBtn.addEventListener('click', () => {
    btnStatus('In queue', true);
    if (!storage) {
      localStorage.setItem('queue', JSON.stringify([data]));
      deleteFilm(storage, element);
      return;
    }
    deleteFilm(storage, element);
    const newStorage = JSON.parse(storage);
    newStorage.push(data);
    localStorage.setItem('queue', JSON.stringify(newStorage));
  });
}

function btnStatus(text, status) {
  const addToQueueBtn = document.querySelector('.js-queue');
  addToQueueBtn.textContent = text;
  addToQueueBtn.disabled = status;
}

function deleteFilm(storage, element) {
  btnStatus('In queue', true);
  const watchedBtn = document.querySelector('.js-watched');
  watchedBtn.addEventListener('click', () => {
    btnStatus('add to queue', false);
    if (!storage) {
      return;
    }
    const newStorage = JSON.parse(storage);
    const filmId = newStorage.find(
      el => el.original_title === element.original_title,
    );
    newStorage.splice(filmId, 1);
    return localStorage.setItem('queue', JSON.stringify(newStorage));
  });
}

// function clearLocalStorage() {
//   if (localStorage.getItem('queue') === []) {
//     localStorage.removeItem('queue');
//   }
// }

export default addToQueueList;
