import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="middle-div">
        <h1>CafeHoppers</h1>
        <Link to="/Query">
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
}
