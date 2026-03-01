import React from 'react'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <span className="sidebar-section-label">Dashboard</span>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/' ? 'active' : ''}`}>
          <p>Analytics</p>
        </div>
      </Link>

      <Link to='/orders' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/orders' ? 'active' : ''}`}>
          <p>Orders</p>
        </div>
      </Link>

      <span className="sidebar-section-label" style={{ marginTop: '20px' }}>Catalog</span>

      <Link to='/addproduct' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/addproduct' ? 'active' : ''}`}>
          <p>Add Product</p>
        </div>
      </Link>

      <Link to='/listproduct' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/listproduct' ? 'active' : ''}`}>
          <p>Product List</p>
        </div>
      </Link>

      <span className="sidebar-section-label" style={{ marginTop: '20px' }}>Platform</span>

      <Link to='/users' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/users' ? 'active' : ''}`}>
          <p>Users</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar