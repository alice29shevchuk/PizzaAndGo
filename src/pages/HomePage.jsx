import React, { useRef, useState } from 'react';
import { Pagination } from "../components/Pagination";
import Categories,{categories} from '../components/Categories'; 
import Sort,{list} from '../components/Sort';
import PizzaCard from '../components/PizzasCard';
import Skeleton from '../components/PizzasCard/Skeleton';
import { NotFoundCard } from '../components/NotFoundCard';
import { SearchContext } from '../App';
import {useSelector, useDispatch} from 'react-redux';
import {setCategoryId,setCurrentPage,setSelectedPageList,setPageCount,setFilters,resetFilters} from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import {Link, useNavigate} from 'react-router-dom';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import { PopularProducts } from '../components/PopularProducts';
import DrinksComponent from '../components/DrinksComponent';
import { Feedback } from '../components/Feedback';
export const HomePage = () => {
  const images = [
    {src: 'https://cdn.monopizza.com.ua/mp-ua/promotions/0001-kombo-dzhingl-bels-web-uk.png?alt=media&token=3eaed7f7-4afd-45d8-a326-aef97b66dce0}&w=1280&h=500&format=auto&mode=fit&q=60'},
    {src: 'https://cdn.monopizza.com.ua/mp-ua/promotions/0001-kombo-odin-vdoma-web-uk.png?alt=media&token=ba92bd11-cc46-4c7a-9e39-3dcffdc712b6}&w=1280&h=500&format=auto&mode=fit&q=60'},
    {src: 'https://cdn.monopizza.com.ua/mp-ua/promotions/0001-korisna-pica-isnuye-i-ce-monopica-web-uk.png?alt=media&token=d32b5754-630a-432b-8622-85ea7ad5a43d}&w=1280&h=500&format=auto&mode=fit&q=60'}
  ];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pizzas,setPizzas] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);

    const {searchValue}=React.useContext(SearchContext);
    // const search = searchValue?`&search=${searchValue}`:'';
    const search = searchValue?`&searchText=${searchValue}`:'';

    const {selectedCategoryId, selectedSortList, currentPage, selectedPageList, pageCount} = useSelector((state)=>state.filter);

    const pizzasPerPage = 4;

    const [notFound, setNotFound] = React.useState(false);
     
    const [orderSort,setOrderSort] = useState('');

    React.useEffect(() => {
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1));
        const newFilters = {};
    
        if (params.category) {
          newFilters.selectedCategoryId = parseInt(params.category, 10);
          delete params.category;
        }
    
        if (params.page) {
          newFilters.currentPage = parseInt(params.page, 10);
          delete params.page;
        }
    
        if (params.sort) {
          const selectedSort = list.find(item => item.sortBy === params.sort);
    
          if (selectedSort) {
            newFilters.selectedSortList = { name: selectedSort.name, sortBy: selectedSort.sortBy };
            newFilters.selectedSortList.order = orderSort;

            delete params.sort;
            delete params.order;
          }
        }
    
        dispatch(setFilters(newFilters));
        sessionStorage.setItem('filterState', JSON.stringify(newFilters));//////////////////////////////
      }
    }, []);
    
    React.useEffect(()=>{
      if(selectedCategoryId!==0){
        if(selectedSortList.sortBy.includes('-')){
          setOrderSort('desc');
        }
        else{
          setOrderSort('asc');
        }
        const queryString = qs.stringify({
          ...(selectedCategoryId && {category:selectedCategoryId}),
          ...(selectedSortList.sortBy && 
          { 
            sort:selectedSortList.sortBy,
            order:orderSort
          }),
          page:currentPage,
          ...(searchValue && { q: searchValue }), 
        });
        navigate(`?${queryString}`);
        sessionStorage.setItem('filterState', JSON.stringify({ selectedCategoryId ,selectedSortList, currentPage, orderSort }));///////////////
      }
    },[selectedCategoryId,selectedSortList,searchValue,currentPage,orderSort]);

    React.useEffect(() => {
      const savedFilterState = sessionStorage.getItem('filterState');///////////////////////
      if (savedFilterState) {
        const { selectedCategoryId, selectedSortList, currentPage, orderSort } = JSON.parse(savedFilterState);
        dispatch(setFilters({ selectedCategoryId, selectedSortList, currentPage, orderSort }));
      }
    }, []);

    React.useEffect(()=>{
        setIsLoading(true);
        axios.get(`http://alisa000077-001-site1.htempurl.com/api/Pizza/Search?${selectedCategoryId>0? `idCategory=${selectedCategoryId}`:''}&sortBy=${selectedSortList.sortBy.replace('-','')}&order=${selectedSortList.sortBy.includes('-')?'desc':'asc'}${search}`)
        .then((response)=>{
          if (response.data.length==0) {
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
    <>
    <div className='container'>
        <div className="content__top">
            <Categories value = {selectedCategoryId} onClickCategory={(id)=>{
              if(id==0){
                navigate('/');
                sessionStorage.removeItem('filterState');//////////
                dispatch(resetFilters());

              }
              dispatch(setCategoryId(id));
              dispatch(setCurrentPage(1));
              dispatch(setSelectedPageList(1));
            }}></Categories>
            <Sort></Sort>
          </div>
          <Slider images={images}></Slider>
          <h2 className="content__title">Популярные</h2>
          <PopularProducts></PopularProducts>
          <h2 className="content__title">Меню</h2>
          <div className={notFound?'content__items-notFound':'content__items'}>
          {
            isLoading 
            ? [...new Array(pizzasPerPage)].map((_,index)=><Skeleton key={index}/>)
            : notFound
            ? <NotFoundCard />
            :
            pizzas.map((obj)=><PizzaCard key={obj.id} {...obj}/>)
          }
        </div>
        {!notFound && (
        <Pagination onChangePage={handlePageChange} pageCount={pageCount} selectedPage={selectedPageList}></Pagination>
        )}
        <h2 className="content__title">Отзывы клиентов</h2>
        <Feedback></Feedback>
    </div>
    <Footer></Footer>
    </>
  )
}
