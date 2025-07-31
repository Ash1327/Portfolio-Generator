const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const portfolioRoutes = require('./routes/portfolios');
const healthRoutes = require('./routes/health');

// Use routes
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/health', healthRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Generator API',
    version: '1.0.0',
    endpoints: {
      portfolios: '/api/portfolios',
      health: '/api/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 