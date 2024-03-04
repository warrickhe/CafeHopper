import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Map from './Map'; // Import the Map component

const dummyData = [
  {
    "categories": [
      {
        "alias": "breakfast_brunch",
        "title": "Breakfast & Brunch"
      },
      {
        "alias": "sandwiches",
        "title": "Sandwiches"
      },
      {
        "alias": "coffee",
        "title": "Coffee & Tea"
      }
    ],
    "distance": "0.22",
    "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/ChAcupXTPeqWA3AwahuieA/o.jpg",
    "location": "1049 Gayley Ave, Los Angeles, CA 90024",
    "name": "EGG TUCK",
    "phone": "(424) 369-5051",
    "price": "$$",
    "rating": 4.5,
    "review_count": 208,
    "start_time": "03-10-2024 10:00"
  },
  {
    "categories": [
      {
        "alias": "coffee",
        "title": "Coffee & Tea"
      }
    ],
    "distance": "0.17",
    "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/AXcfGG-l8960VVdcHqqgnA/o.jpg",
    "location": "10967 Weyburn Ave, Los Angeles, CA 90024",
    "name": "Junbi - Westwood",
    "phone": "(424) 253-5850",
    "price": "$$",
    "rating": 4.1,
    "review_count": 596,
    "start_time": "03-10-2024 12:00"
  }
];



const ResultsPage = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  
  const handleCheckboxChange = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter(item => item !== name));
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
      <h1>Results Page</h1>
      <form onSubmit={handleSubmit}>
        {dummyData.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={selectedNames.includes(item.name)}
              onChange={() => handleCheckboxChange(item.name)}
            />
            <label>{item.name}</label>
          </div>
        ))}
        <button type="submit">Regenerate</button>
      </form>
      <Link to="/Landing">
          <button>Restart</button>
        </Link>
    </div>
  );
};

export default ResultsPage;