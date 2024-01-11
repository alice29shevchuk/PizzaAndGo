import logo from './logo.svg';
import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import React from 'react';
import { HomePage } from './pages/HomePage';
import { BasketPage } from './pages/BasketPage';
import { NotFoundPage } from './pages/NotFoundPage';
import {Routes,Route} from 'react-router-dom';
import { PizzaInfo } from './pages/PizzaInfo';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { UserProfilePage } from './pages/UserProfilePage';
export const SearchContext = React.createContext('');
function App() {
  const[searchValue,setSearchValue] = React.useState('');
  return (
  <div className="wrapper">
    <SearchContext.Provider value={{searchValue,setSearchValue}}>
    {/* <Header searchValue={searchValue} setSearchValue={setSearchValue}></Header> */}
    <Header></Header>
      <div className="content">
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/basket' element={<BasketPage/>}></Route>
            <Route path='/pizza/:id' element={<PizzaInfo/>}></Route>
            <Route path='/registration' element={<RegisterPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/user-profile' element={<UserProfilePage/>}></Route>
            <Route path='*' element={<NotFoundPage/>}></Route>
          </Routes>
      </div>
    </SearchContext.Provider>
  </div>
  );
}

export default App;
// <PizzaCard key={obj.id} title = {obj.title} price={obj.price} imgUrl={obj.imageUrl} sizes = {obj.sizes} types={obj.types}/>
