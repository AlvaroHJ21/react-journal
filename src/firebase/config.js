// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbQBE4-mcc3WaVMzfUK0vEP0yq7Zy6NfE",
    authDomain: "journal-app-a76e4.firebaseapp.com",
    projectId: "journal-app-a76e4",
    storageBucket: "journal-app-a76e4.appspot.com",
    messagingSenderId: "7076925531",
    appId: "1:7076925531:web:d17df16e7da78ea5562f7e",
    measurementId: "G-WMQRP4BR5C",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
// const analytics = getAnalytics(app);
