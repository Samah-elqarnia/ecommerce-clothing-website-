import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:4100/admin/orders', {
                headers: { 'auth-token': localStorage.getItem('auth-token') || '' }
            });
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            } else {
                setError(data.error || data.errors || 'Access Denied.');
            }
        } catch (e) {
            setError('Network fetching orders');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await fetch(`http://localhost:4100/admin/orders/${orderId}/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token') || ''
                },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            if (data.success) {
                fetchOrders();
            }
        } catch (e) {
            alert("Failed updating status");
        }
    };

    if (error) return <div className="admin-error-box">{error}</div>;

    return (
        <div className="orders-container">
            <div className="list-product-header">
                <h1>Order Management</h1>
                <span className="list-product-count">{orders.length} orders</span>
            </div>
            <p className="list-product-subtitle">Process and track customer orders</p>

            <div className="list-product-table">
                <div className="listproduct-format-main header" style={{ gridTemplateColumns: '1fr 2fr 1fr 1fr 1.5fr' }}>
                    <p>Order ID</p>
                    <p>Customer Info</p>
                    <p>Sum Total</p>
                    <p>Items</p>
                    <p>Status Update</p>
                </div>
                <div className="listproduct-allproducts">
                    {orders.map((order, i) => (
                        <React.Fragment key={i}>
                            <div className="listproduct-format-main listproduct-format" style={{ gridTemplateColumns: '1fr 2fr 1fr 1fr 1.5fr', alignItems: 'center' }}>
                                <p style={{ fontFamily: 'monospace', fontSize: '11px' }}>{order._id.slice(-6)}</p>
                                <div>
                                    <p style={{ fontWeight: 600, margin: '0 0 4px 0' }}>{order.user?.name || 'Guest'}</p>
                                    <p style={{ fontSize: '12px', color: '#777' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p style={{ fontWeight: 'bold', color: 'var(--brown)' }}>${order.totalAmount}</p>
                                <p>{order.items.length} items</p>

                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className={`status-select ${order.status.toLowerCase()}`}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="PROCESSING">Processing</option>
                                    <option value="SHIPPED">Shipped</option>
                                    <option value="DELIVERED">Delivered</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Orders;
