import './App.css'
import HomePage from './HomePage.jsx'
import FireworksProductsCRUD from './FireworksProductsCRUD.jsx'

import AdminLogin from './AdminLogin.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const isAdmin = window.location.pathname === '/_admin';

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAdmin ? (
        isAuthenticated ? (
          <FireworksProductsCRUD onLogout={handleLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )
      ) : (
        <HomePage />
      )}
    </>

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
