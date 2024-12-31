import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import logo from "../assets/logo.png";
import FirebaseConfig from "./firebaseConfig/firebaseConfig.js";
import { ref, get, child, onValue } from "firebase/database";
import { confirmAppointment, rejectAppointment } from "../firebase";

function Dashboard() {
    const database = FirebaseConfig();
    const [appointments, setAppointments] = useState([]);
    const [confirmedAppts, setConfirmedAppts] = useState([]);
    const [rejectedAppts, setRejectedAppts] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const appointmentsRef = ref(database, 'appointments');
        const confirmedRef = ref(database, 'confirmed');
        const rejectedRef = ref(database, 'rejected');
        
        const unsubscribeAppointments = onValue(appointmentsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const appointmentsList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));

                const sortedAppointments = appointmentsList.sort((a, b) => {
                    const dateA = new Date(a.appointDate);
                    const dateB = new Date(b.appointDate);
                    return dateA - dateB;
                });

                setAppointments(sortedAppointments);
            }
        });

        const unsubscribeConfirmed = onValue(confirmedRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const confirmedList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));
                setConfirmedAppts(confirmedList);
            } else {
                setConfirmedAppts([]);
            }
        });

        const unsubscribeRejected = onValue(rejectedRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const rejectedList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));
                setRejectedAppts(rejectedList);
            } else {
                setRejectedAppts([]);
            }
        });

        return () => {
            unsubscribeAppointments();
            unsubscribeConfirmed();
            unsubscribeRejected();
        };
    }, [database]);

    const getFilteredAppointments = () => {
        switch(activeFilter) {
            case 'confirmed':
                return confirmedAppts;
            case 'rejected':
                return rejectedAppts;
            case 'pending':
                return appointments.filter(app => 
                    !confirmedAppts.find(c => c.id === app.id) && 
                    !rejectedAppts.find(r => r.id === app.id)
                );
            default:
                return appointments;
        }
    };

    const handleConfirmed = async (appointment) => {
        try {
            await confirmAppointment(appointment);
        } catch (error) {
            console.error("Error confirming appointment:", error);
            alert('Failed to confirm appointment. Please try again.');
        }
    };

    const handleRejected = async (appointment) => {
        try {
            await rejectAppointment(appointment);
        } catch (error) {
            console.error("Error rejecting appointment:", error);
            alert('Failed to reject appointment. Please try again.');
        }
    };

    // Function to render action buttons based on filter
    const renderActionButtons = () => {
        if (activeFilter === 'confirmed' || activeFilter === 'rejected') {
            return <td className="confirmation-button">Status: {activeFilter}</td>;
        }

        return (
            <td className="confirmation-button">
                <button 
                    className="confirm-btn"
                    onClick={() => handleConfirmed(appointment)}
                >
                    Confirm
                </button>
                <button 
                    className="reject-btn"
                    onClick={() => handleRejected(appointment)}
                >
                    Reject
                </button>
            </td>
        );
    };

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
                    <button onClick={() => setActiveFilter('all')}>
                        All
                    </button>
                    <button onClick={() => setActiveFilter('confirmed')}>
                        Confirmed
                    </button>
                    <button onClick={() => setActiveFilter('rejected')}>
                        Rejected
                    </button>
                    <button onClick={() => setActiveFilter('pending')}>
                        Pending
                    </button>
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
                            {getFilteredAppointments().map((appointment) => (
                                <tr
                                    key={appointment.id}
                                    className="appointment-list"
                                >
                                    <td>{`${appointment.first_name} ${appointment.middle_name} ${appointment.last_name}`}</td>
                                    <td>{appointment.appointDate}</td>
                                    {activeFilter === 'confirmed' ? (
                                        <td className="confirmation-button">Confirmed</td>
                                    ) : activeFilter === 'rejected' ? (
                                        <td className="confirmation-button">Rejected</td>
                                    ) : (
                                        <td className="confirmation-button">
                                            <button 
                                                className="confirm-btn"
                                                onClick={() => handleConfirmed(appointment)}
                                            >
                                                Confirm
                                            </button>
                                            <button 
                                                className="reject-btn"
                                                onClick={() => handleRejected(appointment)}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    )}
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