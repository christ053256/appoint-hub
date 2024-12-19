import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login, Dashboard } from "./components";

function App() {
    return (
        <div>
            {/* <NavAdmin /> */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}

export default App;
