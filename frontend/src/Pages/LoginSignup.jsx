import React from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {
  const [state, setState] = React.useState('Login');
  const [formData, setFormData] = React.useState({ name: "", password: "", email: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4100/login', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.href = "/";
    } else {
      alert(responseData.error);
    }
  }

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4100/signup', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.href = "/";
    } else {
      alert(responseData.error);
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <div className="loginsignup-brand">
          <span className="loginsignup-brand-dot"></span>
          <span>SamahShop</span>
        </div>
        <h1>{state === 'Login' ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="loginsignup-subtitle">
          {state === 'Login'
            ? 'Sign in to access your luxury wardrobe'
            : 'Join us and explore premium fashion'}
        </p>

        <div className="loginsignup-fields">
          {state === 'Sign Up' && (
            <div className="loginsignup-field">
              <label>Full Name</label>
              <input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder='Your full name' />
            </div>
          )}
          <div className="loginsignup-field">
            <label>Email Address</label>
            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='your@email.com' />
          </div>
          <div className="loginsignup-field">
            <label>Password</label>
            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='••••••••' />
          </div>
        </div>

        <button className="loginsignup-btn" onClick={() => { state === 'Login' ? login() : signup() }}>
          {state === 'Login' ? 'Sign In' : 'Create Account'}
        </button>

        {state === 'Sign Up'
          ? <p className="loginsignup-login">Already have an account? <span onClick={() => setState('Login')}>Sign In</span></p>
          : <p className="loginsignup-login">New to SamahShop? <span onClick={() => setState('Sign Up')}>Create Account</span></p>
        }

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='terms' />
          <p>By continuing, I agree to the <strong>Terms of Use</strong> & <strong>Privacy Policy</strong>.</p>
        </div>
      </div>
    </div>
  )
}
