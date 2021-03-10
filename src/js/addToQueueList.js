function addToQueueList(element) {
  const { poster_path, original_title, genre_ids, release_date } = element;
  const data = { poster_path, original_title, genre_ids, release_date };
  const addToQueueBtn = document.querySelector('.js-queue');
  const storage = localStorage.getItem('queue');
  if (storage) {
    if (storage.includes(element.original_title)) {
      btnStatus('In queue', true);
      return;
    }
  }

  addToQueueBtn.addEventListener('click', () => {
    if (!storage) {
      localStorage.setItem('queue', JSON.stringify([data]));
      btnStatus('In Queue', true);
      return;
    }
    const newStorage = JSON.parse(localStorage.getItem('queue'));
    newStorage.push(data);
    localStorage.setItem('queue', JSON.stringify(newStorage));
    btnStatus('In Queue', true);
  });
}

export default addToQueueList;

function btnStatus(text, status) {
  const addToQueueBtn = document.querySelector('.js-queue');
  addToQueueBtn.textContent = text;
  addToQueueBtn.disabled = status;
}
