import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

export default function QueryPage() {
  const [location, setLocation] = useState('');
  const [isWheelchairAccessible, setIsWheelchairAccessible] = useState(false);
  const [minReview, setMinReview] = useState(0);
  const [minRating, setMinRating] = useState('');
  // const [maxDistance, setMaxDistance] = useState(0);
  // const [numCafes, setNumCafes] = useState(0);
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleWheelchairChange(e) {
    setIsWheelchairAccessible(e.target.checked);
  }

  function handleReviewChange(e) {
    setMinReview(e.target.value);
  }

  function handelRatingChange(e) {
    setMinRating(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Location: ', location);
    console.log('Wheelchair Accessible?: ', isWheelchairAccessible);
    console.log('Min Review: ', minReview);
    console.log('Min Rating: ', minRating);
  }

  return (
    <>
      <Header />
      <Link to="/ResultsPage">
        <button>Search</button>
      </Link>
      <div className="query-page-container">
        <form onSubmit={handleSubmit}>
          <div className="location">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              placeholder="Where you do want to explore?"
              autoComplete="off"
              onChange={handleLocationChange}
            />
          </div>
          <div className="attributes">
            <label htmlFor="wheelchair-accessible">Wheelchair Accessible?</label>
            <input
              type="checkbox"
              id="wheelchair-accessible"
              checked={isWheelchairAccessible}
              onChange={handleWheelchairChange}
            />
            <br />
            <label htmlFor="min-reviews">Minimum Reviews</label>
            <input
              type="number"
              id="min-reviews"
              value={minReview}
              onChange={handleReviewChange}
              step="1"
            />
            <br />
            <label htmlFor="min-rating">Minimum Rating</label>
            <select value={minRating} onChange={handelRatingChange}>
              <option value="">Select star rating</option>
              <option value="1">1 star</option>
              <option value="2">2 star</option>
              <option value="3">3 star</option>
              <option value="4">4 star</option>
              <option value="5">5 star</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
