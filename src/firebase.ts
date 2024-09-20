import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_API_FIREBASE_ACCESS_TOKEN}`,
    authDomain: "real-estates-manager-redberry.firebaseapp.com",
    projectId: "real-estates-manager-redberry",
    storageBucket: "real-estates-manager-redberry.appspot.com",
    messagingSenderId: `${import.meta.env.VITE_API_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${import.meta.env.VITE_API_FIREBASE_APP_ID}`
};

initializeApp(firebaseConfig);