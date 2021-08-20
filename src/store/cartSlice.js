import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
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

export const { addProduct, clearCart, clearCartAndAddProduct } =
  cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
