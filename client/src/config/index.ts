// Environment configuration
export const config = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || 'https://portfolio-generator-2-fh5c.onrender.com',

  // App Configuration
  APP_NAME: 'PortfolioGen',
  APP_VERSION: '1.0.0',

  // File Upload Configuration
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],

  // UI Configuration
  ANIMATION_DURATION: 300,
  SUCCESS_PAGE_DELAY: 3000,

  // Default values
  DEFAULT_TEMPLATE: 'modern',
  DEFAULT_PORTFOLIO_COUNT: 3,
};

// API endpoints
export const API_ENDPOINTS = {
  PORTFOLIOS: '/api/portfolios',
  HEALTH: '/api/health',
  UPLOADS: '/uploads',
} as const;

// Template types
export const TEMPLATE_TYPES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
} as const;

// Form steps
export const FORM_STEPS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  PORTFOLIO: 'portfolio',
  CONTACT: 'contact',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  UPLOAD_ERROR: 'File upload failed. Please try again.',
  VALIDATION_ERROR: 'Please fill in all required fields.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  PORTFOLIO_CREATED: 'Portfolio created successfully!',
  PORTFOLIO_UPDATED: 'Portfolio updated successfully!',
  PORTFOLIO_DELETED: 'Portfolio deleted successfully!',
} as const; 