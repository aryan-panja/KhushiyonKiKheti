import { useEffect, useState } from "react"
import Url from "../../../url"
import useGet from "../Hooks/useGet";
import useUserContext from "../Hooks/useUserContext";

export default function ProductListing() {
  const { token } = useUserContext();
  const [isLoading, setIsLoading] = useState(true)
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchingData() {
      const response = await fetch(Url.serverUrl + '/product/allProducts', {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
        setIsLoading(false);
      } else {
        console.log(json)
      }
    }
    if (token) fetchingData()

  }, [token])

  return (
    <div className="productListingPage-div">
      {!isLoading ? (
        <div className="productListingPage-container">
          {Products.map((product) => (
            <Product product={product} key={product._id}/>
          ))}
        </div>
      ) : (
        "Page is Loading"
      )}
    </div>
  )
}

function Product({ product }) {

  const [quantity , setQuantity ] = useState(500)
  const [price , setPrice ] = useState(100);

  function handleAddQuantity(){
    setPrice( prev => prev*(quantity+1)/quantity);
    setQuantity(prev=>prev+1);
  }
  function handleSubtQuantity(){
    setPrice( prev => prev*(quantity-1)/quantity);
    setQuantity(prev=>prev-1);
  }

  return (
    <div className="productListingPage-product" key={product._id}>
      <p className="productListingPage-product-sellerName">
        {product.sellerName}
      </p>
      <p className="productListingPage-product-title">
        {product.title}
      </p>
      <p className="productListingPage-product-description">
        {product.description}
      </p>
      <div className="productListingPage-product-quantity">
        <p className="minus-btn" onClick={handleSubtQuantity}>-</p>
        {quantity} gm
        <p className="add-btn"onClick={handleAddQuantity} >+</p>
      </div>
      <p className="productListingPage-product-price">
        ₹{price}
        {/* ₹56 */}
      </p>
      <p className="productListingPage-product-AddToCart">
        Add
      </p>

    </div>
  )
}