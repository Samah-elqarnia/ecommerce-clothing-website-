import React, { useEffect, useState } from 'react';
import './Analytics.css';

const Analytics = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch('http://localhost:4100/admin/analytics', {
                    headers: {
                        'auth-token': localStorage.getItem('auth-token') || ''
                    }
                });
                const result = await res.json();
                if (result.success) {
                    setData(result);
                } else {
                    setError(result.error || result.errors || 'Access Denied.');
                }
            } catch (e) {
                setError('Network error');
            }
        };
        fetchAnalytics();
    }, []);

    if (error) return <div className="admin-error-box">{error}</div>;
    if (!data) return <div className="admin-loading-box">Loading Analytics...</div>;

    return (
        <div className="analytics-container">
            <div className="list-product-header">
                <h1>Dashboard Overview</h1>
                <span className="list-product-count">Key Metrics</span>
            </div>
            <p className="list-product-subtitle">Monitor your platform's performance</p>

            <div className="metrics-grid">
                <div className="metric-card">
                    <h3>Total Revenue</h3>
                    <p className="metric-value">${data.totalRevenue}</p>
                </div>
                <div className="metric-card">
                    <h3>Total Orders</h3>
                    <p className="metric-value">{data.totalOrders}</p>
                </div>
                <div className="metric-card">
                    <h3>Total Users</h3>
                    <p className="metric-value">{data.totalUsers}</p>
                </div>
            </div>

            <div className="list-product-header" style={{ marginTop: '40px' }}>
                <h2>Low Stock Alerts</h2>
            </div>
            <div className="list-product-table">
                <div className="listproduct-format-main header" style={{ gridTemplateColumns: '1fr 3fr 1fr' }}>
                    <p>Product</p>
                    <p>Name</p>
                    <p>Stock Left</p>
                </div>
                <div className="listproduct-allproducts">
                    {data.lowStockProducts.map((p, i) => (
                        <div key={i} className="listproduct-format-main listproduct-format" style={{ gridTemplateColumns: '1fr 3fr 1fr' }}>
                            <img src={p.image} alt={p.name} className="listproduct-product-icon" />
                            <p>{p.name}</p>
                            <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>{p.stock}</p>
                        </div>
                    ))}
                    {data.lowStockProducts.length === 0 && <p style={{ padding: '20px' }}>No low stock items.</p>}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
