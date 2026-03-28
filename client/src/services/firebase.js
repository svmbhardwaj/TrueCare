import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    // This line pulls the key from your .env file
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "truecare-61ef3.firebaseapp.com",
    projectId: "truecare-61ef3",
    storageBucket: "truecare-61ef3.firebasestorage.app",
    messagingSenderId: "83167307342",
    appId: "1:83167307342:web:5daafa98ebeb9d80ab051f"
};

let app = null;
let auth = null;
let googleProvider = null;

export let firebaseAuthEnabled = false;

try {
    if (firebaseConfig.apiKey && firebaseConfig.apiKey.trim()) {
        app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
        firebaseAuthEnabled = true;
    } else {
        console.warn("Firebase disabled: missing VITE_FIREBASE_API_KEY.");
    }
} catch (error) {
    console.error("Firebase initialization failed. Continuing without auth:", error?.message || error);
}

export { app, auth, googleProvider };