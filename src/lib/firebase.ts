import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-STJXlmiVL80GQD5ZpWg8DhT0fz0hsRY",
  authDomain: "minel-muhammed.firebaseapp.com",
  projectId: "minel-muhammed",
  storageBucket: "minel-muhammed.firebasestorage.app",
  messagingSenderId: "260228369884",
  appId: "1:260228369884:web:8acdea5cf2ea8a349e9319"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
