import { configureStore } from "@reduxjs/toolkit";
import { authCarrierApiSlice } from "./api/authCarrierApiSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    [authCarrierApiSlice.reducerPath]: authCarrierApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authCarrierApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
