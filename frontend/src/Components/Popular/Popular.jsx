import React, { useEffect, useState } from 'react'
import './Popular.css'
import { Item } from '../Item/Item'

export const Popular = () => {
  const [popularinwomen, setPopularinwomen] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4100/popularinwomen')
      .then((response) => response.json())
      .then((data) => setPopularinwomen(data))
  }, [])

  return (
    <div className="popular">
      <p className="section-subheading">Editor's Pick</p>
      <h1 className="section-heading">Popular in Women</h1>
      <div className="luxury-divider"><span>✦</span></div>
      <div className="popular-item">
        {popularinwomen.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image}
            new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  )
}
