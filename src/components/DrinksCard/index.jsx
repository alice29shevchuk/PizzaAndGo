import React from 'react';

const DrinkCard = ({ id, title, price, imageUrl }) => {
  return (
    <div className="pizza-block-wrapper">
        <div className="pizza-block">
            <img src={imageUrl} className="pizza-block__image" />
            <h3>{title}</h3>
            <p>{price} грн</p>
        </div>
    </div>
  );
};

export default DrinkCard;
