import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./api";
import productsSearchSliceReducer from "../features/products/productsSearchSlice";

export const store = configureStore({
    reducer: {
        productsSearch: productsSearchSliceReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch