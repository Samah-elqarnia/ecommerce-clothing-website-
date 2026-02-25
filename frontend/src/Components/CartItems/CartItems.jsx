import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className="cartitems-header">
                <h1>Your Shopping Bag</h1>
                <p>Review your curated selection below</p>
            </div>

            <div className="cartitems-table">
                <div className="cartitems-format-main">
                    <p>Image</p>
                    <p>Product</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>

                {all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                            <div key={e.id}>
                                <div className="cartitems-format cartitems-format-main">
                                    <img src={e.image} alt={e.name} className='carticon-product-icon' />
                                    <p>{e.name}</p>
                                    <p>${e.new_price}</p>
                                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                    <p>${e.new_price * cartItems[e.id]}</p>
                                    <img className='cartitems-remove-icon' src={remove_icon}
                                        onClick={() => removeFromCart(e.id)} alt="Remove" />
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })}
            </div>

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Order Summary</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping</p>
                            <p>Complimentary</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>Proceed to Checkout</button>
                </div>

                <div className="cartitems-promocode">
                    <p>Have a promo code? Enter it below</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promo code' />
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
