# Portfolio Generator Client

## TypeScript Setup

This client has been converted to TypeScript for better type safety and developer experience.

## Project Structure

```
client/src/
├── components/          # React components
│   ├── Header.tsx
│   ├── PortfolioForm.tsx
│   ├── PortfolioPage.tsx
│   ├── ProfessionalsList.tsx
│   ├── SuccessPage.tsx
│   ├── TemplateSelection.tsx
│   └── TestPage.tsx
├── services/           # API services
│   └── api.ts         # API client and service
├── types/             # TypeScript type definitions
│   └── index.ts       # Common interfaces and types
├── config/            # Configuration
│   └── index.ts       # App configuration and constants
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── index.css          # Global styles
```

## API Service

The application uses a centralized API service for all backend communication:

### Features:
- **Centralized Configuration**: Base URL and timeouts configured in one place
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Interceptors for common error scenarios
- **File Uploads**: Built-in support for multipart form data
- **Authentication Ready**: Prepared for future auth implementation

### Usage:

```typescript
import { apiService } from '../services/api';

// Get all portfolios
const portfolios = await apiService.getAllPortfolios();

// Create portfolio with files
const files = [profileImage, projectImage1, projectImage2];
const newPortfolio = await apiService.createPortfolio(portfolioData, files);

// Get portfolio by ID
const portfolio = await apiService.getPortfolioById(id);
```

## Configuration

Environment variables and app settings are managed in `src/config/index.ts`:

```typescript
import { config } from '../config';

// Access configuration
const apiUrl = config.API_BASE_URL;
const maxFileSize = config.MAX_FILE_SIZE;
```

## TypeScript Types

Common types are defined in `src/types/index.ts`:

- `Portfolio` - Portfolio data structure
- `Template` - Template selection data
- `FormData` - Form input data
- `ApiResponse<T>` - Generic API response wrapper

## Development

### Prerequisites:
- Node.js 14+
- npm or yarn

### Setup:
1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Build for production: `npm run build`

### TypeScript Configuration:
- `tsconfig.json` - TypeScript compiler options
- Strict mode enabled for better type safety
- JSX support for React components

## API Endpoints

The client communicates with these backend endpoints:

- `GET /api/portfolios` - Get all portfolios
- `POST /api/portfolios` - Create new portfolio
- `GET /api/portfolios/:id` - Get portfolio by ID
- `PUT /api/portfolios/:id` - Update portfolio
- `DELETE /api/portfolios/:id` - Delete portfolio
- `GET /api/health` - Health check

## File Upload

The API service handles file uploads automatically:

```typescript
// Upload profile image and project images
const files = [profileImage, project1Image, project2Image];
await apiService.createPortfolio(data, files);
```

## Error Handling

The API service includes built-in error handling:

- Network errors
- Server errors (500)
- Unauthorized errors (401)
- File upload errors

## Environment Variables

Set these environment variables for different environments:

```bash
REACT_APP_API_URL=http://localhost:8000
```

## Building for Production

```bash
npm run build
```

The build process will:
- Compile TypeScript to JavaScript
- Optimize and minify code
- Generate static files in `build/` directory 