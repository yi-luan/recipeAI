import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// 照片 API 仍由 Node 後端（recipeAIService）提供
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// 食譜 API 改由 Go 檢索服務（recipeCrawler）提供，預設對應它的 HTTP_ADDR=:8080
const recipeApiBaseUrl =
  import.meta.env.VITE_RECIPE_API_BASE_URL || 'http://localhost:8080';

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
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

  return instance;
};

/** Node 後端，回應直接解開成 response.data。 */
const axiosInstance = createAxiosInstance(apiBaseUrl);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Go 檢索服務。保留完整的 AxiosResponse，
 * 因為「菜單不足」「已降級」等資訊放在回應 header 而不是本體。
 */
export const recipeAxiosInstance = createAxiosInstance(recipeApiBaseUrl);

export default axiosInstance;
