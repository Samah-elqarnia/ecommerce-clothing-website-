import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import { Item } from '../Item/Item'

export const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4100/newcollectiond')
      .then((response) => response.json())
      .then((data) => setNew_collection(data))
  }, [])

  return (
    <div className="new-collections">
      <p className="section-subheading">Freshly Arrived</p>
      <h1 className="section-heading">New Collections</h1>
      <div className="luxury-divider"><span>✦</span></div>
      <div className="collections">
        {new_collection.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image}
            new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  )
}
