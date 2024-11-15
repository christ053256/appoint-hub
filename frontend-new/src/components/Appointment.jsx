import React, { useState } from "react";
import "./Appointment.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Default DatePicker styles



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


function Appointment() {
    const [selectedBirthDate, setSelectedBirthDate] = useState('');
    const [selectedAppointmentDate, setAppointmentDate] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [Suffix, setSuffix] = useState("");
    const [Age, setAge] = useState('');
    const [streetBuilding, setStreetBuilding] = useState('');
    const [Barangay, setBarangay] = useState('');
    const [City, setCity] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [selectedBranch, setBranch] = useState('');
    const services = ['Service 1', 'Service 2', 'Service 3'];
    const [selectedService, setSelectedService] = useState('');

    // Handle the change event for the dropdown
    
    const handleBirthDate = (date) => {
        if(!date){
            setSelectedBirthDate('');
            setAge('');
        }else{
            setSelectedBirthDate(date.toLocaleDateString());
            const currentYear = new Date().getFullYear();
            setAge(currentYear - date.getFullYear());
        }
        
    };

    const handleAppointDate = (date) =>{
        if(!date){
            setAppointmentDate('');
        }else{
            setAppointmentDate(date);
        }
    }

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

    const handleBranch = (branchName) =>{
        setBranch(branchName);
    }

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };
    
    const handleSubmit = (event) => {

        console.log("Form submitted");
        // Handle further logic like form submission to API/database, etc.
      };



    console.log(`
        ${firstName} ${middleName} ${lastName} ${Suffix}
        ${Age} 
        ${selectedBirthDate}
        ${streetBuilding} 
        ${Barangay}
        ${City}
        ${contactNumber}
        ${selectedService}
        ${selectedBranch}
        ${selectedAppointmentDate}
        `);

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
                                        value={firstName} 
                                        onChange={handleFirstName}
                                    />
                            
                                    <input
                                        type="text" 
                                        placeholder="Suffix"
                                        value={Suffix}
                                        onChange={handleSuffix}
                                    />
                                </form>
                            </div>

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

                        <div className="appointment-right">
                            <h3>Branch</h3>
                            <button onClick={() => handleBranch('Butuan')}>Butuan</button>
                            <button onClick={() => handleBranch('Gingoog')}>Gingoog</button>
                            <h3>Appointment Date</h3>

                            <DatePicker
                                placeholderText="MM/DD/YYYY"
                                selected={selectedAppointmentDate}
                                onChange={handleAppointDate}
                                showTimeSelect
                                dateFormat="Pp"
                                minTime={new Date().setHours(8, 0, 0, 0)} // 8 AM
                                maxTime={new Date().setHours(18, 0, 0, 0)} // 6 PM
                            />

                            <h3>Purpose of Visitation</h3>

                            <form>
                                <label htmlFor="services">Select Service:</label>
                                <select
                                    id="services"
                                    value={selectedService} // Bind the selected service to state
                                    onChange={handleServiceChange} // Handle dropdown change
                                >
                                    <option value="">--Select a Service--</option>
                                    {services.map((service, index) => (
                                    <option key={index} value={service}>
                                        {service}
                                    </option>
                                    ))}
                                </select>
                                </form>

                            <button onClick={handleSubmit}>SET APPOINTMENT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
