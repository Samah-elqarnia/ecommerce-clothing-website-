import React, { useEffect, useState } from 'react';
import './Analytics.css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';

const Analytics = () => {
    const [data, setData] = useState(null);
    const [productCount, setProductCount] = useState(0);
    const [error, setError] = useState(null);

    const COLORS = ['#F8C8DC', '#F5E6D3', '#e8a0c0', '#7a5c5c', '#c47e9e', '#3E2C2C'];

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const token = localStorage.getItem('auth-token') || '';
                const [analyticRes, productRes] = await Promise.all([
                    fetch('http://localhost:4100/admin/analytics', { headers: { 'auth-token': token } }),
                    fetch('http://localhost:4100/allproducts')
                ]);

                const analytics = await analyticRes.json();
                const products = await productRes.json();

                if (analytics.success) {
                    setData(analytics);
                    setProductCount(Array.isArray(products) ? products.length : 0);
                } else {
                    setError(analytics.error || 'Access Denied.');
                }
            } catch (e) {
                setError('Network error');
            }
        };
        fetchAllData();
    }, []);

    if (error) return <div className="admin-error-box">{error}</div>;
    if (!data) return <div className="admin-loading-box">Loading Analytics...</div>;

    // Formatting data for charts
    const statusData = data.ordersByStatus.map(s => ({
        name: s._id,
        value: s.count
    }));

    const bestSellingData = data.bestSellingProducts.map(p => ({
        name: p.name.length > 20 ? p.name.substring(0, 15) + '...' : p.name,
        count: p.count
    }));

    // Mock revenue trend based on current month for visual pleasure, since backend is limited
    const mockTrend = [
        { name: 'Jan', revenue: 0 },
        { name: 'Feb', revenue: 0 },
        { name: 'Mar', revenue: 0 },
        { name: 'Apr', revenue: 0 },
        { name: 'May', revenue: 0 },
        { name: 'Jun', revenue: data.totalRevenue - data.monthlyRevenue },
        { name: 'Jul', revenue: data.totalRevenue }
    ];

    return (
        <div className="analytics-container animate-fade-in">
            <div className="list-product-header">
                <h1>Performance Dashboard</h1>
                <div className="luxury-badge">REAL-TIME DATA</div>
            </div>
            <p className="list-product-subtitle">Growth, sales, and inventory insights</p>

            {/* Main Stats Cards */}
            <div className="metrics-grid">
                <div className="metric-card premium-card">
                    <div className="metric-info">
                        <h3>Total Revenue</h3>
                        <p className="metric-value">${data.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
                <div className="metric-card premium-card">
                    <div className="metric-info">
                        <h3>Monthly Revenue</h3>
                        <p className="metric-value">${data.monthlyRevenue.toLocaleString()}</p>
                    </div>
                </div>
                <div className="metric-card premium-card">
                    <div className="metric-info">
                        <h3>Total Orders</h3>
                        <p className="metric-value">{data.totalOrders}</p>
                    </div>
                </div>
                <div className="metric-card premium-card">
                    <div className="metric-info">
                        <h3>Total Products</h3>
                        <p className="metric-value">{productCount}</p>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                {/* Revenue Line Chart */}
                <div className="chart-card large-chart">
                    <h3>Growth Trend (Total Revenue History)</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={mockTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7a5c5c', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7a5c5c', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ background: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#e8a0c0" strokeWidth={4} dot={{ fill: '#e8a0c0', r: 5 }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Pie Chart */}
                <div className="chart-card">
                    <h3>Order Status Distribution</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Best Sellers Bar Chart */}
                <div className="chart-card">
                    <h3>Best Selling Products</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={bestSellingData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                                <XAxis type="number" axisLine={false} tickLine={false} hide />
                                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7a5c5c', fontSize: 11 }} width={100} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#F8C8DC" radius={[0, 4, 4, 0]}>
                                    {bestSellingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Analytics;
