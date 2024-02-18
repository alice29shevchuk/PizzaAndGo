import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComboCard from './ComboCard/index';

const DrinksComponent = () => {
  const [comboPizzas, setComboPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComboPizzas = async () => {
      try {
        const response = await axios.get('http://alisa000077-001-site1.htempurl.com/api/Pizza/GetCombo');
        setComboPizzas(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchComboPizzas();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="combo-card-container">
    {comboPizzas.map((drink) => (
      <ComboCard
        key={drink.id}
        id={drink.id}
        title={drink.title}
        weight={drink.weight}
        price={drink.price}
        imageUrl={drink.imageUrl}
      />
    ))}
  </div>
  );
};

export default DrinksComponent;
