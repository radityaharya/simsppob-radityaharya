import axios from 'axios';

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const API_ENDPOINTS = {
  POSTS: '/posts',
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getApiUrl = (endpoint: string): string => `${API_BASE_URL}${endpoint}`;
