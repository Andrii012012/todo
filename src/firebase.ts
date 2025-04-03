// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC08TO1wF6jiVo4XLRw1wuxXy_s11x0x2s",
  authDomain: "todoapp-15e82.firebaseapp.com",
  projectId: "todoapp-15e82",
  storageBucket: "todoapp-15e82.firebasestorage.app",
  messagingSenderId: "258478476057",
  appId: "1:258478476057:web:76818519c47e41add75388",
  measurementId: "G-VL2Y4ZYVW1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const firestore = getFirestore(app);
