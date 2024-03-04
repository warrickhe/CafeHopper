import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';

import Header from '../components/Header';

export default function QueryPage() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [timePerCafe, setTimePerCafe] = useState(null);
  const [numCafes, setNumCafes] = useState(null);
  const [maxDistance, setMaxDistance] = useState(null);

  // Attributes
  const [isWheelchairAccessible, setIsWheelchairAccessible] = useState(false);
  const [minReview, setMinReview] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const [maxPrice, setMaxPrice] = useState('');

  const navigate = useNavigate();

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleStartDateChange(date) {
    setStartDate(date);
  }

  function handleTimePerCafe(e) {
    setTimePerCafe(e.target.value);
  }

  function handleNumCafes(e) {
    setNumCafes(e.target.value);
  }

  function handleMaxDistance(e) {
    setMaxDistance(e.target.value);
  }

  function handleWheelchairChange(e) {
    setIsWheelchairAccessible(e.target.checked);
  }

  function handleReviewChange(e) {
    setMinReview(e.target.value);
  }

  function handleRatingChange(e) {
    setMinRating(e.target.value);
  }

  function handlePriceChange(e) {
    setMaxPrice(e.target.value);
  }

  const formatDateTime = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
  };

  function preventEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Location: ', location);
    console.log('Start Date: ', formatDateTime(startDate));
    console.log('Time per cafe: ', timePerCafe);
    console.log('# of Cafes to Visit: ', numCafes);
    console.log('Max travel distance between cafes: ', maxDistance);
    console.log('Wheelchair Accessible?: ', isWheelchairAccessible);
    console.log('Min Review: ', minReview);
    console.log('Min Rating: ', minRating);

    let inputData = {
      address: location,
      start_time: formatDateTime(startDate),
      time_per_cafe: timePerCafe,
      num_cafes: numCafes,
      max_distance: maxDistance,
      attributes: {
        wheelchair_accessible: isWheelchairAccessible,
        min_review_count: minReview,
        min_rating: minRating,
        max_price: maxPrice,
      },
    };
    console.log(JSON.stringify(inputData));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:7272/getcafes');
    // Set request headers if needed
    xhr.setRequestHeader("Content-Type", "application/json");

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // Request completed
        if (xhr.status === 200) {
          // Request was successful, handle the response
          console.log(xhr.responseText);
        } else {
          // Handle errors
          console.error('Error:', xhr.status);
        }
      }
    };

    // Set up error handling
    xhr.onerror = function () {
      console.error('Request failed');
    };
    var requestBody = JSON.stringify(inputData);
    console.log(requestBody);
    xhr.send(requestBody);
    navigate('/Results');
  }

  //   {
  //     "address": "910 Weyburn Pl, Los Angeles, CA 90024",
  //     "start_time": "03-20-2024 10:00",
  //     "time_per_cafe": 120,
  //     "num_cafes": 30,
  //     "max_distance": 5,
  //     "attributes": {
  //         "wheelchair_accessible": false,
  //         "min_review_count": 50,
  //         "min_rating": 3.5,
  //         "min_price": 1,
  //         "max_price": 4
  //     }
  // }

  return (
    <>
      <Header />
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
              onKeyDown={preventEnter}
            />
          </div>
          <div className="date-time">
            <label htmlFor="start-time">Start Date:</label>
            <DatePicker
              selected={startDate}
              id="start-time"
              onChange={handleStartDateChange}
              dateFormat="MM-dd-yyyy h:mm aa"
              placeholderText="Select Start time"
              showTimeInput
              timeInputLabel="Time:"
              timeFormat="HH:mm"
              timeIntervals={30}
              isClearable
            />
            <br />
          </div>
          <div className="time-per-cafe">
            <label htmlFor="time-per-cafe">Time spent at each cafe (min)</label>
            <input
              type="number"
              id="time-per-cafe"
              value={timePerCafe}
              onChange={handleTimePerCafe}
              step="1"
              onKeyDown={preventEnter}
            />
          </div>
          <div className="num-cafes">
            <label htmlFor="num-cafes"># of Cafes to Go</label>
            <input
              type="number"
              id="num-cafes"
              value={numCafes}
              onChange={handleNumCafes}
              step="1"
              onKeyDown={preventEnter}
            />
          </div>
          <div className="max-distance">
            <label htmlFor="max-distance">Max travel distance between cafes</label>
            <input
              type="number"
              id="max-distance"
              value={maxDistance}
              onChange={handleMaxDistance}
              step="1"
              onKeyDown={preventEnter}
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
              onKeyDown={preventEnter}
            />
            <br />
            <label htmlFor="min-rating">Minimum Rating</label>
            <select value={minRating} onChange={handleRatingChange}>
              <option value="">Select star rating</option>
              <option value="1">1 star</option>
              <option value="2">2 star</option>
              <option value="3">3 star</option>
              <option value="4">4 star</option>
              <option value="5">5 star</option>
            </select>
            <br />
            <label htmlFor="max-price">Max Price</label>
            <select value={maxPrice} onChange={handlePriceChange}>
              <option value="">Select max price</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
