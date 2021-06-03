export default {
  searchUrl: 'https://api.themoviedb.org/3/search/movie?api_key=',
  trendingUrl: 'https://api.themoviedb.org/3/trending/movie/week?api_key=',
  movieDetailsUrl: 'https://api.themoviedb.org/3/movie/',
  movieGenreList: 'https://api.themoviedb.org/3/genre/movie/list?api_key=',
  apiKey: '3550330ecc32a34c7342dbd44dd96d6e',
  _movieID: null,
  searchQuery: null,
  totalResults: null,
  page: 1,

  fetchSearchRequestGallery() {
    const url = `${this.searchUrl}${this.apiKey}&language=en-US&query=${this.searchQuery}&page=${this.page}`;

    return fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then(data => {
        this.totalResults = data.total_results;
        return data;
      })
      .catch(error => console.log(error));
  },

  fetchPopularMovieGallery() {
    const url = `${this.trendingUrl}${this.apiKey}&page=${this.page}`;

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        this.totalResults = data.total_results;
        return data;
      })
      .catch(error => console.log(error));
  },

  fetchMovieInfo() {
    const url = `${this.movieDetailsUrl}${this.movieID}?api_key=${this.apiKey}`;
    return fetch(url)
      .then(res => res.json())
      .catch(error => console.log(error));
  },

  fetchGenresList() {
    const url = `${this.movieGenreList}${this.apiKey}&language=en-US`;

    return fetch(url)
      .then(res => res.json())
      .then(data => data)
      .catch(error => console.log(error));
  },
  resetPage() {
    this.page = 1;
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },

  get movieID() {
    return this._movieID;
  },
  set movieID(value) {
    this._movieID = value;
  },
};
