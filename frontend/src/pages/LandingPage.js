import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {

  return <div>
    <h1>This is the Landing Page.</h1>
      <Link to="/Query">
        <button>Start</button>
      </Link>
    </div>;
}
