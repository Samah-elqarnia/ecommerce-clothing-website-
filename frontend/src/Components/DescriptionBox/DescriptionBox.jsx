import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Crafted with the finest materials, this piece embodies timeless elegance and modern sophistication.
          Each stitch is carefully constructed to ensure a premium fit that flatters every silhouette,
          combining luxurious comfort with refined style.
        </p>
        <p>
          Perfect for both casual daytime outings and elevated evening occasions. Care instructions:
          gentle machine wash cold, lay flat to dry. Imported.
        </p>
      </div>
    </div>
  )
}
