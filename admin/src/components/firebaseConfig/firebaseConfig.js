// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

function FirebaseConfig(){
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    return getDatabase(app);
}

export default FirebaseConfig;
