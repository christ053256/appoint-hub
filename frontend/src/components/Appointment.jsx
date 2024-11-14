import React, { useState } from "react";
import "./Appointment.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default DatePicker styles

function Appointment() {
    const [selectedDate, setSelectedDate] = useState(null);
    // const [selectedTime, setSelectedTime] = useState('08:00');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // const handleTimeChange = (event) => {
    //     setSelectedTime(event.target.value);

    // const handleSubmit = () => {
    //     if (selectedDate) {
    //         const combinedDate = new Date(selectedDate);
    //         const [hours, minutes] = selectedTime.split(":").map(Number);
    //         combinedDate.setHours(hours, minutes);
    //         console.log("Selected Date and Time:", combinedDate);
    //     }
    // };

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
                                    />
                                </form>

                                <form action="">
                                    <input type="text" placeholder="Suffix" />
                                </form>
                            </div>
                            <form action="">
                                <input type="text" placeholder="Middle Name" />
                            </form>
                            <form action="">
                                <input type="text" placeholder="Last Name" />
                            </form>
                            <form action="">
                                <input type="text" placeholder="Age" />
                            </form>
                            <form action="">
                                <input type="text" placeholder="Birth Date" />
                            </form>
                            {/* <h3>Contact Information</h3> */}

                            <form action="">
                                <input
                                    type="text"
                                    placeholder="Street / Building"
                                />
                            </form>
                            <form action="">
                                <input type="text" placeholder="Building" />
                            </form>
                            <form action="">
                                <input type="text" placeholder="City" />
                            </form>
                            <form action="">
                                <input
                                    type="text"
                                    placeholder="Contact Number"
                                />
                            </form>
                        </div>

                        <div className="appointment-right">
                            <h3>Branch</h3>
                            <button>Butuan</button>
                            <button>Gingoog</button>

                            <h3>Date & Time</h3>

                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                showTimeSelect
                                dateFormat="Pp"
                                minTime={new Date().setHours(8, 0, 0, 0)} // 8 AM
                                maxTime={new Date().setHours(18, 0, 0, 0)} // 6 PM
                            />

                            <form action="">
                                <input type="text" placeholder="Time" />
                            </form>

                            <h3>Purpose of Visitation</h3>

                            <form action="">
                                <input type="text" placeholder="Services" />
                            </form>

                            <button>SET APPOINTMENT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
