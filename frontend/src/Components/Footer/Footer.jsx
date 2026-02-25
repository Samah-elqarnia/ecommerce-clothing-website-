import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pintester_icon.png'
import whatssap_icon from '../Assets/whatsapp_icon.png'

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <img src={footer_logo} alt="SamahShop" />
                        <p>SamahShop</p>
                    </div>
                    <p className="footer-brand-desc">
                        Curated luxury fashion for those who appreciate elegance and quality craftsmanship.
                    </p>
                    <div className="footer-social-icon">
                        <div className="footer-icons-container"><img src={instagram_icon} alt="Instagram" /></div>
                        <div className="footer-icons-container"><img src={pinterest_icon} alt="Pinterest" /></div>
                        <div className="footer-icons-container"><img src={whatssap_icon} alt="WhatsApp" /></div>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Company</h4>
                    <ul className="footer-links">
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Press</li>
                        <li>Blog</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Shop</h4>
                    <ul className="footer-links">
                        <li>Women</li>
                        <li>Men</li>
                        <li>Kids</li>
                        <li>New Arrivals</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Support</h4>
                    <ul className="footer-links">
                        <li>Contact Us</li>
                        <li>Shipping Policy</li>
                        <li>Returns</li>
                        <li>FAQ</li>
                    </ul>
                </div>
            </div>

            <div className="footer-copyright">
                <p>© 2025 SamahShop — All rights reserved</p>
                <div className="footer-copyright-links">
                    <span>Privacy Policy</span>
                    <span>Terms of Use</span>
                    <span>Cookies</span>
                </div>
            </div>
        </div>
    )
}
