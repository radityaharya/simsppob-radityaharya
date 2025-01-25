import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  showBalance: boolean;
}

const initialState: UIState = {
  showBalance: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleBalanceVisibility: state => {
      state.showBalance = !state.showBalance;
    },
    setBalanceVisibility: (state, action) => {
      state.showBalance = action.payload;
    },
  },
});

export const { toggleBalanceVisibility, setBalanceVisibility } = uiSlice.actions;
export default uiSlice.reducer;
