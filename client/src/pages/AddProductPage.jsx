import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Url from "../../../url";
import useUserContext from "../Hooks/useUserContext";
import { doc, addDoc, collection } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import "../Styles/AddProductPage.css"

export default function AddProductPage() {
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const minquantityref = useRef();
  const testQuantityRef = useRef();
  const testPriceRef = useRef();
  const totalQuantityRef = useRef();
  const Navigate = useNavigate();
  //   const { user, token } = useUserContext();
  const { uid } = useUserContext();
  const { userName } = useUserContext();

  async function handleAddProduct(event) {
    event.preventDefault();

    const data = {
      title: titleRef.current.value,
      description: descRef.current.value,
      totalQuantity: totalQuantityRef.current.value,
      //   sellerName: user.name,
      //   sellerId: user._id,
      minQuantity: minquantityref.current.value,
      price: priceRef.current.value,
      testQuantity: testQuantityRef.current.value,
      testQuantityPrice: testPriceRef.current.value,
    };

    const docRef = await addDoc(collection(dataBase, "Products"), {
      title: data.title,
      description: data.description,
      price: data.price,
      testQuantity: data.testQuantity,
      testQuantityPrice: data.testQuantityPrice,
      minQuantity: data.minQuantity,
      seller: uid,
      totalQuantity: data.totalQuantity,
      sellerName: userName,
    });

    console.log("Document id: ", docRef.id);

    // const response = await fetch(Url.serverUrl + "/product/addProduct", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(data),
    // });

    // const json = await response.json();

    // if (response.ok) {
    //   console.log(json);
    //   // Navigate('/');
    // } else {
    //   console.log(json);
    // }
  }

  return (
    <div className="addProductPage-div">
      <p className="addProductPage-heading">Add Your Product Here</p>

      <div className="addProductPage-title">
        <p className="heading">Title</p>
        <input type="text" id="title" ref={titleRef} />
      </div>

      <div className="addProductPage-description">
        <p className="heading">Description</p>
        <textarea id="description" ref={descRef} />
      </div>

      <div className="addProductPage-description">
        <p className="heading">Total Quantity you have</p>
        <input type="text" id="description" ref={totalQuantityRef} />
      </div>

      <div className="addProductPage-minQuantity">
        <p className="heading">Minimum Quantity in KG</p>
        <input type="Number" id="minQuantity" ref={minquantityref} />
      </div>

      <div className="addProductPage-price">
        <p className="heading">Price for Min. Quantity</p>
        <input type="Number" id="price" ref={priceRef} />
      </div>

      <div className="addProductPage-testQuantity">
        <p className="heading">Test Quantity in KG</p>
        <input type="Number" id="minQuantity" ref={testQuantityRef} />
      </div>

      <div className="addProductPage-price">
        <p className="heading">Price for Test Quantity</p>
        <input type="Number" id="price" ref={testPriceRef} />
      </div>

      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}
