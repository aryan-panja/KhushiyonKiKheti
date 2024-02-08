import { useEffect, useState } from "react";
import Url from "../../../url";
import useGet from "../Hooks/useGet";
import useUserContext from "../Hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function ProductListing() {
  const { token } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [Products, setProducts] = useState([]);
  let navigate = useNavigate();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (res) => {
  //     console.log("Product listing: ", res?.accessToken);
  //   });
  // }, []);

  useEffect(() => {
    async function fetchingData() {
      const response = await fetch(Url.serverUrl + "/product/allProducts", {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
        setIsLoading(false);
      } else {
        console.log(json);
      }
    }
    if (token) fetchingData();
  }, [token]);

  // setIsLoading(false);

  return (
    <div className="productListingPage-div">
      {!isLoading ? (
        <div className="productListingPage-container">
          {Products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      ) : (
        "Page is Loading...."
      )}
    </div>
  );
}

function Product({ product }) {
  const { dispatch } = useUserContext();
  const Navigate = useNavigate();

  const [quantity, setQuantity] = useState(product.minQuantity);
  const [price, setPrice] = useState(product.price);

  function handleAddQuantity() {
    setPrice((prev) => (prev * (quantity + 1)) / quantity);
    setQuantity((prev) => prev + 1);
  }
  function handleSubtQuantity() {
    setPrice((prev) => (prev * (quantity - 1)) / quantity);
    setQuantity((prev) => prev - 1);
  }
  function handleAddTocart() {
    dispatch({ type: "addToCart", payload: { ...product, quantity } });
    Navigate("/cart");
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
      <p className="productListingPage-product-sellerName">
        {product.sellerName}
      </p>
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
