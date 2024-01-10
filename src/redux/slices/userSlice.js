import {createSlice} from '@reduxjs/toolkit';
const initialState={
    email:null,
    token:null,
    id:null
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action){
            // state.name=action.payload.name;
            // state.surname=action.payload.surname;
            // state.phoneNumber=action.payload.phoneNumber;
            state.email=action.payload.email;
            // state.birthDate=action.payload.birthDate;
            // state.city=action.payload.city;
            state.token=action.payload.token;
            state.id=action.payload.id;
        },
        editUser(state,action){

        },
        deleteUser(state){
            state.email=null;
            state.token=null;
            state.id=null        
        }
    }
});
export const {setUser,editUser,deleteUser}=userSlice.actions;
export default userSlice.reducer;