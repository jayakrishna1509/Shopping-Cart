import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// User APIs
export const createUser = (username, password) => {
  return api.post('/users', { username, password });
};

export const loginUser = (username, password) => {
  return api.post('/users/login', { username, password });
};

export const logoutUser = () => {
  return api.post('/users/logout');
};

// Item APIs
export const getItems = () => {
  return api.get('/items');
};

export const createItem = (itemData) => {
  return api.post('/items', itemData);
};

// Cart APIs
export const addToCart = (itemId) => {
  return api.post('/carts', { itemId });
};

export const getCart = () => {
  return api.get('/carts');
};

// Order APIs
export const createOrder = () => {
  return api.post('/orders');
};

export const getOrders = () => {
  return api.get('/orders');
};

export default api;
