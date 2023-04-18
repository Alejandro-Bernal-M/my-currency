import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allCurrencies: {
    usd: 'United States Dollar',
    eur: 'Euro',
    gbp: 'British Pound',
  },
  usdPrice: {
    usd: 1,
    eur: 0.85,
    gbp: 0.76,
  }
};

export const  getCurrencies = createAsyncThunk(
  'currency/getCurrencies',
  async () => {
    const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
    const data = await response.json();
    return data;
  }
)

export const getCurrencyPrice = createAsyncThunk(
  'currency/getCurrencyPrice',
  async () => {
    const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json');
    const data = await response.json();
    return data;
  }
)


const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
      return {
        ...state,
        allCurrencies: action.payload,
       }
    }); 
    builder.addCase(getCurrencyPrice.fulfilled, (state, action) => {
      return {
        ...state,
        usdPrice: action.payload.usd,
      }
    });
  }
});

export default currencySlice.reducer;