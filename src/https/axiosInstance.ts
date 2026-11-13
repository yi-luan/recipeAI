import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// 照片 API 仍由 Node 後端（recipeAIService）提供
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// 食譜 API 改由 Go 檢索服務（recipeCrawler）提供，預設對應它的 HTTP_ADDR=:8080
const recipeApiBaseUrl =
  import.meta.env.VITE_RECIPE_API_BASE_URL || 'http://localhost:8080';

const createAxiosInstance = (
  baseURL: string,
  { withToken }: { withToken: boolean }
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!withToken) {
    return instance;
  }

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
const axiosInstance = createAxiosInstance(apiBaseUrl, { withToken: true });

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
 * Go 服務沒有帳號機制，CORS 也只允許 Content-Type，所以不附 Authorization，
 * 否則跨來源預檢請求會被瀏覽器擋下。
 */
export const recipeAxiosInstance = createAxiosInstance(recipeApiBaseUrl, {
  withToken: false,
});

export default axiosInstance;
