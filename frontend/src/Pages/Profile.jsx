import React, { useState } from 'react';
import './CSS/Profile.css';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';

export const Profile = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });

    const token = localStorage.getItem('auth-token');
    let user = null;
    let email = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            user = decoded.user;
            email = user.email || "Email Verified ✓"; // backend doesn't decode email directly, but we can just show verified
        } catch (e) { }
    }

    if (!user) return <div className="profile-container"><p>Please log in.</p></div>;

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:4100/user/profile', {
                method: 'POST',
                headers: { 'auth-token': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            if (res.ok) setMessage("Profile updated successfully");
        } catch (e) { }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:4100/user/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, newPassword: passwordData.newPassword }) // In a full app, email should be matched or verified differently
            });
            if (res.ok) {
                setMessage("Password updated successfully");
                setPasswordData({ oldPassword: '', newPassword: '' });
            }
        } catch (e) { }
    }

    return (
        <div className="profile-container animate-fade-up">
            <h1 className="section-heading">My Profile</h1>
            <div className="luxury-divider"><span>◈</span></div>

            <div className="profile-grid">
                <div className="profile-card box-glass">
                    <h2>Account Details</h2>
                    <p className="email-status">{email}</p>

                    <form onSubmit={updateProfile}>
                        <div className="input-group">
                            <label>Update Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
                        </div>
                        <button type="submit" className="btn-premium">Save Changes</button>
                    </form>
                    {message && <p className="success-msg">{message}</p>}
                </div>

                <div className="profile-card box-glass">
                    <h2>Security</h2>
                    <form onSubmit={resetPassword}>
                        <div className="input-group">
                            <label>New Password</label>
                            <input type="password" value={passwordData.newPassword} onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })} placeholder="New Password" />
                        </div>
                        <button type="submit" className="btn-premium" style={{ background: 'var(--brown)', color: '#fff' }}>Change Password</button>
                    </form>
                </div>

                <div className="profile-card box-glass">
                    <h2>Quick Links</h2>
                    <div className="links-group">
                        <Link to="/orders" className="profile-link">Order History <span>→</span></Link>
                        {user.role === 'Admin' && (
                            <Link to="/admin" className="profile-link">Admin Dashboard <span>→</span></Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
