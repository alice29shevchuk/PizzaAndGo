import React from 'react';
import {useNavigate} from 'react-router-dom';
import {addProduct} from '../../redux/slices/cartSlice';
import {useSelector,useDispatch} from 'react-redux';
const DrinkCard = ({ id, title, weight, price, imageUrl }) => {
  const [titleCombo,description]=title.split('-');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [excludedIngredients, setExcludedIngredients] = React.useState([]);
  const selectedSauce = ""; 
  const handleAddToCart = () => {
    const item = {
      id,
      title: titleCombo,
      price: price,
      imageUrl: imageUrl,
      selectedIngredients,
      excludedIngredients,
      selectedSauce,
    };

    dispatch(addProduct(item));
    navigate('/basket');
};
  return (
    <div className="combo-card">
      <img src={imageUrl} alt={title} />
      <div className="combo-card-content">
        <h3>{titleCombo}</h3>
        <p className='descCombo'>{description}</p>
        <p>{weight} г</p>
        <h3 className='priceCombo'>{price} грн</h3>
      </div>
      <button className='buttonAddCombo' onClick={handleAddToCart}>+</button>
  </div>
  );
};

export default DrinkCard;
