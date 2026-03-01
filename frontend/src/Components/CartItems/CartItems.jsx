import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom';

export const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, placeOrder } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/login');
            return;
        }

        const items = [];
        all_product.forEach(e => {
            if (cartItems[e.id] > 0) {
                items.push({
                    productId: e._id,
                    productNumId: e.id,
                    quantity: cartItems[e.id],
                    price: e.new_price
                });
            }
        });

        if (items.length === 0) return alert("Your cart is empty!");

        const orderData = {
            items,
            totalAmount: getTotalCartAmount(),
            shippingAddress: { country: "USA" },
            paymentMethod: "Credit Card"
        };
        const result = await placeOrder(orderData);
        if (result.success) {
            navigate('/orders');
        } else {
            alert("Order failed!");
        }
    };

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
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
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
