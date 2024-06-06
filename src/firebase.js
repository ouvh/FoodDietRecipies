import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0-OV7UPUqMhXw1zZKe2SaztZMXUquQiI",
  authDomain: "foodrecipiescc.firebaseapp.com",
  projectId: "foodrecipiescc",
  storageBucket: "foodrecipiescc.appspot.com",
  messagingSenderId: "985562218661",
  appId: "1:985562218661:web:051c5e10709a6ad7ad0d4c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firebase Functions (if needed)
const functions = firebase.functions();

export { db, auth, functions };
