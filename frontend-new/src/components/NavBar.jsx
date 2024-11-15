import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/logo.png";

function NavBar() {
    return (
        <div>
            <nav>
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-img" />
                    <span className="logo-e">8</span>
                    <span className="logo-care">Care</span>
                </div>
                <div className="nav-buttons">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
