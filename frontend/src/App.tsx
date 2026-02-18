import { useState } from 'react'
import { Home } from './pages/Home'
import { ProductInfo } from './pages/ProductInfo'
import './App.css'
import { Profile } from './pages/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EntranceBoxExtended } from './components/EntranceBoxExtended'
import { SignUp } from './pages/signUp'
import { SignIn } from './pages/signIn'
import { Orders } from './pages/Orders'
import { Sales } from './pages/Sales'
import { Settings } from './pages/Settings'
import { Header } from './components/Header'


function App() {

  return (
    <>
      
      <BrowserRouter>
        <Header />
        <Profile/>
      </BrowserRouter>
    </>
  )
}

export default App
