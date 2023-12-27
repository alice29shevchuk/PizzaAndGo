import React from 'react';
import { Pagination } from "../components/Pagination";
import Categories from '../components/Categories'; 
import Sort from '../components/Sort';
import PizzaCard from '../components/PizzasCard';
import Skeleton from '../components/PizzasCard/Skeleton';
import { NotFoundPage } from './NotFoundPage';
import { useNavigate } from "react-router-dom";

export const HomePage = ({searchValue}) => {
  let navigate = useNavigate();
    const [pizzas,setPizzas] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);
    const [selectedCategoryId,setSelectedCategoryId]= React.useState(0);
    const [selectedSortList,setSelectedSortList] = React.useState({
      name:'популярности 🠕',
      sortBy:'rating',
    });
    const search = searchValue?`&search=${searchValue}`:'';
    const[currentPage,setCurrentPage] = React.useState(1);
    const[pageCount,setPageCount] = React.useState(1);
    React.useEffect(()=>{
      setIsLoading(true);
      fetch(`https://6589685a324d41715258e658.mockapi.io/pizzas?page=${currentPage}&limit=4&${selectedCategoryId>0? `category=${selectedCategoryId}`:''}&sortBy=${selectedSortList.sortBy.replace('-','')}&order=${selectedSortList.sortBy.includes('-')?'desc':'asc'}${search}`)
      .then((response)=>{
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data)=>{
        setPizzas(data);
        setPageCount(data.length);
        setIsLoading(false);
      })
      .catch(error => {
        return navigate("*");
      });
      window.scrollTo(0,0);
    },[selectedCategoryId,selectedSortList,searchValue,currentPage]);
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
            :pizzas
            // .filter((obj)=>{
            //   if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
            //     return true;
            //   }
            //   return false;
            // })
            .map((obj)=><PizzaCard key={obj.id} {...obj}/>)
          }
        </div>
        <Pagination onChangePage = {(number)=>setCurrentPage(number)} pageCount = {pageCount}></Pagination>
    </div>
  )
}
