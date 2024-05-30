// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ-bSyDSGp9Q7OO8QCTUMZXMSa__IGaUs",
  authDomain: "vegetables-react.firebaseapp.com",
  projectId: "vegetables-react",
  storageBucket: "vegetables-react.appspot.com",
  messagingSenderId: "313511674406",
  appId: "1:313511674406:web:b15221d9d8f43c90ffdce7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const storage = getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);