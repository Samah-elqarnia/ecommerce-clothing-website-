import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Stay in the Loop</h1>
      <p>Subscribe for exclusive arrivals, private sales & style inspiration</p>
      <div className="newsletter-input-box">
        <input type="email" placeholder='Your email address' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}
