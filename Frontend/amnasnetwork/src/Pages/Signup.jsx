import React, { useState } from 'react';
import axios from 'axios';
import logo from '../Components/Images/logo.jpg';
import '../style.css';
import baseUrl from '../baseUrl';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/api/users/register`, { // Fixed endpoint
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        agreeToTerms: formData.agreeToTerms // Added this field
      });

      if (res.status === 201 || res.status === 200) {
        alert('Account created successfully!');
        console.log('User registered:', res.data);
        // Optionally redirect to login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      alert(errorMessage);
      setErrors({ submit: errorMessage });
    }
  };

  const passwordsMatch = formData.password === formData.confirmPassword;
  const isFormValid =
    formData.fullName &&
    formData.phone &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.agreeToTerms &&
    passwordsMatch;

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Brand Section */}
        <div className="signup-brand-section">
          <div className="signup-brand-content">
            <img src={logo} alt="Company logo" className="signup-brand-logo" />
            <div className="signup-brand-links">
              <a href="/plans" target="_blank" rel="noopener" className="signup-brand-link">
                Learn More About Our Plans
              </a>
              <a href="/" target="_blank" rel="noopener" className="signup-brand-link">
                amnasnetwork.org
              </a>
              <a href="/community" target="_blank" rel="noopener" className="signup-brand-link">
                Amna's Network Community
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="signup-form-section">
          <div className="signup-form-wrapper">
            <div className="signup-form-container">
              {/* Sign Up Form */}
              <div className="signup-form">
                <div className="signup-form-header">
                  <h1 className="signup-form-title">Create your account</h1>
                  <p className="signup-form-subtitle">Start your learning journey with us</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-auth-form">
                  <div className="signup-form-group">
                    <div className="signup-input-wrapper">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        autoComplete="name"
                        className="signup-form-input"
                        required
                      />
                    </div>

                    <div className="signup-input-wrapper">
                      <input
                        type="tel" // Changed from number to tel
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        className="signup-form-input"
                        required
                      />
                    </div>

                    <div className="signup-input-wrapper">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="signup-form-input"
                        required
                      />
                    </div>

                    <div className="signup-input-wrapper">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        className="signup-form-input"
                        required
                        minLength="6"
                      />
                    </div>

                    <div className="signup-input-wrapper">
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        className={`signup-form-input ${
                          formData.confirmPassword && !passwordsMatch ? 'signup-input-error' : ''
                        }`}
                        required
                      />
                      {formData.confirmPassword && !passwordsMatch && (
                        <div className="signup-error-message">Passwords don't match</div>
                      )}
                    </div>

                    <div className="signup-checkbox-wrapper">
                      <label className="signup-checkbox-label">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="signup-checkbox-input"
                          required
                        />
                        <span className="signup-checkmark"></span>
                        I agree to the
                        <a href="/terms" className="signup-terms-link">
                          &nbsp;Terms of Service
                        </a>
                        &nbsp;and&nbsp;
                        <a href="/privacy" className="signup-terms-link">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    {errors.submit && (
                      <div className="signup-error-message signup-submit-error">
                        {errors.submit}
                      </div>
                    )}
                  </div>

                  <div className="signup-form-actions">
                    <div className="signup-actions-group">
                      <button
                        type="submit"
                        className="signup-btn signup-btn-primary signup-submit-btn"
                        disabled={!isFormValid}
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Sign In Link */}
              <div className="signup-form-footer">
                <p className="signup-signin-prompt">Already have an account?</p>
                <a href="/login" className="signup-signin-link">
                  Sign in
                </a>
              </div>

              {/* Mobile Links */}
              <div className="signup-mobile-links">
                <a href="/plans" target="_blank" rel="noopener" className="signup-mobile-link">
                  Our plans
                </a>
                <a href="/" target="_blank" rel="noopener" className="signup-mobile-link">
                  amnasnetwork.org
                </a>
                <a href="/community" target="_blank" rel="noopener" className="signup-mobile-link">
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

export default SignUp;