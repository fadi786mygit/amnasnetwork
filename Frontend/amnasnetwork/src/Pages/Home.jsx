// components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';
import baseUrl from '../baseUrl';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Predefined background gradients for slides
  const backgroundGradients = [
    "linear-gradient(to right bottom, rgb(8, 31, 99), rgb(15, 132, 167), rgb(64, 203, 236))",
    "linear-gradient(to right bottom, rgb(168, 45, 64), rgb(67, 52, 154))",
    "linear-gradient(to right bottom, rgb(74, 144, 226), rgb(149, 59, 151))",
    "linear-gradient(to right bottom, rgb(34, 139, 34), rgb(65, 105, 225))",
    "linear-gradient(to right bottom, rgb(220, 20, 60), rgb(255, 140, 0))"
  ];

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/courses/getCourses`);

        if (response.data && response.data.data) {
          // Take only the first 5 courses for carousel, or all if less than 5
          const featuredCourses = response.data.data.slice(0, 9);
          setCourses(featuredCourses);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load featured courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course click navigation
  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  // Handle "View Course" button click
  const handleViewCourse = (course, e) => {
    e.preventDefault();
    e.stopPropagation();
    handleCourseClick(course._id);
  };

  // Handle "See More" link click
  const handleSeeMore = (course, e) => {
    e.preventDefault();
    e.stopPropagation();
    handleCourseClick(course._id);
  };

  const nextSlide = () => {
    if (courses.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % courses.length);
    }
  };

  const prevSlide = () => {
    if (courses.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide only when we have courses
  useEffect(() => {
    if (courses.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [courses.length]);

  // Format description to show only first 150 characters
  const formatDescription = (description) => {
    if (!description) return '';
    if (description.length <= 150) return description;
    return description.substring(0, 150) + '...';
  };

  if (loading) {
    return (
      <section className="home">
        <div className="anonymous-bg">
          <div className="background background--1"></div>
          <div className="background background--2"></div>
          <div className="background background--3"></div>
          <div className="background background--4"></div>
        </div>

        <div className="anonymous">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading featured courses...</span>
            </div>
            <p className="mt-3 text-white">Loading featured courses...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="home">
        <div className="anonymous-bg">
          <div className="background background--1"></div>
          <div className="background background--2"></div>
          <div className="background background--3"></div>
          <div className="background background--4"></div>
        </div>

        <div className="anonymous">
          <div className="text-center py-5">
            <div className="alert alert-warning">
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="home">
      <div className="anonymous-bg">
        <div className="background background--1"></div>
        <div className="background background--2"></div>
        <div className="background background--3"></div>
        <div className="background background--4"></div>
      </div>

      {/* Carousel Section */}
      <div className="anonymous">
        <div className="swiper-container featured-slides">
          <div className="swiper-wrapper">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <div
                  key={course._id}
                  className={`swiper-slide featured-slides__slide ${index === currentSlide ? 'swiper-slide-active' :
                      index === (currentSlide - 1 + courses.length) % courses.length ? 'swiper-slide-prev' :
                        index === (currentSlide + 1) % courses.length ? 'swiper-slide-next' : ''
                    }`}
                  style={{
                    backgroundImage: `url("${course.thumbnail || 'https://via.placeholder.com/1920x1080/4A90E2/FFFFFF?text=Course+Image'}"), ${backgroundGradients[index % backgroundGradients.length]
                      }`,
                    cursor: 'pointer' // ✅ Added cursor here
                  }}
                  onClick={() => handleCourseClick(course._id)}
                >
                  <div className="featured-slides__overlay"></div>
                  <div className="featured-slides__course-wrapper">
                    <div className="featured-slides__branding">
                      <p className="featured-slides__vendor">{course.category || 'Professional'}</p>
                    </div>
                    <div className="featured-slides__title">{course.title}</div>
                    <div className="featured-slides__description">
                      {formatDescription(course.description)}
                      {course.description && course.description.length > 150 && (
                        <a
                          href={`/courses/${course._id}`}
                          className="featured-slides__description--link"
                          onClick={(e) => handleSeeMore(course, e)}
                        >
                          See More
                        </a>
                      )}
                    </div>
                    <div className="featured-slides__buttons">
                      <a
                        href={`/courses/${course._id}`}
                        className="btn btn--primary"
                        onClick={(e) => handleViewCourse(course, e)}
                      >
                        View Course
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="swiper-slide featured-slides__slide swiper-slide-active">
                <div className="featured-slides__overlay"></div>
                <div className="featured-slides__course-wrapper">
                  <div className="featured-slides__title">No Featured Courses Available</div>
                  <div className="featured-slides__description">
                    Check back later for featured courses or browse our full course catalog.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Dots - Only show if we have courses */}
          {courses.length > 0 && (
            <div className="swiper-pagination">
              {courses.map((_, index) => (
                <div
                  key={index}
                  className={`swiper-pagination-bullet ${index === currentSlide ? 'swiper-pagination-bullet-active' : ''
                    }`}
                  onClick={() => goToSlide(index)}
                ></div>
              ))}
            </div>
          )}

          {/* Navigation Buttons - Only show if we have courses */}
          {courses.length > 0 && (
            <>
              <div
                className="swiper-button-prev"
                onClick={prevSlide}
                style={{ zIndex: 100 }}
              >
                <div className="swiper-icon-wrapper">
                  <div className="swiper-icon-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.53 23.57" className="swiper-icon">
                      <g id="chevrons-right">
                        <g id="Path_358" data-name="Path 358">
                          <path d="M12 1.29a1.75 1.75 0 011.24 3L5.73 11.8l7.52 7.52a1.75 1.75 0 01-2.47 2.47L2 13a1.74 1.74 0 010-2.48l8.78-8.72A1.72 1.72 0 0112 1.29z" className="cls-1"></path>
                        </g>
                        <g id="Path_359" data-name="Path 359">
                          <path d="M24.27 1.29a1.75 1.75 0 011.24 3L18 11.8l7.52 7.52A1.75 1.75 0 0123 21.79L14.28 13a1.74 1.74 0 010-2.48L23 1.8a1.72 1.72 0 011.27-.51z" className="cls-1"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <div
                className="swiper-button-next"
                onClick={nextSlide}
                style={{ zIndex: 100 }}
              >
                <div className="swiper-icon-wrapper">
                  <div className="swiper-icon-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.53 23.57" className="swiper-icon">
                      <g id="chevrons-right">
                        <g id="Path_358" data-name="Path 358">
                          <path d="M15.52 22.28a1.75 1.75 0 01-1.75-1.75 1.7 1.7 0 01.51-1.24l7.52-7.52-7.52-7.52a1.75 1.75 0 012.48-2.48l8.75 8.76a1.74 1.74 0 010 2.48l-8.75 8.76a1.8 1.8 0 01-1.24.51z" className="cls-1"></path>
                        </g>
                        <g id="Path_359" data-name="Path 359">
                          <path d="M3.26 22.28a1.75 1.75 0 01-1.24-3l7.52-7.52L2 4.25a1.75 1.75 0 012.5-2.48l8.75 8.76a1.74 1.74 0 010 2.48L4.5 21.77a1.8 1.8 0 01-1.24.51z" className="cls-1"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Rest of your existing sections remain the same */}
      <div className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Amna's Network?</h2>
            <p>Smart strategies, and measurable success for every project.</p>
          </div>

          <div className="value-proposition">
            <p className='text-dark'>Amna's Network combines expert business consultancy with cutting-edge software solutions, tailored to drive growth and innovation. With a client-first approach, we ensure reliable support, smart strategies, and measurable success for every project.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Expert Consultation</h3>
              <p>Professional guidance to help your business grow and overcome challenges with proven strategies.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Software Solutions</h3>
              <p>Custom software development tailored to your specific business needs and requirements.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Measurable Results</h3>
              <p>Trackable metrics and KPIs to ensure your investment delivers tangible business outcomes.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Reliable Support</h3>
              <p>Continuous support and maintenance to keep your systems running smoothly and efficiently.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="team-section-home">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team Members</h2>
            <p>The dedicated professionals behind our success</p>
          </div>

          <div className="team-grid">
            <div className="team-member-card">
              <div className="member-avatar">AK</div>
              <h3>Amna Kousar</h3>
              <p className="member-role">Owner Of Amna's Network</p>
              <p className="member-bio">Leading with vision and expertise, Amna drives the network's success through innovative strategies and dedicated client service.</p>
            </div>

            <div className="team-member-card">
              <div className="member-avatar">FS</div>
              <h3>Fatima Shakoor</h3>
              <p className="member-role">Manager of Amna's Network</p>
              <p className="member-bio">Fatima excels in operational excellence and team leadership, ensuring smooth day-to-day operations and exceptional client service delivery.</p>
            </div>

            <div className="team-member-card">
              <div className="member-avatar">AJ</div>
              <h3>Asadullah Jan</h3>
              <p className="member-role">Accountant</p>
              <p className="member-bio">Asadullah brings financial expertise and meticulous attention to detail, managing the company's financial health with precision and care.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;