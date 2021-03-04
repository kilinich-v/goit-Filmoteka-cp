const refs = {
    homeBtn: document.querySelector('[data-index="home"]'),
    myLibraryBtn: document.querySelector('[data-index="mylibrary"]'),
    header: document.querySelector('[data-index="header"]'),
    inputQuery: () => document.querySelector('.filmSearch'),
    gallery: document.querySelector('[data-index="gallery"]'),
    galleryItem: () => document.querySelector('#gallery-item'),
}

export default refs;