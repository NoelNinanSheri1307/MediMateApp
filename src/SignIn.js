import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";  
import './SignIn.css'; 
import backgroundImage from './assets/signinbackground.jpg'; 
const SignIn = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Using GoogleAuthProvider to sign in
      await signInWithPopup(auth, provider);
      console.log("Signed in successfully!");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="sign-in-container">
  <div className="top-content">
    <h1 className="app-title">Welcome to MediMate</h1>
    <p className="intro-text">
      Medimate is your personal healthcare companion — designed to simplify and optimize your medicine intake routine.
      With features like real-time reminders, health profiles, and easy medicine tracking, Medimate empowers users to
      take charge of their well-being. Join us in making medication management seamless and stress-free!
    </p>
  </div>

  <button onClick={handleGoogleSignIn} className="sign-in-button">
    Sign in with Google
  </button>

  <footer className="footer-text">Developed by Noel Ninan Sheri</footer>
</div>
  );
  
};

export default SignIn;
