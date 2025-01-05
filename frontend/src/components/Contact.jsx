import React, { useState } from "react";
import "./Contact.css";
import logo from "../assets/logo.png";
import ss2 from "../assets/ss2.png";
import ss1 from "../assets/ss1.png"; // The modal image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

function Contact() {
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <div className="contact-logo"></div>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <h3>Clinic Information</h3>
                    <p>
                        <strong>Clinic:</strong> 8Care Dental Clinic
                    </p>
                    <p>
                        <strong>Dentist:</strong> Dr. Jenn Andrea Y. Tan
                    </p>
                    <p>
                        <strong>Operating Hours:</strong> 8:00 AM - 5:00 PM
                        (Monday to Friday)
                    </p>
                    <p>
                        <strong>Branches:</strong> Butuan and Gingoog
                    </p>

                    <h3>Contact Us</h3>
                    <p>
                        <FontAwesomeIcon icon={faPhone} />{" "}
                        <strong>Phone:</strong> 0949 991 9363
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faEnvelope} />{" "}
                        <strong>Email:</strong>{" "}
                        <a href="mailto:8caredentalclinic@gmail.com">
                            8caredentalclinic@gmail.com
                        </a>
                    </p>

                    <h3>Location</h3>
                    <p>
                        <strong>Butuan Branch:</strong> A.D. Curato St., In
                        front of Butuan Central Elementary School and beside H
                        LHUILLIER Pawnshop, Brgy. Silongan, Butuan City
                    </p>
                    <p>
                        <strong>Gingoog Branch:</strong> Coming soon – Stay
                        tuned for updates!
                    </p>
                </div>

                <div className="contact-map">
                    <p>
                        {" "}
                        <strong>8Care Dental Clinic Location on Red Dot</strong>
                    </p>

                    <img
                        src={ss2}
                        alt="Google Map"
                        className="contact-map-img"
                        onClick={handleImageClick}
                    />
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img
                            src={ss1}
                            alt="Modal Image"
                            className="modal-image"
                        />
                        <button
                            className="close-modal"
                            onClick={handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact;
