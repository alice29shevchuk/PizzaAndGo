import {createSlice} from '@reduxjs/toolkit';
const initialState={
    cities:[],
    selectedCityId: 1,
}
const citySlice = createSlice({
    name:'city',
    initialState,
    reducers:{
        setCities:(state,action)=>{
            state.cities = action.payload;
        },
        selectCity: (state, action) => {
            state.selectedCityId = action.payload;
        },
        clearCity: (state) => {
            state.selectedCityId = 1;
        },
    }
});
export const {setCities,selectCity,clearCity}= citySlice.actions;
export default citySlice.reducer;