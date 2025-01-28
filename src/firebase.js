// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7v4ykbRNZ2NWYj5TO0cq15BUYq-3t59w",
  authDomain: "fameproject-b5528.firebaseapp.com",
  projectId: "fameproject-b5528",
  storageBucket: "fameproject-b5528.firebasestorage.app",
  messagingSenderId: "446876150184",
  appId: "1:446876150184:web:b99f849521f37d2014959d",
  measurementId: "G-H0DKNC7251"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Export Firestore
export const db = getFirestore(app);
