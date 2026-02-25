import React from 'react'
import './Offers.css'
import { Link } from 'react-router-dom'

export const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-content">
        <p className="offers-tag">Limited Time Only</p>
        <h1 className="offers-title">Exclusive <em>Season</em> Offers</h1>
        <p className="offers-description">Save up to 40% on our best-selling luxury pieces. Limited inventory available.</p>
        <Link to='/womens' className="offers-btn">Unlock Access</Link>
      </div>
      <div className="offers-glow"></div>
    </div>
  )
}
