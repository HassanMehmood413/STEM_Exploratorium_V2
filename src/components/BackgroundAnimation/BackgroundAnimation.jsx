import React from 'react';
import './BackgroundAnimation.css';

function BackgroundAnimation() {
  return (
    <div className="background-wrapper">
      {/* Base Layers */}
      <div className="gradient-bg" />
      <div className="nebula" />
      
      {/* Particles */}
      <div className="particles">
        {[...Array(10)].map((_, i) => (
          <div key={`particle-${i}`} className="particle" />
        ))}
      </div>
      
      {/* Shooting Stars */}
      <div className="shooting-stars">
        {[...Array(3)].map((_, i) => (
          <div key={`shooting-star-${i}`} className="shooting-star" />
        ))}
      </div>
      
      {/* Grid Lines */}
      <div className="lines">
        {[...Array(5)].map((_, i) => (
          <div 
            key={`line-h-${i}`} 
            className="line" 
            style={{ left: `${i * 25}%` }} 
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`line-v-${i}`} 
            className="line-vertical" 
            style={{ top: `${i * 25}%` }} 
          />
        ))}
      </div>
      
      {/* Glowing Orbs */}
      <div className="orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      
      {/* Pulse Effects */}
      <div className="pulses">
        {[...Array(3)].map((_, i) => (
          <div key={`pulse-${i}`} className="pulse" />
        ))}
      </div>
      
      {/* Wave Effect */}
      <div className="waves">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        {[...Array(5)].map((_, i) => (
          <div key={`float-${i}`} className="float-element" />
        ))}
      </div>

      {/* Vignette Effect */}
      <div className="vignette" />
    </div>
  );
}

export default BackgroundAnimation;