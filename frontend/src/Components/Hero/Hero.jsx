import React from 'react'
import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-content">
        <div className="hero-tag-wrapper animate-fade-up">
          <div className="hero-tag">
            <span className="hero-tag-dot"></span>
            <span>Est. 2024 • Luxury Boutique</span>
          </div>
        </div>

        <h1 className="hero-title animate-fade-up">
          Refined <em>Fashion</em><br />
          For The Modern Soul
        </h1>

        <p className="hero-subtitle animate-fade-up">
          Experience the pinnacle of craftsmanship with our curated luxury collections.
          Designed for those who seek elegance in every detail.
        </p>

        <div className="hero-actions animate-fade-up">
          <Link to='/womens' className="hero-btn-primary">
            The Women's Edit
            <img src={arrow_icon} alt="arrow" />
          </Link>
          <Link to='/mens' className="hero-btn-secondary-outline">
            The Men's Collection
          </Link>
        </div>

        <div className="hero-scroll-indicator">
          <span>Scroll to Discover</span>
          <div className="scroll-line"></div>
        </div>
      </div>

      <div className="hero-features-bar">
        <div className="feature-item">
          <span className="feature-icon">✧</span>
          <span>Complimentary Global Shipping</span>
        </div>
        <div className="feature-divider"></div>
        <div className="feature-item">
          <span className="feature-icon">✧</span>
          <span>Ethically Sourced Materials</span>
        </div>
        <div className="feature-divider"></div>
        <div className="feature-item">
          <span className="feature-icon">✧</span>
          <span>Personal Styling Available</span>
        </div>
      </div>

      {/* Abstract Background Shapes */}
      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  )
}
