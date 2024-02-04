import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const LoginAPI = (email, password) => {
  try {
    const user = signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const RegisterAPI = (email, password) => {
  try {
    const user = createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GoogleSignInApi = () => {
  try {
    let googleProvider = new GoogleAuthProvider();
    const response = signInWithPopup(auth, googleProvider);
    return response;
  } catch (error) {}
};
