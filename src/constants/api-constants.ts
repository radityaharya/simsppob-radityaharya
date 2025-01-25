import axios from 'axios';
import { store } from '../store/reducers/store';
import { clearAuth } from '~/store/reducers/membership';

export const API_BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

export const API_ENDPOINTS = {
  membership: {
    login: '/login',
    register: '/registration',
    profile: '/profile',
    profileUpdate: '/profile/update',
    profileImage: '/profile/image',
  },
  information: {
    banner: '/banner',
    services: '/services',
  },
  transaction: {
    balance: '/balance',
    topup: '/topup',
    transaction: '/transaction',
    transactionHistory: '/transaction/history',
  },
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token = store.getState().membership.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth());
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
