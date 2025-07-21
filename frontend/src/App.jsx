import './App.css'
import HomePage from './HomePage.jsx'
import FireworksProductsCRUD from './FireworksProductsCRUD.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/_admin" element={<FireworksProductsCRUD />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
