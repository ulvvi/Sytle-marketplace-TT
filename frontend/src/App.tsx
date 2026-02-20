import { useState } from 'react'
import { Home } from './pages/Home'
import { ProductInfo } from './pages/ProductInfo'
import './App.css'
import { Profile } from './pages/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EntranceBoxExtended } from './components/EntranceBoxExtended'
import { SignUp } from './pages/signUp'
import { SignIn } from './pages/signIn'
import { Cart } from './pages/cart'
import { Orders } from './pages/Orders'
import { Sales } from './pages/Sales'
import { Settings } from './pages/Settings'
import { Header } from './components/Header'
import { UserProvider } from './contexts/UserProvider'
import { CartProvider } from './contexts/CartProvider'


function App() {

  return (
    <>
      
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <Header />
              <Routes>
                <Route path="/" element={<SignUp/>}/>
                <Route path="/SignIn" element={<SignIn/>}/>
                <Route path="/Home" element={<Home />}/>
                <Route path="/Sales" element={<Sales />}/>
                <Route path="/Profile" element={<Profile />}/>
                <Route path="/Settings" element={<Settings/>}/>
                <Route path="/Orders" element={<Orders/>}/>
                <Route path="/Cart" element={<Cart/>}/>
                <Route path="/Product/:id" element={<ProductInfo/>}/>
              </Routes>
          </CartProvider>
        </UserProvider>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/SignIn" element={<SignIn/>}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/Sales" element={<Sales />}/>
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/Settings" element={<Settings/>}/>
          <Route path="/Orders" element={<Orders/>}/>
          <Route path="/Cart" element={<Cart/>}/>
          <Route path="/Product/:id" element={<ProductInfo/>}/>
          
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
