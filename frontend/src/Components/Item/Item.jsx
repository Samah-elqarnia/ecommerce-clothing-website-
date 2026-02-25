import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

export const Item = (props) => {
  return (
    <div className='item'>
      <div className="item-img-wrapper">
        <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
          <img src={props.image} alt={props.name} />
          <div className="item-overlay"></div>
          <button className="item-quick-view">View Details</button>
        </Link>
      </div>
      <div className="item-info">
        <p className="item-name">{props.name}</p>
        <div className='item-prices'>
          <span className="item-price-new">${props.new_price}</span>
          <span className="item-price-old">${props.old_price}</span>
        </div>
      </div>
    </div>
  )
}
