// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoOUa63MDuAAiKsJYl7zZl_1s8OWGR-DI",
  authDomain: "chattingapp-82a81.firebaseapp.com",
  projectId: "chattingapp-82a81",
  storageBucket: "chattingapp-82a81.firebasestorage.app",
  messagingSenderId: "913069435745",
  appId: "1:913069435745:web:a9f413e55bc346fce37320"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app