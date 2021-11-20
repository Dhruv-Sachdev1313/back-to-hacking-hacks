import {
    initializeApp,
    FirebaseApp,
    FirebaseOptions,
    getApp,
    getApps
  } from "firebase/app";
  import { getAuth, Auth } from "firebase/auth";
  import { Firestore, getFirestore } from "firebase/firestore";
  
  interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  }
  
  const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyAQDUIf4ejGt0rhFVy2zZJWqN9stVrLKsQ",
    authDomain: "backtohackinghacks.firebaseapp.com",
    projectId: "backtohackinghacks",
    storageBucket: "backtohackinghacks.appspot.com",
    messagingSenderId: "629313945072",
    appId: "1:629313945072:web:b340823cd247ac80b6f135",
    measurementId: "G-0Y8G5FLQ20"
  };
  
  const App: FirebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth: Auth = getAuth(App);
  const firestore: Firestore = getFirestore();
  
  export { App, auth, firestore };
  