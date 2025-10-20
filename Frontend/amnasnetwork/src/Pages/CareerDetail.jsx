// src/pages/Careers/CareerDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Career.css';
import baseUrl from '../baseUrl';

const CareerDetail = () => {
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationLoading, setApplicationLoading] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    portfolio: '',
    linkedin: '',
    expectedSalary: '',
    noticePeriod: '',
    source: ''
  });

  useEffect(() => {
    fetchCareer();
  }, [id]);

  const fetchCareer = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/careers/getCareer/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        setCareer(data.data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch job details');
      }
    } catch (err) {
      setError('Error fetching job: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add the missing handleInputChange function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = () => {
    // Check if user is logged in
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Please login to apply for this job');
      navigate('/login');
      return;
    }
    setShowApplicationModal(true);
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    setApplicationLoading(true);

    try {
      const token = sessionStorage.getItem('token');
      const userData = JSON.parse(sessionStorage.getItem('user'));

      // If user is logged in, pre-fill some data automatically
      if (userData) {
        setApplicationData(prev => ({
          ...prev,
          fullName: userData.fullName || prev.fullName,
          email: userData.email || prev.email,
          phone: userData.phone || prev.phone
        }));
      }

      // Prepare application data
      const applicationPayload = {
        careerId: id,
        careerTitle: career.title,
        fullName: applicationData.fullName,
        email: applicationData.email,
        phone: applicationData.phone,
        coverLetter: applicationData.coverLetter,
        portfolio: applicationData.portfolio,
        linkedin: applicationData.linkedin,
        expectedSalary: applicationData.expectedSalary,
        noticePeriod: applicationData.noticePeriod,
        source: applicationData.source
      };

      console.log('Sending application:', applicationPayload);

      const response = await fetch(`${baseUrl}/api/applications/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(applicationPayload)
      });

      const result = await response.json();
      console.log('Application response:', result);

      if (response.ok && result.success) {
        setApplicationSuccess(true);
        setTimeout(() => {
          setShowApplicationModal(false);
          setApplicationSuccess(false);
          // Reset form
          setApplicationData({
            fullName: '',
            email: '',
            phone: '',
            coverLetter: '',
            portfolio: '',
            linkedin: '',
            expectedSalary: '',
            noticePeriod: '',
            source: ''
          });
        }, 2000);
      } else {
        alert(result.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Application error:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setApplicationLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Open until filled';
    const date = new Date(dateString);
    return date.toLocaleDateString();
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

  if (loading) {
    return (
      <div className="careers-container">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading job...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="careers-container">
        <div className="container">
          <div className="alert alert-danger text-center">
            {error || 'Job not found'}
            <button 
              className="btn btn-outline-secondary ms-3"
              onClick={() => navigate('/careers')}
            >
              Back to Careers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="careers-container mt-3">
      <div className="container">
        <button 
          className="btn btn-outline-light mb-4"
          onClick={() => navigate('/careers')}
        >
          ← Back to Careers
        </button>

        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
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
                
                <h1 className="career-title display-5 fw-bold mb-3">{career.title}</h1>
                
                <div className="career-company mb-4">
                  <h3 className="text-primary">
                    <i className="bi bi-building me-2"></i>
                    {career.company}
                  </h3>
                </div>
                
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="career-location">
                      <i className="bi bi-geo-alt me-2 text-muted"></i>
                      <strong>Location:</strong> {career.location}
                    </div>
                  </div>
                  {career.salary && (
                    <div className="col-md-6">
                      <div className="career-salary">
                        <i className="bi bi-currency-dollar me-2 text-success"></i>
                        <strong>Salary:</strong> <span className="text-success">{career.salary}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="career-deadline mb-4">
                  <i className="bi bi-clock me-2 text-warning"></i>
                  <strong>Application Deadline:</strong> {formatDate(career.deadline)}
                </div>
                
                <div className="career-description mb-5">
                  <h4>Job Description</h4>
                  <p className="lead">{career.description}</p>
                </div>

                {career.responsibilities && career.responsibilities.length > 0 && (
                  <div className="career-responsibilities mb-5">
                    <h4>Key Responsibilities</h4>
                    <ul className="list-group list-group-flush">
                      {career.responsibilities.map((responsibility, index) => (
                        <li key={index} className="list-group-item">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {career.requirements && career.requirements.length > 0 && (
                  <div className="career-requirements mb-5">
                    <h4>Requirements</h4>
                    <ul className="list-group list-group-flush">
                      {career.requirements.map((requirement, index) => (
                        <li key={index} className="list-group-item">
                          <i className="bi bi-arrow-right-circle text-primary me-2"></i>
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {career.benefits && career.benefits.length > 0 && (
                  <div className="career-benefits mb-5">
                    <h4>Benefits & Perks</h4>
                    <div className="row">
                      {career.benefits.map((benefit, index) => (
                        <div key={index} className="col-md-6 mb-2">
                          <i className="bi bi-star-fill text-warning me-2"></i>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {career.tags && career.tags.length > 0 && (
                  <div className="career-tags">
                    <h5>Tags</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {career.tags.map((tag, index) => (
                        <span key={index} className="badge bg-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '2rem' }}>
              <div className="card-body text-center">
                <div className="apply-section mb-4">
                  <h4 className="text-primary mb-3">Ready to Apply?</h4>
                  
                  <button 
                    className="btn btn-primary btn-lg w-100 mb-3"
                    onClick={handleApply}
                  >
                    Apply Now
                  </button>
                  
                  <p className="text-muted small">
                    Fill out the application form to submit your candidacy
                  </p>
                </div>
                
                <div className="job-meta">
                  <div className="meta-item mb-3">
                    <i className="bi bi-calendar me-2"></i>
                    <strong>Posted:</strong> {new Date(career.createdAt).toLocaleDateString()}
                  </div>
                  
                  <div className="meta-item mb-3">
                    <i className="bi bi-briefcase me-2"></i>
                    <strong>Type:</strong> {career.employmentType}
                  </div>
                  
                  <div className="meta-item mb-3">
                    <i className="bi bi-person-badge me-2"></i>
                    <strong>Level:</strong> {career.experienceLevel}
                  </div>
                  
                  <div className="meta-item">
                    <i className="bi bi-tags me-2"></i>
                    <strong>Category:</strong> {career.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Apply for {career.title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowApplicationModal(false)}
                  disabled={applicationLoading}
                ></button>
              </div>
              
              <div className="modal-body">
                {applicationSuccess ? (
                  <div className="text-center py-4">
                    <div className="text-success mb-3">
                      <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h4>Application Submitted Successfully!</h4>
                    <p>Thank you for applying. We'll review your application and get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={submitApplication}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          value={applicationData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={applicationData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone *</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={applicationData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Expected Salary</label>
                        <input
                          type="text"
                          className="form-control"
                          name="expectedSalary"
                          value={applicationData.expectedSalary}
                          onChange={handleInputChange}
                          placeholder="e.g., $50,000 - $70,000"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Cover Letter *</label>
                      <textarea
                        className="form-control"
                        name="coverLetter"
                        rows="4"
                        value={applicationData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us why you're a great fit for this position..."
                        required
                      ></textarea>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Portfolio URL</label>
                        <input
                          type="url"
                          className="form-control"
                          name="portfolio"
                          value={applicationData.portfolio}
                          onChange={handleInputChange}
                          placeholder="https://"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">LinkedIn Profile</label>
                        <input
                          type="url"
                          className="form-control"
                          name="linkedin"
                          value={applicationData.linkedin}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Notice Period</label>
                        <select
                          className="form-select"
                          name="noticePeriod"
                          value={applicationData.noticePeriod}
                          onChange={handleInputChange}
                        >
                          <option value="">Select notice period</option>
                          <option value="immediately">Immediately</option>
                          <option value="1 week">1 week</option>
                          <option value="2 weeks">2 weeks</option>
                          <option value="1 month">1 month</option>
                          <option value="2 months">2 months</option>
                          <option value="3 months">3 months</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">How did you hear about us?</label>
                        <select
                          className="form-select"
                          name="source"
                          value={applicationData.source}
                          onChange={handleInputChange}
                        >
                          <option value="">Select source</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="indeed">Indeed</option>
                          <option value="glassdoor">Glassdoor</option>
                          <option value="company_website">Company Website</option>
                          <option value="referral">Referral</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => setShowApplicationModal(false)}
                        disabled={applicationLoading}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={applicationLoading}
                      >
                        {applicationLoading ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDetail;