import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBvPl9758veLKGdtohMQIUOzv-HtQyKaDE",
  authDomain: "nibm-f1-wizard.firebaseapp.com",
  projectId: "nibm-f1-wizard",
  storageBucket: "nibm-f1-wizard.appspot.com",
  messagingSenderId: "1021576249134",
  appId: "1:1021576249134:web:7504c1ceb92b19a93fc4bf"
};

export const app = initializeApp(firebaseConfig);
export const authProvider = new GoogleAuthProvider();
export const auth = getAuth();
export const firestore = getFirestore(app);
