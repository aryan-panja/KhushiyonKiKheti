import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ProductPage from './pages/Product Page/ProductPage'
import AddProductPage from './pages/AddProductPage'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProductListing from './pages/ProductListing'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar/Navbar'
import Llm from './pages/LLM/Llm'
import PredictCrops from './pages/Crop Prediction/PredictCrops'
import GeoLocationComponent from './components/Footer/GeoLocationComponent'
import useUserContext from './Hooks/useUserContext'

function App() {
  const { user } = useUserContext();
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={user ? <Navigate to='/Home' /> : <Navigate to='/user/login'/>} />
        <Route path="/Home" element={user ? <ProductListing/> : <Navigate to="/user/login"/>} />
        <Route path="/user/login" element={!user ? <Login/> : <Navigate to="/"/>} />
        <Route path="/user/signup" element={!user ? <SignUp/> : <Navigate to="/"/>} />
        <Route path='/add-product' element={user?.isSeller ? <AddProductPage/> : <Navigate to="/user/login"/>}/>
        <Route path="/product/:id" element={<ProductPage/>} />
        <Route path="/cart" element={user ? <Cart/> : <Navigate to="/user/login"/>} />
        <Route path="/chatbot" element={user?.isSeller ? <Llm/> : <Navigate to="/user/login"/>} />
        <Route path="/predict-crop" element={user?.isSeller ? <PredictCrops/> : <Navigate to="/user/login"/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <GeoLocationComponent/>
    </Router>
  )
}

export default App
