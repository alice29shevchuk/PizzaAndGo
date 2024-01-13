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
        <div className="pizza-info">
        <div>
        <h2>{pizza.title}</h2>
          <img src={pizza.imageUrl} alt="Pizza" />
          <p>{pizza.ingredients.join(', ')}</p>
          <div>
            <h5>Соус:</h5>
            <label>
              <input type="checkbox" />
              {pizza.sauce}
            </label>
          </div>
          <div>
            <h5>Добавить ингредиенты:</h5>
            {pizza.ingredientsAdd.map((ingredient) => (
              <div key={ingredient.name}>
                <label>
                  <input type="checkbox" />
                  {`${ingredient.name} (+${ingredient.price} грн)`}
                </label>
              </div>
            ))}
          </div>
          <div>
            <h5>Исключить ингредиенты:</h5>
            {pizza.ingredientsExcept.map((ingredient) => (
              <div key={ingredient}>
                <label>
                  <input type="checkbox" />
                  {`${ingredient}`}
                </label>
              </div>
            ))}
          </div>
          <div>{pizza.price} грн</div>
        </div>
      </div>
  )
}
