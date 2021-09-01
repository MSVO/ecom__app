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
    removeProduct: (state, action) => {
      let newlist = [...state.products];
      console.log(newlist);
      newlist = newlist.filter((p) => p.id !== action.payload);
      console.log(newlist);
      state.products = newlist;
    },
    changeQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      const newProducts = [...state.products];
      newProducts.find((e) => e.id === id).quantity = newQuantity;
      state.products = newProducts;
    },
  },
});

export const {
  addProduct,
  clearCart,
  clearCartAndAddProduct,
  resetCart,
  removeProduct,
  changeQuantity,
} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
