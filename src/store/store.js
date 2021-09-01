import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import flowReducer from "./flowSlice";

const persistAuthConfig = {
  key: "auth",
  version: 2,
  storage,
};

const persistFlowConfig = {
  key: "flow",
  version: 2,
  storage,
};

const persistCartConfig = {
  key: "cart",
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedFlowReducer = persistReducer(persistFlowConfig, flowReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    flow: persistedFlowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
