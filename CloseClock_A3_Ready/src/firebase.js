// src/firebase.js

import { initializeApp } from "firebase/app";
import { 
  getFirestore 
} from "firebase/firestore";

import {
  getAuth
} from "firebase/auth";


// Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDE8FRbzecLX-M72mxDYR5UIwECj0_2ANc",

  authDomain: "closeclock-mvp.firebaseapp.com",

  projectId: "closeclock-mvp",

  storageBucket: "closeclock-mvp.firebasestorage.app",

  messagingSenderId: "743888606929",

  appId: "1:743888606929:web:7aaa25dd1ad9392837d7f0"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Firestore database

export const db = getFirestore(app);


// Authentication

export const auth = getAuth(app);