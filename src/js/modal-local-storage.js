//локал сторадж для масива для модалки
function saveAllMoviesArr(allMovies) {
  const filterArr = Array.from(new Set(allMovies.map(JSON.stringify))).map(
    JSON.parse,
  );
  localStorage.removeItem('modalCompareArr');
  localStorage.setItem('modalCompareArr', convertToString(filterArr));
}

function getAllMoviesArr() {
  const stringSavedArr = localStorage.getItem('modalCompareArr');
  const parsedArr = convertToObj(stringSavedArr);
  return parsedArr;
}

function convertToString(obj) {
  const string = JSON.stringify(obj);
  return string;
}

function convertToObj(string) {
  const obj = JSON.parse(string);
  return obj;
}

export { saveAllMoviesArr, getAllMoviesArr };
