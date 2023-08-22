import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/user/userSlice";
import apiSlice from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
