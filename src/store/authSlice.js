import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken, resetAuth } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
