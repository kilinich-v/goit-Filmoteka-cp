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

export default {
    auth: firebase.auth(),

    signUp(event) {
        event.preventDefault();
        const email = event.target['signup-email'].value;
        const password = event.target['signup-password'].value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(credential => {
                console.log(event.target);
                event.target.reset();
                event.target.classList.add('is-hidden');
            }).catch(err => {

                if (err.code === "auth/email-already-in-use") {

                    // this.signIn(email, password, event.target);
                }

                console.log(err);
            });
    },

    logOut(btn) {
        btn.addEventListener('click', () => {
            event.preventDefault();

            firebase.auth().signOut().then();
        });
    },

    signIn(email, password, logoutRef) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(credential => {
                console.log(credential.user);
                logoutRef.reset();
                logoutRef.classList.add('is-hidden');
            })
    }
}