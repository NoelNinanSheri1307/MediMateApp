// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyA25HGvZCP5upxxEC0-IueHd8FfMclEHyQ",
  authDomain: "medimate-dacac.firebaseapp.com",
  databaseURL: "https://medimate-dacac-default-rtdb.asia-southeast1.firebasedatabase.app", 
  projectId: "medimate-dacac",
  storageBucket: "medimate-dacac.firebasestorage.app",
  messagingSenderId: "293681690310",
  appId: "1:293681690310:web:33153b3c9412e2b8ae89c7",
  measurementId: "G-SK9WX2PZBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication and database
export const auth = getAuth(app);
export const db = getDatabase(app);
