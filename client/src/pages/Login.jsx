import React, { useRef } from 'react'
import Url from "../../../url" 
import useUserContext from "../Hooks/useUserContext"
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const { dispatch } = useUserContext();
  const Navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin(event) {
    event.preventDefault();
    
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    const url = Url.serverUrl + "/user/login";
    const response = await fetch(url, {
        method : "POST",
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(userData)
      });
      const json = await response.json()

      if(response.ok){
        console.log(json)
        localStorage.setItem('USER' , JSON.stringify(json));
        dispatch({type:"LOGIN" , payload:json});
        emailRef.current.value = ""
        passwordRef.current.value = ""
      }else{  

      }
    
  }

  return (
    <form className="loginPage-div">
      <p className="loginPage-heading">Login to Your Account</p>
      <input type="text"  id="email" placeholder='Email' ref={emailRef} />

      <input type="password" id="password" placeholder='Password' ref={passwordRef} />

      <button onClick={handleLogin}>Submit</button>
    </form>
  )
}
