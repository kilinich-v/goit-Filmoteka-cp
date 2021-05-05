const refs = {
  body: document.querySelector('body'),
  homeBtn: document.querySelector('[data-index="home"]'),
  header: document.querySelector('[data-index="header"]'),
  inputSubmit: () => document.querySelector('.filmSearch'),
  gallery: document.querySelector('[data-index="gallery"]'),
  galleryItems: () => document.querySelectorAll('#gallery-item'),
  spinner: document.querySelector('#spinner-container'),
  backdropRef: document.querySelector('#js-backdrop'),
  inputRef: () => document.querySelector('.filmSearch__input'),
  galleryRef: document.querySelector('.movie__list'),
  modalRef: document.querySelector('.card'),
  modalBoxRef: document.querySelector('.card-box'),
  modalBackdropRef: document.querySelector('.backdrop'),
  btnCloseModalRef: document.querySelector('.card__btn-close'),
  galContainerRef: document.querySelector('.js-container'),
  headerButtons: document.querySelector('[data-index="headerButtons"]'),
  pageHeader: document.querySelector('.header__home'),
  markupMyLibraty: document.querySelector('[data-index="headerСhanging"]'),
  watched: document.querySelector('.js-watched'),
  myLibraryBtn: document.querySelector('[data-index="mylibrary"]'),
  paginationRef: document.getElementById('pagination-container'),
};

export default refs;
