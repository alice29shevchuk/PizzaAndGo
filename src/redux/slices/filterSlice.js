import {createSlice} from '@reduxjs/toolkit';
const initialState={
    selectedCategoryId:0,
    selectedSortList:{
        name:'популярности 🠕',
        sortBy:'rating',
    },
    currentPage:1,//new
    selectedPageList:1,//new
    pageCount:1//new
}
const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        setCategoryId(state,action){
            state.selectedCategoryId=action.payload;
        },
        setSelectedSortList(state,action){
            state.selectedSortList=action.payload;
        },
        setCurrentPage(state,action){
            state.currentPage=action.payload;
        },
        setSelectedPageList(state,action){
            state.selectedPageList=action.payload;
        },
        setPageCount(state,action){
            state.pageCount=action.payload;
        },
        setFilters(state,action){
            return { ...state, ...action.payload };

            //state.currentPage = Number(action.payload.currentPage);
            // state.selectedSortList = action.payload.selectedSortList;
            //state.selectedCategoryId = Number(action.payload.selectedCategoryId);
        },
        resetFilters: (state) => {
            return initialState;
          },
    }
});
export const {setCategoryId,setSelectedSortList,setCurrentPage,setSelectedPageList,setPageCount,setFilters,resetFilters}=filterSlice.actions;
export default filterSlice.reducer;