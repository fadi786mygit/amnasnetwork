// components/Services.js
import React from 'react';
import '../Services.css';

const Services = () => {
    const services = [
        {
            id: 1,
            title: "Account Manager",
            description: "Professional account management services to handle your business accounts efficiently and accurately.",
            icon: "📊"
        },
        {
            id: 2,
            title: "Website Development",
            description: "Custom website development services to create responsive, user-friendly, and modern websites.",
            icon: "🌐"
        },
        {
            id: 3,
            title: "SEO Services",
            description: "Search Engine Optimization to improve your website's visibility and ranking on search engines.",
            icon: "🔍"
        },
        {
            id: 4,
            title: "Video & Photo Editing",
            description: "Professional editing services for videos and photos to enhance your visual content.",
            icon: "🎬"
        },
        {
            id: 5,
            title: "Typing Services",
            description: "Accurate Urdu and English typing services for documents, content, and various projects.",
            icon: "⌨️"
        },
        {
            id: 6,
            title: "Assignment Maker",
            description: "Professional assignment writing and preparation services for students and professionals.",
            icon: "📝"
        },
        {
            id: 7,
            title: "Presentation Maker",
            description: "Creative and professional presentation design services for business and academic purposes.",
            icon: "📊"
        },
        {
            id: 8,
            title: "Content Writing",
            description: "Comprehensive content writing services for all types of content including blogs, articles, and more.",
            icon: "✍️"
        },
        {
            id: 9,
            title: "Advertising Services",
            description: "Effective advertising campaigns and strategies to promote your business and products.",
            icon: "📢"
        },
        {
            id: 10,
            title: "Graphic Design",
            description: "Creative graphic design services including logos, banners, and marketing materials.",
            icon: "🎨"
        }
    ];

    return (
        <div className="services-page">
            <div className="services-hero">
                <div className="services-container">
                    <div className="services-header">
                        <h1 className="services-title">Amna's Network</h1>
                        <p className="services-subtitle">Business Consultant + Software House</p>
                        <div className="services-divider"></div>
                        <p className="services-tagline">Your One-Stop Solution for Business Growth and Digital Excellence</p>
                    </div>
                </div>
            </div>

            <div className="services-content">
                <div className="services-container">
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={service.id} className="service-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <div className="service-number">{index + 1}</div>
                            </div>
                        ))}
                    </div>

                    <div className="contact-section">
                        <div className="contact-info">
                            <h2>Get In Touch</h2>
                            <div className="contact-details">
                                <div className="contact-item">
                                    <span className="contact-icon">📞</span>
                                    <div>
                                        <h4>Phone</h4>
                                        <a href="tel:+923227544521" className="contact-link">+92 322 7544521</a>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <span className="contact-icon">📧</span>
                                    <div>
                                        <h4>Email</h4>
                                        <a href="mailto:amnasnetwork143@gmail.com" className="contact-link">amnasnetwork143@gmail.com</a>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <span className="contact-icon">📍</span>
                                    <div>
                                        <h4>Address</h4>
                                        <p>Asif Town Rafi Qamar Road Street No 02<br />Infront Jamia Abdullah</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="map-section">
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.715678779722!2d71.715354275336!3d29.396594475387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b910019112c51%3A0x6da0b8bb6c834a9a!2sAmna's%20Network%20Business%20Consultant%20Software%20House!5e1!3m2!1sen!2s!4v1739279999999!5m2!1sen!2s"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0, borderRadius: '15px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Amna's Network Location"
                                    className="google-map"
                                ></iframe>
                                <div className="map-overlay mt-3">
                                    <a
                                        href="https://www.google.com/maps/place/Amna's+Network+Business+Consultant+Software+House/@29.3965945,71.7179429,701m/data=!3m2!1e3!4b1!4m6!3m5!1s0x393b910019112c51:0x6da0b8bb6c834a9a!8m2!3d29.3965945!4d71.7179429!16s%2Fg%2F11xlkdg0tx?hl=en&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="directions-btn "
                                    >
                                        Open in Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;