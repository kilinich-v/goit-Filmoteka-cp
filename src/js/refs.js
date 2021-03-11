const refs = {
  homeBtn: document.querySelector('[data-index="home"]'),
  myLibraryBtn: document.querySelector('[data-index="mylibrary"]'),
  header: document.querySelector('[data-index="header"]'),
  inputQuery: document.querySelector('.filmSearch'),
  gallery: document.querySelector('[data-index="gallery"]'),
  galleryItems: () => document.querySelectorAll('#gallery-item'),
  spinner: document.querySelector('#spinner'),
  //adder by Dr.Frame
  inputRef: document.querySelector('.filmSearch__input'),
  galleryRef: document.querySelector('.movie__list'),
  modalRef: document.querySelector('.card'),
  modalBoxRef: document.querySelector('.card-box'),
  modalBackdropRef: document.querySelector('.backdrop'),
  btnCloseModalRef: document.querySelector('.card__btn-close'),
  galContainerRef: document.querySelector('.js-container'),
  //****** vlad hapon  */
  headerButtons: document.querySelector('[data-index="headerButtons"]'),
  pageHeader: document.querySelector('.header__home'),
  markupMyLibraty: document.querySelector('[data-index="headerСhanging"]'),
  myLibraryBtn: document.querySelector('[data-index="mylibrary"]'),
};

export default refs;
