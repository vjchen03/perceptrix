// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw5aZ8g92z_CQoAJ8MzjwA5CiZJoBxNsU",
  authDomain: "finalproject-e7d53.firebaseapp.com",
  projectId: "finalproject-e7d53",
  storageBucket: "finalproject-e7d53.firebasestorage.app",
  messagingSenderId: "350996438098",
  appId: "1:350996438098:web:8804de0c9c260d2191538b",
  measurementId: "G-R3XBZ85HDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);