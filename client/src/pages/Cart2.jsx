import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dataBase } from "../firebaseConfig";
import useUserContext from "../Hooks/useUserContext";
import "../Styles/OrderPage.css";
import Sample from "../../public/Images/Sample Wheat Image.png";
import sampleBook from "../../public/Images/sampleBook.jpeg";


const Cart2 = () => {
  const { uid } = useUserContext();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [subtotal, setSubtotal] = useState(0);

  console.log(subtotal);

  useEffect(() => {
    setSubtotal(() => {
      var total = 0;
      if (!cart?.length) return 0;
      cart.forEach((item) => {
        if (item.price) total += JSON.parse(item.price);
      });
      return total;
    });
  }, [cart]);

  let array = [];

  // const getCartItems = async () => {
  //   console.log(uid);
  //   try {
  //     const docRefernce = doc(dataBase, "Carts", uid);
  //     const docSnap = await getDoc(docRefernce)
  //       .then(() => {
  //         console.log("DONE");
  //       })
  //       .catch((e) => console.log(e));
  //     //   if (docSnap.exists()) {
  //     setCart(docSnap.data());
  //     array = Object.entries(cart.items);
  //     array.map((arr) => {
  //       console.log(`${arr[0]} => ${arr[1]}`);
  //     });
  //     console.log(docSnap.data());
  //     // console.log("SUCCESS");
  //     //   } else console.log("BYE");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getCartItems = async () => {
    console.log(uid);
    const docRef = doc(dataBase, "Carts", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data().Items);
      // setCart(docSnap.data().Items);
      // array = Object.entries(cart);
      // array.map((arr) => console.log(`${arr[0]} => ${arr[1]}`));
      // let temp = [];
      // docSnap.data().Items.map((obj) => {
      //   temp.push(obj);
      // });
      // setCart(temp);
      // cart.map((innerObj) => {
      //   console.log(innerObj);
      //   console.log("Changed");
      // });
      setCart(docSnap.data().Items);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (uid) {
      setLoading(true);
      getCartItems();
      // console.log("WORKING");
      setLoading(false);
    }
  }, [uid]);

  console.log(cart);

  return loading ? (
    "Content Loading...."
  ) : (
    <div className="orderPage-div">
      <div className="orderPage-left-div">
        {cart?.length
          ? cart.map((item) => <Product product={item} setCart={setCart} />)
          : "Empty Cart"}
      </div>

      <div className="orderPage-right-div">
        <div className="orderPage-subtotal">
          <p>Subtotal ₹ {subtotal} </p>
          <p>For {cart?.length ? cart.length : "0"} products</p>
        </div>

        <div className="orderPage-btn">
          <div className="orderPage-checkout-btn">Checkout</div>
          <div className="orderPage-shopping-btn">Continue Shopping</div>
        </div>
      </div>
    </div>
  );
};

function Product({ product, setCart }) {
  console.log(product);

  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);

  function handleAddQuantity() {
    const newPrice = (+price * (+quantity + 1)) / +quantity;
    const newQuantity = +quantity + 1;
    setPrice(newPrice);
    setQuantity(newQuantity);

    setCart((prev) =>
      prev.map((prod) => {
        if (prod.p_name !== product.p_name) return prod;
        return { ...prod, quantity: newQuantity, price: newPrice };
      })
    );
  }
  function handleSubtQuantity() {
    if (quantity > 1) {
      setPrice((prev) => (+prev * (+quantity - 1)) / +quantity);
      setQuantity((prev) => +prev - 1);
    }
  }

  return (
    <div className="orderPage-product-div">
      <div className="orderPage-product-image">
        {product?.productImage ? (
          <img src={product.productImage} />
        ) : (
          <img src={sampleBook} />
        )}
      </div>

      <div className="orderPage-product-title">{product.p_name}</div>

      <div className="orderPage-product-quantity-div">
        <div className="orderPage-quantity-btn">
          <div className="orderPage-minus" onClick={handleSubtQuantity}>
            -
          </div>
          <div className="orderPage-quantity">{quantity}</div>
          <div className="orderPage-plus" onClick={handleAddQuantity}>
            +
          </div>
        </div>
      </div>

      <div className="orderPage-product-remove-btn">Remove</div>

      <div className="orderPage-product-price">₹ {price}</div>
    </div>
  );
}

export default Cart2;
