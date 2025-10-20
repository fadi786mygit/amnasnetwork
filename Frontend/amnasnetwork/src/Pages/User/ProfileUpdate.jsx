import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '.././../ProfileUpdate.css';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const menuItems = [
    { id: 1, name: 'Dashboard', path: '/user/dashboard', icon: '📊' },
    { id: 2, name: 'Profile Update', path: '/user/profile/update', icon: '👤' },
    { id: 3, name: 'Logout', path: '/logout', icon: '🚪' }
  ];

  const handleNavigation = (path) => {
    if (path === '/logout') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      navigate('/');
    } else {
      navigate(path);
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const userData = JSON.parse(sessionStorage.getItem('user'));

      if (userData) {
        setFormData(prev => ({
          ...prev,
          fullName: userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || ''
        }));
      }

      const response = await fetch('http://localhost:8082/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Profile data:', data);

        setFormData(prev => ({
          ...prev,
          fullName: data.data?.fullName || data.user?.fullName || data.fullName || '',
          email: data.data?.email || data.user?.email || data.email || '',
          phone: data.data?.phone || data.user?.phone || data.phone || ''
        }));
      } else {
        console.error('Failed to load profile:', response.status);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  // Add the missing functions:
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation only if new password is provided
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }

      if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters long';
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = sessionStorage.getItem('token');
      
      const updateData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      };

      // Only include password fields if new password is provided
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await fetch('http://localhost:8082/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        setMessage('Profile updated successfully!');
        
        // Update session storage with new data
        const currentUser = JSON.parse(sessionStorage.getItem('user'));
        sessionStorage.setItem('user', JSON.stringify({
          ...currentUser,
          fullName: data.data?.fullName || data.user?.fullName || data.fullName,
          email: data.data?.email || data.user?.email || data.email,
          phone: data.data?.phone || data.user?.phone || data.phone
        }));

        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));

        setErrors({});
        
        // Navigate after delay
        setTimeout(() => {
          navigate('/user/dashboard');
        }, 1500);
        
      } else {
        setMessage(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update error:', error);
      setMessage('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-dashboard">
      {/* Sidebar - Same as UserDashboard */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>User Dashboard</h2>
          <button
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${window.location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Header */}
        <header className="dashboard-header">
          <button
            className="toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>Update Your Profile</h1>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          <div className="profile-update-container">
            <h2>Update Your Profile</h2>
            
            {message && (
              <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                  required
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  required
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Password Change Section */}
              <div className="password-section">
                <h3>Change Password</h3>
                <p className="section-description">
                  Leave these fields blank if you don't want to change your password.
                </p>

                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={errors.currentPassword ? 'error' : ''}
                    placeholder="Enter current password"
                  />
                  {errors.currentPassword && <span className="error-text">{errors.currentPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={errors.newPassword ? 'error' : ''}
                    placeholder="Enter new password (min 8 characters)"
                  />
                  {errors.newPassword && <span className="error-text">{errors.newPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              </div>

              <button
                type="submit"
                className="update-btn"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileUpdate;