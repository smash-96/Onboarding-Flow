import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/userAuthSlice";

export const store = configureStore({
  reducer: {
    authUser: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
