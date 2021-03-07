import firebase from "firebase/app";
const firebaseui = require('firebaseui');
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAwvTZQPQ0qPCQxSs9vxhjBo1LwG4LRD_E",
    authDomain: "https://filmoteka-38bf3.firebaseapp.com",
    databaseURL: "https://filmoteka-38bf3-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com",
    projectId: "your-project-id",
};

firebase.initializeApp(config);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '../login.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '../login.html',
    // Privacy policy url.
    privacyPolicyUrl: '../login.html'
};

ui.start('#firebaseui-auth-container', uiConfig);

// firebase.auth().createUserWithEmailAndPassword('123@123.com', '1234')
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         console.log(user);
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(error);
//     });

// writeUserData(1234, 'Kirill', '12423@12323.com', 'img.img');
