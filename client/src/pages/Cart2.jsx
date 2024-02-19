import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dataBase } from "../firebaseConfig";
import useUserContext from "../Hooks/useUserContext";
import CartItemDisplayer from "./CartItemDisplayer";

const Cart2 = () => {
  const { uid } = useUserContext();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
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
      console.log("Document data:", docSnap.data().Items);
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

  return loading
    ? "Content Loading...."
    : cart.map((arr) => {
        return (
          <div>
            {/* || {arr[0][0]} || {arr[1]} || {arr[2]} || {arr[3]} || */}
            <CartItemDisplayer product={arr} />
          </div>
        );
      });
};

export default Cart2;
