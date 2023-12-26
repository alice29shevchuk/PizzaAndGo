import React from 'react';

import Categories from '../components/Categories'; 
import Sort from '../components/Sort';
import PizzaCard from '../components/PizzasCard';
import Skeleton from '../components/PizzasCard/Skeleton';

export const HomePage = () => {
    const [pizzas,setPizzas] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);

    const [selectedCategoryId,setSelectedCategoryId]= React.useState(0);
    const [selectedSortList,setSelectedSortList] = React.useState({
      name:'популярности 🠕',
      sortBy:'rating',
    });
    React.useEffect(()=>{
      setIsLoading(true);
      fetch(`https://6589685a324d41715258e658.mockapi.io/pizzas?${selectedCategoryId>0? `category=${selectedCategoryId}`:''}&sortBy=${selectedSortList.sortBy.replace('-','')}&order=${selectedSortList.sortBy.includes('-')?'desc':'asc'}`)
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setPizzas(data);
        setIsLoading(false);
      })
      window.scrollTo(0,0);
    },[selectedCategoryId,selectedSortList]);
  return (
    <div className='container'>
        <div className="content__top">
            <Categories value = {selectedCategoryId} onClickCategory={(id)=>setSelectedCategoryId(id)}></Categories>
            <Sort value={selectedSortList} onClickSortList={(i)=>setSelectedSortList(i)}></Sort>
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
