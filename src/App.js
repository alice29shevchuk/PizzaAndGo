import logo from './logo.svg';
import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories'; 
import Sort from './components/Sort';
import PizzaCard from './components/PizzaCard';
// import pizzas from './assets/pizzas.json';
import React from 'react';
import Skeleton from './components/Skeleton';
function App() {
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
  },[]);
  return (
  <div className="wrapper">
    <Header></Header>
      <div className="content">
        <div className="container">
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
      </div>
  </div>
  );
}

export default App;
// <PizzaCard key={obj.id} title = {obj.title} price={obj.price} imgUrl={obj.imageUrl} sizes = {obj.sizes} types={obj.types}/>
