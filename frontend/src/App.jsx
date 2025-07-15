import { useState } from 'react'
import './App.css'
import HomePage from './HomePage.jsx'
import FireworksProductsCRUD from './FireworksProductsCRUD.jsx'

function App() {
  const [count, setCount] = useState(0)

  const isAdmin = window.location.pathname === '/_admin';

  return (
    <>
      {isAdmin ? <FireworksProductsCRUD /> : <HomePage />}
    </>
  )
}

export default App
