import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './HealthProfile.css';

const HealthProfile = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const auth = getAuth();
  const db = getDatabase();
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    weight: '',
    medicalConditions: '',
    gender: '',
    allergies: '',
    bloodType: '',
    height: '',
    emergencyContact: ''
  });
  const navigate = useNavigate();

  // Fetch user profile from Firebase
  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const profileRef = ref(db, 'users/' + uid + '/profile');
      
      get(profileRef).then((snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        }
      });
    }
  }, [auth, db]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  // Save user profile data to Firebase
  const saveProfile = () => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const profileRef = ref(db, 'users/' + uid + '/profile');
      set(profileRef, profile).then(() => {
        console.log("Profile is saved...showing success message:...")
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
      });
    }
  };
  

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile();
  };

  return (
    <div className="health-profile-container">
      <h2>User Health Profile</h2>
            {showSuccess && (
        <div className="success-message">
          ✅ Profile saved successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Medical Conditions:</label>
          <textarea
            name="medicalConditions"
            value={profile.medicalConditions}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="input-group">
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={profile.gender}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Allergies:</label>
          <input
            type="text"
            name="allergies"
            value={profile.allergies}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Blood Type:</label>
          <input
            type="text"
            name="bloodType"
            value={profile.bloodType}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Height (in cm):</label>
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Emergency Contact:</label>
          <input
            type="text"
            name="emergencyContact"
            value={profile.emergencyContact}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="save-btn">Save Profile</button>
      </form>
      <button onClick={() => navigate('/dashboard')} className="back-btn">Back to Dashboard</button>
    </div>
  );
};

export default HealthProfile;
