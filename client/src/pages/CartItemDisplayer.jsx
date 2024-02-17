import React from "react";

const CartItemDisplayer = (object) => {
  console.log("From CID: ", object.product);
  return (
    <div>
      <h2>Product Details</h2>
      <div>Name: {object.product.p_name}</div>
      <div>Seller: {object.product.seller}</div>
      <div>Quantity: {object.product.quantity}</div>
      <div>Price: {object.product.price}</div>
    </div>
  );
};

export default CartItemDisplayer;
