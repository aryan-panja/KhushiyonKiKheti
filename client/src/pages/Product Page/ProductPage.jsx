// src/components/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import './index.css'

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(true);

  useEffect(() => {
    // Simulating fetching product data from an API
    const fetchProductData = async () => {
      try {
        const response = await fetch(`api/products/${id}`); // Replace with your actual API endpoint
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  return (
    <div className="product-page-container">
      {product ? (
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <Link to={'/cart'} ><button className="add-to-cart-btn">Add to Cart</button></Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;