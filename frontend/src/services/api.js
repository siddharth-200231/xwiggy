import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const { token } = JSON.parse(userData);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const endpoints = {
  login: '/login',
  register: '/register',
  menu: '/menu',
  cart: '/cart',
  addToCart: '/addToCart',
  checkout: '/changeDB',
  checkUsername: '/checkUserName',
  addNewItem: '/addNewItem',
  addNewItemUrl: '/addNewItemUrl',
  checkItemId: '/checkItemId'
};

export default api; 