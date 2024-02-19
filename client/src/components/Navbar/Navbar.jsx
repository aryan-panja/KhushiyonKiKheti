//Images
import Icon from "../../../public/Images/Icon.png"
import UserImage from "../../../public/Images/user image.webp"

// Components
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import useUserContext from '../../Hooks/useUserContext';


const Navbar = () => {

  const { uid, dispatch } = useUserContext();
  const navlinksRef = useRef();

  function handleLogout() {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('USER')
  }

  function handleMobileNav() {
    if (navlinksRef.current.style.display == 'flex') {
      navlinksRef.current.style.transform = 'translateX(100%)';
      setTimeout(() => navlinksRef.current.style.display = 'none', 600)
    }
    else {
      navlinksRef.current.style.display = 'flex';
      setTimeout(() => navlinksRef.current.style.transform = 'translateX(0%)', 50)
    }


  }


  return (
    <nav className="navbar">

      <div className="navbar-title">
        <img src={Icon} />
        <div className="navbar-title-text">
          Khushiyon Ki Kheti
          <p className="navbar-title-desc">
            An Initiative to help farmers grow
          </p>
        </div>
      </div>

      <div className="navbar-mobile-container" onClick={handleMobileNav}>
        <img src={UserImage} />
      </div>

      <div className="navbar-links" ref={navlinksRef}>
        <Link to="/">Home</Link>
        <Link to="/cart">Shopping Cart</Link>
        <Link to="/chatbot">किसान मित्र</Link>

        {uid?.isSeller && (
          <>
            <Link to="/predict-crop">Predict Crop</Link>
            <Link to="/add-product">Add Product</Link>
          </>
        )}
        {uid ? (
          <Link className="logoutButton" onClick={handleLogout}>Logout</Link>

        ) : (
          <>
            <Link to="/user/login">Login</Link>
            <Link to="/user/signup">Sign Up</Link>
          </>

        )}

      </div>
    </nav >
  );
};

export default Navbar;
