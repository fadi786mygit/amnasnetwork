// src/pages/Admin/CareerManagement.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '.././../CareerManagement.css';
import baseUrl from '../../baseUrl';

const CareerManagement = () => {
    const [careers, setCareers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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
        tags: ['']
    });

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch(`${baseUrl}/api/careers/getCareers?isActive=true`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCareers(data.data || []);
            } else {
                setError('Failed to fetch job postings');
            }
        } catch (err) {
            setError('Error fetching job postings: ' + err.message);
        } finally {
            setLoading(false);
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

            const response = await fetch(`${baseUrl}/api/careers/createCareer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(submitData)
            });

            const data = await response.json();

            if (response.ok) {
                setCareers([data.data, ...careers]);
                setFormData({
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
                    tags: ['']
                });
                setShowForm(false);
            } else {
                setError(data.message || 'Failed to create job posting');
            }
        } catch (err) {
            setError('Error creating job posting: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (careerId) => {
        if (!window.confirm('Are you sure you want to delete this job posting?')) {
            return;
        }

        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch(`${baseUrl}/api/careers/deleteCareer/${careerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setCareers(careers.filter(career => career._id !== careerId));
            } else {
                setError('Failed to delete job posting');
            }
        } catch (err) {
            setError('Error deleting job posting: ' + err.message);
        }
    };

    const handleEdit = (careerId) => {
        navigate(`/admin/careers/edit/${careerId}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Open until filled';
        return new Date(dateString).toLocaleDateString();
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

    return (
        <div className="career-management">
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h2>Career Management</h2>
                    <p>Manage all job postings on the platform</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Add New Job'}
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

            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">Add New Job Posting</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowForm(false)}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
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

                            <div className="row">
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

                            <div className="row">
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

                            <div className="mb-3">
                                <label className="form-label">Job Description *</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Describe the job role, responsibilities, and what you're looking for in a candidate..."
                                />
                            </div>

                            {/* Requirements */}
                            <div className="mb-3">
                                <label className="form-label">Requirements</label>
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
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => addArrayField('requirements')}
                                >
                                    + Add Requirement
                                </button>
                            </div>

                            {/* Responsibilities */}
                            <div className="mb-3">
                                <label className="form-label">Responsibilities</label>
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
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => addArrayField('responsibilities')}
                                >
                                    + Add Responsibility
                                </button>
                            </div>

                            {/* Benefits */}
                            <div className="mb-3">
                                <label className="form-label">Benefits</label>
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
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => addArrayField('benefits')}
                                >
                                    + Add Benefit
                                </button>
                            </div>

                            <div className="row">
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

                            <div className="row">
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
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Create Job Posting'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowForm(false)}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading && !showForm ? (
                <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th>Company</th>
                                        <th>Location</th>
                                        <th>Type</th>
                                        <th>Level</th>
                                        <th>Category</th>
                                        <th>Deadline</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {careers.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="text-center py-4">
                                                No job postings found. Create your first job posting!
                                            </td>
                                        </tr>
                                    ) : (
                                        careers.map(career => (
                                            <tr key={career._id}>
                                                <td>
                                                    <div>
                                                        <strong>{career.title}</strong>
                                                        <br />
                                                        <small className="text-muted">
                                                            {career.description.substring(0, 50)}...
                                                        </small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <strong>{career.company}</strong>
                                                </td>
                                                <td>{career.location}</td>
                                                <td>
                                                    <span className={`badge ${getEmploymentTypeBadgeClass(career.employmentType)}`}>
                                                        {career.employmentType}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${getExperienceLevelBadgeClass(career.experienceLevel)}`}>
                                                        {career.experienceLevel}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-info">{career.category}</span>
                                                </td>
                                                <td>{formatDate(career.deadline)}</td>
                                                <td>{new Date(career.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="btn-group btn-group-sm">
                                                        <button
                                                            className="btn btn-outline-primary"
                                                            onClick={() => handleEdit(career._id)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger"
                                                            onClick={() => handleDelete(career._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerManagement;