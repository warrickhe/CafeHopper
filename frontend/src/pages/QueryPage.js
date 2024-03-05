import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';

import Header from '../components/Header';
import '../styles/Query.css';

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
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set up a callback function to handle the response
    xhr.onload = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // Request completed
        if (xhr.status === 200) {
          // Request was successful, handle the response
          console.log(xhr.responseText);
          navigate('/Results', {
            state: xhr.responseText,
          });
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
      <div className="query-container">
        <div className="query--left"></div>
        <div className="query--right">
          <h1>Tell Us What You Are Looking For</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
          >
            <path
              d="M43.1248 22.9999C43.1248 11.8852 34.1145 2.87491 22.9998 2.87491C11.885 2.87491 2.87476 11.8852 2.87476 22.9999C2.87476 26.6431 3.84283 30.0602 5.53577 33.008C4.66471 35.2854 3.84207 37.9311 3.30195 40.575C3.04436 41.8359 4.15538 42.9028 5.40767 42.6063C7.94014 42.0065 10.5109 41.1752 12.769 40.334C15.7667 42.1073 19.2645 43.1249 22.9998 43.1249C34.1145 43.1249 43.1248 34.1147 43.1248 22.9999Z"
              fill="#F6E797"
            />
            <path
              d="M15.3334 28.7499C18.6875 33.861 27.3125 33.861 30.6667 28.7499"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.2914 16.2916V18.2083"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29.7081 16.2916V18.2083"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M43.1248 22.9999C43.1248 11.8852 34.1145 2.87491 22.9998 2.87491C11.885 2.87491 2.87476 11.8852 2.87476 22.9999C2.87476 26.6431 3.84283 30.0602 5.53577 33.008C4.66471 35.2854 3.84207 37.9311 3.30195 40.575C3.04436 41.8359 4.15538 42.9028 5.40767 42.6063C7.94014 42.0065 10.5109 41.1752 12.769 40.334C15.7667 42.1073 19.2645 43.1249 22.9998 43.1249C34.1145 43.1249 43.1248 34.1147 43.1248 22.9999Z"
              stroke="black"
              stroke-width="3"
              stroke-linejoin="round"
            />
          </svg>
          <form onSubmit={handleSubmit}>
            <div className="row1">
              <div className="location">
                <label htmlFor="location">Area to Explore*</label>
                <br />
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
                <label htmlFor="start-time">Starting Time*</label>
                <br />
                <DatePicker
                  selected={startDate}
                  id="start-time"
                  onChange={handleStartDateChange}
                  dateFormat="MM-dd-yyyy h:mm aa"
                  placeholderText="When do you plan to start?"
                  showTimeInput
                  timeInputLabel="Time:"
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  isClearable
                />
              </div>
            </div>
            <div className="row2">
              <div className="num-cafes">
                <label htmlFor="num-cafes">Number of Cafes to Visit*</label>
                <input
                  type="number"
                  id="num-cafes"
                  value={numCafes}
                  onChange={handleNumCafes}
                  step="1"
                  onKeyDown={preventEnter}
                />
              </div>
              <div className="time-per-cafe">
                <label htmlFor="time-per-cafe">Time at each cafe (min)*</label>
                <input
                  type="number"
                  id="time-per-cafe"
                  value={timePerCafe}
                  onChange={handleTimePerCafe}
                  step="1"
                  onKeyDown={preventEnter}
                />
              </div>
              <div className="max-distance">
                <label htmlFor="max-distance">Max travel distance between cafes*</label>
                <input
                  type="number"
                  id="max-distance"
                  value={maxDistance}
                  onChange={handleMaxDistance}
                  step="1"
                  onKeyDown={preventEnter}
                />
              </div>
            </div>
            <hr />
            <h2>OPTIONAL</h2>
            <div className="row3">
              <div className="wheelchair-accessible">
                <label htmlFor="wheelchair-accessible">Wheelchair Accessible?</label>
                <br />
                <input
                  type="checkbox"
                  id="wheelchair-accessible"
                  checked={isWheelchairAccessible}
                  onChange={handleWheelchairChange}
                />
              </div>
              <div className="min-review-count">
                <label htmlFor="min-reviews">Minimum Review Count</label>
                <br />
                <input
                  type="number"
                  id="min-reviews"
                  value={minReview}
                  onChange={handleReviewChange}
                  step="1"
                  onKeyDown={preventEnter}
                />
              </div>
              <div className="min-rating">
                <label htmlFor="min-rating">Minimum Rating</label>
                <br />
                <select value={minRating} onChange={handleRatingChange}>
                  <option value="">Select star rating</option>
                  <option value="1">1 star</option>
                  <option value="2">2 star</option>
                  <option value="3">3 star</option>
                  <option value="4">4 star</option>
                  <option value="5">5 star</option>
                </select>
              </div>
              <div className="max-price">
                <label htmlFor="max-price">Price Range</label>
                <br />
                <select value={maxPrice} onChange={handlePriceChange}>
                  <option value="">Select price range</option>
                  <option value="1">$</option>
                  <option value="2">$$</option>
                  <option value="3">$$$</option>
                  <option value="4">$$$$</option>
                </select>
              </div>
            </div>
            <div className="submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
