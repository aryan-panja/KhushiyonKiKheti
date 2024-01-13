import React from 'react'

export default function Login() {

  async function handleSubmit(){
    
  }

  return (
    <form className="loginPage-div">
      <label htmlFor="email">Email</label>
      <input type="text"  id="email" />

      <label htmlFor="password">Password</label>
      <input type="text" id="password" />

      <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}
