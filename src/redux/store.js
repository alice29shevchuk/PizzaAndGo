import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart:cartReducer,
    user:userReducer,
  },
})