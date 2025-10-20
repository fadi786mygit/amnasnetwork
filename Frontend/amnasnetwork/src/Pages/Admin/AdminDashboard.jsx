// src/pages/Admin/AdminDashboard.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../AdminDashboard.css";

const AdminDashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getAdminUser = () => {
    try {
      const storedUser = sessionStorage.getItem("adminUser");
      if (!storedUser || storedUser === "undefined" || storedUser === "null") {
        return {};
      }
      return JSON.parse(storedUser);
    } catch {
      return {};
    }
  };

  const adminUser = getAdminUser();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    navigate("/admin");
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/users", label: "User Management", icon: "👥" },
    { path: "/admin/courses", label: "Course Management", icon: "📚" },
    { path: "/admin/careers", label: "Career Management", icon: "💼" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h2>Amna’s Admin</h2>
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
              key={item.path}
              className={`sidebar-item ${
                isActive(item.path) ? "active" : ""
              }`}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-info">
            <span>👤</span>
            <p>{adminUser.name || "Admin"}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <button
            className="toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>
            {menuItems.find((i) => i.path === location.pathname)?.label ||
              "Admin Dashboard"}
          </h1>
          <span className="welcome-text">
            Welcome, {adminUser.name || "Admin"}!
          </span>
        </header>

        <main className="admin-content">
          {children || (
            <div className="welcome-card">
              <h3>Welcome to the Admin Panel</h3>
              <p>Select an option from the sidebar to manage your website.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
