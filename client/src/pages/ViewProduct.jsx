import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "./ProductListing";
import useUserContext from "../Hooks/useUserContext";
import { useEffect } from "react";
import Url from "../../../url";
import useGet from "../Hooks/useGet";
// import useUserContext from "../Hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { query, where } from "firebase/firestore";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  // query,
  // query,
  updateDoc,
} from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import { userContext } from "../context/userContext";
import SampleWheatImage from "../../public/Images/Sample Wheat Image.png";
import InfoImage from "../../public/Images/info.png";

import "../Styles/ViewProductPage.css";

const ViewProduct = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const [isLoading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(product.minQuantity);
  const [price, setPrice] = useState(product.price);
  const { uid } = useUserContext();
  function handleAddQuantity() {
    setPrice((prev) => (+prev * (+quantity + 1)) / +quantity);
    setQuantity((prev) => +prev + 1);
  }
  function handleSubtQuantity() {
    if (quantity > 1) {
      setPrice((prev) => (+prev * (+quantity - 1)) / +quantity);
      setQuantity((prev) => +prev - 1);
    }
  }

  async function handleAddTocart() {
    if (uid == null) Navigate("/");
    else {
      const docRef = doc(dataBase, "Carts", uid);
      const productsRef = collection(dataBase, "Products");
      const productQuery = query(
        productsRef,
        where("title", "==", product.title)
      );
      const querySnapshot = await getDocs(productQuery);
      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        updateDoc(docRef, {
          totalQuantity: doc.data().totalQuantity - quantity,
        });
      });
      const updatedDocument = await updateDoc(docRef, {
        Items: arrayUnion({
          p_name: product.title,
          quantity: quantity,
          price: price,
          seller: product.sellerName,
          sellerID: product.seller,
        }),
      });

      console.log("Add this product to cart");
      Navigate("/order");
    }
    //   Navigate("/order");
    // }
    console.log(uid);
  }
  function handleTestQuantity() {
    dispatch({
      type: "addToCart",
      payload: {
        ...product,
        price: product.testQuantityPrice,
        quantity: product.testQuantity,
        testItem: true,
      },
    });
    Navigate("/cart");
  }

  console.log(product);

  return (
    <div className="viewProductPage-div">
      <div className="viewProductPage-left-div">
        <div className="viewProduct-Image">
          {product?.productImage ? (
            <img src={product.productImage} />
          ) : (
            <img src={SampleWheatImage} />
          )}
        </div>
      </div>

      <div className="viewProductPage-right-div">
        <div className="viewProduct-title">{product.title}</div>

        <div className="viewProduct-price">Price : ₹ {price}</div>

        <div className="viewProduct-quantity-div">
          <p>Choose Your Desired Quantity</p>
          <div className="viewProduct-quantity-btn">
            <div className="viewProduct-minus" onClick={handleSubtQuantity}>
              -
            </div>
            <div className="viewProduct-quantity">{quantity}</div>
            <div className="viewProduct-plus" onClick={handleAddQuantity}>
              +
            </div>
          </div>
        </div>

        <div className="viewProduct-cart-btn">
          <div className="viewProduct-addToCart-btn" onClick={handleAddTocart}>
            Add To Cart
          </div>

          {/* <div
            className="viewProduct-addTestToCart-btn"
            onClick={handleTestQuantity}
          >
            Test {product.testQuantity} Kg for ₹{product.testQuantityPrice}
          </div> */}
        </div>

        {/* <div className="viewProduct-TestQuantity-guide">
          <img src={InfoImage} />
          If You Want to Test the product first , You can order it's Test
          Quantity
        </div> */}

        <div className="viewProduct-description">{product.description}</div>
      </div>
    </div>
  );
};

export default ViewProduct;
