// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT: (id) => `${API_BASE_URL}/api/products/${id}`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  ORDER: (id) => `${API_BASE_URL}/api/orders/${id}`,
  USERS: `${API_BASE_URL}/api/users`,
  USER_SIGNIN: `${API_BASE_URL}/api/users/signin`,
  USER_VERIFY: `${API_BASE_URL}/api/users/verify`,
};

export const API_BASE = API_BASE_URL;

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) return `${API_BASE_URL}${imagePath}`;
  return imagePath;
};

export default API_ENDPOINTS;
