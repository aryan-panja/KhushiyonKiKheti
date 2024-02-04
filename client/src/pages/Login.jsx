import React, { useRef } from "react";
import Url from "../../../url";
import useUserContext from "../Hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../API/authApi";
import { ToastContainer, toast } from "react-toastify";

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

  async function handleLogin(event) {
    event.preventDefault();

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

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
      const response = await LoginAPI(userData.email, userData.password);
      console.log(response);
      SuccessNotify();
      //* clearFields();
    } catch (error) {
      ErrorNotify();
      clearFields();
    }
    // const json = {};

    // if (response) {
    //   console.log(json);
    //   // localStorage.setItem("USER", JSON.stringify(json));
    //   // dispatch({ type: "LOGIN", payload: json });
    //   // emailRef.current.value = "";
    //   // passwordRef.current.value = "";
    // } else {
    // }
  }

  return (
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
    </form>
  );
}
