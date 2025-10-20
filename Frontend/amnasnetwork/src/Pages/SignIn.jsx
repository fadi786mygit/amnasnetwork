import React, { useState } from 'react';
import axios from 'axios';
import logo from '../Components/Images/logo.jpg';
import '../style.css';
import baseUrl from '../baseUrl';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    setLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/api/users/login`, {
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        console.log('Login successful:', res.data);
        
        // Store token in sessionStorage or context
        if (res.data.data.token) {
          sessionStorage.setItem('token', res.data.data.token);
          sessionStorage.setItem('user', JSON.stringify(res.data.data));
        }

        // Show success message
        alert('Login successful!');
        
        // Redirect to dashboard or home page
        window.location.href = '/dashboard';
        // Or use navigate if you're using React Router:
        // navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setErrors({ submit: errorMessage });
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Brand Section */}
        <div className="auth-brand-section">
          <div className="brand-content">
            <img 
              src={logo} 
              alt="Company logo" 
              className="brand-logo"
            />
            <div className="brand-links">
              <a href="/plans" target="_blank" rel="noopener" className="brand-link">
                Learn More About Our Plans
              </a>
              <a href="/" target="_blank" rel="noopener" className="brand-link">
                amnasnetwork.org
              </a>
              <a href="/community" target="_blank" rel="noopener" className="brand-link">
                Amna's Network Community
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="auth-form-section">
          <div className="form-wrapper">
            <div className="form-container">
              {/* Sign In Form */}
              <div className="signin-form">
                <div className="form-header">
                  <h1 className="form-title">Sign in to your account</h1>
                  <p className="form-subtitle">Access your learning dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="form-group">
                    <div className="input-wrapper">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        required
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="input-wrapper">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        className={`form-input ${errors.password ? 'input-error' : ''}`}
                        required
                      />
                      {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="error-message submit-error">
                      {errors.submit}
                    </div>
                  )}

                  <div className="form-actions">
                    <div className="actions-group">
                      <button 
                        type="submit" 
                        className="btn btn-primary submit-btn"
                        disabled={!formData.email || !formData.password || loading}
                      >
                        {loading ? 'Signing In...' : 'Sign In'}
                      </button>
                      {/* <a href="/forgot-password" className="forgot-password-link">
                        <button type="button" className="btn btn-link">
                          Forgot your password?
                        </button>
                      </a> */}
                    </div>
                  </div>
                </form>
              </div>

              {/* Sign Up Link */}
              <div className="form-footer">
                <p className="signup-prompt">Don't Have an Account?</p>
                <a href="/signup" className="signup-link">
                  Create account
                </a>
              </div>

              {/* Mobile Links */}
              <div className="mobile-links">
                <a href="/plans" target="_blank" rel="noopener" className="mobile-link">
                  Our plans
                </a>
                <a href="/" target="_blank" rel="noopener" className="mobile-link">
                  amnasnetwork.org
                </a>
                <a href="/community" target="_blank" rel="noopener" className="mobile-link">
                  Amna's Network Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;