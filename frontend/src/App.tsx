import { useState } from 'react'
import { Home } from './pages/Home'
import { ProductInfo } from './pages/ProductInfo'
import './App.css'
import { Profile } from './pages/Profile'
import { BrowserRouter } from 'react-router-dom'
import { EntranceBoxExtended } from './components/EntranceBoxExtended'
import { SignUp } from './pages/signUp'
import { Sales } from './pages/Sales'
import { Settings } from './pages/Settings'


function App() {

  return (
    <>
    <BrowserRouter>
      <Settings/>
    </BrowserRouter>
    </>
  )
}

export default App
