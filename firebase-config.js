// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPqoJKSwwk9fScYUT7D06JD9HW3wh45uU",
  authDomain: "lord-rahl-99116.firebaseapp.com",
  projectId: "lord-rahl-99116",
  storageBucket: "lord-rahl-99116.firebasestorage.app",
  messagingSenderId: "114003837367",
  appId: "1:114003837367:web:0d2e98302e2cb57f4b6832",
  measurementId: "G-2GW0XXZ5QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize core services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
