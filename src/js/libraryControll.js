const storage = {
    // queue: JSON.parse(localStorage.queue),
    // watched: JSON.parse(localStorage.watched),

    findFilm(film, filmsArray) {
        return filmsArray.filter(filmInArray => filmInArray.original_title === film.original_title).splice(film, 1);
    },

    deleteFilm(film, filmsArray) {
        if (!filmsArray) {
            return;
        }
        JSON.parse(filmsArray).splice(this.findFilm(film, JSON.parse(filmsArray)), 1);
    }
}

export default storage;