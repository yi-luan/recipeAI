import axios, { InternalAxiosRequestConfig } from 'axios';
declare global {
  interface Window {
    _env_: {
      REACT_APP_API_BASE_URL: string;
    };
  }
}

const axiosInstance = axios.create({
  baseURL: window._env_?.REACT_APP_API_BASE_URL || 'http://localhost:3008',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    // 添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
