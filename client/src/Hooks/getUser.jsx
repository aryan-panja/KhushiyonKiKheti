import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js";

const GetUser = async () => {
  const value = onAuthStateChanged(auth, (user) => {
    if (user) {
      // this means that the user is signed in

      console.log(user);
    } else {
      // this means that the user is signed out
      console.log("User is signed Out");
    }
  });
  return value;
};

export { GetUser };
