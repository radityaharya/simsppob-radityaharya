import { ThunkDispatch, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import membershipReducer from './membership';
import informationReducer from './information';
import transactionReducer from './transaction';
import uiReducer from './ui';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AuthState } from '~/types/auth';
import { InformationState } from './information';
import { TransactionState } from './transaction';

export interface RootState {
  membership: AuthState;
  information: InformationState;
  transaction: TransactionState;
  ui: {
    showBalance: boolean;
  };
}

const rootReducer = combineReducers({
  membership: membershipReducer,
  information: informationReducer,
  transaction: transactionReducer,
  ui: uiReducer,
});

const timestampTransform = createTransform(
  (inboundState: any) => ({
    ...inboundState,
    lastUpdated: Date.now(),
  }),
  (outboundState: any) => ({
    ...outboundState,
    loading: false,
  })
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['membership', 'information', 'transaction'],
  transforms: [timestampTransform],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
