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
  pagination: {
    offset: number;
    limit: number;
    hasMore: boolean;
  };
}

const initialState: TransactionState = {
  balance: null,
  loading: false,
  error: null,
  history: null,
  pagination: {
    offset: 0,
    limit: 10,
    hasMore: true,
  },
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
      .addCase(getTransactionHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.history =
            action.meta.arg.offset === 0
              ? action.payload.records
              : [...(state.history || []), ...action.payload.records];
          state.pagination = {
            offset: action.meta.arg.offset ?? 0,
            limit: action.meta.arg.limit ?? initialState.pagination.limit,
            hasMore:
              action.payload.records.length ===
              (action.meta.arg.limit ?? initialState.pagination.limit),
          };
        }
      })
      .addCase(getTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
