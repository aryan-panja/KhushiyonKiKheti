import { useRef , useState } from "react";
import Url from "../../../url"
import useUserContext from "../Hooks/useUserContext"

export default function SignUp() {
  const { dispatch } = useUserContext();
  const emailRef = useRef(); 
  const passwordRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneNumberRef = useRef();
  const isSellerRef = useRef();
  const [isLoading, setisLoading] = useState(false)

  async function handleSignUp(event) {
    event.preventDefault();
    setisLoading(true)

    console.log(emailRef.current.value)

    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      address: addressRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
    };
    console.log(isSellerRef.current.value);
    if(isSellerRef.current.value == 'Seller') userData.isSeller = true;
    else userData.isSeller = false;

    const url = Url.serverUrl + "/user/signup";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const json = await response.json()
    setisLoading(false)
    if (response.ok) {
      console.log(json);
      localStorage.setItem('USER', JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      emailRef.current.value = "";
      passwordRef.current.value = ""
    } else {
      seterror(json.message);
    }
  }



return (
  <form className="signupPage-div">
    <p className="signupPage-heading">Create Account</p>

    <input type="text" id="userName" placeholder="Name" ref={nameRef} />

    <input type="email" id="email" placeholder="Email" ref={emailRef} />

    <input type="password" id="password" placeholder="Password" ref={passwordRef} />

    <input type="text" id="userAddress" placeholder="Address" ref={addressRef} />

    <input type="number" id="phoneNumber" placeholder="Phone number" ref={phoneNumberRef} />

    <select id="isSeller" ref={isSellerRef}>
      <option value="Buyer">Buyer</option>
      <option value="Seller">Seller</option>
    </select>

    <button disabled={isLoading} onClick={handleSignUp}>SignUp</button>
  </form>
)
}