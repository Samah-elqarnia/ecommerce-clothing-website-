import React, { useEffect, useState } from 'react';
import './CSS/Admin.css';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
    const [analytics, setAnalytics] = useState(null);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('dashboard');

    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const anaRes = await fetch('http://localhost:4100/admin/analytics', { headers: { 'auth-token': token } });
                const anaData = await anaRes.json();
                if (anaData.success) setAnalytics(anaData);

                const ordRes = await fetch('http://localhost:4100/admin/orders', { headers: { 'auth-token': token } });
                const ordData = await ordRes.json();
                if (ordData.success) setOrders(ordData.orders);

                const usrRes = await fetch('http://localhost:4100/admin/users', { headers: { 'auth-token': token } });
                const usrData = await usrRes.json();
                if (usrData.success) setUsers(usrData.users);
            } catch (e) {
                console.error("Admin fetch error", e);
            }
            setLoading(false);
        };
        fetchData();
    }, [token]);

    const updateOrderStatus = async (id, status) => {
        try {
            const res = await fetch(`http://localhost:4100/admin/orders/${id}/status`, {
                method: 'POST',
                headers: { 'auth-token': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
            }
        } catch (e) { }
    };

    const softDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to soft delete this user?")) return;
        try {
            const res = await fetch(`http://localhost:4100/admin/users/${id}/soft-delete`, {
                method: 'POST',
                headers: { 'auth-token': token }
            });
            if (res.ok) {
                setUsers(users.filter(u => u._id !== id));
            }
        } catch (e) { }
    };

    if (loading) return <div className="admin-container"><p>Loading Admin Dashboard...</p></div>;

    if (!analytics) return <div className="admin-container"><p>Access Denied. Admin permissions required.</p></div>;

    return (
        <div className="admin-container animate-fade-up">
            <h1 className="section-heading">Admin Dashboard</h1>
            <div className="luxury-divider"><span>◈</span></div>

            <div className="admin-nav">
                <button className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}>Overview</button>
                <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>Orders ({orders.length})</button>
                <button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>Users ({users.length})</button>
            </div>

            {tab === 'dashboard' && (
                <div className="admin-overview">
                    <div className="stats-grid">
                        <div className="stat-card box-glass">
                            <h3>Total Revenue</h3>
                            <p>${analytics.totalRevenue || 0}</p>
                        </div>
                        <div className="stat-card box-glass">
                            <h3>Monthly Revenue</h3>
                            <p>${analytics.monthlyRevenue || 0}</p>
                        </div>
                        <div className="stat-card box-glass">
                            <h3>Total Orders</h3>
                            <p>{analytics.totalOrders}</p>
                        </div>
                        <div className="stat-card box-glass">
                            <h3>Total Users</h3>
                            <p>{analytics.totalUsers}</p>
                        </div>
                    </div>

                    <div className="admin-panels">
                        <div className="admin-panel box-glass">
                            <h2>Best Selling Products</h2>
                            {analytics.bestSellingProducts && analytics.bestSellingProducts.map(p => (
                                <div key={p._id} className="panel-item">
                                    <p>{p.name}</p>
                                    <span>{p.count} sold</span>
                                </div>
                            ))}
                        </div>
                        <div className="admin-panel box-glass">
                            <h2>Low Stock Alerts</h2>
                            {analytics.lowStockProducts && analytics.lowStockProducts.map(p => (
                                <div key={p._id} className="panel-item alert">
                                    <p>{p.name}</p>
                                    <span>{p.stock} left</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {tab === 'orders' && (
                <div className="admin-orders box-glass">
                    <table className="elegant-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o._id}>
                                    <td>{o._id.slice(-6)}</td>
                                    <td>{o.user?.email || 'Guest'}</td>
                                    <td>${o.totalAmount}</td>
                                    <td>
                                        <select
                                            value={o.status}
                                            onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                                            className={`status-select status-${o.status.toLowerCase()}`}
                                        >
                                            {['Pending', 'Confirmed', 'Paid', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><button className="btn-small">View</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {tab === 'users' && (
                <div className="admin-users box-glass">
                    <table className="elegant-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td><span className={`role-badge role-${u.role?.toLowerCase()}`}>{u.role || 'Customer'}</span></td>
                                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        {u.role !== 'Admin' && (
                                            <button onClick={() => softDeleteUser(u._id)} className="btn-small danger">Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
