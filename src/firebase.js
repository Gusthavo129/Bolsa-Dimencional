import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCarlu9xJ6t-hgya93t_kiHk8QSzYIxEEw",
  authDomain: "bolsa-dimensional.firebaseapp.com",
  projectId: "bolsa-dimensional",
  storageBucket: "bolsa-dimensional.firebasestorage.app",
  messagingSenderId: "921201983390",
  appId: "1:921201983390:web:5dbde54430ab24daada08f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {db, auth, googleProvider};