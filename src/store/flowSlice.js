import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nextView: null,
  forwardViewStack: [],
};
export const flowSlice = createSlice({
  name: "flow",
  initialState,
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
    popNextView: (state) => {
      if (state.forwardViewStack.length >= 1) {
        state.forwardViewStack.pop();
      }
    },
    discardNextViews: (state) => {
      state.forwardViewStack = [];
    },
    resetFlow: (state) => {
      state.nextView = null;
      state.forwardViewStack = [];
    },
  },
});

export const {
  setNextView,
  clearNextView,
  pushNextView,
  popNextView,
  discardNextViews,
  resetFlow,
} = flowSlice.actions;
const flowReducer = flowSlice.reducer;
export default flowReducer;
