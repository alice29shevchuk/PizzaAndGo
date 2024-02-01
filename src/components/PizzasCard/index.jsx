import React from "react";
import { useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import {addProduct} from '../../redux/slices/cartSlice';
import {Link} from 'react-router-dom';
import {cartSelector, clearProducts} from '../../redux/slices/cartSlice';
const doughType = ['тонкое','обычное'];

function PizzaCard({id,title,price,imageUrl,weight,types}){
    const dispatch=useDispatch();
    // const[activeDoughType,setActiveDoughType] = useState(types[0]);
    const[activeSize,setActiveSize] = useState(0);
    const {items} = useSelector(cartSelector);
    const totalCount = items.reduce((sum,item)=>sum+item.count,0);
    const cartProduct = useSelector(state=>state.cart.items.find((obj)=>obj.id===id));
    const cartProductCount =cartProduct? totalCount:0;
    return(
        <div className="pizza-block-wrapper">
          <div className="pizza-block">
            <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
            />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__bottom">
          <div>
          <p className="pizzasWeight">{weight} г</p>
          <div className="pizza-block__price">{price} грн</div>
          </div>
          <Link to={`/pizza/${id}`}>
          <button className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Детальнее</span>
            {cartProductCount>0 && <i>{totalCount}</i>}
          </button>
          </Link>
        </div>
      </div>
      </div>
    );
}
export default PizzaCard;