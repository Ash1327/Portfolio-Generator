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
  timeout: 10000,
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
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized access');
    } else if (error.response?.status === 500) {
      // Handle server errors
      console.error('Server error occurred');
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
    image?: string;
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
    image?: string;
  }>;
  profileImage?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePortfolioData {
  hero: {
    name: string;
    title: string;
    subtitle: string;
    image?: string;
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
    image?: string;
  }>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
} 