import React from 'react';
import './AboutDeveloper.css';
import { Link } from 'react-router-dom'; 

const AboutDeveloper = () => {
  return (
    <div className="about-container">
      <div className="about-box">
        <h1 className="about-heading">About the Developer</h1>
        <p className="about-para">
          <strong>Name:</strong> Noel Ninan Sheri
        </p>
        <p className="about-para">
          <strong>Email:</strong> <a href="mailto:noelninansheri@gmail.com">noelninansheri@gmail.com</a>
        </p>
        <p className="about-para">
          <strong>GitHub:</strong> <a href="https://github.com/NoelNinanSheri1307" target="_blank" rel="noopener noreferrer">github.com/NoelNinanSheri1307</a>
        </p>
        <p className="about-para">
          <strong>LinkedIn:</strong> <a href="http://www.linkedin.com/in/noel-ninan-sheri" target="_blank" rel="noopener noreferrer">linkedin.com/in/noel-ninan-sheri</a>
        </p>
        <p className="about-desc">
          I’m Noel, an aspiring software engineer currently studying at VIT Vellore. I'm passionate about building technology that makes everyday life better.
          <br/><br/>
          <strong>Medimate</strong> is a prototype web application designed to showcase the potential of tech in simplifying medical management for the everyday person. It’s a proof of concept demonstrating how apps like Medimate can positively impact public health awareness and medication tracking.
        </p>
        {/* ✅ Back to Dashboard Link */}
        <div className="back-link">
          <Link to="/dashboard">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
