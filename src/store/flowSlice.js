import { createSlice } from "@reduxjs/toolkit";
import { LANDING } from "../hooks/useViewManager";

export const flowSlice = createSlice({
  name: "flow",
  initialState: {
    nextView: null,
    forwardViewStack: [],
  },
  reducers: {
    setNextView: (state, action) => {
      state.nextView = action.payload;
    },
    clearNextView: (state) => {
      state.nextView = null;
    },
    pushNextView: (state, action) => {
      state.forwardViewStack.push(action.payload);
    },
    popNextViewOrLanding: (state) => {
      if (state.forwardViewStack.length >= 1) {
        return state.forwardViewStack.pop();
      } else {
        return LANDING;
      }
    },
    discardNextViews: (state) => {
      state.forwardViewStack = [];
    },
  },
});

export const {
  setNextView,
  clearNextView,
  pushNextView,
  popNextViewOrLanding,
  discardNextViews,
} = flowSlice.actions;
const flowReducer = flowSlice.reducer;
export default flowReducer;
