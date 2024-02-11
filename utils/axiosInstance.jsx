// axiosInstance.js
import axios from 'axios';
import store from '@/provider/redux/store';
import { baseURL } from './BaseURL';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    // Get the token from Redux store
    const token = store.getState().auth.token; 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
