// src/utils/api.ts
import { environment } from '@/environments/environment';
import axios from 'axios';

// For  Unauthenticated (or static) call:
const api = axios.create({
  baseURL: environment.apiUrl, //process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api", // or wherever your backend lives
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: add interceptors for auth headers or logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g. show a toast, redirect to login, etc.)
    return Promise.reject(error);
  }
);

export default api;
