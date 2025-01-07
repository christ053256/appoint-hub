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

import emailjs from "@emailjs/browser";

// First, add this in your component initialization (outside of any function)
emailjs.init("32_hmnUTkbX3geQDy");

function Dashboard() {
    const database = FirebaseConfig();
    const [appointments, setAppointments] = useState([]);
    const [confirmedAppts, setConfirmedAppts] = useState([]);
    const [rejectedAppts, setRejectedAppts] = useState([]);
    const [completedAppts, setCompletedAppts] = useState([]);
    const [failedAppts, setFailedAppts] = useState([]);
    const [activeFilter, setActiveFilter] = useState("appointments");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null); // State for selected appointment
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [emailSending, setEmailSending] = useState(false);
    // -----------------------------
    // BRANCH DYNAMIC
    const [branches, setBranches] = useState(["Butuan", "Gingoog"]); // Initial branch list
    const [newBranch, setNewBranch] = useState(""); // New branch input

    const [isBranchModalOpen, setIsBranchModalOpen] = useState(false); // Unique modal for branch management

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

    const handleSendConfirmEmail = async (appointment) => {
        if (!appointment.email) {
            console.error("No email address provided for appointment");
            return false;
        }

        setEmailSending(true);
        const formattedDate = formatDate(appointment.appointDate);
        const message = `Your appointment for ${appointment.selectedService} at our ${appointment.selectedBranch} branch on ${formattedDate} has been confirmed. Please arrive 15 minutes before your scheduled time.`;
        try {
            const templateParams = {
                to_email: appointment.email,
                from_name: "8care Dental Clinic",
                to_name: `${appointment.first_name} ${appointment.last_name}`,
                subject: "Appointment Confirmation - 8Care Dental Clinic",
                message: message,
            };

            const response = await emailjs.send(
                "service_2hw475m",
                "template_2althz8",
                templateParams
            );

            if (response.status === 200) {
                console.log("Confirmation email sent successfully");
                return true;
            } else {
                throw new Error("Failed to send confirmation email");
            }
        } catch (error) {
            console.error("Error sending confirmation email:", error);
            return false;
        } finally {
            setEmailSending(false);
        }
    };

    const handleAppointmentAction = async (appointment, action) => {
        try {
            setIsLoading(true);
            switch (action) {
                case "confirm":
                    const emailSent = await handleSendConfirmEmail(appointment);
                    if (emailSent) {
                        await confirmAppointment(appointment);
                        // You could add a success notification here
                    } else {
                        // Handle the case where email failed but you still want to confirm
                        const confirmAnyway = window.confirm(
                            "Failed to send confirmation email. Would you like to confirm the appointment anyway?"
                        );
                        if (confirmAnyway) {
                            await confirmAppointment(appointment);
                        }
                    }
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
                            disabled={isLoading || emailSending}
                        >
                            Complete
                        </button>
                        <button
                            className="reject-btn"
                            onClick={() =>
                                handleAppointmentAction(appointment, "fail")
                            }
                            disabled={isLoading || emailSending}
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
                            disabled={isLoading || emailSending}
                        >
                            {emailSending ? "Sending..." : "Confirm"}
                        </button>
                        <button
                            className="reject-btn"
                            onClick={() =>
                                handleAppointmentAction(appointment, "reject")
                            }
                            disabled={isLoading || emailSending}
                        >
                            Reject
                        </button>
                    </>
                );
        }
    };

    const openBranchModal = () => {
        setIsBranchModalOpen(true); // Open the branch management modal
    };

    const closeBranchModal = () => {
        setIsBranchModalOpen(false); // Close the branch management modal
    };

    const handleAddBranch = () => {
        if (newBranch && !branches.includes(newBranch)) {
            setBranches([...branches, newBranch]);
            setNewBranch("");
        }
    };

    const handleRemoveBranch = (branchToRemove) => {
        setBranches(branches.filter((branch) => branch !== branchToRemove));
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
                <button
                    onClick={openBranchModal}
                    className="branch-management-btn"
                >
                    Manage Branches
                </button>
            </nav>

            {/* Branch Management Modal */}
            {isBranchModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button
                            className="close-btn"
                            onClick={closeBranchModal}
                        >
                            X
                        </button>
                        <h2>Manage Branches</h2>
                        <div>
                            <input
                                type="text"
                                value={newBranch}
                                onChange={(e) => setNewBranch(e.target.value)}
                                placeholder="Add new branch"
                            />
                            <button
                                onClick={handleAddBranch}
                                className="add-branch-btn"
                            >
                                Add Branch
                            </button>
                        </div>
                        <h3>Existing Branches</h3>
                        <ul>
                            {branches.map((branch, index) => (
                                <li key={index}>
                                    {branch}{" "}
                                    <button
                                        onClick={() =>
                                            handleRemoveBranch(branch)
                                        }
                                        className="remove-branch-btn"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <div className="dashboard-contents">
                <div className="dashboard-background"></div>

                <div className="dashboard-buttons">
                    {[
                        "pending",
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
                                <th>Scheduled Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFilteredAppointments().length > 0 ? (
                                getFilteredAppointments().map((appointment) => (
                                    <tr
                                        key={appointment.id}
                                        className="appointment-list"
                                        onClick={() => openModal(appointment)} // Open modal on click
                                    >
                                        <td>{`${appointment.first_name} ${appointment.middle_name} ${appointment.last_name}`}</td>
                                        <td>
                                            {formatDate(
                                                appointment.appointDate
                                            )}
                                        </td>
                                        <td className="confirmation-button">
                                            {renderActionButtons(appointment)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="empty-message">
                                        No appointments available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal to display appointment details */}
            {isModalOpen && selectedAppointment && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={closeModal}>
                            X
                        </button>
                        <h2>Appointment Details</h2>
                        <p>
                            <strong>Name: </strong>
                            {selectedAppointment.first_name}{" "}
                            {selectedAppointment.middle_name}{" "}
                            {selectedAppointment.last_name}{" "}
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {selectedAppointment.steetBuilding},{" "}
                            {selectedAppointment.barangay},{" "}
                            {selectedAppointment.city}{" "}
                        </p>
                        <p>
                            <strong>Phone number: </strong>
                            {selectedAppointment.contact_number}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            {selectedAppointment.email}
                        </p>
                        <p>
                            <strong>Service: </strong>
                            {selectedAppointment.selectedService}{" "}
                        </p>
                        <p>
                            <strong>Branch: </strong>
                            {selectedAppointment.selectedBranch}{" "}
                        </p>
                        <p>
                            <strong>Schedule: </strong>{" "}
                            {formatDate(selectedAppointment.appointDate)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
