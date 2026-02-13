import { useState } from 'react'
import { Home } from './pages/Home'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { EntranceBoxExtended } from './components/EntranceBoxExtended'
import { SignUp } from './pages/signUp'
import { SignIn } from './pages/signIn'
import { Orders } from './pages/Orders'

function App() {

  return (
    <>
      <BrowserRouter>
        <Orders/>
      </BrowserRouter>
    </>
  )
}

export default App
