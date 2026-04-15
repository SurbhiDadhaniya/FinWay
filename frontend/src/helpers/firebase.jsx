// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCKk6cyxE9HdEMCwrP7qKNiWG2DIRwUlvw",
	authDomain: "web-wonders-finn-api.firebaseapp.com",
	projectId: "web-wonders-finn-api",
	storageBucket: "web-wonders-finn-api.appspot.com",
	messagingSenderId: "465218902222",
	appId: "1:465218902222:web:6675798f39366d2b73589f",
	measurementId: "G-7QTHWWTJJ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export {auth}