import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ProductPage from './pages/Product Page/ProductPage'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProductListing from './pages/ProductListing'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar/Navbar'
import Llm from './pages/LLM/Llm'
import PredictCrops from './pages/Crop Prediction/PredictCrops'
import GeoLocationComponent from './components/Footer/GeoLocationComponent'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/productlisting" element={<ProductListing/>} />
        <Route path="/chatbot" element={<Llm/>} />
        <Route path="/predict-crop" element={<PredictCrops/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <GeoLocationComponent/>
    </Router>
  )
}

export default App
