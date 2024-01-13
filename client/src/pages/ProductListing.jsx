// src/components/ProductListing.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductListing = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/product/allProducts');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
    fetchData();
  }, []);

  const handleProductClick = (product) => {
    // Navigate to the product detail page and pass the product data in the state
    navigate(`/product/${product._id}`, { state: product });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => handleProductClick(product)}
          style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          <div style={{ flex: '0 0 300px', margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Seller: {product.sellerName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
