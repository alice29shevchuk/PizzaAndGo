import {createSlice} from '@reduxjs/toolkit';
const initialState={
    departments:[],
    selectedDepartment: null,
}
const departmentSlice = createSlice({
    name:'department',
    initialState,
    reducers:{
        setDepartments:(state,action)=>{
            state.departments = action.payload;
        },
        selectDepartment: (state, action) => {
            state.selectedDepartment = action.payload;
        },
        clearDepartment: (state) => {
            state.selectedDepartment = null;
        },
    }
});
export const {setDepartments,selectDepartment,clearDepartment}=departmentSlice.actions;
export default departmentSlice.reducer;