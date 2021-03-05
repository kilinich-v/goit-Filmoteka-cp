const refs = {
  homeBtn: document.querySelector('[data-index="home"]'),
  myLibraryBtn: document.querySelector('[data-index="mylibrary"]'),
  header: document.querySelector('[data-index="header"]'),
  inputQuery: () => document.querySelector('.filmSearch'), //что это, для чего это и какую функцию выполняет?
  gallery: document.querySelector('[data-index="gallery"]'),
  galleryItem: () => document.querySelector('#gallery-item'), //что это, для чего это и какую функцию выполняет?
  //adder by Dr.Frame
  inputRef: document.querySelector('.filmSearch__input'),
  galleryRef: document.querySelector('.movie__list'),
  modalRef: document.querySelector('.modal'),
  galContainerRef: document.querySelector('.js-container'),
  //****** vlad hapon  */
  btn: document.querySelector('[data-index="btn"]'),
  pageHeader: document.querySelector('.header__home'),
  markupMyLibraty: document.querySelector('[data-index="headerСhanging"]'),
};

export default refs;
