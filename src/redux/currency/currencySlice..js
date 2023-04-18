import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  usd: 'United States Dollar',
  eur: 'Euro',
  gbp: 'British Pound',
};

export const  getCurrencies = createAsyncThunk(
  'currency/getCurrencies',
  async () => {
    const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
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
      return action.payload;
    }); 
  }
});

export default currencySlice.reducer;