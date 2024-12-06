import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
console.log(window.innerWidth);
console.log(window.innerHeight);
function Home() {
    return (
        <div className="bg">
            <div className="home-container">
                <div className="home-left">
                    <div className="slogan">
                        <p className="">
                            <span className="home-e">8</span>
                            <span className="home-care">Care</span>
                        </p>
                        <p className="home-clinic">Dental Clinic</p>
                        <p className="home-slogan">
                            Turning dream smiles into reality!
                        </p>
                    </div>
                    <div className="home-buttons">
                        <Link to="/appointment">
                            <button className="home-appointment">
                                MAKE AN APPOINTMENT NOW!
                            </button>
                        </Link>
                        <Link to="/services">
                            <button className="home-services">SERVICES</button>
                        </Link>
                    </div>
                </div>
                <div className="home-right"></div>
            </div>
        </div>
    );
}

export default Home;
