import {createSlice} from '@reduxjs/toolkit';
const initialState={
    totalPrice:0,
    items:[],
    selectedIngredients: [],
    excludedIngredients:[],
    selectedSauce: '',
}
const storedCart = sessionStorage.getItem('cart');/////////////////////////
    if (storedCart) {
      const { totalPrice, items } = JSON.parse(storedCart);
      initialState.items=items;
      initialState.totalPrice=totalPrice;

    }
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addProduct(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && 
            JSON.stringify(obj.selectedIngredients) === JSON.stringify(action.payload.selectedIngredients) && 
            JSON.stringify(obj.excludedIngredients) === JSON.stringify(action.payload.excludedIngredients)&&
            obj.selectedSauce === action.payload.selectedSauce);
            
            if (findItem) {
              findItem.count++;
            } else {
              state.items.push({
                ...action.payload,
                count: 1,
              });
            }
          
            state.totalPrice = state.items.reduce((sum, obj) => {
              return (obj.price * obj.count) + sum;
            }, 0);
            sessionStorage.setItem('cart', JSON.stringify(state));////////////////////////

          },
        deleteProduct(state, action) {
            const { id, selectedIngredients,excludedIngredients,selectedSauce } = action.payload;
            state.items = state.items.filter((obj) => {
              return !(obj.id === id && 
                JSON.stringify(obj.selectedIngredients) === JSON.stringify(selectedIngredients) && 
                JSON.stringify(obj.excludedIngredients) === JSON.stringify(excludedIngredients) &&
                obj.selectedSauce === selectedSauce);
            });
          
            state.totalPrice = state.items.reduce((sum, obj) => {
              return (obj.price * obj.count) + sum;
            }, 0);
            sessionStorage.setItem('cart', JSON.stringify(state));/////////////////////////

          },
        minusCount(state, action) {
            const { id, selectedIngredients,excludedIngredients,selectedSauce } = action.payload;
            const findItem = state.items.find((obj) => obj.id === id && 
            JSON.stringify(obj.selectedIngredients) === JSON.stringify(selectedIngredients) && 
            JSON.stringify(obj.excludedIngredients) === JSON.stringify(excludedIngredients) &&
            obj.selectedSauce === selectedSauce);
            
            if (findItem && findItem.count > 1) {
              findItem.count--;
            }
          
            state.totalPrice = state.items.reduce((sum, obj) => {
              return sum + (obj.price * obj.count);
            }, 0);
            sessionStorage.setItem('cart', JSON.stringify(state));/////////////////////////////

          },
        clearProducts(state){
            state.items=[];
            state.totalPrice=0;
            sessionStorage.removeItem('cart');/////////////////////////

        },
        updateTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        updateSelectedIngredients: (state, action) => {
            state.selectedIngredients = action.payload;
        },
        increaseCartItem: (state, action) => {
            const { id } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
      
            if (existingItem) {
              existingItem.count += 1;
            }
        },
        updateExcludedIngredients(state, action) {
          state.excludedIngredients = action.payload;
        },
        updateSelectedSauce: (state, action) => {
          state.selectedSauce = action.payload;
        },
        setCart: (state, action) => {
          state.items = action.payload;
        },
    }
});
export const cartSelector=(state)=>state.cart;
export const {addProduct,deleteProduct,minusCount,clearProducts,updateTotalPrice,updateSelectedIngredients,increaseCartItem,updateExcludedIngredients,updateSelectedSauce,setCart}=cartSlice.actions;
export default cartSlice.reducer;