// Import necessary Firebase functions
import { getDatabase, ref, set, remove, get } from "firebase/database";
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

// Function to move appointment data to confirmed table
export async function confirmAppointment(appointment) {
    try {
        // Step 1: Write the data to the 'confirmed' table
        const confirmedRef = ref(db, "confirmed/" + appointment.id);
        await set(confirmedRef, appointment);

        // Step 2: Remove the data from the 'appointments' table
        const appointmentRef = ref(db, "appointments/" + appointment.id);
        await remove(appointmentRef);

        console.log(
            "Appointment moved to confirmed and removed from appointments."
        );
    } catch (error) {
        console.error("Error confirming appointment:", error);
    }
}

// Function to move appointment data to rejected table
export async function rejectAppointment(appointment) {
    try {
        // Step 1: Write the data to the 'rejected' table
        const rejectedRef = ref(db, "rejected/" + appointment.id);
        await set(rejectedRef, appointment);

        // Step 2: Remove the data from the 'appointments' table
        const appointmentRef = ref(db, "appointments/" + appointment.id);
        await remove(appointmentRef);

        console.log(
            "Appointment moved to rejected and removed from appointments."
        );
    } catch (error) {
        console.error("Error rejecting appointment:", error);
    }
}

// Function to move confirmed data to completed table
export async function completeAppointment(appointment) {
    try {
        // Step 1: Write the data to the 'completed' table
        const completedRef = ref(db, "completed/" + appointment.id);
        await set(completedRef, appointment);

        // Step 2: Remove the data from the 'confirmed' table
        const confirmedRef = ref(db, "confirmed/" + appointment.id);
        await remove(confirmedRef);

        console.log(
            "Appointment moved to completed and removed from confirmed."
        );
    } catch (error) {
        console.error("Error completing appointment:", error);
    }
}

// Function to move confirmed data to failed table
export async function failedAppointment(appointment) {
    try {
        // Step 1: Write the data to the 'failed' table
        const failedRef = ref(db, "failed/" + appointment.id);
        await set(failedRef, appointment);

        // Step 2: Remove the data from the 'confirmed' table
        const confirmedRef = ref(db, "confirmed/" + appointment.id);
        await remove(confirmedRef);

        console.log("Appointment moved to failed and removed from confirmed.");
    } catch (error) {
        console.error("Error marking appointment as failed:", error);
    }
}


/**
 * Adds or updates a branch in the database
 * @param {string} branchName - The name of the branch to add/update
 * @returns {Promise<void>}
 */
export async function sendBranches(branchName) {
    if (!branchName) {
        throw new Error("Branch name is required");
    }

    try {
        // Create a reference to the branch location in the database
        const branchRef = ref(db, `branches/${branchName}`);

        // Prepare the data to be saved
        const branchData = {
            name: branchName,
            createdAt: new Date().toISOString(),
            active: true
        };

        // Write the branch data to the database
        await set(branchRef, branchData);

        console.log(`Branch "${branchName}" has been successfully added`);
        return true;

    } catch (error) {
        console.error("Error adding branch:", error);
        throw new Error(`Failed to add branch: ${error.message}`);
    }
}

/**
 * Removes a branch from the database
 * @param {string} branchName - The name of the branch to remove
 * @returns {Promise<void>}
 */
export async function removeBranches(branchName) {
    if (!branchName) {
        throw new Error("Branch name is required");
    }

    try {
        // Create a reference to the branch location in the database
        const branchRef = ref(db, `branches/${branchName}`);
        
        // Remove the branch from the database
        await set(branchRef, null);

        console.log(`Branch "${branchName}" has been successfully removed`);
        return true;

    } catch (error) {
        console.error("Error removing branch:", error);
        throw new Error(`Failed to remove branch: ${error.message}`);
    }
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