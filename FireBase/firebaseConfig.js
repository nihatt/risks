// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3zp7HQ0qr7TH8IoPx17iOc1ATr28cuo4",
  authDomain: "itilmobile-4d702.firebaseapp.com",
  projectId: "itilmobile-4d702",
  storageBucket: "itilmobile-4d702.appspot.com",
  messagingSenderId: "948358246645",
  appId: "1:948358246645:web:6da776dae9e20fdce515bc",
  measurementId: "G-T5E7K1E8NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);