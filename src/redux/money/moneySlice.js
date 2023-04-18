import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 1,
};

const moneySlice = createSlice({
  name: 'money',
  initialState,
  reducers: {
    changeMoney: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeMoney } = moneySlice.actions;
export default moneySlice.reducer;
