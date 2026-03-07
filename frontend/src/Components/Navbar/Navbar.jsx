import './Navbar.css'
import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext';
import down from '../Assets/down.png'

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [scrolled, setScrolled] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className='nav-logo'>
        <img src={logo} alt="luxepedia Logo" />
        <p>luxepedia</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={down} alt="menu" />
      <ul ref={menuRef} className="nav-menu">
        <li className={menu === "shop" ? "active" : ""} onClick={() => setMenu("shop")}>
          <Link to='/'>Shop</Link>
        </li>
        <li className={menu === "mens" ? "active" : ""} onClick={() => setMenu("mens")}>
          <Link to='/mens'>Men</Link>
        </li>
        <li className={menu === "womens" ? "active" : ""} onClick={() => setMenu("womens")}>
          <Link to='/womens'>Women</Link>
        </li>
        <li className={menu === "kids" ? "active" : ""} onClick={() => setMenu("kids")}>
          <Link to='/kids'>Kids</Link>
        </li>
      </ul>
      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token') ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link to="/profile"><button style={{ background: 'transparent', color: 'var(--brown)', border: '1px solid var(--brown)' }}>Profile</button></Link>
            <button onClick={() => { localStorage.removeItem('auth-token'); window.location.href = '/login' }}>Logout</button>
          </div>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
        <div className="nav-cart-wrapper">
          <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
    </div>
  )
}
