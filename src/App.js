import logo from './logo.svg';
import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories'; 
import Sort from './components/Sort';
import PizzaCard from './components/PizzaCard';
function App() {
  return (
<div class="wrapper">
  <Header></Header>
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories></Categories>
            <Sort></Sort>
          </div>
          <h2 class="content__title">Меню</h2>
          <div class="content__items">
          <PizzaCard></PizzaCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
