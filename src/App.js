import logo from './logo.svg';
import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories'; 
import Sort from './components/Sort';
import PizzaCard from './components/PizzaCard';
import pizzas from './assets/pizzas.json';
function App() {
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
            pizzas.map((obj)=>(
            // <PizzaCard title = {obj.title} price={obj.price} imgUrl={obj.imageUrl} sizes = {obj.sizes} types={obj.types}/>
            <PizzaCard {...obj}/>
            ))
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
