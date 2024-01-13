import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import Url from "../../../url"
import useUserContext from "../Hooks/useUserContext";

export default function AddProductPage(){

    const titleRef = useRef();
    const descRef = useRef();
    const priceRef = useRef();
    const minquantityref = useRef();
    const Navigate = useNavigate();
    const { user , token } = useUserContext();

    async function handleAddProduct(event){
        event.preventDefault()

        const data = {
            title : titleRef.current.value,
            description : descRef.current.value,
            sellerName : user.name,
            sellerId : user._id,
            minQuantity : minquantityref.current.value,
            price : priceRef.current.value
        }
        const response = await fetch(Url.serverUrl + '/product/addProduct',{
            method:"POST",
            headers : {
                'content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body : JSON.stringify(data)
        });

        const json = await response.json();

        if(response.ok){
            console.log(json);
            Navigate('/');
        }else{
            console.log(json)
        }

        
    }

    return(
        <div className="addProductPage-div">
            <p className="addProductPage-heading">
                Add Your Product Here
            </p>

            <div className="addProductPage-title">
                <p className="heading">Title</p>
                <input type="text" id="title" ref={titleRef}/>
            </div>

            <div className="addProductPage-description">
                <p className="heading">Description</p>
                <input type="text" id="description" ref={descRef}/>
            </div>

            <div className="addProductPage-minQuantity">
                <p className="heading">Minimum Quantity in grams</p>
                <input type="Number" id="minQuantity" ref={minquantityref}/>
            </div>

            <div className="addProductPage-price">
                <p className="heading">Price for Min. Quantity</p>
                <input type="Number" id="price" ref={priceRef}/>
            </div>

            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    )
}