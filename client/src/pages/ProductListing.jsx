import { useEffect, useState } from "react";
import Url from "../../../url";
import useGet from "../Hooks/useGet";
import useUserContext from "../Hooks/useUserContext";
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

export default function ProductListing() {
  const { token } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  let navigate = useNavigate();
  const { uid } = useUserContext();
  console.log("APP.JSX: ", uid);

  // const getSeller = async (uid) => {
  //   const docRef = doc(dataBase, "Users", uid);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     // console.log("Document data: ", docSnap.data().name);
  //     return docSnap.data().name;
  //   } else console.log("Error fetching the data");
  // };

  const getAllProducts = async () => {
    const querySnapshot = await getDocs(collection(dataBase, "Products"));
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, doc.data(), doc);
    // });
    const temp = [];
    querySnapshot.forEach(async (e) => {
      temp.push(e.data());
      // console.log(e.data(), "A");
    });
    // temp.map((e) => console.log(e), "B");

    setProducts(temp);

    // const

    // temp.map((a) => {
    //   console.log(a.Name, "temp");
    // });
  };
  useEffect(() => {
    setIsLoading(true);
    getAllProducts();
    // if (Products.length > 0) setIsLoading(false);
    // Products.map((product) => {
    //   product.seller = getSeller(product.seller).name;
    //   console.log("Products: ", product.seller);
    // });
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   async function fetchingData() {
  //     const response = await fetch(Url.serverUrl + "/product/allProducts", {
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const json = await response.json();

  //     if (response.ok) {
  //       setProducts(json);
  //       setIsLoading(false);
  //     } else {
  //       console.log(json);
  //     }
  //   }
  //   if (token) fetchingData();
  // }, [token]);

  // setIsLoading(false);

  return (
    <div className="productListingPage-div">
      {!isLoading ? (
        <div className="productListingPage-container">
          {Products.map((product) => (
            <>
              <Product product={product} />
              {/* <div>{product.Name}</div> */}
            </>
          ))}
        </div>
      ) : (
        "Page is Loading...."
      )}
    </div>
  );
}

function Product({ product }) {
  const { uid } = useUserContext();
  const { dispatch } = useUserContext();
  const Navigate = useNavigate();

  const [quantity, setQuantity] = useState(product.minQuantity);
  const [price, setPrice] = useState(product.price);

  function handleAddQuantity() {
    setPrice((prev) => (prev * (quantity + 1)) / quantity);
    setQuantity((prev) => prev + 1);
  }
  function handleSubtQuantity() {
    if (quantity > 1) {
      setPrice((prev) => (prev * (quantity - 1)) / quantity);
      setQuantity((prev) => prev - 1);
    }
  }
  async function handleAddTocart() {
    // dispatch({ type: "addToCart", payload: { ...product, quantity } });
    // Navigate("/cart");
    if (uid == null) Navigate("/");
    else {
      const docRef = doc(dataBase, "Carts", uid);
      const productsRef = collection(dataBase, "Products");
      // const CartsRef = collection(dataBase, "Carts");
      // const query1 = query(
      //   CartsRef,
      //   where("Items", "array-contains", { name: "anush" })
      // );
      // console.log("Query result: ", query1);

      // const querySnapshot = await getDocs(query1);
      // querySnapshot.forEach((doc) => {
      //   console.log("Query Data: ", doc.data());
      // });

      const productQuery = query(
        productsRef,
        where("title", "==", product.title)
      );
      const querySnapshot = await getDocs(productQuery);
      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        updateDoc(docRef, {
          minQuantity: quantity,
        });
      });

      await updateDoc(docRef, {
        Items: arrayUnion({
          p_name: product.title,
          quantity: quantity,
          price: price,
          seller: product.seller,
        }),
      });
      Navigate("/order");
    }
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
      <p className="productListingPage-product-sellerName">{product.seller}</p>
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
      <p
        className="productListingPage-product-AddToCart"
        onClick={handleAddTocart}
      >
        Add
      </p>
      <p
        className="productListingPage-product-testQuantity"
        onClick={handleTestQuantity}
      >
        Test {product.testQuantity} KG for ₹ {product.testQuantityPrice}
      </p>
    </div>
  );
}
