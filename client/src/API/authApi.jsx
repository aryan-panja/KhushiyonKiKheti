import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
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
