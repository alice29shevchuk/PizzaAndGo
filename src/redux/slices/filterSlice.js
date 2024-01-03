import {createSlice} from '@reduxjs/toolkit';
const initialState={
    selectedCategoryId:0,
    selectedSortList:{
        name:'популярности 🠕',
        sortBy:'rating',
    },
    currentPage:1,//new
    selectedPageList:1//new
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
        }
    }
});
export const {setCategoryId,setSelectedSortList,setCurrentPage,setSelectedPageList}=filterSlice.actions;
export default filterSlice.reducer;