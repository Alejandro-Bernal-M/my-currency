import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currency/currencySlice";

const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

export default store;