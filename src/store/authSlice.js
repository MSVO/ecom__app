import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  name: "",
  roles: [],
  userId: null,
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
      const { name, token, roles, userId } = action.payload;
      state.name = name;
      state.token = token;
      state.roles = roles;
    },
    resetAuth: (state) => {
      state.token = initialState.token;
      state.name = initialState.name;
      state.roles = [];
      state.userId = null;
    },
  },
});

export const { setToken, clearToken, setAuth, resetAuth } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
