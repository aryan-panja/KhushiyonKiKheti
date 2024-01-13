import { useRef } from "react"

export default function AddProductPage(){

    const titleRef = useRef();

    function handleAddProduct(event){
        event.preventDefault()
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
                <input type="text" id="description" ref={titleRef}/>
            </div>

            <div className="addProductPage-minQuantity">
                <p className="heading">Minimum Quantity in grams</p>
                <input type="Number" id="minQuantity" ref={titleRef}/>
            </div>

            <div className="addProductPage-price">
                <p className="heading">Price</p>
                <input type="text" id="price" ref={titleRef}/>
            </div>

            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    )
}