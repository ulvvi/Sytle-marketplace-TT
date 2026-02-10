import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { EntranceBox } from './components/EntranceBox'
import { MegaSale } from './pages/megaSale'

function App() {

  return (
    <>
      <BrowserRouter>
        <MegaSale/>
      </BrowserRouter>
    </>
  )
}

export default App
