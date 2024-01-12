import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ProductPage from './pages/ProductPage'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProductListing from './pages/ProductListing'
import SignUp from './pages/SignUp'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:productId" element={<ProductPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/productlisting" element={<ProductListing/>} />
      </Routes>
    </Router>
  )
}

export default App
