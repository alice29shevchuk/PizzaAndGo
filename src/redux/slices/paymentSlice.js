import {createSlice} from '@reduxjs/toolkit';
const initialState={
    isAuthorized: false,
    order: {
        number:'',
        id:0,
        name: '',
        email:'',
        phoneNumber: '',
        products: [],
        totalPrice: 0,
        comment:'',
        paymentMethod: '',
        orderData:'',
        city:'',
        department:'',
    },
}
const paymentSlice = createSlice({
    name:'payment',
    initialState,
    reducers:{
        authorizeUser: (state) => {
            state.isAuthorized = true;
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