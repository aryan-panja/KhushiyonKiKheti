import { useRef } from "react";
import usePost from "../Hooks/usePost"
import Url from "../../../url"

export default function SignUp() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();

  async function handleSignUp(event) {
    event.preventDefault();
    
    console.log(emailRef.current.value)

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      address: addressRef.current.value,
      phoneNumber: 23123,
      isBuyer: false
    }

    const response = await fetch(Url.serverUrl + "/user/signup", {
      method : "POST",
      headers: {
        'content-type': 'application/json'
      },
      body : JSON.stringify(userData)
    });
    const json = await response.json()

    console.log(json);
  }

  return (
    <form className="signupPage-div">

      <label htmlFor="email">Email</label>
      <input type="email" id="email" ref={emailRef} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" ref={passwordRef} />

      <label htmlFor="userName">Name</label>
      <input type="text" id="userName" ref={nameRef} />

      <label htmlFor="userAddress">Address</label>
      <input type="text" id="userAddress" ref={addressRef} />

      <button onClick={handleSignUp}>SignUp</button>
    </form>
  )

}