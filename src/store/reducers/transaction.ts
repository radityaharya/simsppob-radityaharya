import { createSlice } from '@reduxjs/toolkit';
import {
  getBalance,
  getTransactionHistory,
  postTopup,
  postTransaction,
} from '../actions/transaction';
import { z } from 'zod';
import { TransactionDataSchema } from '~/types/schemas/transaction';

type TransactionRecord = z.infer<typeof TransactionDataSchema>;

interface TransactionState {
  balance: number | null;
  loading: boolean;
  error: string | null;
  history: TransactionRecord[] | null;
}

const initialState: TransactionState = {
  balance: null,
  loading: false,
  error: null,
  history: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearTransactionState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload?.balance ?? null;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postTopup.fulfilled, (state, action) => {
        state.balance = action.payload?.balance ?? state.balance;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        if (action.payload) {
          state.balance = state.balance ? state.balance - action.payload.total_amount : null;
        }
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.history = action.payload?.records ?? null;
      });
  },
});

export const { clearTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
