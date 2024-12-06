import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/logo.png";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
