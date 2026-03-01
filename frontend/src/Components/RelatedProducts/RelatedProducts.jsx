import React, { useContext } from 'react'
import './RelatedProducts.css'
import { ShopContext } from '../../Context/ShopContext'
import { Item } from '../Item/Item'

export const RelatedProducts = (props) => {
  const { all_product } = useContext(ShopContext);
  const { category, currentProductId } = props;

  const related_products = all_product
    .filter((item) => item.category === category && item.id !== Number(currentProductId))
    .slice(0, 4);

  return (
    <div className='relatedproducts'>
      <p className="section-subheading">More to Love</p>
      <h1 className="section-heading">You May Also Like</h1>
      <div className="luxury-divider"><span>✦</span></div>
      <div className="relatedproducts-item">
        {related_products.length > 0 ? (
          related_products.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image}
              new_price={item.new_price} old_price={item.old_price} />
          ))
        ) : (
          <p className="no-related">No other products found in this category.</p>
        )}
      </div>
    </div>
  )
}
