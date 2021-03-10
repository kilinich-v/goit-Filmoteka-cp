import firebase from "firebase/app";
const firebaseui = require('firebaseui');
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import refs from './refs';
import userNav from '../templates/header/userNav.hbs';
import singupForm from '../templates/header/singupForm.hbs';
import dbService from './databaseService';

const config = {
    apiKey: "AIzaSyDBptg0_ENszfxYjlkxxxHgNrKil-uqJLs",
    authDomain: "filmoteka-38bf3.firebaseapp.com",
    databaseURL: "https://filmoteka-38bf3-default-rtdb.firebaseio.com",
    projectId: "filmoteka-38bf3",
    storageBucket: "filmoteka-38bf3.appspot.com",
    messagingSenderId: "345777730868",
    appId: "1:345777730868:web:f5040918025fd4772ba161"
};

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();

// Listen user status

auth.onAuthStateChanged(user => {
    console.log('user', user);

    if (user) {
        const userNavMarkup = userNav();

        refs.headerButtons.children[1].innerHTML = '';
        refs.headerButtons.children[1].insertAdjacentHTML('beforeend', userNavMarkup);


        afterRemoveForm();
        firebase.database().ref('/users/' + user.uid).get().then((snapshot) => {
            console.log(snapshot.val());

            dbService.currentUserId = snapshot.key;
            dbService.queue = snapshot.val().queue;
            dbService.watched = snapshot.val().watched;
        });
    } else {
        const singupMarkup = singupForm();

        refs.gallery.insertAdjacentHTML('afterbegin', singupMarkup);

        const singupRef = document.querySelector('#signup-form');
        singupRef.addEventListener('submit', handleSignup);
        console.log(singupRef);
    }
})

// Sign Up

function handleSignup(event) {
    event.preventDefault();

    const email = event.target['signup-email'].value;
    const password = event.target['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(credential => {
            event.target.reset();
            event.target.classList.add('is-hidden');
        }).catch(err => {
            if (err.code === "auth/email-already-in-use") {
                signin(email, password, event.target);
            }

            console.log(err);
        });
}

// Logout

function afterRemoveForm() {
    refs.logoutBtn().addEventListener('click', handleLogout);
}

function handleLogout(event) {
    event.preventDefault();

    auth.signOut().then();
}

// Sign In

function signin(email, password, logoutRef) {
    auth.signInWithEmailAndPassword(email, password)
        .then(credential => {
            console.log(credential.user);
            logoutRef.reset();
            logoutRef.classList.add('is-hidden');
        })
}







// Добавляет запись в database

// function writeUserData(userId, name, email, imageUrl) {
//     database.ref('users/' + userId).set({
//         username: name,
//         email: email,
//         profile_picture: imageUrl
//     });
// }

// writeUserData(1234, 'Kirill', '12423@12323.com', 'img.img');

// //Читает запись из database

// function getUserData(userId) {
//     database.ref('users/' + userId).on('value', (snapshot) => {
//         console.log(snapshot.val());
//     });
// }
// getUserData('1234');
