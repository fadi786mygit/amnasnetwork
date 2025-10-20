import React, { useEffect, useState } from 'react';
import '../Navbar.css';
import logo from './Images/logo.jpg';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on component mount and when location changes
  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  const checkAuthStatus = () => {
    // Check for user authentication
    const userToken = sessionStorage.getItem('token');
    const userData = sessionStorage.getItem('user');

    if (userToken && userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDashboard = () => {
    navigate('/user/dashboard');
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Clear user session storage items
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    
    // Close mobile menu
    setIsOpen(false);
    
    // Redirect to home page
    navigate('/');
  };

  // Common navigation handler that closes the menu
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className="ine-header">
      <nav className="ine-nav">
        <div className="ine-logo" onClick={() => handleNavigation('/')}>
          <img src={logo} alt="INE Logo" className="logo-image" />
        </div>
        
        {/* Toggle button for small devices */}
        <button className="ine-toggle-btn" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Nav menu */}
        <div className={`ine-nav-menu ${isOpen ? 'open' : ''}`}>
          <div className="ine-nav-left">
            <a 
              href="/" 
              className="ine-nav-link fw-bold"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/');
              }}
            >
              Home
            </a>
            <span className="ine-nav-separator"></span>
            <a 
              onClick={() => handleNavigation('/about')} 
              className="ine-nav-link fw-bold"
            >
              About
            </a>
            <span className="ine-nav-separator"></span>
            <a 
              onClick={() => handleNavigation('/courses')} 
              className="ine-nav-link fw-bold"
            >
              Courses
            </a>
            <span className="ine-nav-separator"></span>
            <a 
              onClick={() => handleNavigation("/contactus")} 
              className="ine-nav-link fw-bold"
            >
              Contact us
            </a>
            <span className="ine-nav-separator"></span>
            <a 
              onClick={() => handleNavigation('/services')} 
              className="ine-nav-link fw-bold"
            >
              Services
            </a>
            <span className="ine-nav-separator"></span>
            <a 
              onClick={() => handleNavigation('/careers')} 
              className="ine-nav-link fw-bold"
            >
              Careers
            </a>
          </div>
          
          <div className="ine-nav-right gap-2">
            {isLoggedIn ? (
              // Show these buttons when user is logged in
              <>
                <button 
                  onClick={handleDashboard} 
                  className="nav-btn nav-btn-primary"
                >
                  <span className="btn-text">My Dashboard</span>
                </button>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline-primary nav-btn nav-btn-secondary px-md-3 py-md-2 px-2 py- fw-semibold"
                >
                  <span className="btn-text">Logout</span>
                </button>
              </>
            ) : (
              // Show these buttons when user is not logged in
              <>
                <button 
                  onClick={() => handleNavigation('/login')} 
                  className="nav-btn nav-btn-primary"
                >
                  <span className="btn-text">Sign In</span>
                </button>
                <button 
                  onClick={() => handleNavigation('/signup')} 
                  className="btn btn-outline-primary nav-btn nav-btn-secondary fw-semibold"
                >
                  <span className="btn-text">Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;