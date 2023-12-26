import React from 'react';

import Categories from '../components/Categories'; 
import Sort from '../components/Sort';
import PizzaCard from '../components/PizzasCard';
import Skeleton from '../components/PizzasCard/Skeleton';

export const HomePage = () => {
    const [pizzas,setPizzas] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);
    React.useEffect(()=>{
      fetch('https://6589685a324d41715258e658.mockapi.io/pizzas')
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setPizzas(data);
        setIsLoading(false);
      })
      window.scrollTo(0,0);
    },[]);
  return (
    <div className='container'>
        <div className="content__top">
            <Categories></Categories>
            <Sort></Sort>
          </div>
          <h2 className="content__title">Меню</h2>
          <div className="content__items">
          {
            isLoading 
            ? [...new Array(6)].map((_,index)=><Skeleton key={index}/>)
            :pizzas.map((obj)=><PizzaCard key={obj.id} {...obj}/>)
          }
        </div>
    </div>
  )
}
