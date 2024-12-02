import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import {
    Home,
    Contact,
    About,
    Appointment,
    Services,
    Confirmation,
} from "./components";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/services" element={<Services />} />
                <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
        </div>
    );
}

export default App;
