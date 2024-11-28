// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGPAfRB-ds8FAIO1uG9FZgtTgLqyYFtKI",
  authDomain: "fir-e8c8b.firebaseapp.com",
  databaseURL: "https://fir-e8c8b-default-rtdb.firebaseio.com",
  projectId: "fir-e8c8b",
  storageBucket: "fir-e8c8b.appspot.com",
  messagingSenderId: "386942760771",
  appId: "1:386942760771:web:bc01e8f2ae17ad865521f6",
  measurementId: "G-QCXE9TQ5B9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;