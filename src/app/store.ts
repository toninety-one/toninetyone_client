import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import useCartSlice from "./types/cart/cart.slice";
import { identityApi } from "./types/identity.api";
import { apiSlice } from "./api/api.slice";
import authSlice from "./types/auth/auth.slice";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["apiProductSlice"],
};

export const rootReducers = combineReducers({
  cart: useCartSlice.reducer,
  auth: authSlice,
  [identityApi.reducerPath]: identityApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(identityApi.middleware)
      .concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export default store;
