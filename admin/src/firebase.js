// Import necessary Firebase functions
import { getDatabase, ref, set, remove } from "firebase/database";
import { initializeApp } from "firebase/app";

// Your Firebase configuration (same as in App.jsx)
const firebaseConfig = {
  apiKey: "AIzaSyC_wCUqTyDcWJzKA_JQwfYnWbn0_SRkvG4",
  authDomain: "appointment-hub-76926.firebaseapp.com",
  databaseURL: "https://appointment-hub-76926-default-rtdb.firebaseio.com",
  projectId: "appointment-hub-76926",
  storageBucket: "appointment-hub-76926.firebasestorage.app",
  messagingSenderId: "996117761379",
  appId: "1:996117761379:web:c1bf328930f74f47d29756",
  measurementId: "G-LNHXEHQKF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to move appointment data to confirmed table
export async function confirmAppointment(appointment) {
  try {
    // Step 1: Write the data to the 'confirmed' table
    const confirmedRef = ref(db, 'confirmed/' + appointment.id);
    await set(confirmedRef, appointment);

    // Step 2: Remove the data from the 'appointments' table
    const appointmentRef = ref(db, 'appointments/' + appointment.id);
    await remove(appointmentRef);

    console.log("Appointment moved to confirmed and removed from appointments.");
  } catch (error) {
    console.error("Error confirming appointment:", error);
  }
}

// Function to move appointment data to rejected table
export async function rejectAppointment(appointment) {
  try {
    // Step 1: Write the data to the 'rejected' table
    const rejectedRef = ref(db, 'rejected/' + appointment.id);
    await set(rejectedRef, appointment);

    // Step 2: Remove the data from the 'appointments' table
    const appointmentRef = ref(db, 'appointments/' + appointment.id);
    await remove(appointmentRef);

    console.log("Appointment moved to rejected and removed from appointments.");
  } catch (error) {
    console.error("Error rejecting appointment:", error);
  }
}

// Function to move confirmed data to completed table
export async function completeAppointment(appointment) {
  try {
    // Step 1: Write the data to the 'completed' table
    const completedRef = ref(db, 'completed/' + appointment.id);
    await set(completedRef, appointment);

    // Step 2: Remove the data from the 'confirmed' table
    const confirmedRef = ref(db, 'confirmed/' + appointment.id);
    await remove(confirmedRef);

    console.log("Appointment moved to completed and removed from confirmed.");
  } catch (error) {
    console.error("Error completing appointment:", error);
  }
}


// Function to move confirmed data to failed table
export async function failedAppointment(appointment) {
  try {
    // Step 1: Write the data to the 'failed' table
    const failedRef = ref(db, 'failed/' + appointment.id);
    await set(failedRef, appointment);

    // Step 2: Remove the data from the 'confirmed' table
    const confirmedRef = ref(db, 'confirmed/' + appointment.id);
    await remove(confirmedRef);

    console.log("Appointment moved to failed and removed from confirmed.");
  } catch (error) {
    console.error("Error marking appointment as failed:", error);
  }
}




