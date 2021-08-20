import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    clearCart: (state) => {
      state.products = [];
    },
    clearCartAndAddProduct: (state, action) => {
      state.products = [action.payload];
    },
  },
});

export const { addProduct, clearCart, clearCartAndAddProduct, resetCart } =
  cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
