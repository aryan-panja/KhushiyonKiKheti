// src/components/CartPopup.jsx
import React from 'react';
import './index.css';

const CartPopup = ({ setShowCard }) => {
  return (
    <div className="cart-popup">
      <p>Added to Cart!</p>
      <button onClick={() => setShowCard(false)}>Close</button>
    </div>
  );
};

export default CartPopup;