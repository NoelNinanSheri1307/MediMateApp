import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import Dashboard from "./dash";
import HealthProfile from './HealthProfile';
import ManageMedicines from './ManageMedicines'; 
import AboutDeveloper from './AboutDeveloper';
import GoogleAuth from './GoogleAuth';  
import DailySchedule from './DailySchedule';  

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - SignIn or redirect */}
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <SignIn />}
          />

          {/* Dashboard route - Protected */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
          />

          {/* HealthProfile route - Protected */}
          <Route
            path="/health-profile"
            element={user ? <HealthProfile user={user} /> : <Navigate to="/" />}
          />

          {/* ManageMedicines route - Protected */}
          <Route
            path="/manage-medicines"
            element={user ? <ManageMedicines user={user} /> : <Navigate to="/" />}
          />

          {/* AboutDeveloper route - Public access */}
          <Route
            path="/about-developer"
            element={<AboutDeveloper />}
          />

          {/* Google Authentication route (for Daily Schedule) */}
          <Route
            path="/google-auth"
            element={<GoogleAuth />}
          />

          {/* Daily Schedule route - Protected and requires Google OAuth */}
          <Route
            path="/daily-schedule"
            element={user ? <DailySchedule /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
