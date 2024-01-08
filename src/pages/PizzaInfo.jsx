import axios from 'axios';
import React from 'react';
import {useParams} from 'react-router-dom';
export const PizzaInfo = () => {
    const {id} = useParams();
    const [pizza,setPizza] = React.useState();
    React.useEffect(()=>{
        async function fetchPizzas(){
            try{
                const {data} = await axios.get('https://6589685a324d41715258e658.mockapi.io/pizzas/'+id);
                setPizza(data);
            }catch(error){
                alert('Smth was wrong :(');
            }
        }
        fetchPizzas();
    },[]);
    if(!pizza){
        return 'Загрузка...';
    }
    return (
    <div className="pizza-block-wrapper">
        <div className="pizza-block">
            <img
            className="pizza-block__image"
            src={pizza.imageUrl}
            alt="Pizza"
            />
            <h4 className="pizza-block__title">{pizza.title}</h4>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {pizza.price} грн.</div>
            </div>
        </div>
    </div>
  )
}
