function addToQueueList(element) {
  createQueueLocalStorage();
  const { poster_path, original_title, genre_ids, release_date } = element;
  const data = { poster_path, original_title, genre_ids, release_date };
  const addToQueueBtn = document.querySelector('#js-queue');
  addToQueueBtn.addEventListener('click', () => {
    const storage = localStorage.getItem('queue');
    if (storage.includes(element.poster_path)) {
      // console.log('1');
      return;
    }
    // console.log('2');
    localStorage.setItem('queue', JSON.stringify(data));
    // }
  });
}

function createQueueLocalStorage() {
  const storage = localStorage.getItem('queue');
  if (storage === null) {
    return localStorage.setItem('queue', JSON.stringify([]));
  }
}

export default addToQueueList;

// console.log(storage);
// let arr = [];
// arr.push(storage);
// const keys = Object.keys(arr);
// for (const key of keys) {
//   console.log(arr[key]);
//   if (arr[key].includes(element.poster_path)) {
//     return;
//   }
