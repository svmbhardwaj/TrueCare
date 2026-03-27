import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBrXvItD7UJdPCXUB7B1y5dm6wYqaKiBEo",
    authDomain: "truecare-61ef3.firebaseapp.com",
    projectId: "truecare-61ef3",
    storageBucket: "truecare-61ef3.firebasestorage.app",
    messagingSenderId: "83167307342",
    appId: "1:83167307342:web:5daafa98ebeb9d80ab051f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();