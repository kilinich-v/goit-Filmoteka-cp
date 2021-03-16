import addToQueueList from "./addToQueueList";
import firebase from "firebase/app";
const firebaseui = require('firebaseui');
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

export default {
    db: () => firebase.firestore(),

    newFilmToData(filmId, genre_ids, original_title, poster_path, release_date) {
        return {
            filmId: filmId,
            genre_ids: genre_ids,
            original_title: original_title,
            poster_path: poster_path,
            release_date: release_date
        }
    },

    addNewUser(userId) {
        this.db().collection("users").doc(userId).set({
            queue: [],
            watched: []
        })
    },

    removeUser(userId) {
        this.db().collection("users").doc(userId).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    },

    addFilmToQueue(userId, newFilm) {
        this.db().collection("users").doc(userId).update(
            { queue: firebase.firestore.FieldValue.arrayUnion(newFilm) });
    },

    addFilmToWatched(userId, newFilm) {
        this.db().collection("users").doc(userId).update(
            { watched: firebase.firestore.FieldValue.arrayUnion(newFilm) });
    },

    removeFilmOnQueue(userId, newFilm) {
        this.db().collection("users").doc(userId).update(
            { watched: firebase.firestore.FieldValue.arrayRemove(newFilm) });
    },

    removeFilmOnWatched(userId, newFilm) {
        this.db().collection("users").doc(userId).update(
            { watched: firebase.firestore.FieldValue.arrayRemove(newFilm) });
    },

    toRenderQueue(userId, cb) {
        this.db().collection("users").doc(userId).onSnapshot(doc => {
            cb(doc.data().queue);
        });
    },

    toRenderWatched(userId, cb) {
        this.db().collection("users").doc(userId).onSnapshot(doc => {
            cb(doc.data().watched);
        });
    },

}