import { useRef, useState } from "react";
import Url from "../../../url";
import useUserContext from "../Hooks/useUserContext";
import { RegisterAPI, GoogleSignInApi } from "../API/authApi";
import { ToastContainer, toast } from "react-toastify";
import { GetUser } from "../Hooks/getUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";
import { dataBase } from "../firebaseConfig.js";
import GooglePng from "../../public/Images/googlePng.webp"

import "../Styles/AuthPages.css"
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { dispatch } = useUserContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneNumberRef = useRef();
  const isSellerRef = useRef();
  const [isLoading, setisLoading] = useState(false);
  const Navigate = useNavigate();

  const SuccessNotify = () => {
    toast.success("SignUp Succesfull");
  };
  const ErrorNotify = () => {
    toast.error("Failed to SignIn");
  };

  async function handleSignUp(event) {
    event.preventDefault();
    // setisLoading(true);
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      address: addressRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      seller: isSellerRef.current.value,
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
      const resObject = {
        email: response.user.email,
        uid: response.user.uid,
        accessToken: response.user.stsTokenManager.accessToken,
        refreshToken: response.user.stsTokenManager.refreshToken,
        userName: userData.name,
      };

      // document.cookie();

      localStorage.setItem("USER", JSON.stringify(resObject));
      dispatch({ type: "LOGIN", payload: resObject });
      toast.info(userData.seller);
      console.log(userData.seller);
      SuccessNotify();
      await setDoc(doc(dataBase, "Users", resObject.uid), {
        name: userData.name,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        seller: userData.seller,
        // cart:
      });
      await setDoc(doc(dataBase, "Carts", resObject.uid), {
        items: {},
      });
    } catch (error) {
      ErrorNotify();
    }
  }

  return (
    <div id="signUp">
      <form className="signupPage-div">
        <p className="signupPage-heading">
          Sign Up
          <p>
            To Access all the benefits
          </p>
        </p>


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
          <option value="Buyer" selected>
            Buyer
          </option>
          <option value="Seller">Seller</option>
        </select>
        <button disabled={isLoading} onClick={handleSignUp} className="signup-btn">
          SignUp
        </button>

        <button className="signup-btn" style={{ backgroundColor: 'white', border: '0.5px solid black' }}>
          <img src={GooglePng} style={{ height: '2.5vh', marginRight: '8px' }} />
          Sign In using Google
        </button>

        <p onClick={() => Navigate('/user/login')} style={{ cursor: 'pointer' }}>
          Already have an Account, Login Here
        </p>

      </form>
    </div>
  );
}
