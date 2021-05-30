const refs = {
  body: document.querySelector('body'),
  homeBtn: document.querySelector('[data-index="home"]'),
  header: document.querySelector('[data-index="header"]'),
  inputSubmit: () => document.querySelector('[data-index="form"]'),
  inputQuery: () => document.querySelector('[data-index="search"]'),
  watchedLibraryBtn: () => document.querySelector('[data-index="watched"]'),
  queueLibraryBtn: () => document.querySelector('[data-index="queue"]'),
  gallery: document.querySelector('[data-index="gallery"]'),
  spinner: document.querySelector('#spinner-container'),
  backdrop: document.querySelector('[data-index="backdrop"]'),
  modal: document.querySelector('[data-index="modal"]'),
  watchedModalBtn: () => document.querySelector('#watchedModalBtn'),
  queueModalBtn: () => document.querySelector('#queueModalBtn'),
  btnCloseModalRef: document.querySelector('.card__btn-close'),
  galContainerRef: document.querySelector('.js-container'),
  headerButtons: () => document.querySelector('[data-index="headerButtons"]'),
  pageHeader: document.querySelector('.header__home'),
  markupMyLibraty: document.querySelector('[data-index="headerСhanging"]'),
  myLibraryBtn: document.querySelector('[data-index="mylibrary"]'),
  paginationRef: document.getElementById('pagination-container'),
};

export default refs;
