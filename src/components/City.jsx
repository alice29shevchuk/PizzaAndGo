import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {setCities,selectCity } from '../redux/slices/citySlice';
import { useDispatch,useSelector } from 'react-redux';

export const City = () => {
  const [cities, setCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://alisa000077-001-site1.htempurl.com/api/City/GetCityes'); 
        setCity(response.data);
        dispatch(setCities(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setLoading(false);
      }
    };

    fetchCities();
  }, []);
  const handleCitySelect = (city) => {
    dispatch(selectCity(city));
    console.log('cityId = ' + city);
  };
  return (
    <div>
      {loading ? (
         <div className="loader">
         <svg className="circular" viewBox="25 25 50 50">
           <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
         </svg>
       </div>
      ) : (
        <div className='select-container'>
        <h3>Выберите город</h3>
        <select onChange={(e) => handleCitySelect(parseInt(e.target.value))} value={cities.name}>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      )}
    </div>
  );
};
