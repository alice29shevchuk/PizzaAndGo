import {createSlice} from '@reduxjs/toolkit';
const initialState={
    selectedCategoryId:0,
    selectedSortList:{
        name:'популярности 🠕',
        sortBy:'rating',
    }
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
        }
    }
});
export const {setCategoryId,setSelectedSortList}=filterSlice.actions;
export default filterSlice.reducer;