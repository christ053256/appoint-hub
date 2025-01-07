// Import necessary Firebase functions
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";

// Your Firebase configuration (same as in App.jsx)
const firebaseConfig = {
    apiKey: "AIzaSyAymNaAtFi54M1mJ72pUvgQ8SOgkrotrxc",
    authDomain: "system-appointment-hub.firebaseapp.com",
    databaseURL: "https://system-appointment-hub-default-rtdb.firebaseio.com",
    projectId: "system-appointment-hub",
    storageBucket: "system-appointment-hub.firebasestorage.app",
    messagingSenderId: "576034337111",
    appId: "1:576034337111:web:17b3f9450b2c33a8890e12",
    measurementId: "G-XTDLXSXYYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export function to send appointment data
export function sendAppointmentData(appointment) {
    const appointmentRef = ref(db, "appointments/" + appointment.id);
    return set(appointmentRef, appointment);
}
