// src/components/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import PopCard from '../../components/Pop Card/PopCard'
import './index.css'

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state;
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="product-page-container">
      {product ? (
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Seller: {product.sellerName}</p>
            <button className="add-to-cart-btn" onClick={() => setShowCard(true)}>
              Add to Cart
            </button>
            {showCard && <PopCard
              setShowCard={setShowCard}
            />}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
