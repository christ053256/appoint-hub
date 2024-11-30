// Import necessary Firebase functions
import { getDatabase, ref, set } from "firebase/database";
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

// Export function to send appointment data
export function sendAppointmentData(appointment) {
  const appointmentRef = ref(db, 'appointments/' + appointment.id);
  return set(appointmentRef, appointment);
}
