import React from "react";
import "./Dashboard.css";
import logo from "../assets/logo.png";

function Dashboard() {
    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <img src={logo} alt="logo" className="logo-img" />
                <span className="logo-e">8</span>
                <span className="logo-care">Care</span>
            </nav>
            <div className="dashboard-contents">
                <div className="dashboard-background"></div>
                <div className="dashboard-buttons">
                    <button>All</button>
                    <button>Confirmed</button>
                    <button>Rejected</button>
                    <button>Pending</button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
