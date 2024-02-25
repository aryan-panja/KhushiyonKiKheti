// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzquwaikpwTaOxY8Xzt0thVkT1yObArpg",
  authDomain: "kissan-a96e9.firebaseapp.com",
  projectId: "kissan-a96e9",
  storageBucket: "kissan-a96e9.appspot.com",
  messagingSenderId: "520825920917",
  appId: "1:520825920917:web:5b07363377bb2ede9eea9c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dataBase = getFirestore(app);
const storage = getStorage(app);

export { app, auth, dataBase,storage};