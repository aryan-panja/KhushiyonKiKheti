import { useEffect, useState } from "react"
import Url from "../../../url"
import useGet from "../Hooks/useGet";
import useUserContext from "../Hooks/useUserContext";

export default function ProductListing(){
  const { token , location } = useUserContext();
  const [isLoading , setIsLoading ] = useState(true)
  const [ Products , setProducts ] = useState([]);
  console.log(location)
  useEffect(()=>{
    // const ProductData = useGet('/product/allProducts');
    
    // if(token ?? ProductData.response.ok){
    //   console.log(ProductData.json)
    //   setProducts(ProductData.json);
    //   setIsLoading(false)
    // }

    async function fetchingData(){
      const response = await fetch(Url.serverUrl + '/product/allProducts',{
        headers : {
          'content-type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      });
      const json = await response.json();

      if(response.ok){
        setProducts(json);
        setIsLoading(false);
      }else{
        console.log(json)
      }
    }
    if( token ) fetchingData()

  },[token])

  return (
    <div className="productListingPage-div">
      {!isLoading ? (
        <div className="productListingPage-container">
          {Products.map((product)=>(
            <div className="productListingPage-product">
              {product.title}
            </div>
          ))}
        </div>
      ):(
        "Page is Loading"
      ) }
    </div>
  )
}