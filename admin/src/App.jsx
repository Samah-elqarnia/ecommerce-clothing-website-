import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import AdminLogin from './Components/AdminLogin/AdminLogin'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('auth-token'));

  if (!token) {
    return <AdminLogin setToken={setToken} />
  }

  return (
    <div>
      <ScrollToTop />
      <Navbar setToken={setToken} />
      <Admin />
    </div>
  )
}

export default App
