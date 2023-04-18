import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currency/currencySlice";
import moneyReducer from "./money/moneySlice";

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    money: moneyReducer,
  },
});

export default store;