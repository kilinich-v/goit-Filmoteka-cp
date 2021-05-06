import apiService from './apiService';

function getFilm() {
  apiService.movieID = 151094;
  apiService.fetchMovieInfo().then(data => console.log(data.genres));
}
