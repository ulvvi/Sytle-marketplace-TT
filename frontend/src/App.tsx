import { useState } from 'react'
import { BrowserRouter } from "react-router"
import { Home } from './pages/Home'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { EntranceBox } from './components/EntranceBox'
import { SignIn } from './pages/signIn'

function App() {
  return (
    <>
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
    </>
  )
}

export default App
