import { getPopularFilms, getFilmsFromQueue } from './gallery/handleGallery';

export function handlePagesClick(event) {
  const target = event.target;

  if (target.id === 'home') {
    getPopularFilms();
  }

  if (target.id === 'myLibrary') {
    getFilmsFromQueue();
  }
}
