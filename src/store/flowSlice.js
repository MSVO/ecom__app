import { createSlice } from "@reduxjs/toolkit";
import { LANDING } from "../hooks/useViewManager";

const initialState = {
  nextView: null,
  forwardViewStack: [],
  currentView: null,
  currentViewParams: null,
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
    popNextViewOrLandingToCurrent: (state) => {
      if (state.forwardViewStack.length >= 1) {
        state.currentView = state.forwardViewStack.pop();
      } else {
        state.currentView = LANDING;
      }
    },
    discardNextViews: (state) => {
      state.forwardViewStack = [];
    },
    resetFlow: (state) => {
      state.nextView = null;
      state.forwardViewStack = [];
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    pushCurrentView: (state) => {
      state.forwardViewStack.push(state.currentView);
    },
    pushCurrentViewAndSetNew: (state, action) => {
      state.forwardViewStack.push(state.currentView);
      state.currentView = action.payload;
    },
  },
});

export const {
  setNextView,
  clearNextView,
  pushNextView,
  popNextViewOrLandingToCurrent,
  discardNextViews,
  resetFlow,
  setCurrentView,
  pushCurrentView,
  pushCurrentViewAndSetNew,
} = flowSlice.actions;
const flowReducer = flowSlice.reducer;
export default flowReducer;
