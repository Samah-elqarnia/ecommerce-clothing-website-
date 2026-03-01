import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:4100/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                // Decode token to verify admin role locally
                try {
                    const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
                    if (tokenPayload.user && tokenPayload.user.role === 'Admin') {
                        localStorage.setItem('auth-token', data.token);
                        setToken(data.token);
                    } else {
                        setError("Access denied. Admin privileges required.");
                    }
                } catch (decodeError) {
                    setError("Invalid session security. Please try again.");
                }
            } else {
                setError(data.error || data.errors || 'Login failed');
            }
        } catch (e) {
            setError("Network error");
        }
    };

    return (
        <div className="admin-login-wrapper">
            <div className="admin-login-box">
                <h1>Admin Portal</h1>
                <p>Access the control panel</p>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
