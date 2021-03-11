const storage = {
  queue: localStorage.queue,
  watched: localStorage.watched,

  checkStorage(filmsArray) {
    if (filmsArray) {
      return;
    }

    localStorage.removeItem(filmsArray);
  },

  findFilm(film, filmsArray) {
    return filmsArray
      .filter(filmInArray => filmInArray.original_title === film.original_title)
      .splice(film, 1);
  },

  deleteFilm(film, filmsArray) {
    if (!filmsArray) {
      return;
    }
    JSON.parse(filmsArray).splice(
      this.findFilm(film, JSON.parse(filmsArray)),
      1,
    );
    // filmsArray = JSON.stringify(a);
  },
};

export default storage;
