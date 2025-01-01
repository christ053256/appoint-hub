import React from "react";
import "./Services.css";

function Services() {
    return (
        <div className="services-container">
            <h1>Our Services</h1>
            <div className="services-grid">
                <div className="service-item">Braces</div>
                <div className="service-item">Teeth Whitening</div>
                <div className="service-item">Dental Implants</div>
                <div className="service-item">Root Canal Treatment</div>
                <div className="service-item">Regular Checkups</div>
                <div className="service-item">Cosmetic Dentistry</div>
                <div className="service-item">Oral Surgery</div>
                <div className="service-item">Periodontal Therapy</div>
                <div className="service-item">Pediatric Dentistry</div>
                <div className="service-item">Crowns & Bridges</div>
                <div className="service-item">Fillings</div>
                <div className="service-item">Emergency Dentistry</div>
            </div>
        </div>
    );
}

export default Services;
