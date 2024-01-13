// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import useUserContext from '../../Hooks/useUserContext';

const Navbar = () => {

  const { user, dispatch } = useUserContext();

  function handleLogout() {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('USER')
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Home">Products</Link>
        </li>
        <li>
          <Link to="/cart">Shopping Cart</Link>
        </li>
        <li>
          <Link to="/chatbot">Talk With AI</Link>
        </li>
        {!user ? (<>
          <li>
            <Link to="/user/login">Login</Link>
          </li>
          <li>
            <Link to="/user/signup">Sign Up</Link>
          </li>
        </>) : (
          <li>
            <Link className="logoutButton" onClick={handleLogout}>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
