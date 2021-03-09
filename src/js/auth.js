import firebase from "firebase/app";
const firebaseui = require('firebaseui');
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import refs from './refs';

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

// const database = firebase.database();
const auth = firebase.auth();
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

refs.singupForm.addEventListener('submit', handleSignup);

function handleSignup(event) {
    event.preventDefault();

    const email = refs.singupForm['signup-email'].value;
    const password = refs.singupForm['signup-password'].value;

    console.log(email, password);

    auth.createUserWithEmailAndPassword(email, password)
        .then(credential => {
            console.log(credential.user);
            refs.singupForm.reset();
            refs.singupForm.classList.add('is-hidden');
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
