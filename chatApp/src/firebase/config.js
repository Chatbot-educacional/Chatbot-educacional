import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


export const firebaseConfig = {
  apiKey: "AIzaSyAT6CATosrnNmy9tpTB8GEenPcHcJBuA8k",
  authDomain: "chatboteduca.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "chatboteduca",
  storageBucket: "chatboteduca.appspot.com",
  messagingSenderId: "688718917755",
  appId: "1:688718917755:web:420452363a0d56175232de",
  measurementId: "G-9VP01NDSXJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export {auth, provider, analytics};

export const db = getFirestore(app);
