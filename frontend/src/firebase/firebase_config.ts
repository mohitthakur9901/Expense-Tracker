import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider ,GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUKECT,
  messagingSenderId:import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();
export const GoogleProvider = new GoogleAuthProvider();
export const GithubProvider = new GithubAuthProvider();
