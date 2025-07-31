// Template types
export interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  preview: string;
  colors: string[];
  popular: boolean;
  icon: any; // React component
  style: 'modern' | 'classic';
}

// Form data types (for component state, can include File objects)
export interface FormData {
  hero: {
    name: string;
    title: string;
    tagline: string;
    image: File | null;
  };
  about: {
    bio: string;
    email: string;
    phone: string;
    location: string;
    socials: {
      github: string;
      linkedin: string;
      twitter: string;
      website: string;
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
    image: File | null;
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
}

// Form data for API submission (without File objects, as files are sent separately)
export interface PortfolioFormData {
  hero: {
    name: string;
    title: string;
    tagline: string;
  };
  about: {
    bio: string;
    email: string;
    phone: string;
    location: string;
    socials: {
      github: string;
      linkedin: string;
      twitter: string;
      website: string;
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
}

// Step types for form navigation
export type FormStep = 'hero' | 'about' | 'skills' | 'services' | 'portfolio' | 'testimonials' | 'blog' | 'contact';

// Social media types
export interface SocialMedia {
  github?: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  location?: string;
}

// Project types
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  imageId?: string;
}

// Hero section types
export interface Hero {
  name: string;
  title: string;
  subtitle: string;
  imageId?: string;
}

// About section types
export interface About {
  description: string;
  socials: SocialMedia;
}

// Portfolio types
export interface Portfolio {
  id: string;
  hero: Hero;
  about: About;
  skills: string[];
  portfolio: Project[];
  profileImageId?: string;
  template?: 'modern' | 'classic'; // Track which template was used
  createdAt: string;
  updatedAt?: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

// File upload types
export interface FileUpload {
  file: File;
  preview: string;
  name: string;
}

// Navigation types
export interface NavigationProps {
  currentStep: FormStep;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
}

// Component props types
export interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export interface TemplateSelectionProps {
  onTemplateSelect: (template: Template) => void;
}

export interface PortfolioFormProps {
  selectedTemplate: Template;
}

export interface PortfolioPageProps {
  portfolio: Portfolio;
}

export interface ProfessionalsListProps {
  portfolios: Portfolio[];
}

export interface SuccessPageProps {
  // Add any props if needed
} 