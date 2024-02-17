import React, { useRef } from "react";
import Url from "../../../url";
import useUserContext from "../Hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../API/authApi";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Login() {
  const { dispatch } = useUserContext();
  const Navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const SuccessNotify = () => {
    toast.success("Login Succesfull");
  };
  const ErrorNotify = () => {
    toast.error("Login Failed");
  };
  const clearFields = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  let navigate = useNavigate();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (res) => {
  //     console.log("Login: ", res?.accessToken);
  //     const user = {
  //       email: res.email,
  //       uid: res.uid,
  //       displayName: res.displayName,
  //     };
  //   });
  // }, []);

  async function handleLogin(event) {
    event.preventDefault();

    // const url = Url.serverUrl + "/user/login";
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(userData),
    // });
    // const json = await response.json();

    try {
      const userData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const response = await LoginAPI(userData.email, userData.password);
      SuccessNotify();
      clearFields();

      if (response) {
        const json = {
          email: response.user.email,
          uid: response.user.uid,
        };
        console.log(json);
        localStorage.setItem("USER", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      }
    } catch (error) {
      ErrorNotify();
      clearFields();
    }

    // if (response) {
    //   console.log(json);
    //   dispatch({ type: "LOGIN", payload: json });
    //   emailRef.current.value = "";
    //   passwordRef.current.value = "";
    // } else {
    // }
  }

  async function forgotPassword(event) {
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    event.preventDefault();
    // toast.info("Function Disabled for Testing Purposes");
    sendPasswordResetEmail(auth, userData.email)
      .then(() => {
        console.log("Forgot Password Email Sent to ", userData.email);
      })
      .catch((error) => {
        console.log("Error sending Forgot Password: ", error);
      });

    console.log("Forgot Password");
  }

  return (
    <div>
      <form className="loginPage-div">
        <p className="loginPage-heading">Login to Your Account</p>
        <input type="text" id="email" placeholder="Email" ref={emailRef} />

        <input
          type="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
        />

        <button onClick={handleLogin}>Submit</button>
        <button onClick={forgotPassword}>Forgot Password</button>
      </form>
    </div>
  );
}
