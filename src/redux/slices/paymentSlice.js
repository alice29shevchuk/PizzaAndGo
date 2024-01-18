import {createSlice} from '@reduxjs/toolkit';
const initialState={
    isAuthorized: false,
    phoneNumber: '',
    paymentMethod: 'card',
    order: {
        name: '',
        phoneNumber: '',
        products: [],
        totalPrice: 0,
        comment:''
    },
}
const paymentSlice = createSlice({
    name:'payment',
    initialState,
    reducers:{
        authorizeUser: (state) => {
            state.isAuthorized = true;
          },
          setPhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
          },
          setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
          },
          setOrder: (state, action) => {
            state.order = action.payload;
          },
    }
});
export const { authorizeUser, setPhoneNumber, setPaymentMethod, setOrder}=paymentSlice.actions;
export default paymentSlice.reducer;