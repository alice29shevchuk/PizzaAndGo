import {createSlice} from '@reduxjs/toolkit';
const initialState={
    name:null,
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
        },
        editUser(state,action){

        },
        deleteUser(state){
            state.email=null;
            state.token=null;
            state.id=null;
            state.name=null;
        }
    }
});
export const {setUser,editUser,deleteUser}=userSlice.actions;
export default userSlice.reducer;