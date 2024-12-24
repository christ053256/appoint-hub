import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import logo from "../assets/logo.png";
import FirebaseConfig from "./firebaseConfig/firebaseConfig.js";
import { ref, get, child } from "firebase/database";

function Dashboard() {
    const database = FirebaseConfig();
    const [appointments, setAppointments] = useState([]);

    // Fetch data from Firebase when component mounts
    useEffect(() => {
        const fetch_data = () => {
            const dbref = ref(database);
    
            get(child(dbref, 'appointments')).then(snapshot => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Map through the appointments and store them in the state
                    const appointmentsList = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
    
                    // Sort appointments by appointDate (closest to current date)
                    const sortedAppointments = appointmentsList.sort((a, b) => {
                        const dateA = new Date(a.appointDate); // Assuming appointDate is a string
                        const dateB = new Date(b.appointDate);
                        return dateA - dateB; // Ascending order
                    });
    
                    setAppointments(sortedAppointments);
                }
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
        };
    
        fetch_data();
    }, [database]);
    

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
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{`${appointment.first_name} ${appointment.middle_name} ${appointment.last_name}`}</td>
                                    <td>{appointment.appointDate}</td>
                                    <td>
                                        <button>Confirm</button>
                                        <button>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
