import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config';

// API Configuration
const API_BASE_URL = config.API_BASE_URL;

// Helper function to get image URL from image ID
export const getImageUrl = (imageId: string | null): string | null => {
  if (!imageId) return null;
  return `${API_BASE_URL}/api/portfolios/image/${imageId}`;
};

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add any authentication headers here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('Request timeout - server might be slow to respond');
      return Promise.reject(new Error('Request timeout. The server is taking too long to respond. Please try again.'));
    } else if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized access');
    } else if (error.response?.status === 500) {
      // Handle server errors
      console.error('Server error occurred');
    } else if (error.response?.status === 404) {
      console.error('API endpoint not found');
    } else if (!error.response) {
      // Network error
      console.error('Network error - unable to connect to server');
      return Promise.reject(new Error('Unable to connect to server. Please check your internet connection.'));
    }
    return Promise.reject(error);
  }
);

// API Service class
class ApiService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  // Portfolio endpoints
  async getAllPortfolios() {
    const response = await this.client.get('/api/portfolios');
    return response.data;
  }

  async getPortfolioById(id: string) {
    const response = await this.client.get(`/api/portfolios/${id}`);
    return response.data;
  }

  async createPortfolio(portfolioData: any, files?: File[]) {
    const formData = new FormData();
    
    // Add portfolio data
    formData.append('data', JSON.stringify(portfolioData));
    
    // Add files if provided
    if (files) {
      files.forEach((file, index) => {
        if (file) {
          if (index === 0) {
            formData.append('profileImage', file);
          } else {
            formData.append(`portfolioImage${index - 1}`, file);
          }
        }
      });
    }

    const response = await this.client.post('/api/portfolios', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updatePortfolio(id: string, portfolioData: any, files?: File[]) {
    const formData = new FormData();
    
    // Add portfolio data
    formData.append('data', JSON.stringify(portfolioData));
    
    // Add files if provided
    if (files) {
      files.forEach((file, index) => {
        if (file) {
          if (index === 0) {
            formData.append('profileImage', file);
          } else {
            formData.append(`portfolioImage${index - 1}`, file);
          }
        }
      });
    }

    const response = await this.client.put(`/api/portfolios/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deletePortfolio(id: string) {
    const response = await this.client.delete(`/api/portfolios/${id}`);
    return response.data;
  }

  async filterPortfolios(type: 'skills' | 'role', value: string) {
    const response = await this.client.get(`/api/portfolios/filter/${type}/${value}`);
    return response.data;
  }

  // Health check
  async getHealthStatus() {
    const response = await this.client.get('/api/health');
    return response.data;
  }

  // Get API info
  async getApiInfo() {
    const response = await this.client.get('/');
    return response.data;
  }
}

// Create and export the API service instance
export const apiService = new ApiService(apiClient);

// Export the axios client for direct use if needed
export { apiClient };

// Export types
export interface Portfolio {
  id: string;
  hero: {
    name: string;
    title: string;
    subtitle: string;
    imageId?: string;
  };
  about: {
    description: string;
    socials: {
      github?: string;
      linkedin?: string;
      email?: string;
      phone?: string;
      location?: string;
    };
  };
  skills: string[];
  portfolio: Array<{
    title: string;
    description: string;
    technologies: string[];
    github?: string;
    live?: string;
    imageId?: string;
  }>;
  profileImageId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
  };
  about: {
    description: string;
    socials: {
      github?: string;
      linkedin?: string;
      email?: string;
      phone?: string;
      location?: string;
    };
  };
  skills: string[];
  services: Array<{
    title: string;
    description: string;
  }>;
  portfolio: Array<{
    title: string;
    description: string;
    technologies: string[];
    github?: string;
    live?: string;
  }>;
  testimonials: Array<{
    name: string;
    quote: string;
    position: string;
  }>;
  blog: {
    title: string;
    summary: string;
  };
  contact: {
    message: string;
    email: string;
    phone: string;
  };
  template?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
} 