import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <span className="navbar-brand-name">SamahShop</span>
        <span className="navbar-badge">Admin</span>
      </div>
      <div className="navbar-right">
        <div className="navbar-profile-wrapper">
          <div className="navbar-profile-info">
            <span className="navbar-profile-name">Admin</span>
            <span className="navbar-profile-role">Super Admin</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar