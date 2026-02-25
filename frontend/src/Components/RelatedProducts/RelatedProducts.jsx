import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import { Item } from '../Item/Item'

export const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <p className="section-subheading">More to Love</p>
      <h1 className="section-heading">You May Also Like</h1>
      <div className="luxury-divider"><span>✦</span></div>
      <div className="relatedproducts-item">
        {data_product.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image}
            new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  )
}
