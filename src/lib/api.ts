import axios from "axios";

// Use the current window location as the base URL for API requests
// This ensures API requests work in both development and production
const API_URL = import.meta.env.VITE_API_URL || window.location.origin;

const mockStockData = {
  AAPL: { price: 182.63, previousClose: 180.95 },
  MSFT: { price: 403.78, previousClose: 401.20 },
  NVDA: { price: 621.45, previousClose: 618.90 },
  GOOGL: { price: 142.02, previousClose: 141.50 },
  META: { price: 149.68, previousClose: 148.90 }
};

// Mock waitlist data for development
const mockWaitlistResponse = {
  success: true,
  message: "Successfully added to waitlist (using development mock)",
  entry: {
    name: "Test User",
    email: "test@example.com",
    phoneNumber: "555-123-4567",
    preferredPlan: "basic",
    createdAt: new Date().toISOString()
  },
  storage: "development-mock"
};

const axiosInstance = axios.create({ baseURL: API_URL });

// Add interceptors for mock data and fallback handling
axiosInstance.interceptors.request.use(async (config) => {
  if (config.url === '/api/market-data') {
    return Promise.resolve({ ...config, data: mockStockData });
  }
  
  // Log API requests in development
  if (import.meta.env.DEV) {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  }
  
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Mock data fallbacks for development
    if (error.config.url === '/api/market-data') {
      return Promise.resolve({ data: mockStockData });
    }
    
    // Fallback for waitlist API in development
    if (import.meta.env.DEV && error.config.url === '/api/waitlist') {
      console.log('Using mock fallback for waitlist API in development');
      return Promise.resolve({ data: mockWaitlistResponse });
    }
    
    // Log API errors in development
    if (import.meta.env.DEV) {
      console.error(`API Error: ${error.config?.url}`, error);
    }
    
    return Promise.reject(error);
  }
);

export const api = axiosInstance;
