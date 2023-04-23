import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBvPl9758veLKGdtohMQIUOzv-HtQyKaDE",
  authDomain: "nibm-f1-wizard.firebaseapp.com",
  projectId: "nibm-f1-wizard",
  storageBucket: "nibm-f1-wizard.appspot.com",
  messagingSenderId: "1021576249134",
  appId: "1:1021576249134:web:7504c1ceb92b19a93fc4bf"
};

const app = initializeApp(firebaseConfig);

export default app;