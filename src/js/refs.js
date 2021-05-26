const refs = {
  body: document.querySelector('body'),
  homeBtn: document.querySelector('[data-index="home"]'),
  header: document.querySelector('[data-index="header"]'),
  inputSubmit: () => document.querySelector('.filmSearch'),
  gallery: document.querySelector('[data-index="gallery"]'),
  spinner: document.querySelector('#spinner-container'),
  backdrop: document.querySelector('[data-index="backdrop"]'),
  modal: document.querySelector('[data-index="modal"]'),
  watched: () => document.querySelector('#watchedBtn'),
  queue: () => document.querySelector('#queueBtn'),
  btnCloseModalRef: document.querySelector('.card__btn-close'),
  galContainerRef: document.querySelector('.js-container'),
  headerButtons: () => document.querySelector('[data-index="headerButtons"]'),
  pageHeader: document.querySelector('.header__home'),
  markupMyLibraty: document.querySelector('[data-index="headerСhanging"]'),
  myLibraryBtn: document.querySelector('[data-index="mylibrary"]'),
  paginationRef: document.getElementById('pagination-container'),
};

export default refs;
