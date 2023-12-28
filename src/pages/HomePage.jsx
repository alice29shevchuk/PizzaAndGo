import React from 'react';
import { Pagination } from "../components/Pagination";
import Categories from '../components/Categories'; 
import Sort from '../components/Sort';
import PizzaCard from '../components/PizzasCard';
import Skeleton from '../components/PizzasCard/Skeleton';
import { NotFoundCard } from '../components/NotFoundCard';
import { SearchContext } from '../App';

export const HomePage = () => {
    const {searchValue}=React.useContext(SearchContext);
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
    const [notFound, setNotFound] = React.useState(false); 
    const pizzasPerPage = 4; // Количество пицц на одной странице
    React.useEffect(()=>{
      setIsLoading(true);
      fetch(`https://6589685a324d41715258e658.mockapi.io/pizzas?page=${currentPage}&${selectedCategoryId>0? `category=${selectedCategoryId}`:''}&sortBy=${selectedSortList.sortBy.replace('-','')}&order=${selectedSortList.sortBy.includes('-')?'desc':'asc'}${search}`)
      .then((response)=>{
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        else{
          setNotFound(false); 
          return response.json();
        }
      })
      .then((data)=>{
        const startIndex = (currentPage - 1) * pizzasPerPage;
        const endIndex = startIndex + pizzasPerPage;
        const slicedPizzas = data.slice(startIndex, endIndex);
  
        setPizzas(slicedPizzas);
        setPageCount(Math.ceil(data.length / pizzasPerPage));
        setIsLoading(false);

        // setPizzas(data);
        // setPageCount(data.length);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setNotFound(true); 
        setIsLoading(false);
      });
      window.scrollTo(0,0);
    },[selectedCategoryId,selectedSortList,searchValue,currentPage,notFound]);
  return (
    <div className='container'>
        <div className="content__top">
            <Categories value = {selectedCategoryId} onClickCategory={(id)=>setSelectedCategoryId(id)}></Categories>
            <Sort value={selectedSortList} onClickSortList={(i)=>setSelectedSortList(i)}></Sort>
          </div>
          <h2 className="content__title">Меню</h2>
          <div className={notFound?'content__items-notFound':'content__items'}>
          {
            isLoading 
            ? [...new Array(6)].map((_,index)=><Skeleton key={index}/>)
            : notFound
            ? <NotFoundCard />
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
        {!notFound && (
        <Pagination onChangePage={(number) => setCurrentPage(number)} pageCount={pageCount}></Pagination>
      )}
    </div>
  )
}
