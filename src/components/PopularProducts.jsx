import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NotFoundCard } from './NotFoundCard';
import Rating from 'react-rating-stars-component';

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
    if(popularProducts.length===0){
     return (
      <div className="loader">
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </div>
     );
    }
  return (
    <div className="popular-products-container">
    <div className="popular-products">
      {popularProducts.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.title} />
          <span className="label">POPULAR</span>
          <h3>{product.title}</h3>
          <Rating className="rating"
              count={10}
              value={product.rating}
              size={24}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
      ))}
    </div>
  </div>
  )
}
