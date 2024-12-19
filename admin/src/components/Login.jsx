import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "admin") {
            navigate("/dashboard");
        } else {
            alert("Invalid Credentials. Please Try Again.");
        }
    };

    return (
        <div className="login-container">
            <nav className="admin-nav">
                <img src={logo} alt="logo" className="logo-img" />
                <span className="logo-e">8</span>
                <span className="logo-care">Care</span>
            </nav>
            <div className="admin-form">
                <div className="form-header">
                    {/* <p>8Care</p> */}
                    {/* <p>Dental Clinic</p> */}
                </div>
                <h2>Admin Login</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="admin-username">Username</label>
                        <input
                            type="text"
                            id="admin-username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admin-password">Password</label>
                        <input
                            type="password"
                            id="admin-password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
