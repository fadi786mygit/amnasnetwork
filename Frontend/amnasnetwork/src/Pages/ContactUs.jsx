import React, { useState } from 'react';
import axios from 'axios';
import logo from '../Components/Images/logo.jpg';
import '../style.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8082/api/quote/quotes', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });

      if (response.data.success) {
        // Show success modal
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        alert("Error: " + response.data.error);
      }
    } catch (err) {
      alert("Failed to submit form. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Brand Section */}
        <div className="signup-brand-section">
          <div className="signup-brand-content">
            <img 
              src={logo} 
              alt="Amna's Network logo" 
              className="signup-brand-logo"
            />
            <div className="contact-info">
              <h3 className="contact-title">Get In Touch</h3>
              <p className="contact-description">
                Have questions about our courses or need guidance? We're here to help you start your learning journey.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email:</strong> amnasnetwork143@gmail.com
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong> +92 322 7544521
                </div>
                <div className="contact-item">
                  <strong>Hours:</strong> Mon-Sat 9AM-6PM
                </div>
              </div>
            </div>
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
              {/* Contact Form */}
              <div className="signup-form">
                <div className="signup-form-header">
                  <h1 className="signup-form-title">Contact Us</h1>
                  <p className="signup-form-subtitle">We'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-auth-form">
                  <div className="signup-form-group">
                    <div className="signup-input-wrapper">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleChange}
                        className={`signup-form-input ${errors.name ? 'signup-input-error' : ''}`}
                        required
                      />
                      {errors.name && <div className="signup-error-message">{errors.name}</div>}
                    </div>

                    <div className="signup-input-wrapper">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        className={`signup-form-input ${errors.email ? 'signup-input-error' : ''}`}
                        required
                      />
                      {errors.email && <div className="signup-error-message">{errors.email}</div>}
                    </div>

                    <div className="signup-input-wrapper">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`signup-form-input ${errors.phone ? 'signup-input-error' : ''}`}
                        required
                      />
                      {errors.phone && <div className="signup-error-message">{errors.phone}</div>}
                    </div>

                    <div className="signup-input-wrapper">
                      <textarea
                        name="message"
                        placeholder="Your Message (Optional)"
                        value={formData.message}
                        onChange={handleChange}
                        className="signup-form-input textarea"
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="signup-form-actions">
                    <div className="signup-actions-group">
                      <button 
                        type="submit" 
                        className="signup-btn signup-btn-primary signup-submit-btn"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Additional Links */}
              <div className="signup-form-footer">
                <p className="signup-signin-prompt">Looking for something else?</p>
                <div className="contact-links">
                  <a href="/courses" className="signup-signin-link">Browse Courses</a>
                  <a href="/about" className="signup-signin-link">About Us</a>
                  <a href="/faq" className="signup-signin-link">FAQ</a>
                </div>
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Message Sent Successfully!</h3>
              <button onClick={closeModal} className="modal-close">&times;</button>
            </div>
            <div className="modal-body">
              <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal} className="signup-btn signup-btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;