
import React from "react";
import { auth } from "./firebase";  
import { useNavigate } from "react-router-dom";  
import './Dashboard.css';
import MedicalFactsSlider from "./components/MedicalFactsSlider";
import { Link } from 'react-router-dom';
const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  console.log(user.photoURL); 


  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/"); 
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="profile">
          <img src={user.photoURL || "/sub.jpg"}  className="profile-pic" />
          <h2>Welcome, {user.displayName}!</h2>
        </div>
        <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>
      </div>
      <div className="features">
        <div className="feature-card">
          <h3>Add Medicines</h3>
          <Link to="/manage-medicines"><button className="feature-btn">Go to Add Medicines</button></Link>
        </div>
        <div className="feature-card">
  <h3>Health Profile</h3>
  <Link to="/health-profile">
    <button className="feature-btn">Go to Profile</button>
  </Link>
</div>
        <div className="feature-card">
          <h3>Daily Schedule</h3>
          <Link to="/google-auth"><button className="feature-btn">View Schedule</button></Link>
        </div>
        <div className="feature-card">
          <h3>About Developer</h3><Link to="/about-developer"><button className="feature-btn">Learn More</button></Link>

        </div>
      </div>
      <div className="facts-section">
      <h2>💊 Did You Know?</h2>
      <p>
        Medicines save millions of lives each year. From controlling blood pressure to curing infections, they are an essential part of modern healthcare.
      </p>
      <p>
        Always take your medications as prescribed, and never skip doses – your health matters!
      </p>
    </div>
    <MedicalFactsSlider />
    
    <div className="easter-egg-container">
  <span className="pill-emoji" title="Click me!">💊</span>
  <div className="tooltip-text">Did you take your meds today? 😇</div>
</div>



    <div className="developer-credit">
  Developed by <strong>Noel Ninan Sheri</strong>
</div>

    </div>
  );
};

export default Dashboard;
