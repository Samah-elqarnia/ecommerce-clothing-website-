import React, { useEffect, useState } from 'react';
import './CSS/OrderHistory.css';
import { Link } from 'react-router-dom';

export const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('auth-token');
            if (token) {
                try {
                    const res = await fetch('http://localhost:4100/user-orders', {
                        headers: { 'auth-token': token }
                    });
                    const data = await res.json();
                    if (data.success) {
                        setOrders(data.orders);
                    }
                } catch (e) {
                    console.error("Failed to fetch orders.");
                }
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="order-history-container"><p>Loading...</p></div>;

    return (
        <div className="order-history-container animate-fade-up">
            <h1 className="section-heading">Your Orders</h1>
            <div className="luxury-divider"><span>◈</span></div>
            {orders.length === 0 ? (
                <div className="no-orders"><p>You haven't placed any orders yet.</p><Link to="/"><button className="btn-premium">Start Shopping</button></Link></div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order._id} className="order-card box-glass">
                            <div className="order-header">
                                <div>
                                    <p className="order-id">Order ID: {order._id}</p>
                                    <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</div>
                            </div>
                            <hr />
                            <div className="order-items-preview">
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item-small">
                                        <p>Item #{item.productNumId || 'Unknown'} - Qty: {item.quantity}</p>
                                        <p>${item.price}</p>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <div className="order-footer">
                                <p className="order-total">Total: <span>${order.totalAmount}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
