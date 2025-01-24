import axios from 'axios';
import { store } from '../store/reducers/store';

export const API_BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

export const API_ENDPOINTS = {
  membership: {
    login: '/login',
    register: '/registration',
    profile: '/profile',
    profileImage: '/profile/image',
  },
  information: {
    banner: '/banner',
    services: '/services',
  },
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const state = store.getState();
  const token = state.membership.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getApiUrl = (endpoint: string): string => `${API_BASE_URL}${endpoint}`;
