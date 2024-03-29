import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Map from './Map'; // Import the Map component

import Header from '../components/Header';
import '../styles/Results.css';

const dummyData = [
  {
    categories: [
      {
        alias: 'breakfast_brunch',
        title: 'Breakfast & Brunch',
      },
      {
        alias: 'sandwiches',
        title: 'Sandwiches',
      },
      {
        alias: 'coffee',
        title: 'Coffee & Tea',
      },
    ],
    distance: '0.22',
    image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/ChAcupXTPeqWA3AwahuieA/o.jpg',
    location: '1049 Gayley Ave, Los Angeles, CA 90024',
    name: 'EGG TUCK',
    phone: '(424) 369-5051',
    price: '$$',
    rating: 4.5,
    review_count: 208,
    start_time: '03-10-2024 10:00',
  },
  {
    categories: [
      {
        alias: 'coffee',
        title: 'Coffee & Tea',
      },
    ],
    distance: '0.17',
    image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/AXcfGG-l8960VVdcHqqgnA/o.jpg',
    location: '10967 Weyburn Ave, Los Angeles, CA 90024',
    name: 'Junbi - Westwood',
    phone: '(424) 253-5850',
    price: '$$',
    rating: 4.1,
    review_count: 596,
    start_time: '03-10-2024 12:00',
  },
];

const ResultsPage = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  const { state } = useLocation();
  const obj = JSON.parse(state);
  console.log(typeof state);
  const input = obj[0];
  const data = obj.slice(1);
  console.log('here is our data!');
  console.log(data);
  console.log('here is our input');
  console.log(input);
  const cafes = data.map((item, index) => {
    return (
      <div className="result-div">
        <h2>{`#${index + 1}: ${item.name}`}</h2>
        <ul>
          <li>{item.price}</li>
          <li>{item.phone}</li>
          <li>{item.distance} miles away</li>
          <li>{item.rating} Stars</li>
          <li>{item.review_count} Review</li>
        </ul>
      </div>
      // <ul>
      //   <li>{item.name}</li>
      //   <ul>
      //     <li>{item.price}</li>
      //     <li>{item.phone}</li>
      //     <li>{item.distance} miles away</li>
      //     <li>{item.rating} Stars</li>
      //     <li>{item.review_count} Review</li>
      //   </ul>
      // </ul>
    );
  });
  const handleCheckboxChange = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((item) => item !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://your-backend-url/submit', { selectedNames });
      console.log('Response:', response.data);
      setSelectedNames([]);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="results-container">
        <div className="results--left"></div>
        <div className="results--right">
          <h1>Here is Your Cafe Hopping Route!</h1>
          {cafes}
          <div className="restart-div">
            <Link to="/Landing">
              <button className="restart-btn">Restart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
