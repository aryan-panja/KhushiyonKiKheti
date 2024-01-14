import { redirect, useNavigate } from "react-router-dom";
import useUserContext from "../Hooks/useUserContext"
import { useState } from "react";

export default function Cart(){
  const { cart } = useUserContext();
  const [Cart , setCart ] = useState(cart)  

  return(
    <div className="cart-div">
      <div className="cart-products-div">
        {Cart.map( product => (
          <CartProduct product={product} setCart={setCart} key={product._id} />
        ))}
      </div>
    </div>
  )
}

function CartProduct({ product , setCart}) {

  const {dispatch} = useUserContext();  
  const Navigate = useNavigate()

  const [price , setPrice ] = useState(()=>{
    console.log(product.title + " " + product.testItem);
    if(product.testItem) return product.testQuantityPrice
    return product.price * product.quantity/product.minQuantity
  })
  const [ quantity , setQuantity ] = useState(product.quantity);

  function handleRemoveBtn(){
    dispatch({ type : "removeFromCart" , payload : product});
    const data = JSON.parse(localStorage.getItem('USER'));
    setCart(prevState=>prevState.filter(item => item._id !== product._id));
  }
  return (
    <div className="cartProduct">
      <div className="cartProduct-data-div">
        <p className="cartProduct-title">
          {product.title}
        </p>
        <p className="cartProduct-description">
          {product.description}
        </p>
        {product.title}
      </div>
      <div className="cartProduct-Price">
      ₹ {price}
      </div>
      <div className="cartProduct-quantity">
        {quantity} Kg
      </div>
      <div className="cartProduct-removeBtn" onClick={handleRemoveBtn}>
        Remove
      </div>
    </div>
  );
}
