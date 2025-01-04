import React, { useState } from "react";
import "./Services.css";

function Services() {
    const services = [
        {
            name: "Braces",
            description: "Straighten teeth and improve bite alignment.",
            time: "1-2 hours",
        },
        {
            name: "Teeth Whitening",
            description: "Brighten your smile with professional whitening.",
            time: "30-60 minutes",
        },
        {
            name: "Dental Implants",
            description: "Replace missing teeth with durable implants.",
            time: "1-2 hours per implant",
        },
        {
            name: "Root Canal Treatment",
            description: "Save an infected or decayed tooth.",
            time: "60-90 minutes",
        },
        {
            name: "Regular Checkups",
            description: "Routine examination and cleaning.",
            time: "30-45 minutes",
        },
        {
            name: "Cosmetic Dentistry",
            description: "Enhance the appearance of your teeth.",
            time: "Varies depending on procedure",
        },
        {
            name: "Oral Surgery",
            description: "Surgical procedures for dental health.",
            time: "Varies",
        },
        {
            name: "Periodontal Therapy",
            description: "Treat gum disease and improve oral health.",
            time: "45-90 minutes",
        },
        {
            name: "Crowns & Bridges",
            description: "Restore teeth with durable crowns and bridges.",
            time: "1-2 hours",
        },
        {
            name: "Fillings",
            description: "Repair cavities with composite or amalgam fillings.",
            time: "20-60 minutes",
        },
    ];

    const [selectedService, setSelectedService] = useState(null);

    const openModal = (service) => {
        setSelectedService(service);
    };

    const closeModal = () => {
        setSelectedService(null);
    };

    return (
        <div className="services-container">
            <h1>Our Services</h1>
            <div className="services-grid-wrapper">
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-item"
                            onClick={() => openModal(service)}
                        >
                            {service.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedService && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedService.name}</h2>
                        <p>{selectedService.description}</p>
                        <p>
                            <strong>Estimated Time:</strong>{" "}
                            {selectedService.time}
                        </p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Services;
