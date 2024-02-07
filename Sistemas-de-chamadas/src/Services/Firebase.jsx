import {initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCKKBLKj-J7AYmCgojqD9c_GMP-la79Cvs",
    authDomain: "sistemas-de-chamadas-f4d19.firebaseapp.com",
    projectId: "sistemas-de-chamadas-f4d19",
    storageBucket: "sistemas-de-chamadas-f4d19.appspot.com",
    messagingSenderId: "688209519385",
    appId: "1:688209519385:web:c102afce78483a86d59b88",
    measurementId: "G-DNNYYZ1BQ2"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db, storage };