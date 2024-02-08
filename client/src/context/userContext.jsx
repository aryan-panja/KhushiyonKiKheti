import { createContext, useEffect, useReducer } from "react";

export const userContext = createContext();

export function handleReducerHook(prevState, action) {
  switch (action.type) {
    case "LOGIN":
      console.log("login");
      console.log({ ...prevState, ...action.payload });
      return { ...prevState, ...action.payload };
    case "LOGOUT":
      console.log("logout");
      return { user: null, token: null, location: prevState.location };
    case "setLocation": {
      console.log("location is set");
      console.log(action.payload);
      return { ...prevState, location: action.payload };
    }
    case "setTemperature": {
      console.log("temperature is set");
      console.log(action.payload);
      return { ...prevState, temperature: action.payload };
    }
    case "setMLPrediction": {
      console.log("ML Prediction is set");
      console.log(action.payload);
      return { ...prevState, mlPrediction: action.payload };
    }
    case "addToCart": {
      console.log("Product added to the cart");

      // Check if the product is already in the cart
      const existingItemIndex = prevState.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update the quantity or any other property
        const updatedCart = prevState.cart.map((item, index) =>
          index === existingItemIndex ? action.payload : item
        );

        const newData = { ...prevState, cart: updatedCart };
        console.log(newData);
        localStorage.setItem("USER", JSON.stringify(newData));
        return newData;
      } else {
        // If the product is not in the cart, add it
        const newData = {
          ...prevState,
          cart: [...prevState.cart, action.payload],
        };
        console.log(newData);
        localStorage.setItem("USER", JSON.stringify(newData));
        return newData;
      }
    }
    case "removeFromCart": {
      console.log(prevState);
      const newData = {
        ...prevState,
        cart: prevState.cart.filter((item) => item._id !== action.payload._id),
      };
      localStorage.setItem("USER", JSON.stringify(newData));
      console.log(newData);
      return newData;
    }

    case "setWeatherData": {
      console.log("Weather Data is set");
      console.log(action.payload);
      return { ...prevState, weatherData: action.payload };
    }
    default:
      return prevState;
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(handleReducerHook, {
    email: null,
    uid: null,
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("USER"));
    if (userData) {
      console.log("From useEffect at 98");
      dispatch({ type: "LOGIN", payload: userData });
    }
  }, []);
  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  );
}
