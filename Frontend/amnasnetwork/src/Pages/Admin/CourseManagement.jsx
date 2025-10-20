// src/pages/Admin/CourseManagement.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '.././../CourseManagement.css';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        category: 'General',
        level: 'beginner',
        price: '',
        thumbnail: ''
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch('http://localhost:8082/api/courses/getCourses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch('http://localhost:8082/api/courses/createCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setCourses([data.data, ...courses]);
                setFormData({
                    title: '',
                    description: '',
                    instructor: '',
                    category: 'General',
                    level: 'beginner',
                    price: '',
                    thumbnail: ''
                });
                setShowForm(false);
            } else {
                setError(data.message || 'Failed to create course');
            }
        } catch (err) {
            setError('Error creating course: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course?')) {
            return;
        }

        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:8082/api/courses/deleteCourse/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setCourses(courses.filter(course => course._id !== courseId));
            } else {
                setError('Failed to delete course');
            }
        } catch (err) {
            setError('Error deleting course: ' + err.message);
        }
    };

    const handleEdit = (courseId) => {
        navigate(`/admin/courses/edit/${courseId}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="course-management">
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h2>Course Management</h2>
                    <p>Manage all courses in the platform</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Add New Course'}
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
                            <h5 className="mb-0">Add New Course</h5>
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
                                        <label className="form-label">Price (Rs)</label>
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
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Create Course'}
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
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Level</th>
                                        <th>Instructor</th>
                                        <th>Price</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4">
                                                No courses found. Create your first course!
                                            </td>
                                        </tr>
                                    ) : (
                                        courses.map(course => (
                                            <tr key={course._id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {course.thumbnail && (
                                                            <img
                                                                src={course.thumbnail}
                                                                alt={course.title}
                                                                className="course-thumbnail me-2"
                                                            />
                                                        )}
                                                        <div>
                                                            <strong>{course.title}</strong>
                                                            <br />
                                                            <small className="text-muted">
                                                                {course.description.substring(0, 50)}...
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-info">{course.category}</span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${course.level === 'beginner' ? 'bg-success' :
                                                            course.level === 'intermediate' ? 'bg-warning' : 'bg-danger'
                                                        }`}>
                                                        {course.level}
                                                    </span>
                                                </td>
                                                <td>{course.instructor || 'Not specified'}</td>
                                                <td>Rs {course.price}</td>
                                                <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="btn-group btn-group-sm">
                                                        <button
                                                            className="btn btn-outline-primary"
                                                            onClick={() => handleEdit(course._id)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger"
                                                            onClick={() => handleDelete(course._id)}
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

export default CourseManagement;