import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://45.12.73.185:4444',
});

instance.interceptors.request.use((config) => {
  config.headers && (config.headers.Authorization = window.localStorage.getItem('token'));
  return config;
});

export default instance;
