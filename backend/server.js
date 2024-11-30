// backend/server.js

const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS for frontend (React) to communicate with backend
app.use(cors());
app.use(express.json()); // For parsing application/json

// Initialize Firebase Admin SDK
const serviceAccount = require("./appointmentServiceKey.json"); // Replace with path to your service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appointment-hub-76926-default-rtdb.firebaseio.com/", // Use your Firebase Realtime Database URL
});

// Example of interacting with Firebase Realtime Database (reading data)
app.get("/api/appointments", async (req, res) => {
  try {
    const appointmentsRef = admin.database().ref("appointments");
    const snapshot = await appointmentsRef.once("value");
    const appointments = snapshot.val();
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments: ", error);
    res.status(500).send("Error fetching appointments");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
