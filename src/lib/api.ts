import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const mockStockData = {
  AAPL: { price: 182.63, previousClose: 180.95 },
  MSFT: { price: 403.78, previousClose: 401.20 },
  NVDA: { price: 621.45, previousClose: 618.90 },
  GOOGL: { price: 142.02, previousClose: 141.50 },
  META: { price: 149.68, previousClose: 148.90 }
};

const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use(async (config) => {
  if (config.url === '/api/market-data') {
    return Promise.resolve({ ...config, data: mockStockData });
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config.url === '/api/market-data') {
      return Promise.resolve({ data: mockStockData });
    }
    return Promise.reject(error);
  }
);

export const api = axiosInstance;
