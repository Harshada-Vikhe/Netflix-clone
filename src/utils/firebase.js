// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwOIqUl4aJZ6fAB8zSv_OD12H6aGPLmV4",
  authDomain: "netflixclone-4af1e.firebaseapp.com",
  projectId: "netflixclone-4af1e",
  storageBucket: "netflixclone-4af1e.appspot.com",
  messagingSenderId: "280226829316",
  appId: "1:280226829316:web:0d1d3fe19eede32dca1151",
  measurementId: "G-M9WEXWQNJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();