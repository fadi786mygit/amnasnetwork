// components/AboutUs.js
import React from 'react';
import '../Aboutus.css';
import logo from '../Components/Images/logo.jpg';
import baseUrl from '../baseUrl';

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-container">
                {/* Left Side - Content */}
                <div className="about-content">
                    <h1 className="about-title">About Amna's Network</h1>

                    <div className="about-section">
                        <h2>How We Work</h2>
                        <p>At Amna's Network, we follow a structured approach to deliver exceptional results:</p>
                    </div>

                    <div className="process-steps">
                        <div className="process-step">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h3>Understand the Vision & Mission</h3>
                                <p>Amna's Network focuses on comprehensive business consulting, helping businesses grow, manage, and operate effectively through innovative solutions.</p>
                            </div>
                        </div>

                        <div className="process-step">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h3>Choose Your Role</h3>
                                <p>We offer diverse opportunities in various areas:</p>
                                <ul>
                                    <li><strong>Business Consultant:</strong> Work with clients to improve their strategies, marketing, management, or operations</li>
                                    <li><strong>Trainer/Educator:</strong> Conduct IT, digital marketing, or professional development courses</li>
                                </ul>
                            </div>
                        </div>

                        <div className="process-step">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h3>Daily Tasks & Responsibilities</h3>
                                <ul>
                                    <li>Meeting clients and analyzing their business needs</li>
                                    <li>Creating comprehensive business reports and proposals</li>
                                    <li>Managing digital marketing campaigns</li>
                                    <li>Teaching and mentoring students in training sessions</li>
                                </ul>
                            </div>
                        </div>

                        <div className="process-step">
                            <div className="step-number">4</div>
                            <div className="step-content">
                                <h3>Skills We Value</h3>
                                <div className="skills-grid">
                                    <div className="skill-item">Communication & Teamwork</div>
                                    <div className="skill-item">Problem-solving</div>
                                    <div className="skill-item">Technical Tools (WordPress, Canvas)</div>
                                    <div className="skill-item">Marketing Knowledge</div>
                                    <div className="skill-item">Business Planning</div>
                                    <div className="skill-item">Strategic Thinking</div>
                                </div>
                            </div>
                        </div>

                        <div className="process-step">
                            <div className="step-number">5</div>
                            <div className="step-content">
                                <h3>Grow With the Network</h3>
                                <p>We invest in our team's growth through:</p>
                                <ul>
                                    <li>Regular workshops and training programs</li>
                                    <li>Professional development opportunities</li>
                                    <li>Continuous learning and skill enhancement</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="why-choose-us">
                        <h2>Why Choose Amna's Network?</h2>
                        <div className="value-proposition ">
                            <p className='text-dark'> Amna's Network combines expert business consultancy with cutting-edge software solutions, tailored to drive growth and innovation. With a client-first approach, we ensure reliable support, smart strategies, and measurable success for every project.</p>
                        </div>
                    </div>

                    <div className="team-section ">
                        <h2>Meet Our Team Members</h2>
                        <div className="team-member ">
                            <div className="member-info">
                                <h3>Amna Kousar</h3>
                                <p className="member-role">Owner Of Amna's Network</p>
                                <p className="member-description">With visionary leadership and entrepreneurial spirit, Amna founded and guides Amna's Network towards excellence. Her strategic direction and commitment to innovation ensure the company stays at the forefront of business consulting and digital solutions.</p>              </div>
                        </div>

                        <div className="team-member mt-4">
                            <div className="member-info">
                                <h3>Fatima Shakoor
                                </h3>
                                <p className="member-role">Manager Of Amna's Network</p>
                                <p className="member-description">Fatima excels in operational excellence and team leadership, ensuring smooth day-to-day operations and exceptional client service delivery. Her organizational skills and strategic oversight help translate the company's vision into actionable results.</p>              </div>
                        </div>

                        <div className="team-member mt-4">
                            <div className="member-info">
                                <h3>Asadullah Jan</h3>
                                <p className="member-role">Accountant</p>
                                <p className="member-description">Asadullah brings financial expertise and meticulous attention to detail, managing the company's financial health with precision. His analytical skills and financial acumen ensure sustainable growth and fiscal responsibility across all operations.</p>              </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Logo */}
                <div className="about-logo">
                    <div className="logo-container">
                        <img src={logo} alt="Amna's Network Logo" className="about-logo-image" />
                        <div className="logo-overlay">
                            <h2>Amna's Network</h2>
                            <p>Driving Business Excellence</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;