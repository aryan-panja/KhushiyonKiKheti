//Images
import Icon from "../../../public/Images/Icon.png"
import UserImage from "../../../public/Images/user image.webp"

// Components
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import useUserContext from '../../Hooks/useUserContext';


const Navbar = () => {

  const { uid, dispatch} = useUserContext();
  const navlinksRef = useRef();

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("USER");
  }

  function handleMobileNav() {
    if (navlinksRef.current.style.display == 'flex') {
      navlinksRef.current.style.transform = 'translateY(-100%)';
      setTimeout(() => navlinksRef.current.style.display = 'none', 600)
    }
    else {
      navlinksRef.current.style.display = 'flex';
      setTimeout(() => navlinksRef.current.style.transform = 'translateY(0%)', 50)
    }

  }


  return (
    <nav className="navbar">
      <div className="navbar-title">
        <Link to="/">
          <img src={Icon} />
        </Link>
        <Link to="/" className="navbar-title-text">
          Khushiyon Ki Kheti
          <p className="navbar-title-desc">
            An Initiative to help farmers grow
          </p>
        </Link>
      </div>

      <div className="navbar-mobile-container" onClick={handleMobileNav}>
        <img src={UserImage} />
      </div>

      <div className="navbar-links" ref={navlinksRef}>
        {/* <Link to="/">Home</Link> */}
        <Link to="/cart">Shopping Page</Link>
        <Link to="/chatbot">किसान मित्र</Link>
        <Link to="/order">Cart</Link>
        <Link to="/user/profile">Profile</Link>

        {uid && (
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
    </nav>
  );
};

export default Navbar;
