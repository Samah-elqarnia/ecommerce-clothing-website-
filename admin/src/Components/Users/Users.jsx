import React, { useEffect, useState } from 'react';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:4100/admin/users', {
                headers: { 'auth-token': localStorage.getItem('auth-token') || '' }
            });
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            } else {
                setError(data.error || data.errors || 'Access Denied.');
            }
        } catch (e) {
            setError('Network error');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSoftDelete = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to suspend this user?")) return;
            const res = await fetch(`http://localhost:4100/admin/users/${id}/soft-delete`, {
                method: 'POST',
                headers: { 'auth-token': localStorage.getItem('auth-token') || '' }
            });
            const data = await res.json();
            if (data.success) fetchUsers();
        } catch (e) {
            alert("Failed to delete");
        }
    };

    if (error) return <div className="admin-error-box">{error}</div>;

    return (
        <div className="users-container">
            <div className="list-product-header">
                <h1>Platform Users</h1>
                <span className="list-product-count">{users.length} members</span>
            </div>
            <p className="list-product-subtitle">Manage accounts and permissions</p>

            <div className="list-product-table">
                <div className="listproduct-format-main header" style={{ gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr 1fr' }}>
                    <p>ID</p>
                    <p>Name</p>
                    <p>Email</p>
                    <p>Role</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>
                <div className="listproduct-allproducts">
                    {users.map((user, index) => (
                        <React.Fragment key={index}>
                            <div className="listproduct-format-main listproduct-format" style={{ gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr 1fr' }}>
                                <p style={{ fontFamily: 'monospace', fontSize: '11px' }}>{user._id.slice(-6)}</p>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                                <span className={`role-badge ${user.role?.toLowerCase()}`}>{user.role || 'Customer'}</span>
                                <span style={{ color: user.isDeleted ? 'red' : 'green' }}>{user.isDeleted ? 'Suspended' : 'Active'}</span>
                                {user.role !== 'Admin' ? (
                                    <button className="danger-btn" onClick={() => handleSoftDelete(user._id)}>Toggle</button>
                                ) : <p>-</p>}
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Users;
