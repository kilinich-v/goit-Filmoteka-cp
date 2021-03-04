const refs = {
    homeBtn: document.querySelector('[data-index="home"]'),
    myLibraryBtn: document.querySelector('[data-index="mylibrary"]'),
    inputQuery: () => document.querySelector('.filmSearch'),
    gallery: () => document.querySelector('#gallery'),
    galleryItem: () => document.querySelector('#gallery-item'),
}

export default refs;