import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import logo from "../assets/logo.png";
import FirebaseConfig from "./firebaseConfig/firebaseConfig.js";
import { ref, onValue } from "firebase/database";
import {
    confirmAppointment,
    rejectAppointment,
    completeAppointment,
    failedAppointment,
} from "../firebase";

function Dashboard() {
    const database = FirebaseConfig();
    const [appointments, setAppointments] = useState([]);
    const [confirmedAppts, setConfirmedAppts] = useState([]);
    const [rejectedAppts, setRejectedAppts] = useState([]);
    const [completedAppts, setCompletedAppts] = useState([]);
    const [failedAppts, setFailedAppts] = useState([]);
    const [activeFilter, setActiveFilter] = useState("appointments");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handlePastAppointments = async (appointments) => {
            const currentDate = new Date();
            const pastAppointments = appointments.filter((app) => {
                const appointmentDate = new Date(app.appointDate);
                return (
                    appointmentDate < currentDate &&
                    !confirmedAppts.some((c) => c.id === app.id) &&
                    !rejectedAppts.some((r) => r.id === app.id)
                );
            });

            for (const appointment of pastAppointments) {
                await rejectAppointment(appointment);
            }
        };

        const refs = {
            appointments: ref(database, "appointments"),
            confirmed: ref(database, "confirmed"),
            rejected: ref(database, "rejected"),
            completed: ref(database, "completed"),
            failed: ref(database, "failed"),
        };

        const unsubscribers = {};

        Object.entries(refs).forEach(([key, reference]) => {
            unsubscribers[key] = onValue(
                reference,
                (snapshot) => {
                    const data = snapshot.exists() ? snapshot.val() : {};
                    const list = Object.entries(data).map(([id, values]) => ({
                        id,
                        ...values,
                    }));

                    switch (key) {
                        case "appointments":
                            const sortedList = list.sort(
                                (a, b) =>
                                    new Date(a.appointDate) -
                                    new Date(b.appointDate)
                            );
                            setAppointments(sortedList);
                            handlePastAppointments(sortedList);
                            break;
                        case "confirmed":
                            setConfirmedAppts(list);
                            break;
                        case "rejected":
                            setRejectedAppts(list);
                            break;
                        case "completed":
                            setCompletedAppts(list);
                            break;
                        case "failed":
                            setFailedAppts(list);
                            break;
                    }
                    setIsLoading(false);
                },
                (error) => {
                    console.error(`Error fetching ${key}:`, error);
                    setIsLoading(false);
                }
            );
        });

        return () => {
            Object.values(unsubscribers).forEach((unsubscribe) =>
                unsubscribe()
            );
        };
    }, [database, confirmedAppts, rejectedAppts]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getFilteredAppointments = () => {
        switch (activeFilter) {
            case "confirmed":
                return confirmedAppts;
            case "rejected":
                return rejectedAppts;
            case "completed":
                return completedAppts;
            case "failed":
                return failedAppts;
            default:
                return appointments;
        }
    };

    const handleAppointmentAction = async (appointment, action) => {
        try {
            setIsLoading(true);
            switch (action) {
                case "confirm":
                    await confirmAppointment(appointment);
                    break;
                case "reject":
                    await rejectAppointment(appointment);
                    break;
                case "complete":
                    await completeAppointment(appointment);
                    break;
                case "fail":
                    await failedAppointment(appointment);
                    break;
            }
        } catch (error) {
            console.error(`Error ${action}ing appointment:`, error);
            alert(`Failed to ${action} appointment. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };

    const renderActionButtons = (appointment) => {
        switch (activeFilter) {
            case "confirmed":
                return (
                    <>
                        <button
                            className="confirm-btn"
                            onClick={() =>
                                handleAppointmentAction(appointment, "complete")
                            }
                            disabled={isLoading}
                        >
                            Complete
                        </button>
                        <button
                            className="reject-btn"
                            onClick={() =>
                                handleAppointmentAction(appointment, "fail")
                            }
                            disabled={isLoading}
                        >
                            Failed
                        </button>
                    </>
                );
            case "completed":
                return "Completed";
            case "failed":
                return "Failed";
            case "rejected":
                return "Rejected";
            default:
                return (
                    <>
                        <button
                            className="confirm-btn"
                            onClick={() =>
                                handleAppointmentAction(appointment, "confirm")
                            }
                            disabled={isLoading}
                        >
                            Confirm
                        </button>
                        <button
                            className="reject-btn"
                            onClick={() =>
                                handleAppointmentAction(appointment, "reject")
                            }
                            disabled={isLoading}
                        >
                            Reject
                        </button>
                    </>
                );
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <img src={logo} alt="logo" className="logo-img" />
                <span className="logo-e">8</span>
                <span className="logo-care">Care</span>
            </nav>
            <div className="dashboard-contents">
                <div className="dashboard-background"></div>

                {/* Buttons for larger screens */}
                <div className="dashboard-buttons">
                    {[
                        "appointments",
                        "confirmed",
                        "rejected",
                        "completed",
                        "failed",
                    ].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={activeFilter === filter ? "active" : ""}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Dropdown for smaller screens */}
                <div className="dashboard-dropdown">
                    <select
                        onChange={(e) => setActiveFilter(e.target.value)}
                        value={activeFilter}
                    >
                        {[
                            "appointments",
                            "confirmed",
                            "rejected",
                            "completed",
                            "failed",
                        ].map((filter) => (
                            <option key={filter} value={filter}>
                                {filter.charAt(0).toUpperCase() +
                                    filter.slice(1)}
                            </option>
                        ))}
                    </select>
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
                                    <td>
                                        {formatDate(appointment.appointDate)}
                                    </td>
                                    <td className="confirmation-button">
                                        {renderActionButtons(appointment)}
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
