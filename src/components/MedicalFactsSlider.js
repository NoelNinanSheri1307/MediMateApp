import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MedicalFactsSlider.css';
import Slider from "react-slick";


const facts = [
  {
    title: "Penicillin Discovery",
    content: "Discovered by Alexander Fleming in 1928, penicillin was the first true antibiotic and has saved millions of lives.",
    bgColor: "#ffe4e1", // light pink
    textColor: "#00ffff"
  },
  {
    title: "Aspirin Origins",
    content: "Aspirin was derived from willow bark and has been used as a pain reliever since ancient times.",
    bgColor: "#e6f2ff", // light blue
    textColor: "#005792"
  },
  {
    title: "Smallpox Eradication",
    content: "Smallpox is the only human disease to be eradicated through a global vaccination campaign.",
    bgColor: "#f0fff0", // honeydew
    textColor: "#adff2f"
  },
  {
    title: "Insulin Breakthrough",
    content: "Insulin was first used to treat diabetes in 1922, revolutionizing diabetes care forever.",
    bgColor: "#fff5e6", // light orange
    textColor: "#d35400"
  }
];


const MedicalFactsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true, 
    arrows: false,
  };

  return(
    <div className="facts-slider-container">
      <Slider {...settings}>
  {facts.map((fact, index) => (
    <div
      className="slide"
      key={index}
      style={{
        backgroundColor: fact.bgColor,
        color: fact.textColor,
        borderRadius: "10px",
        padding: "20px"
      }}
    >
      <h3 style={{ color: fact.textColor }}>{fact.title}</h3>
<p style={{ color: fact.textColor }}>{fact.content}</p>

    </div>
  ))}
</Slider>

    </div>
  );
};

export default MedicalFactsSlider;
