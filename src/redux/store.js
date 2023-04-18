import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";

const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

export default store;