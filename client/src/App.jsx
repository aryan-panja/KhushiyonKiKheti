import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ProductPage from "./pages/Product Page/ProductPage";
import AddProductPage from "./pages/AddProductPage";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductListing from "./pages/ProductListing";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Llm from "./pages/LLM/Llm";
import PredictCrops from "./pages/Crop Prediction/PredictCrops";
import GeoLocationComponent from "./components/Footer/GeoLocation/GeoLocationComponent";
import useUserContext from "./Hooks/useUserContext";
import Weather from "./components/Footer/Weather/Weather";
import Footer from "./components/Footer/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { userContext } from "./context/userContext";

function App() {
  const { uid } = useUserContext();
  console.log("APP.JSX: ", uid);
  const { email } = useUserContext();
  console.log("APP.JSX: ", email);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            uid ? <Navigate to="/Home" /> : <Navigate to="/user/login" />
          }
        />
        <Route
          path="/Home"
          element={uid ? <ProductListing /> : <Navigate to="/user/login" />}
        />
        <Route
          path="/user/login"
          element={!uid ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/user/signup"
          element={!uid ? <SignUp /> : <Navigate to="/" />}
        />
        {/* <Route
          path="/add-product"
          element={
            user?.isSeller ? <AddProductPage /> : <Navigate to="/user/login" />
          }
        /> */}
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/cart"
          element={uid ? <Cart /> : <Navigate to="/user/login" />}
        />
        {/* <Route
          path="/chatbot"
          element={user?.isSeller ? <Llm /> : <Navigate to="/user/login" />}
        /> */}
        {/* <Route
          path="/predict-crop"
          element={
            user?.isSeller ? <PredictCrops /> : <Navigate to="/user/login" />
          }
        /> */}
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
