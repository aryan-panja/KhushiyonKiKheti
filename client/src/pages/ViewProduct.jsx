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
        // console.log("from the query's for each");
      });

      //   const docSnap = await getDoc(docRef);
      //   if (docSnap.exists()) {
      //     const data = docSnap.data();
      //     console.log("From DocSnap: ", data);
      //     const items = data.Items;
      //     items.push({
      //       p_name: product.title,
      //       quantity: quantity,
      //       price: price,
      //       seller: product.sellerName,
      //       sellerID: product.seller,
      //     });
      // }
      //   consol   e.log(items);
      await updateDoc(docRef, {
        Items: arrayUnion({
          p_name: product.title,
          quantity: quantity,
          price: price,
          seller: product.sellerName,
          sellerID: product.seller,
        }),
      });
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

  return (
    <div className="productListingPage-product" key={product._id}>
      <div className="product-right-container">
        <p className="productListingPage-product-title">{product.title}</p>
        <p className="productListingPage-product-description">
          {product.description}
        </p>

        <div className="productListingPage-product-quantity">
          <p className="minus-btn" onClick={handleSubtQuantity}>
            -
          </p>
          {quantity} Kg
          <p className="add-btn" onClick={handleAddQuantity}>
            +
          </p>
        </div>

        <p className="productListingPage-product-price">₹{price}</p>
        <p className="productListingPage-product-sellerName">
          Sold By: {product.sellerName}
        </p>
        <p className="productListingPage-product-sellerName">
          Remaining Quantity: {product.totalQuantity}
        </p>
        <p
          className="productListingPage-product-viewProduct"
          onClick={handleAddTocart}
        >
          Add to Cart
        </p>
        <p
          className="productListingPage-product-testQuantity"
          onClick={handleTestQuantity}
        >
          Test {product.testQuantity} KG for ₹ {product.testQuantityPrice}
        </p>
      </div>
    </div>
  );
};

export default ViewProduct;
