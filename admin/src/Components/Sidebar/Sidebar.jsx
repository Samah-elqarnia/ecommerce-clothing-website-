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
          <div className="sidebar-icon">
            <span style={{ fontSize: '20px' }}>📈</span>
          </div>
          <p>Analytics</p>
        </div>
      </Link>

      <Link to='/orders' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/orders' ? 'active' : ''}`}>
          <div className="sidebar-icon">
            <span style={{ fontSize: '20px' }}>📦</span>
          </div>
          <p>Orders</p>
        </div>
      </Link>

      <span className="sidebar-section-label" style={{ marginTop: '20px' }}>Catalog</span>

      <Link to='/addproduct' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/addproduct' ? 'active' : ''}`}>
          <div className="sidebar-icon">
            <img src={add_product_icon} alt="Add Product" />
          </div>
          <p>Add Product</p>
        </div>
      </Link>

      <Link to='/listproduct' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/listproduct' ? 'active' : ''}`}>
          <div className="sidebar-icon">
            <img src={list_product_icon} alt="Product List" />
          </div>
          <p>Product List</p>
        </div>
      </Link>

      <span className="sidebar-section-label" style={{ marginTop: '20px' }}>Platform</span>

      <Link to='/users' style={{ textDecoration: 'none' }}>
        <div className={`sidebar-item ${location.pathname === '/users' ? 'active' : ''}`}>
          <div className="sidebar-icon">
            <span style={{ fontSize: '20px' }}>👥</span>
          </div>
          <p>Users</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar