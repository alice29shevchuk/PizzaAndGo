import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DrinkCard from './DrinksCard/index';

const DrinksComponent = () => {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get('http://alisa000077-001-site1.htempurl.com/api/Souces/GetSouces');
        setDrinks(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="drinks-container">
      {drinks.map((drink) => (
        <DrinkCard
          key={drink.id}
          id={drink.id}
          title={drink.title}
          price={drink.price}
          imageUrl={drink.imageUrl}
        />
      ))}
    </div>
  );
};

export default DrinksComponent;
