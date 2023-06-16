import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from "redux-persist";
import {apiSlice} from "./api/api.slice";
import authSlice from "./types/auth/auth.slice";
import {groupApiSlice} from "./types/group/group.api.slice.ts";
import {disciplineApiSlice} from "./types/discipline/discipline.api.slice.ts";

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: ["apiProductSlice"],
};

export const rootReducers = combineReducers({
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [groupApiSlice.reducerPath]: groupApiSlice.reducer,
    [disciplineApiSlice.reducerPath]: disciplineApiSlice.reducer,
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
            .concat(apiSlice.middleware)
            .concat(groupApiSlice.middleware)
            .concat(disciplineApiSlice.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export default store;
