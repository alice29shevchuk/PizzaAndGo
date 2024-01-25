import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const Slider = ({images}) => {
  return (
    <Carousel autoPlay infiniteLoop showArrows={false} showStatus={false}>
        {images.map((image, index) => (
        <div className="carousel-container" key={index}>
          <img src={image.src} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      </Carousel>
  );
};

export default Slider;
