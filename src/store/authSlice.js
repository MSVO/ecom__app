import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  name: "",
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
    setAuth: (state, action) => {
      const { name, token } = action.payload;
      state.name = name;
      state.token = token;
    },
    resetAuth: (state) => {
      state.token = initialState.token;
      state.name = initialState.name;
    },
  },
});

export const { setToken, clearToken, setAuth, resetAuth } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
