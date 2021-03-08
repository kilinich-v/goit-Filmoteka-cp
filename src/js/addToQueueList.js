function addToQueueList(element) {
  createQueueLocalStorage();
  const { poster_path, original_title, genre_ids, release_date } = element;
  const data = { poster_path, original_title, genre_ids, release_date };
  const addToQueueBtn = document.querySelector('#js-queue');
  addToQueueBtn.addEventListener('click', () => {
    const storage = localStorage.getItem('queue');
    if (storage.includes(element.poster_path)) {
      alert('This film has already been added;)');
      return;
    }
    const newStorage = JSON.parse(localStorage.getItem('queue'));
    newStorage.push(data);
    localStorage.setItem('queue', JSON.stringify(newStorage));
  });
}

function createQueueLocalStorage() {
  const storage = localStorage.getItem('queue');
  if (storage === null) {
    return localStorage.setItem('queue', JSON.stringify([]));
  }
}

export default addToQueueList;
