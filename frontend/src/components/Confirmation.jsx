import React from "react";
import { Link } from "react-router-dom";

import "./Confirmation.css";

function Confirmation() {
    return (
        <div className="confirmation-container ">
            <div className="confirmation-placeholder">
                <div className="icon-holder">
                    <div className="circle">
                        <div className="checkmark"></div>
                    </div>
                </div>

                <h1>Success!</h1>
                <p>You have successfully set an appointment.</p>
                <p>Please wait for the SMS confirmation.</p>
                <Link to="/">
                    <button className="return-button">
                        Return to Homepage
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Confirmation;
