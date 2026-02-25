import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { Link } from 'react-router-dom'

export const Breadcrum = (props) => {
  const { product } = props;
  return (
    <div className='breadcrum'>
      <Link to='/'>Home</Link>
      <img src={arrow_icon} alt=">" />
      <Link to={`/${product.category}s`}>Shop</Link>
      <img src={arrow_icon} alt=">" />
      <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
      <img src={arrow_icon} alt=">" />
      <span>{product.name}</span>
    </div>
  )
}
