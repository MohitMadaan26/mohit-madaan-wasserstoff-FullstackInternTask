// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-1d88e.firebaseapp.com",
  projectId: "eshop-1d88e",
  storageBucket: "eshop-1d88e.appspot.com",
  messagingSenderId: "508350720664",
  appId: "1:508350720664:web:7bfdacaada72bb5f87beed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
