import React from 'react';
import { Link } from 'react-router-dom';

export default function ResultsPage() {

  return <div>
    <h1>This is the Results Page.</h1>
      <Link to="/Landing">
        <button>Restart</button>
      </Link>
    </div>;
}