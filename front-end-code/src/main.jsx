import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT_ssTaArogsy1kGl_tEKBLNS5UbO-4uc",
  authDomain: "full-stack-react-6dd98.firebaseapp.com",
  projectId: "full-stack-react-6dd98",
  storageBucket: "full-stack-react-6dd98.firebasestorage.app",
  messagingSenderId: "555170188955",
  appId: "1:555170188955:web:3463d93733f0c2d71c403e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />   
  </StrictMode>,
)
