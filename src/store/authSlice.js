import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  name: "",
  roles: [],
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
      const { name, token, roles } = action.payload;
      state.name = name;
      state.token = token;
      state.roles = roles;
    },
    resetAuth: (state) => {
      state.token = initialState.token;
      state.name = initialState.name;
      state.roles = [];
    },
  },
});

export const { setToken, clearToken, setAuth, resetAuth } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
