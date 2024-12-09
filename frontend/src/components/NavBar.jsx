import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/logo.png";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleModal = () => {
        setShowModal(!showModal); // Toggle modal visibility
    };

    return (
        <div className="navbar">
            <nav className="navbar-container">
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-img" />
                    <span className="logo-e">8</span>
                    <span className="logo-care">Care</span>
                </div>
                <div
                    className="navbar-hamburger"
                    id="hamburger"
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div
                    className={`nav-buttons ${menuOpen ? "show" : ""}`}
                    id="menu"
                >
                    <ul>
                        <li>
                            <NavLink to="/" onClick={() => setMenuOpen(false)}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                onClick={() => setMenuOpen(false)}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                onClick={() => setMenuOpen(false)}
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <button className="admin" onClick={toggleModal}>
                                Admin
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Admin Login Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button className="close-button" onClick={toggleModal}>
                            X
                        </button>
                        <h2>Admin Login</h2>
                        <form className="login-form">
                            <div className="form-group">
                                <label htmlFor="admin-username">Username</label>
                                <input
                                    type="text"
                                    id="admin-username"
                                    name="username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="admin-password">Password</label>
                                <input
                                    type="password"
                                    id="admin-password"
                                    name="password"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBar;
