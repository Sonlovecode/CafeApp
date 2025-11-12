export const API_BASE_URL = 'http://3.106.128.235/api';

import axios from 'axios';
const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;