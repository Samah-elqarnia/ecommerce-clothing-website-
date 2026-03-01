import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Analytics from '../../Components/Analytics/Analytics'
import Orders from '../../Components/Orders/Orders'
import Users from '../../Components/Users/Users'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <div className="admin-content">
        <Routes>
          <Route path='/' element={<Analytics />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
