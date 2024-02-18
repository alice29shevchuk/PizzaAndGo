import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NotFoundCard } from './NotFoundCard';
import Rating from 'react-rating-stars-component';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export const Feedback = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    const settings = {
        dots:true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
    useEffect(() => {
      const fetchPopularProducts = async () => {
        try {
          const response = await axios.get('http://alisa000077-001-site1.htempurl.com/api/FeedBack/GetFeedBacks');
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
    <Slider {...settings} autoplay autoplaySpeed={2000} swipe>
      {popularProducts.map(product => (
        <div key={product.id} className='feedback-item'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
                <circle cx="12" cy="12" r="10" fill="#ccc"/>
                <text x="50%" y="50%" text-anchor="middle" fill="#fff" font-size="12px" font-family="Arial, sans-serif" dy=".3em">{product.name.charAt(0).toUpperCase()}</text>
            </svg>
        <div className="feedback-details">
        <div className="feedback-name">{product.name}</div>
          <div className="feedback-rating">
              <Rating
                count={5}
                value={product.rating}
                size={24}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <div className="feedback-message">{product.message}</div>
        </div>
        </div>
      ))}
    </Slider>
  )

}
