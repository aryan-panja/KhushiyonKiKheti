//Images
import Icon from "../../../public/Images/Icon.png";

// Components
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import useUserContext from "../../Hooks/useUserContext";

const Navbar = () => {
  const { user, dispatch } = useUserContext();
  const { uid } = useUserContext();

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("USER");
  }

  useEffect(() => {
    console.log(user);
  });

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

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Shopping Cart</Link>
        <Link to="/chatbot">किसान मित्र</Link>

        {user?.isSeller && (
          <>
            <Link to="/predict-crop">Predict Crop</Link>
            <Link to="/add-product">Add Product</Link>
          </>
        )}
        {uid ? (
          <Link className="logoutButton" onClick={handleLogout}>
            Logout
          </Link>
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
