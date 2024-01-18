import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import paymentReducer from './slices/paymentSlice';
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart:cartReducer,
    user:userReducer,
    payment:paymentReducer,
  },
})