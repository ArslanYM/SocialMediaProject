// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// importing auth and google auth provider
import {getAuth  , GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZNnovQ7UO-sTYxjrL-drdeQmqCwpEp0k",
  authDomain: "socialmediareact-40711.firebaseapp.com",
  projectId: "socialmediareact-40711",
  storageBucket: "socialmediareact-40711.appspot.com",
  messagingSenderId: "15371443332",
  appId: "1:15371443332:web:67297ff8e74ab84ed4f6d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();