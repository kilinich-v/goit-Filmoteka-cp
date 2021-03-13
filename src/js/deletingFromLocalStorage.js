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

export default deletingFromLocalStorage;
