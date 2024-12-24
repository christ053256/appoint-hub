import React from "react";
import "./About.css";

function About() {
    return (
        <div className="home-container">
            <div className="home-left">
                <p className="">
                    <span className="home-d">About Us</span>
                </p>
                <p className="home-p">At 8Care, we are committed to providing exceptional dental care in a comfortable and welcoming environment. Our team of experienced dentist and compassionate staff work together to deliver personalized treatment plans tailored to meet the unique needs of every patient. Whether you're visiting us for routine cleanings, advanced restorative work, or cosmetic enhancements, we prioritize your comfort and satisfaction at every step. Using state-of-the-art technology and the latest techniques, we strive to create healthy, beautiful smiles that last a lifetime. Your oral health is our top priority, and we are dedicated to building long-term relationships with our patients based on trust, respect, and outstanding care.</p>
            </div>
            <div className="home-right">{/* BUTTON FOR ADMIN */}</div>
        </div>
        /*<div className="about-container">
            <div>
                <h1>About Us</h1>
                <p>
                    At 8Care, we are committed to providing exceptional dental care in a comfortable and welcoming environment. Our team of experienced dentist and compassionate staff work together to deliver personalized treatment plans tailored to meet the unique needs of every patient. Whether you're visiting us for routine cleanings, advanced restorative work, or cosmetic enhancements, we prioritize your comfort and satisfaction at every step. Using state-of-the-art technology and the latest techniques, we strive to create healthy, beautiful smiles that last a lifetime. Your oral health is our top priority, and we are dedicated to building long-term relationships with our patients based on trust, respect, and outstanding care.
                </p>
            </div>
        </div>*/
    );
}

export default About;

