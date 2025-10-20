// src/pages/User/UserDashboard.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '.././../UserDashboard.css';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 1, name: 'Dashboard', path: '/user/dashboard', icon: '📊' },
    { id: 2, name: 'Profile Update', path: '/user/profile/update', icon: '👤' },
    { id: 3, name: 'Logout', path: '/logout', icon: '🚪' }
  ];

  const handleNavigation = (path) => {
    if (path === '/logout') {
      // Handle logout
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      navigate('/');
    } else {
      navigate(path);
      setSidebarOpen(false); // Close sidebar on navigation for mobile
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="user-dashboard">
      {/* Sidebar */}
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
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
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
          <h1>Welcome to Your Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          <div className="dashboard-actions">
            <div className="action-card">
              <h3>Browse Courses</h3>
              <p>Explore our wide range of courses and enhance your skills</p>
              <button
                className="action-btn"
                onClick={() => navigate('/courses')}
              >
                View All Courses
              </button>
            </div>

            <div className="action-card">
              <h3>Career Opportunities</h3>
              <p>Discover exciting career paths and job opportunities</p>
              <button
                className="action-btn"
                onClick={() => navigate('/careers')}
              >
                Explore Careers
              </button>
            </div>
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

export default UserDashboard;