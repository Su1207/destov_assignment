// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIg5ZIsTmqU6j_2UO9iqcPQCy4lfVwHOc",
  authDomain: "assignment-51e14.firebaseapp.com",
  projectId: "assignment-51e14",
  storageBucket: "assignment-51e14.appspot.com",
  messagingSenderId: "78152018586",
  appId: "1:78152018586:web:5e2477b7eb1595b8cd4d23",
  measurementId: "G-3WTLHCB1CC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
