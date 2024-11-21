// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_p_0euEHaDBuWY54rzw4isNnHgr7s0_Q",
  authDomain: "triptak-65128.firebaseapp.com",
  projectId: "triptak-65128",
  storageBucket: "triptak-65128.firebasestorage.app",
  messagingSenderId: "487466741866",
  appId: "1:487466741866:web:5dc60e38d321215aed9a13",
  measurementId: "G-VRDRZ4CGCE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);