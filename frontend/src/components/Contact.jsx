// INSTALL THIS
// npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

import React from "react";
import "./Contact.css";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Contact() {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <div className="contact-logo">
                    <img src={logo} alt="Logo" className="contact-logo-img" />
                    <span className="contact-logo-e">8</span>
                    <span className="contact-logo-care">Care</span>
                </div>
                <p className="contact-clinic">Dental Clinic</p>
            </div>

            <div className="contact-info">
                <p>
                    <strong>Dentist:</strong> Dr. Jenn Andrea Y. Tan
                </p>
                <p>
                    <strong>Operating Hours:</strong> 8:00 AM - 5:00 PM (Monday
                    to Friday)
                </p>
                <p>
                    <strong>Branches:</strong> Butuan and Gingoog
                </p>

                <h3>Contact Us</h3>
                <p>
                    <FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong>{" "}
                    0949 991 9363
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
                    <strong>Butuan Branch:</strong> A.D. Curato St., In front of
                    Butuan Central Elementary School, Brgy. Silongan, Butuan
                    City, Philippines
                </p>
                <p>
                    <strong>Gingoog Branch:</strong> Coming soon – Stay tuned
                    for updates!
                </p>
            </div>
        </div>
    );
}

export default Contact;
