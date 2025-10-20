// src/pages/Admin/EditCareer.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '.././../EditCareer.css';
import baseUrl from '../../baseUrl';

const EditCareers = () => {
    const [career, setCareer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        employmentType: 'full-time',
        category: 'Technology',
        salary: '',
        description: '',
        requirements: [''],
        responsibilities: [''],
        benefits: [''],
        applicationLink: '',
        applicationEmail: '',
        deadline: '',
        experienceLevel: 'mid',
        tags: [''],
        isActive: true
    });

    useEffect(() => {
        fetchCareer();
    }, [id]);

    const fetchCareer = async () => {
        setFetchLoading(true);
        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch(`${baseUrl}/api/careers/getCareer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCareer(data.data);
                
                // Pre-fill form with existing data
                setFormData({
                    title: data.data.title || '',
                    company: data.data.company || '',
                    location: data.data.location || '',
                    employmentType: data.data.employmentType || 'full-time',
                    category: data.data.category || 'Technology',
                    salary: data.data.salary || '',
                    description: data.data.description || '',
                    requirements: data.data.requirements && data.data.requirements.length > 0 
                        ? data.data.requirements 
                        : [''],
                    responsibilities: data.data.responsibilities && data.data.responsibilities.length > 0 
                        ? data.data.responsibilities 
                        : [''],
                    benefits: data.data.benefits && data.data.benefits.length > 0 
                        ? data.data.benefits 
                        : [''],
                    applicationLink: data.data.applicationLink || '',
                    applicationEmail: data.data.applicationEmail || '',
                    deadline: data.data.deadline ? data.data.deadline.split('T')[0] : '',
                    experienceLevel: data.data.experienceLevel || 'mid',
                    tags: data.data.tags && data.data.tags.length > 0 
                        ? data.data.tags 
                        : [''],
                    isActive: data.data.isActive !== undefined ? data.data.isActive : true
                });
            } else {
                setError('Failed to fetch job posting details');
            }
        } catch (err) {
            setError('Error fetching job posting: ' + err.message);
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = sessionStorage.getItem('adminToken');
            
            // Filter out empty strings from arrays
            const submitData = {
                ...formData,
                requirements: formData.requirements.filter(req => req.trim() !== ''),
                responsibilities: formData.responsibilities.filter(resp => resp.trim() !== ''),
                benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
                tags: formData.tags.filter(tag => tag.trim() !== '')
            };

            const response = await fetch(`${baseUrl}/api/careers/updateCareer/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(submitData)
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message and redirect
                alert('Job posting updated successfully!');
                navigate('/admin/careers');
            } else {
                setError(data.message || 'Failed to update job posting');
            }
        } catch (err) {
            setError('Error updating job posting: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayInputChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayField = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayField = (field, index) => {
        if (formData[field].length > 1) {
            setFormData(prev => ({
                ...prev,
                [field]: prev[field].filter((_, i) => i !== index)
            }));
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            navigate('/admin/careers');
        }
    };

    if (fetchLoading) {
        return (
            <div className="edit-career">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading job posting details...</p>
                </div>
            </div>
        );
    }

    if (error && !career) {
        return (
            <div className="edit-career">
                <div className="alert alert-danger text-center">
                    {error}
                    <button 
                        className="btn btn-outline-secondary ms-3"
                        onClick={() => navigate('/admin/careers')}
                    >
                        Back to Career Management
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-career">
            <div className="page-header d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Edit Job Posting</h2>
                    <p>Update the job posting details</p>
                </div>
                <button
                    className="btn btn-outline-secondary"
                    onClick={handleCancel}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>

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

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <h5 className="section-title mb-3">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Basic Information
                                </h5>
                            </div>
                            
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Job Title *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g., Senior Full Stack Developer"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Company *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g., Tech Solutions Inc."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Location *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g., New York, NY"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Employment Type</label>
                                    <select
                                        className="form-select"
                                        name="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="full-time">Full Time</option>
                                        <option value="part-time">Part Time</option>
                                        <option value="contract">Contract</option>
                                        <option value="internship">Internship</option>
                                        <option value="remote">Remote</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Experience Level</label>
                                    <select
                                        className="form-select"
                                        name="experienceLevel"
                                        value={formData.experienceLevel}
                                        onChange={handleInputChange}
                                    >
                                        <option value="entry">Entry Level</option>
                                        <option value="mid">Mid Level</option>
                                        <option value="senior">Senior Level</option>
                                        <option value="executive">Executive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Technology">Technology</option>
                                        <option value="Business">Business</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Design">Design</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Education">Education</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Salary</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleInputChange}
                                        placeholder="e.g., $90,000 - $120,000"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="mb-4">
                            <h5 className="section-title mb-3">
                                <i className="bi bi-file-text me-2"></i>
                                Job Description
                            </h5>
                            <div className="mb-3">
                                <label className="form-label">Description *</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="6"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Describe the job role, responsibilities, and what you're looking for in a candidate..."
                                />
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="mb-4">
                            <h5 className="section-title mb-3">
                                <i className="bi bi-card-checklist me-2"></i>
                                Requirements
                            </h5>
                            {formData.requirements.map((requirement, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={requirement}
                                        onChange={(e) => handleArrayInputChange(index, 'requirements', e.target.value)}
                                        placeholder="e.g., Bachelor's degree in Computer Science"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => removeArrayField('requirements', index)}
                                        disabled={formData.requirements.length === 1}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => addArrayField('requirements')}
                            >
                                <i className="bi bi-plus me-1"></i>
                                Add Requirement
                            </button>
                        </div>

                        {/* Responsibilities */}
                        <div className="mb-4">
                            <h5 className="section-title mb-3">
                                <i className="bi bi-list-task me-2"></i>
                                Responsibilities
                            </h5>
                            {formData.responsibilities.map((responsibility, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={responsibility}
                                        onChange={(e) => handleArrayInputChange(index, 'responsibilities', e.target.value)}
                                        placeholder="e.g., Develop and maintain web applications"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => removeArrayField('responsibilities', index)}
                                        disabled={formData.responsibilities.length === 1}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => addArrayField('responsibilities')}
                            >
                                <i className="bi bi-plus me-1"></i>
                                Add Responsibility
                            </button>
                        </div>

                        {/* Benefits */}
                        <div className="mb-4">
                            <h5 className="section-title mb-3">
                                <i className="bi bi-gift me-2"></i>
                                Benefits & Perks
                            </h5>
                            {formData.benefits.map((benefit, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={benefit}
                                        onChange={(e) => handleArrayInputChange(index, 'benefits', e.target.value)}
                                        placeholder="e.g., Health insurance, Flexible hours"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => removeArrayField('benefits', index)}
                                        disabled={formData.benefits.length === 1}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => addArrayField('benefits')}
                            >
                                <i className="bi bi-plus me-1"></i>
                                Add Benefit
                            </button>
                        </div>

                        {/* Application Details */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <h5 className="section-title mb-3">
                                    <i className="bi bi-send me-2"></i>
                                    Application Details
                                </h5>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Application Link</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        name="applicationLink"
                                        value={formData.applicationLink}
                                        onChange={handleInputChange}
                                        placeholder="https://company.com/careers/apply"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Application Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="applicationEmail"
                                        value={formData.applicationEmail}
                                        onChange={handleInputChange}
                                        placeholder="careers@company.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Application Deadline</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <div className="form-check form-switch mt-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="isActive"
                                            checked={formData.isActive}
                                            onChange={handleInputChange}
                                            id="isActiveSwitch"
                                        />
                                        <label className="form-check-label" htmlFor="isActiveSwitch">
                                            {formData.isActive ? 'Active' : 'Inactive'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-4">
                            <h5 className="section-title mb-3">
                                <i className="bi bi-tags me-2"></i>
                                Skills & Technologies
                            </h5>
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={tag}
                                        onChange={(e) => handleArrayInputChange(index, 'tags', e.target.value)}
                                        placeholder="e.g., React, Node.js, MongoDB"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => removeArrayField('tags', index)}
                                        disabled={formData.tags.length === 1}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => addArrayField('tags')}
                            >
                                <i className="bi bi-plus me-1"></i>
                                Add Tag
                            </button>
                        </div>

                        {/* Submit Buttons */}
                        <div className="d-flex gap-2 justify-content-end pt-4 border-top">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Updating...
                                    </>
                                ) : (
                                    'Update Job Posting'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCareers;