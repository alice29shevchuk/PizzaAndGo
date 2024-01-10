import {createSlice} from '@reduxjs/toolkit';
const initialState={
    name:null,
    phone:null,
    email:null,
    token:null,
    id:null
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action){
            state.email=action.payload.email;
            state.token=action.payload.token;
            state.id=action.payload.id;
            state.name=action.payload.name;
            state.phone=action.payload.phone;
        },
        editUser(state,action){

        },
        deleteUser(state){
            state.email=null;
            state.token=null;
            state.id=null;
            state.name=null;
            state.phone=null;       
        }
    }
});
export const {setUser,editUser,deleteUser}=userSlice.actions;
export default userSlice.reducer;