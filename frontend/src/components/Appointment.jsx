import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Appointment.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default DatePicker styles
import { sendAppointmentData } from "../firebase";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// No Context
// Import libphonenumber-js
import { parsePhoneNumberFromString } from "libphonenumber-js";

function Appointment() {
    const [selectedBirthDate, setSelectedBirthDate] = useState("");
    const [selectedAppointmentDate, setSelectedAppointmentDate] =
        useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [Age, setAge] = useState("");
    const [streetBuilding, setStreetBuilding] = useState("");
    const [Barangay, setBarangay] = useState("");
    const [City, setCity] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [selectedBranch, setBranch] = useState("");
    const services = ["Service 1", "Service 2", "Service 3"];
    const [selectedService, setSelectedService] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Add these right after your existing useState declarations
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [otp, setOTP] = useState("");
    const [generatedOTP, setGeneratedOTP] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);

    const [response, setResponse] = useState(null);

    const generateOTP = () => {
        const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(newOTP);
        // console.log("Generated OTP:", newOTP); // Debugging
        return newOTP;
    };

    const sendMessage = async (phoneNumber, otp) => {
        const myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            `App ${import.meta.env.VITE_INFOBIP_API_KEY}`
        );
        // console.log("API Key:", import.meta.env.VITE_INFOBIP_API_KEY);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        const raw = JSON.stringify({
            messages: [
                {
                    destinations: [{ to: phoneNumber }],
                    from: "ServiceSMS",
                    text: `Your OTP is: ${otp}`,
                },
            ],
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        try {
            const response = await fetch(
                "https://api.infobip.com/sms/2/text/advanced",
                requestOptions
            );
            const result = await response.json();
            // console.log("SMS API Response:", result);
            setShowOTPInput(true); // Show OTP input after sending
        } catch (err) {
            console.error("Error sending SMS:", err);
            setError("Failed to send OTP. Please try again.");
        }
    };

    const handleSendOTP = async (event) => {
        event.preventDefault(); // Prevent page reload
        if (!contactNumber) {
            setError("Please enter a valid contact number.");
            return;
        }
        setError(null);

        const otp = generateOTP();
        await sendMessage(contactNumber, otp);

        setResendDisabled(true);
        let timer = 30;
        setCountdown(timer);
        const interval = setInterval(() => {
            timer -= 1;
            setCountdown(timer);
            if (timer === 0) {
                clearInterval(interval);
                setResendDisabled(false);
            }
        }, 1000);
    };

    const handleVerifyOTP = () => {
        if (otp === generatedOTP) {
            setOtpVerified(true);
            setError(null);
        } else {
            setError("Invalid OTP. Please try again.");
        }
    };

    const handlePhoneNumber = (value) => {
        // Update the input value directly
        setContactNumber(value);

        // Clean the input by removing spaces and any non-numeric characters except '+'
        let cleanValue = value.replace(/\s+/g, "").replace(/[^0-9+]/g, "");

        // Parse the cleaned phone number
        const phoneNumber = parsePhoneNumberFromString(cleanValue, "PH");

        // Check if the phone number is valid
        if (phoneNumber && phoneNumber.isValid()) {
            setError("");
        } else {
            setError("Invalid phone number. Please check the format.");
        }
    };

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
        setSelectedAppointmentDate(date);
    };

    const getMinTime = (date) => {
        const minTime = new Date(date);
        minTime.setHours(8, 0, 0, 0); // 8 AM
        return minTime;
    };

    const getMaxTime = (date) => {
        const maxTime = new Date(date);
        maxTime.setHours(18, 0, 0, 0); // 6 PM
        return maxTime;
    };

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastName = (e) => {
        setLastName(e.target.value);
    };
    const handleMiddleName = (e) => {
        setMiddleName(e.target.value);
    };
    const handleStreetBuilding = (e) => {
        setStreetBuilding(e.target.value);
    };
    const handleBarangay = (event) => {
        setBarangay(event.target.value);
    };
    const handleCity = (event) => {
        setCity(event.target.value);
    };
    const handleBranch = (branchName) => {
        setBranch(branchName);
    };
    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    function formatObjectDate(dateObj) {
        // Extract the components of the date
        const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11, so add 1
        const day = String(dateObj.getDate()).padStart(2, "0");
        const year = dateObj.getFullYear();

        let hour = dateObj.getHours();
        const minute = String(dateObj.getMinutes()).padStart(2, "0");

        // Determine AM/PM
        const period = hour >= 12 ? "PM" : "AM";

        // Convert to 12-hour format
        if (hour > 12) {
            hour -= 12; // Convert to 12-hour format
        } else if (hour === 0) {
            hour = 12; // Midnight case
        }

        // Return the formatted date string
        return `${month}/${day}/${year} ${hour}:${minute} ${period}`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otpVerified) {
            alert("Please verify your phone number first!");
            return;
        }
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
                appointDate: formatObjectDate(selectedAppointmentDate),
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                age: Age,
                birtDate: selectedBirthDate,
                steetBuilding: streetBuilding,
                barangay: Barangay,
                city: City,
                contact_number: contactNumber,
                selectedService: selectedService,
                selectedBranch: selectedBranch,
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
    //console.log(typeof Date());
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
                            <div className="appointment-div1"></div>
                            <div className="appointment-div2">
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
                                        placeholderText="Birth Date: MM/DD/YYYY"
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

                                    <label>Contact Number</label>
                                    <div className="appointment-contactNo">
                                        <div className="phone-verification-container">
                                            <div className="phone-input-wrapper">
                                                <PhoneInput
                                                    className="phone-input"
                                                    country={"ph"}
                                                    value={contactNumber}
                                                    onChange={handlePhoneNumber}
                                                    inputProps={{
                                                        name: "phone",
                                                        required: true,
                                                        autoFocus: true,
                                                    }}
                                                    disabled={otpVerified}
                                                />
                                                {!otpVerified && (
                                                    <button
                                                        onClick={handleSendOTP}
                                                        disabled={
                                                            resendDisabled ||
                                                            !contactNumber ||
                                                            error
                                                        }
                                                        className="send-otp-button"
                                                    >
                                                        {resendDisabled
                                                            ? `Resend in ${countdown}s`
                                                            : "Send OTP"}
                                                    </button>
                                                )}
                                            </div>
                                            {error && (
                                                <div
                                                    style={{
                                                        color: "red",
                                                        marginTop: "10px",
                                                    }}
                                                >
                                                    {error}
                                                </div>
                                            )}
                                            {showOTPInput && !otpVerified && (
                                                <div className="otp-input-container">
                                                    <input
                                                        type="text"
                                                        maxLength="6"
                                                        placeholder="Enter OTP"
                                                        value={otp}
                                                        onChange={(e) =>
                                                            setOTP(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="otp-input"
                                                    />
                                                    <button
                                                        onClick={
                                                            handleVerifyOTP
                                                        }
                                                        className="verify-otp-button"
                                                    >
                                                        Verify OTP
                                                    </button>
                                                </div>
                                            )}
                                            {otpVerified && (
                                                <div className="verification-success">
                                                    ✓ Phone number verified
                                                </div>
                                            )}
                                        </div>
                                    </div>
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
                                placeholderText="MM/DD/YYYY, HH:MM"
                                selected={selectedAppointmentDate}
                                onChange={handleAppointDate}
                                showTimeSelect
                                dateFormat="Pp"
                                minTime={
                                    selectedAppointmentDate
                                        ? getMinTime(selectedAppointmentDate)
                                        : null
                                }
                                maxTime={
                                    selectedAppointmentDate
                                        ? getMaxTime(selectedAppointmentDate)
                                        : null
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
                                <button
                                    onClick={handleSubmit}
                                    className="set-appointment-button"
                                >
                                    SET APPOINTMENT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
