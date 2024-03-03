import React from 'react';
import { Link } from 'react-router-dom';

export default function QueryPage() {

  return <div>
    <h1>This is the Query Page.</h1>
      <Link to="/ResultsPage">
        <button>Search</button>
      </Link>
    </div>;
}