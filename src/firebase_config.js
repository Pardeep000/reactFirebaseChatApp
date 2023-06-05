// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
//
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2kk7aGv3BNu3din9gD3_ZbVurNzDjFI4",
  authDomain: "reactchatapp-43ac2.firebaseapp.com",
  projectId: "reactchatapp-43ac2",
  storageBucket: "reactchatapp-43ac2.appspot.com",
  messagingSenderId: "369714464346",
  appId: "1:369714464346:web:db6a57f6ad1f82fd81ba63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
//
export const messaging = getMessaging(app);