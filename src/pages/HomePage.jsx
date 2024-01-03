import React from 'react';
import { Pagination } from "../components/Pagination";
import Categories from '../components/Categories'; 
import Sort from '../components/Sort';
import PizzaCard from '../components/PizzasCard';
import Skeleton from '../components/PizzasCard/Skeleton';
import { NotFoundCard } from '../components/NotFoundCard';
import { SearchContext } from '../App';
import {useSelector, useDispatch} from 'react-redux';
import {setCategoryId,setCurrentPage,setSelectedPageList,setPageCount} from '../redux/slices/filterSlice';
import axios from 'axios';
export const HomePage = () => {
    const dispatch = useDispatch();

    const [pizzas,setPizzas] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);

    const {searchValue}=React.useContext(SearchContext);
    const search = searchValue?`&search=${searchValue}`:'';

    const {selectedCategoryId, selectedSortList, currentPage, selectedPageList, pageCount} = useSelector((state)=>state.filter);

    const pizzasPerPage = 4;

    const [notFound, setNotFound] = React.useState(false); 

    React.useEffect(()=>{
      setIsLoading(true);
      axios.get(`https://6589685a324d41715258e658.mockapi.io/pizzas?page=${currentPage}&${selectedCategoryId>0? `category=${selectedCategoryId}`:''}&sortBy=${selectedSortList.sortBy.replace('-','')}&order=${selectedSortList.sortBy.includes('-')?'desc':'asc'}${search}`)
      .then((response)=>{
        console.log(response.data);
        if (!response.data) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        else{
          setNotFound(false); 
          const startIndex = (currentPage - 1) * pizzasPerPage;
          const endIndex = startIndex + pizzasPerPage;
          const slicedPizzas = response.data.slice(startIndex, endIndex);
          setPizzas(slicedPizzas);
          dispatch(setPageCount(Math.ceil(response.data.length / pizzasPerPage)));
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setNotFound(true); 
      })
      .finally(setNotFound(false));
      window.scrollTo(0,0);
    },[selectedCategoryId,selectedSortList,searchValue,currentPage]);

    const handlePageChange = (selectedPage) => {
      dispatch(setCurrentPage(selectedPage));
      dispatch(setSelectedPageList(selectedPage));
    };
  return (
    <div className='container'>
        <div className="content__top">
            <Categories value = {selectedCategoryId} onClickCategory={(id)=>{
              dispatch(setCategoryId(id));
              dispatch(setCurrentPage(1));
              dispatch(setSelectedPageList(1));
            }}></Categories>
            <Sort></Sort>
          </div>
          <h2 className="content__title">Меню</h2>
          <div className={notFound?'content__items-notFound':'content__items'}>
          {
            isLoading 
            ? [...new Array(pizzasPerPage)].map((_,index)=><Skeleton key={index}/>)
            : notFound
            ? <NotFoundCard />
            :pizzas
            .map((obj)=><PizzaCard key={obj.id} {...obj}/>)
          }
        </div>
        {!notFound && (
        <Pagination onChangePage={handlePageChange} pageCount={pageCount} selectedPage={selectedPageList}></Pagination>
        )}
    </div>
  )
}
