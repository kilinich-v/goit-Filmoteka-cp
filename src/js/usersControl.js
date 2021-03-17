import firebase from "firebase/app";
const firebaseui = require('firebaseui');
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import refs from './refs';
import userNav from '../templates/header/userNav.hbs';
import singupForm from '../templates/header/singupForm.hbs';
import dbService from './databaseService';
import filmGallery from '../templates/filmgallery.hbs';
import authService from './authService';
import { toLibrary, libraryMarkup } from './myLibrary';

// Listen user status

authService.auth.onAuthStateChanged(user => {
    if (user) {
        const userNavMarkup = userNav({ user });

        refs.headerButtons.children[1].innerHTML = '';
        refs.headerButtons.children[1].insertAdjacentHTML('beforeend', userNavMarkup);

        const myLibrary = document.querySelector('#myLibrary');

        myLibrary.addEventListener('click', libraryMarkup);

        authService.logOut(refs.logoutBtn());

        // dbService.toRenderQueue(user.uid, galleryRender);
    }

    if (!user) {
        // authService.signIn('kylynych.v@gmail.com', 'E@2ncbkY@vU!KMc', singupRef);

        const singupMarkup = singupForm();

        refs.gallery.insertAdjacentHTML('afterbegin', singupMarkup);

        const singupRef = document.querySelector('#signup-form');
        singupRef.addEventListener('submit', authService.signUp);
    }
})



// cb to render queue or watched

function galleryRender(targetGallery) {
    const markup = filmGallery(targetGallery);

    refs.galleryRef.innerHTML = '';
    refs.galleryRef.insertAdjacentHTML('afterbegin', markup);
}