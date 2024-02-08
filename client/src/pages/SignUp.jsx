import { useRef, useState } from "react";
import Url from "../../../url";
import useUserContext from "../Hooks/useUserContext";
import { RegisterAPI, GoogleSignInApi } from "../API/authApi";
import { ToastContainer, toast } from "react-toastify";
import { GetUser } from "../Hooks/getUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js";

export default function SignUp() {
  const { dispatch } = useUserContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneNumberRef = useRef();
  const isSellerRef = useRef();
  const [isLoading, setisLoading] = useState(false);

  const SuccessNotify = () => {
    toast.success("SignUp Succesfull");
  };
  const ErrorNotify = () => {
    toast.error("Failed to SignIn");
  };

  async function handleSignUp(event) {
    event.preventDefault();
    // setisLoading(true);

    // console.log(emailRef.current.value);

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      address: addressRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
    };
    // console.log(isSellerRef.current.value);
    // if (isSellerRef.current.value == "Seller") userData.isSeller = true;
    // else userData.isSeller = false;

    // const url = Url.serverUrl + "/user/signup";
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(userData),
    // });
    // const json = await response.json();
    // setisLoading(false);
    // if (response.ok) {
    //   console.log(json);
    //   localStorage.setItem("USER", JSON.stringify(json));
    //   dispatch({ type: "LOGIN", payload: json });
    //   emailRef.current.value = "";
    //   passwordRef.current.value = "";
    // } else {
    //   seterror(json.message);
    // }
    try {
      const response = await RegisterAPI(userData.email, userData.password);
      // console.log(response.user);

      const resObject = {
        email: response.user.email,
        uid: response.user.uid,
        accessToken: response.user.stsTokenManager.accessToken,
        refreshToken: response.user.stsTokenManager.refreshToken,
      };

      // document.cookie();

      localStorage.setItem("USER", JSON.stringify(resObject));
      dispatch({ type: "LOGIN", payload: resObject });

      SuccessNotify();
    } catch (error) {
      ErrorNotify();
    }
  }

  return (
    <div id="signUp">
      <form className="signupPage-div">
        <p className="signupPage-heading">Create Account</p>

        <input type="text" id="userName" placeholder="Name" ref={nameRef} />

        <input type="email" id="email" placeholder="Email" ref={emailRef} />

        <input
          type="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
        />

        <input
          type="text"
          id="userAddress"
          placeholder="Address"
          ref={addressRef}
        />

        <input
          type="number"
          id="phoneNumber"
          placeholder="Phone number"
          ref={phoneNumberRef}
        />

        <select id="isSeller" ref={isSellerRef}>
          <option value="Buyer">Buyer</option>
          <option value="Seller">Seller</option>
        </select>

        <button disabled={isLoading} onClick={handleSignUp}>
          SignUp
        </button>
      </form>
      <button id="google">Sign In using Google</button>
    </div>
  );
}
