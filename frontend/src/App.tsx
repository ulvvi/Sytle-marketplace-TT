import { useState } from 'react'
import { Home } from './pages/Home'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { EntranceBoxExtended } from './components/EntranceBoxExtended'
import { SignUp } from './pages/signUp'
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
