import { useState } from 'react'
import { BrowserRouter } from "react-router"
import { Home } from './pages/Home'
import { ProductInfo } from './pages/ProductInfo'
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <ProductInfo/>
    </BrowserRouter>
    </>
  )
}

export default App
