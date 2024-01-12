import React from 'react'

const ProductListing = () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10.99, image: 'product1.jpg' },
        { id: 2, name: 'Product 2', price: 19.99, image: 'product2.jpg' },
        { id: 3, name: 'Product 3', price: 14.99, image: 'product3.jpg' },
        // Add more products here
    ];

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {products.map((product) => (
                <div key={product.id} style={{ flex: '0 0 300px', margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductListing