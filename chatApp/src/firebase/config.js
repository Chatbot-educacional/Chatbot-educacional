import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAT6CATosrnNmy9tpTB8GEenPcHcJBuA8k",
  authDomain: "chatboteduca.firebaseapp.com",
  projectId: "chatboteduca",
  storageBucket: "chatboteduca.appspot.com",
  messagingSenderId: "688718917755",
  appId: "1:688718917755:web:420452363a0d56175232de"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};