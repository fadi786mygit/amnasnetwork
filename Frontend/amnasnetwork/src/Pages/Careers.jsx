// src/pages/Careers/Careers.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Career.css';

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterEmploymentType, setFilterEmploymentType] = useState('all');
  const [filterExperienceLevel, setFilterExperienceLevel] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterCategory !== 'all') params.append('category', filterCategory);
      if (filterEmploymentType !== 'all') params.append('employmentType', filterEmploymentType);
      if (filterExperienceLevel !== 'all') params.append('experienceLevel', filterExperienceLevel);
      if (filterLocation) params.append('location', filterLocation);

      const queryString = params.toString();
      const url = queryString 
        ? `http://localhost:8082/api/careers/getCareers?${queryString}`
        : 'http://localhost:8082/api/careers/getCareers';

      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setCareers(data.data || []);
      } else {
        setError('Failed to fetch job opportunities');
      }
    } catch (err) {
      setError('Error fetching careers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCareers();
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterCategory, filterEmploymentType, filterExperienceLevel, filterLocation]);

  // Get unique values for filters
  const categories = ['all', ...new Set(careers.map(career => career.category))];
  const employmentTypes = ['all', 'full-time', 'part-time', 'contract', 'internship', 'remote'];
  const experienceLevels = ['all', 'entry', 'mid', 'senior', 'executive'];
  const locations = ['all', ...new Set(careers.map(career => career.location))];

  const handleCareerClick = (careerId) => {
    navigate(`/careers/${careerId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Open until filled';
    const date = new Date(dateString);
    return `Until ${date.toLocaleDateString()}`;
  };

  const getEmploymentTypeBadgeClass = (type) => {
    switch (type) {
      case 'full-time': return 'badge-full-time';
      case 'part-time': return 'badge-part-time';
      case 'contract': return 'badge-contract';
      case 'internship': return 'badge-internship';
      case 'remote': return 'badge-remote';
      default: return 'badge-full-time';
    }
  };

  const getExperienceLevelBadgeClass = (level) => {
    switch (level) {
      case 'entry': return 'badge-entry';
      case 'mid': return 'badge-mid';
      case 'senior': return 'badge-senior';
      case 'executive': return 'badge-executive';
      default: return 'badge-mid';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
    setFilterEmploymentType('all');
    setFilterExperienceLevel('all');
    setFilterLocation('');
  };

  if (loading) {
    return (
      <div className="careers-container">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading jobs...</span>
            </div>
            <p className="mt-3">Loading career opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="careers-container mt-3">
      <div className="container">
        {/* Header Section */}
        <div className="careers-header text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-3">Career Opportunities</h1>
          <p className="lead text-muted">
            Join our team and build your future with us
          </p>
        </div>

        {/* Search and Filters */}
        <div className="row mb-4">
          <div className="col-lg-4 mb-3">
            <div className="search-box">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search jobs by title, company, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="bi bi-search search-icon"></i>
            </div>
          </div>
          
          <div className="col-lg-2 mb-3">
            <select
              className="form-select form-select-lg"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-lg-2 mb-3">
            <select
              className="form-select form-select-lg"
              value={filterEmploymentType}
              onChange={(e) => setFilterEmploymentType(e.target.value)}
            >
              {employmentTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-2 mb-3">
            <select
              className="form-select form-select-lg"
              value={filterExperienceLevel}
              onChange={(e) => setFilterExperienceLevel(e.target.value)}
            >
              {experienceLevels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-2 mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Location..."
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || filterCategory !== 'all' || filterEmploymentType !== 'all' || 
          filterExperienceLevel !== 'all' || filterLocation) && (
          <div className="row mb-3">
            <div className="col-12">
              <div className="active-filters">
                <span className="filter-label">Active Filters:</span>
                {searchTerm && (
                  <span className="filter-tag">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')}>×</button>
                  </span>
                )}
                {filterCategory !== 'all' && (
                  <span className="filter-tag">
                    Category: {filterCategory}
                    <button onClick={() => setFilterCategory('all')}>×</button>
                  </span>
                )}
                {filterEmploymentType !== 'all' && (
                  <span className="filter-tag">
                    Type: {filterEmploymentType}
                    <button onClick={() => setFilterEmploymentType('all')}>×</button>
                  </span>
                )}
                {filterExperienceLevel !== 'all' && (
                  <span className="filter-tag">
                    Level: {filterExperienceLevel}
                    <button onClick={() => setFilterExperienceLevel('all')}>×</button>
                  </span>
                )}
                {filterLocation && (
                  <span className="filter-tag">
                    Location: {filterLocation}
                    <button onClick={() => setFilterLocation('')}>×</button>
                  </span>
                )}
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        {/* Results Count */}
        <div className="row mb-4">
          <div className="col-12">
            <p className="text-muted">
              Showing {careers.length} job{careers.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        {/* Careers Grid */}
        {careers.length === 0 ? (
          <div className="text-center py-5">
            <div className="empty-state">
              <i className="bi bi-briefcase text-muted" style={{ fontSize: '4rem' }}></i>
              <h3 className="mt-3">No jobs found</h3>
              <p className="text-muted">
                {searchTerm || filterCategory !== 'all' || filterEmploymentType !== 'all' || 
                 filterExperienceLevel !== 'all' || filterLocation
                  ? 'Try adjusting your search or filters'
                  : 'No job openings available at the moment. Please check back later!'
                }
              </p>
              {(searchTerm || filterCategory !== 'all' || filterEmploymentType !== 'all' || 
                filterExperienceLevel !== 'all' || filterLocation) && (
                <button 
                  className="btn btn-primary mt-3"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="row">
            {careers.map(career => (
              <div key={career._id} className="col-lg-6 col-xl-4 mb-4">
                <div 
                  className="career-card card h-100 shadow-sm"
                  onClick={() => handleCareerClick(career._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body d-flex flex-column">
                    <div className="career-badges mb-3">
                      <span className={`badge ${getEmploymentTypeBadgeClass(career.employmentType)} me-2`}>
                        {career.employmentType.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                      <span className={`badge ${getExperienceLevelBadgeClass(career.experienceLevel)} me-2`}>
                        {career.experienceLevel.charAt(0).toUpperCase() + career.experienceLevel.slice(1)}
                      </span>
                      <span className="badge bg-light text-dark">
                        {career.category}
                      </span>
                    </div>
                    
                    <h5 className="career-title card-title">{career.title}</h5>
                    
                    <div className="career-company mb-2">
                      <i className="bi bi-building me-1 text-primary"></i>
                      <strong>{career.company}</strong>
                    </div>
                    
                    <div className="career-location mb-3">
                      <i className="bi bi-geo-alt me-1 text-muted"></i>
                      <span className="text-muted">{career.location}</span>
                    </div>
                    
                    <p className="career-description card-text text-muted flex-grow-1">
                      {career.description.length > 120 
                        ? `${career.description.substring(0, 120)}...` 
                        : career.description
                      }
                    </p>

                    {career.salary && (
                      <div className="career-salary mb-3">
                        <i className="bi bi-currency-dollar me-1 text-success"></i>
                        <strong className="text-success">{career.salary}</strong>
                      </div>
                    )}
                    
                    <div className="career-footer mt-auto d-flex justify-content-between align-items-center">
                      <div className="career-deadline">
                        <small className="text-muted">
                          {formatDate(career.deadline)}
                        </small>
                      </div>
                      <div className="career-actions">
                        <button className="btn btn-outline-primary btn-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer bg-transparent">
                    <small className="text-muted">
                      Posted {new Date(career.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers;