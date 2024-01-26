import {createSlice} from '@reduxjs/toolkit';
const initialState={
    departments:[],
    selectedDepartment: 1,
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
            state.selectedDepartment = 1;
        },
    }
});
export const {setDepartments,selectDepartment,clearDepartment}=departmentSlice.actions;
export default departmentSlice.reducer;