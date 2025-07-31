# Portfolio Generator Server

## Project Structure

```
server/
├── index.js              # Main server file
├── middleware/
│   └── upload.js         # File upload configuration
├── routes/
│   ├── portfolios.js     # Portfolio CRUD operations
│   └── health.js         # Health check endpoint
└── README.md            # This file
```

## API Endpoints

### Portfolios
- `GET /api/portfolios` - Get all portfolios
- `POST /api/portfolios` - Create new portfolio
- `GET /api/portfolios/:id` - Get portfolio by ID
- `PUT /api/portfolios/:id` - Update portfolio
- `DELETE /api/portfolios/:id` - Delete portfolio
- `GET /api/portfolios/filter/:type/:value` - Filter portfolios

### Health Check
- `GET /api/health` - Server health status

### Root
- `GET /` - API information

## File Upload

The server supports multiple image uploads:
- `profileImage` - Profile picture
- `portfolioImage0` - First project image
- `portfolioImage1` - Second project image
- `portfolioImage2` - Third project image

## Middleware

### Upload Middleware (`middleware/upload.js`)
- Configures multer for file uploads
- Handles image validation
- Sets file size limits (5MB)
- Creates upload directory if needed

## Routes

### Portfolio Routes (`routes/portfolios.js`)
- Handles all portfolio CRUD operations
- Manages file uploads for portfolio images
- In-memory storage (replace with database in production)

### Health Routes (`routes/health.js`)
- Provides server health information
- Useful for monitoring and debugging

## Usage

1. Start the server: `npm run server`
2. Server runs on port 8000 by default
3. Uploaded images are served from `/uploads` endpoint
4. All portfolio data is stored in memory (resets on server restart)

## Development

- Add new routes in the `routes/` directory
- Add new middleware in the `middleware/` directory
- Import and use routes in `index.js`
- Follow the existing pattern for consistency 