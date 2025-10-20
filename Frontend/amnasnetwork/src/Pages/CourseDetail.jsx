// src/pages/Courses/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Courses.css';

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8082/api/courses/getCourse/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        setCourse(data.data);
      } else {
        setError('Failed to fetch course details');
      }
    } catch (err) {
      setError('Error fetching course: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    // Navigate to payment page with course data
    navigate(`/courses/${id}/payment`, { state: { course } });
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
      <div className="courses-container">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading course...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="courses-container">
        <div className="container">
          <div className="alert alert-danger text-center">
            {error || 'Course not found'}
            <button 
              className="btn btn-outline-secondary ms-3"
              onClick={() => navigate('/courses')}
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-container mt-3">
      <div className="container">
        <button 
          className="btn btn-outline-light mb-4"
          onClick={() => navigate('/courses')}
        >
          ← Back to Courses
        </button>

        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              {course.thumbnail && (
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="card-img-top course-detail-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/4A90E2/FFFFFF?text=Course+Image';
                  }}
                />
              )}
              
              <div className="card-body">
                <div className="course-badges mb-3">
                  <span className={`badge ${getLevelBadgeClass(course.level)} me-2`}>
                    {course.level}
                  </span>
                  <span className="badge bg-light text-dark">
                    {course.category}
                  </span>
                </div>
                
                <h1 className="course-title display-5 fw-bold mb-3">{course.title}</h1>
                
                {course.instructor && (
                  <div className="course-instructor mb-4">
                    <h5 className="text-muted">
                      <i className="bi bi-person me-2"></i>
                      Instructor: {course.instructor}
                    </h5>
                  </div>
                )}
                
                <div className="course-description">
                  <h4>About This Course</h4>
                  <p className="lead">{course.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '2rem' }}>
              <div className="card-body text-center">
                <div className="course-price display-4 fw-bold text-primary mb-3">
                  {formatPrice(course.price)}
                </div>
                
                <button 
                  className="btn btn-primary btn-lg w-100 mb-3"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </button>
                
                <div className="course-features">
                  <div className="feature-item mb-2">
                    <i className="bi bi-play-circle me-2"></i>
                    Self-paced learning
                  </div>
                  <div className="feature-item mb-2">
                    <i className="bi bi-infinity me-2"></i>
                    Lifetime access
                  </div>
                  <div className="feature-item mb-2">
                    <i className="bi bi-phone me-2"></i>
                    Mobile friendly
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;