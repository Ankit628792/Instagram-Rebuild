// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOFU3jFGB8La4nDRk79yQK9gRId7UOezc",
    authDomain: "instagram-clone-by-ak.firebaseapp.com",
    projectId: "instagram-clone-by-ak",
    storageBucket: "instagram-clone-by-ak.appspot.com",
    messagingSenderId: "949318553921",
    appId: "1:949318553921:web:4fb055a7b4d177d1b911c0",
    measurementId: "G-28H5E43PQX"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage }