// Import necessary Firebase functions
import { getDatabase, ref, set, get } from "firebase/database";
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
export const db = getDatabase(app);

// Export function to send appointment data
export function sendAppointmentData(appointment) {
    const appointmentRef = ref(db, "appointments/" + appointment.id);
    return set(appointmentRef, appointment);
}

/**
 * Fetches all branches from the Firebase database
 * @returns {Promise<Array>} Array of branch objects
 */
export async function fetchBranches() {
    try {
        const branchesRef = ref(db, 'branches');
        const snapshot = await get(branchesRef);
        
        if (snapshot.exists()) {
            // Convert the snapshot to an array of branch objects
            const branchesData = snapshot.val();
            return Object.keys(branchesData).map(key => ({
                name: key,
                ...branchesData[key]
            }));
        }
        
        return [];
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw new Error(`Failed to fetch branches: ${error.message}`);
    }
}

