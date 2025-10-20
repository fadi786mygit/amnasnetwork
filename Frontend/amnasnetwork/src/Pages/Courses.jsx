// src/pages/Courses/Courses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8082/api/courses/getCourses');
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data.data || []);
      } else {
        setError('Failed to fetch courses');
      }
    } catch (err) {
      setError('Error fetching courses: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(courses.map(course => course.category))];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `Rs ${price}`;
  };

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'beginner': return 'badge-beginner';
      case 'intermediate': return 'badge-intermediate';
      case 'advanced': return 'badge-advanced';
      default: return 'badge-beginner';
    }
  };

  if (loading) {
    return (
      <div className="courses-container ">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading courses...</span>
            </div>
            <p className="mt-3">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-container mt-3">
      <div className="container">
        {/* Header Section */}
        <div className="courses-header text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-3">Explore Our Courses</h1>
          <p className="lead text-muted">
            Discover a wide range of courses to enhance your skills and knowledge
          </p>
        </div>

        {/* Search and Filters */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="search-box">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search courses by title, description, or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="bi bi-search search-icon"></i>
            </div>
          </div>
          
          <div className="col-md-3 mb-3">
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
          
          <div className="col-md-3 mb-3">
            <select
              className="form-select form-select-lg"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

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
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-5">
            <div className="empty-state">
              <i className="bi bi-book text-muted" style={{ fontSize: '4rem' }}></i>
              <h3 className="mt-3">No courses found</h3>
              <p className="text-muted">
                {searchTerm || filterCategory !== 'all' || filterLevel !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'No courses available at the moment'
                }
              </p>
              {(searchTerm || filterCategory !== 'all' || filterLevel !== 'all') && (
                <button 
                  className="btn btn-primary mt-3"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
                    setFilterLevel('all');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="row">
            {filteredCourses.map(course => (
              <div key={course._id} className="col-lg-4 col-md-6 mb-4">
                <div 
                  className="course-card card h-100 shadow-sm"
                  onClick={() => handleCourseClick(course._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {course.thumbnail && (
                    <div className="course-image-container">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="course-image card-img-top"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Course+Image';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="card-body d-flex flex-column">
                    <div className="course-badges mb-2">
                      <span className={`badge ${getLevelBadgeClass(course.level)} me-2`}>
                        {course.level}
                      </span>
                      <span className="badge bg-light text-dark">
                        {course.category}
                      </span>
                    </div>
                    
                    <h5 className="course-title card-title">{course.title}</h5>
                    
                    <p className="course-description card-text text-muted flex-grow-1">
                      {course.description.length > 120 
                        ? `${course.description.substring(0, 120)}...` 
                        : course.description
                      }
                    </p>
                    
                    {course.instructor && (
                      <div className="course-instructor mb-2">
                        <small className="text-muted">
                          <i className="bi bi-person me-1"></i>
                          {course.instructor}
                        </small>
                      </div>
                    )}
                    
                    <div className="course-footer mt-auto d-flex justify-content-between align-items-center">
                      <div className="course-price fw-bold text-primary">
                        {formatPrice(course.price)}
                      </div>
                      <div className="course-actions">
                        <button className="btn btn-outline-primary btn-sm">
                          View Details
                        </button>
                      </div>
                    </div>
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

export default Courses;