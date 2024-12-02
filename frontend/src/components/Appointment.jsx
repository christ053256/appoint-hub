import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Appointment.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default DatePicker styles
import { sendAppointmentData } from "../firebase";

function Appointment() {
    const [selectedBirthDate, setSelectedBirthDate] = useState("");
    const [selectedAppointmentDate, setAppointmentDate] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [Suffix, setSuffix] = useState("");
    const [Age, setAge] = useState("");
    const [streetBuilding, setStreetBuilding] = useState("");
    const [Barangay, setBarangay] = useState("");
    const [City, setCity] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [selectedBranch, setBranch] = useState("");
    const services = ["Service 1", "Service 2", "Service 3"];
    const [selectedService, setSelectedService] = useState("");
    const [message, setMessage] = useState("");

    //navigate
    const navigate = useNavigate();

    // Handle the change event for the dropdown
    const handleBirthDate = (date) => {
        if (!date) {
            setSelectedBirthDate("");
            setAge("");
        } else {
            setSelectedBirthDate(date.toLocaleDateString());
            const currentYear = new Date().getFullYear();
            setAge(currentYear - date.getFullYear());
        }
    };

    const handleAppointDate = (date) => {
        if (!date) {
            setAppointmentDate(null);
        } else {
            setAppointmentDate(date);
        }
    };

    const handleFirstName = (e) => {
        setFirstName(e.target.value); // Update state with input value
    };

    const handleLastName = (e) => {
        setLastName(e.target.value); // Update state with input value
    };

    const handleMiddleName = (e) => {
        setMiddleName(e.target.value); // Update state with input value
    };

    const handleSuffix = (e) => {
        setSuffix(e.target.value); // Update state with input value
    };

    const handleStreetBuilding = (e) => {
        setStreetBuilding(e.target.value); // Update state with input value
    };

    const handleBarangay = (event) => {
        setBarangay(event.target.value);
    };

    const handleCity = (event) => {
        setCity(event.target.value);
    };

    const handleContactNumber = (event) => {
        setContactNumber(event.target.value);
    };

    const handleBranch = (branchName) => {
        setBranch(branchName);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            firstName &&
            lastName &&
            selectedBirthDate &&
            streetBuilding &&
            Barangay &&
            City &&
            contactNumber &&
            selectedService &&
            selectedBranch &&
            selectedAppointmentDate
        ) {
            const appointment = {
                id: Date.now().toString(),
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                suffix: Suffix,
                age: Age,
                birtDate: selectedBirthDate,
                steetBuilding: streetBuilding,
                barangay: Barangay,
                city: City,
                contact_number: contactNumber,
                selectedService: selectedService,
                selectedBranch: selectedBranch,
                appointmentDate: selectedAppointmentDate,
                appointmentCreated: Date(),
            };

            try {
                // Send the data to Firebase using the sendAppointmentData function
                await sendAppointmentData(appointment);
                setMessage("Appointment added successfully!");
                navigate("/confirmation");
            } catch (error) {
                setMessage("Error adding appointment: " + error.message);
            }
        } else {
            alert("Please fill all the form");
        }
    };

    // Log the message when it changes
    useEffect(() => {
        if (message.length) {
            console.log(message);
            setMessage(""); // Optional: reset the message after logging it
        }
    }, [message]); // This hook will run every time `message` changes

    setTimeout(() => {
        setMessage("");
    }, 1500);

    //handleSubmit--- nalang need dataBase
    return (
        <div>
            <div className="appointment-container">
                <div className="form-container">
                    <div className="appointment-title">
                        <h1>Appointment Form</h1>
                    </div>
                    <div className="appointment-content">
                        <div className="appointment-left">
                            <h3>Patient Information</h3>
                            <div className="appointment-div1">
                                <form action="">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="firstname"
                                        value={firstName}
                                        onChange={handleFirstName}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Suffix"
                                        className="suffix"
                                        value={Suffix}
                                        onChange={handleSuffix}
                                    />
                                </form>
                            </div>
                            <div className="appointment-div2">
                                <form action="">
                                    <input
                                        type="text"
                                        placeholder="Middle Name"
                                        value={middleName}
                                        onChange={handleMiddleName}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={handleLastName}
                                    />

                                    <DatePicker
                                        selected={selectedBirthDate}
                                        onChange={handleBirthDate}
                                        placeholderText="Birth Date"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        disabled={false}
                                    />
                                    {/* <h3>Contact Information</h3> */}

                                    <input
                                        type="text"
                                        placeholder="Street / Building"
                                        value={streetBuilding}
                                        onChange={handleStreetBuilding}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Barangay"
                                        value={Barangay}
                                        onChange={handleBarangay}
                                    />

                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={City}
                                        onChange={handleCity}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Contact Number"
                                        value={contactNumber}
                                        onChange={handleContactNumber}
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="appointment-right">
                            <h3 className="appointment-branch">Branch</h3>
                            <div className="branch-button">
                                <button
                                    onClick={() => handleBranch("Butuan")}
                                    className={
                                        selectedBranch === "Butuan"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Butuan
                                </button>
                                <button
                                    onClick={() => handleBranch("Gingoog")}
                                    className={
                                        selectedBranch === "Gingoog"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Gingoog
                                </button>
                            </div>
                            <h3 className="appointment-date">
                                Appointment Date
                            </h3>

                            <DatePicker
                                className="appointment-datepicker"
                                placeholderText="MM/DD/YYYY"
                                selected={selectedAppointmentDate}
                                onChange={handleAppointDate}
                                showTimeSelect
                                dateFormat="Pp"
                                minTime={
                                    selectedAppointmentDate &&
                                    new Date(selectedAppointmentDate).setHours(
                                        8,
                                        0,
                                        0,
                                        0
                                    ) // 8 AM
                                }
                                maxTime={
                                    selectedAppointmentDate &&
                                    new Date(selectedAppointmentDate).setHours(
                                        18,
                                        0,
                                        0,
                                        0
                                    ) // 6 PM
                                }
                                minDate={new Date()} // Disallow dates before today
                            />

                            <h3 className="appointment-services">
                                Purpose of Visitation
                            </h3>

                            <form>
                                <label htmlFor="services">
                                    {/* Select Service: */}
                                </label>
                                <select
                                    id="services"
                                    className="appointment-services-menu"
                                    value={selectedService} // Bind the selected service to state
                                    onChange={handleServiceChange} // Handle dropdown change
                                >
                                    <option value="">--Select Service--</option>
                                    {services.map((service, index) => (
                                        <option key={index} value={service}>
                                            {service}
                                        </option>
                                    ))}
                                </select>
                            </form>
                            <div className="appointment-submit">
                                <Link to="/confirmation">
                                    <button
                                        onClick={handleSubmit}
                                        className="set-appointment-button"
                                    >
                                        SET APPOINTMENT
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
