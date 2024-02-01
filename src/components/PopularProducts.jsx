import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NotFoundCard } from './NotFoundCard';

export const PopularProducts = () => {
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
      const fetchPopularProducts = async () => {
        try {
          const response = await axios.get('http://alisa000077-001-site1.htempurl.com/api/Pizza/GetPopularPizzas');
          setPopularProducts(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching popular pizzas:', error);
        }
      };
  
      fetchPopularProducts();
    }, []); 
    if(!popularProducts){
     return (
        <NotFoundCard></NotFoundCard>
     );
    }
  return (
    <div className="popular-products-container">
    <div className="popular-products">
      {popularProducts.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.rating}</p>
        </div>
      ))}
    </div>
  </div>
  )
}
