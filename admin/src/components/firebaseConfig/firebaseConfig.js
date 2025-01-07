// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

function FirebaseConfig(){
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    return getDatabase(app);
}

export default FirebaseConfig;
