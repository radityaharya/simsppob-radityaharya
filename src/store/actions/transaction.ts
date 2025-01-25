import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, API_ENDPOINTS } from '../../constants/api-constants';
import { z } from 'zod';
import { TransactionSchemas } from '~/types/schemas/transaction';
import { RootState } from '../reducers/store';
import { handleApiRequest } from './helper';

export const getBalance = createAsyncThunk<
  z.infer<typeof TransactionSchemas.balance.response>['data'],
  void,
  { state: RootState; rejectValue: string }
>('transaction/getBalance', async (_, { rejectWithValue }) => {
  const request = apiClient.get(API_ENDPOINTS.transaction.balance);
  return await handleApiRequest(request, TransactionSchemas.balance.response, rejectWithValue);
});

export const postTopup = createAsyncThunk<
  z.infer<typeof TransactionSchemas.topup.response>['data'],
  z.infer<typeof TransactionSchemas.topup.body>,
  { state: RootState; rejectValue: string }
>('transaction/postTopup', async (topupData, { rejectWithValue }) => {
  const request = apiClient.post(API_ENDPOINTS.transaction.topup, topupData);
  return await handleApiRequest(request, TransactionSchemas.topup.response, rejectWithValue);
});

export const postTransaction = createAsyncThunk<
  z.infer<typeof TransactionSchemas.transaction.response>['data'],
  z.infer<typeof TransactionSchemas.transaction.body>,
  { state: RootState; rejectValue: string }
>('transaction/postTransaction', async (transactionData, { rejectWithValue }) => {
  const request = apiClient.post(API_ENDPOINTS.transaction.transaction, transactionData);
  return await handleApiRequest(request, TransactionSchemas.transaction.response, rejectWithValue);
});

export const getTransactionHistory = createAsyncThunk<
  z.infer<typeof TransactionSchemas.transactionHistory.response>['data'],
  z.infer<typeof TransactionSchemas.transactionHistory.query>,
  { state: RootState; rejectValue: string }
>('transaction/getHistory', async (params, { rejectWithValue }) => {
  const request = apiClient.get(API_ENDPOINTS.transaction.transactionHistory, { params });
  return await handleApiRequest(
    request,
    TransactionSchemas.transactionHistory.response,
    rejectWithValue
  );
});
