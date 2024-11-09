// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2NcmTkQ8YYcEsAUIjRjgAgpOIeWnXnD0",
  authDomain: "email-password-authoriza-4313d.firebaseapp.com",
  projectId: "email-password-authoriza-4313d",
  storageBucket: "email-password-authoriza-4313d.firebasestorage.app",
  messagingSenderId: "59064056865",
  appId: "1:59064056865:web:08588638d9e3c66d427760",
  measurementId: "G-N4PY1CY1MW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);