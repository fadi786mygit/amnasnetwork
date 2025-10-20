// src/pages/Payment/PaymentDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../Payment.css';
import qrcode from '../Components/Images/qrcode.jpg';

const PaymentDetails = () => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('bank'); // 'bank' or 'qr'
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Get course data from navigation state or fetch it
    const courseFromState = location.state?.course;

    // Bank account details
    const bankDetails = {
        bankName: "Meezan Bank",
        accountTitle: "Amna's Network",
        accountNumber: "22020112476003",
        branch: "Bahwalpur"
    };

    // WhatsApp details
    const whatsappNumber = "923227544521";

    useEffect(() => {
        if (courseFromState) {
            setCourse(courseFromState);
            setLoading(false);
        } else {
            fetchCourse();
        }
    }, [id, courseFromState]);

    const fetchCourse = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8082/api/courses/getCourse/${id}`);

            if (response.ok) {
                const data = await response.json();
                setCourse(data.data);
            } else {
                console.error('Failed to fetch course details');
                navigate('/courses');
            }
        } catch (err) {
            console.error('Error fetching course: ' + err.message);
            navigate('/courses');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentConfirm = () => {
        // You can add logic here to track the enrollment
        alert('Thank you! Please complete the payment and send the screenshot to our WhatsApp for confirmation.');
        // Optionally navigate back to course detail or courses page
        // navigate(`/courses/${id}`);
    };

    const openWhatsApp = () => {
        const message = encodeURIComponent(
            `Payment Confirmation for ${course?.title} - Amount: Rs ${course?.price}\n` +
            `Transaction ID: [Please provide your transaction ID]`
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const formatPrice = (price) => {
        return price === 0 ? 'Free' : `Rs ${price}`;
    };

    if (loading) {
        return (
            <div className="payment-container">
                <div className="container">
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading payment details...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="payment-container">
                <div className="container">
                    <div className="alert alert-danger text-center">
                        Course not found
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
        <div className="payment-container mt-3">
            <div className="container py-5">
                {/* Header Section */}
                <div className="text-center mb-5">
                    <button
                        className="btn btn-outline-primary mb-3"
                        onClick={() => navigate(`/courses/${id}`)}
                    >
                        ← Back to Course
                    </button>
                    <h1 className="display-5 fw-bold text-primary">Complete Your Enrollment</h1>
                    <p className="lead">Secure your spot in this course by completing the payment</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {/* Course Summary Card */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        {course.thumbnail && (
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="img-fluid rounded"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/200x120/4A90E2/FFFFFF?text=Course+Image';
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <h4 className="fw-bold">{course.title}</h4>
                                        {course.instructor && (
                                            <p className="text-muted mb-1">
                                                <i className="bi bi-person me-2"></i>
                                                Instructor: {course.instructor}
                                            </p>
                                        )}
                                        <span className={`badge ${course.level === 'beginner' ? 'badge-beginner' : course.level === 'intermediate' ? 'badge-intermediate' : 'badge-advanced'} me-2`}>
                                            {course.level}
                                        </span>
                                        <span className="badge bg-light text-dark">
                                            {course.category}
                                        </span>
                                    </div>
                                    <div className="col-md-3 text-end">
                                        <div className="course-price display-6 fw-bold text-primary">
                                            {formatPrice(course.price)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Section */}
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">
                                    <i className="bi bi-credit-card me-2"></i>
                                    Payment Method
                                </h4>
                            </div>
                            <div className="card-body">
                                {/* Payment Method Tabs */}
                                <div className="mb-4">
                                    <ul className="nav nav-pills nav-justified" role="tablist">
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${paymentMethod === 'bank' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('bank')}
                                            >
                                                <i className="bi bi-bank me-2"></i>
                                                Bank Transfer
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${paymentMethod === 'qr' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('qr')}
                                            >
                                                <i className="bi bi-qr-code me-2"></i>
                                                QR Code
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                {/* Bank Transfer Details */}
                                {paymentMethod === 'bank' && (
                                    <div className="bank-details">
                                        <div className="alert alert-info">
                                            <h6><i className="bi bi-info-circle me-2"></i>Payment Instructions</h6>
                                            <p className="mb-0">Transfer the course fee to our bank account and send the transaction screenshot to our WhatsApp for confirmation.</p>
                                        </div>

                                        <div className="card mb-4">
                                            <div className="card-header bg-light">
                                                <h6 className="mb-0">Bank Account Details</h6>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label fw-bold">Bank Name</label>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <span>{bankDetails.bankName}</span>
                                                                <button
                                                                    className="btn btn-sm btn-outline-secondary"
                                                                    onClick={() => copyToClipboard(bankDetails.bankName)}
                                                                >
                                                                    <i className="bi bi-copy"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fw-bold">Account Title</label>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <span>{bankDetails.accountTitle}</span>
                                                                <button
                                                                    className="btn btn-sm btn-outline-secondary"
                                                                    onClick={() => copyToClipboard(bankDetails.accountTitle)}
                                                                >
                                                                    <i className="bi bi-copy"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fw-bold">Account Number</label>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <span className="text-primary fw-bold">{bankDetails.accountNumber}</span>
                                                                <button
                                                                    className="btn btn-sm btn-outline-secondary"
                                                                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                                                                >
                                                                    <i className="bi bi-copy"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">

                                                        <div className="mb-3">
                                                            <label className="form-label fw-bold">Branch</label>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <span>{bankDetails.branch}</span>
                                                                <button
                                                                    className="btn btn-sm btn-outline-secondary"
                                                                    onClick={() => copyToClipboard(bankDetails.branch)}
                                                                >
                                                                    <i className="bi bi-copy"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* QR Code Payment */}
                                {paymentMethod === 'qr' && (
                                    <div className="qr-payment">
                                        <div className="alert alert-info">
                                            <h6><i className="bi bi-info-circle me-2"></i>QR Code Payment</h6>
                                            <p className="mb-0">Scan the QR code with your mobile banking app to make the payment.</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="qr-code-container mb-4">
                                                {/* Use the imported QR code image properly */}
                                                <img
                                                    src={qrcode}
                                                    alt="QR Code for Payment"
                                                    className="img-fluid rounded border"
                                                    style={{ maxWidth: '300px', height: 'auto' }}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=QR+Code+Not+Found';
                                                    }}
                                                />
                                            </div>
                                            <p className="text-muted">
                                                Scan this QR code with your bank's mobile app to pay <strong>{formatPrice(course.price)}</strong>
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {/* WhatsApp Confirmation Section */}
                                <div className="whatsapp-section mt-4 p-4 bg-light rounded">
                                    <h5 className="text-center mb-3 text-success">
                                        <i className="bi bi-whatsapp me-2"></i>
                                        Confirmation Required
                                    </h5>
                                    <p className="text-center mb-3">
                                        After making the payment, please send the transaction screenshot to our WhatsApp number for enrollment confirmation.
                                    </p>
                                    <div className="text-center">
                                        <button
                                            className="btn btn-success btn-lg"
                                            onClick={openWhatsApp}
                                        >
                                            <i className="bi bi-whatsapp me-2"></i>
                                            Send Screenshot on WhatsApp
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary w-100"
                                            onClick={() => navigate(`/courses/${id}`)}
                                        >
                                            Back to Course
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            className="btn btn-primary w-100"
                                            onClick={handlePaymentConfirm}
                                        >
                                            I Have Made the Payment
                                        </button>
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

export default PaymentDetails;