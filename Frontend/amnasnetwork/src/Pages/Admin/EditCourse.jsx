// src/pages/Admin/EditCourse.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '.././../EditCourse.css';

const EditCourse = () => {
    const [course, setCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        category: 'General',
        level: 'beginner',
        price: '',
        thumbnail: ''
    });
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const courseId = id; // Optional alias if you want to keep the rest of your code same


    useEffect(() => {
        // Check if courseId is valid before making the API call
        if (courseId && courseId !== 'undefined') {
            fetchCourse();
        } else {
            setError('Invalid course ID');
        }
    }, [courseId]);

    const fetchCourse = async () => {
        setLoading(true);
        setError('');

        try {
            const token = sessionStorage.getItem('adminToken');

            // Validate courseId before making the request
            if (!courseId || courseId === 'undefined') {
                throw new Error('Invalid course ID');
            }

            const response = await fetch(`http://localhost:8082/api/courses/getCourse/${courseId}`, {
                method: 'GET', // Move method outside of headers
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Fetch course response status:', response.status);
            const data = await response.json();

            if (response.ok) {
                setCourse(data.data);
                setFormData({
                    title: data.data.title || '',
                    description: data.data.description || '',
                    instructor: data.data.instructor || '',
                    category: data.data.category || 'General',
                    level: data.data.level || 'beginner',
                    price: data.data.price || '',
                    thumbnail: data.data.thumbnail || ''
                });
            } else {
                setError(data.message || 'Failed to fetch course details');
            }
        } catch (err) {
            setError(err.message || 'Error fetching course: ' + err.message);
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
            const response = await fetch(`http://localhost:8082/api/courses/updateCourse/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/admin/courses');
            } else {
                setError(data.message || 'Failed to update course');
            }
        } catch (err) {
            setError('Error updating course: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancel = () => {
        navigate('/admin/courses');
    };

    // Check if courseId is invalid
    if (!courseId || courseId === 'undefined') {
        return (
            <div className="edit-course">
                <div className="alert alert-danger">
                    <h4>Invalid Course</h4>
                    <p>No course ID provided. Please select a valid course to edit.</p>
                    <button className="btn btn-primary" onClick={handleCancel}>
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    if (loading && !course) {
        return (
            <div className="edit-course">
                <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading course details...</p>
                </div>
            </div>
        );
    }

    if (error && !course) {
        return (
            <div className="edit-course">
                <div className="alert alert-danger">
                    <h4>Error Loading Course</h4>
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={handleCancel}>
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    if (!course && !loading) {
        return (
            <div className="edit-course">
                <div className="alert alert-warning">
                    <h4>Course Not Found</h4>
                    <p>The course you're trying to edit doesn't exist or has been deleted.</p>
                    <button className="btn btn-primary" onClick={handleCancel}>
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-course">
            <div className="page-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2>Edit Course</h2>
                        <p>Update course information</p>
                    </div>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleCancel}
                    >
                        Back to Courses
                    </button>
                </div>
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
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Course Title *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Instructor</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="instructor"
                                        value={formData.instructor}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="General">General</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Mobile Development">Mobile Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Business">Business</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Level</label>
                                    <select
                                        className="form-select"
                                        name="level"
                                        value={formData.level}
                                        onChange={handleInputChange}
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Price ($)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description *</label>
                            <textarea
                                className="form-control"
                                name="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Thumbnail URL</label>
                            <input
                                type="url"
                                className="form-control"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
                            />
                            {formData.thumbnail && (
                                <div className="mt-2">
                                    <img
                                        src={formData.thumbnail}
                                        alt="Course thumbnail"
                                        className="thumbnail-preview"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Course'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCourse;