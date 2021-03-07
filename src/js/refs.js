const refs = {
  homeBtn: document.querySelector('[data-index="home"]'),
  myLibraryBtn: document.querySelector('[data-index="mylibrary"]'),
  header: document.querySelector('[data-index="header"]'),
  inputQuery: document.querySelector('.filmSearch'),
  gallery: document.querySelector('[data-index="gallery"]'),
  galleryItem: () => document.querySelector('#gallery-item'),
  //adder by Dr.Frame
  inputRef: document.querySelector('.filmSearch__input'),
  galleryRef: document.querySelector('.movie__list'),
  modalRef: document.querySelector('.modal'),
  galContainerRef: document.querySelector('.js-container'),
  //****** vlad hapon  */
  headerButtons: document.querySelector('[data-index="headerButtons"]'),
  pageHeader: document.querySelector('.header__home'),
  markupMyLibraty: document.querySelector('[data-index="headerСhanging"]'),
};

export default refs;
