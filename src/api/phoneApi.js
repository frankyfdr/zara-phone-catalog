import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: 'https://prueba-tecnica-api-tienda-moviles.onrender.com/',
  headers: {
    'x-api-key': apiKey,
  },
});

export const getPhones = () => api.get('/products');

export const searchPhones = (query) => api.get(`/products?search=${query}`);

export const getPhoneDetail = (id) => api.get(`/products/${id}`);
