import { useState } from 'react'
import { BrowserRouter } from "react-router"
import { Home } from './pages/Home'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { EntranceBoxExtended } from './components/EntranceBoxExtended'
import { SignUp } from './pages/signUp'

function App() {

  return (
    <>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </>
  )
}

export default App
