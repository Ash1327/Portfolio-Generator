const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { 
  portfolioUpload, 
  storeImageInMemory, 
  getImageFromMemory, 
  deleteImageFromMemory,
  cleanupPortfolioImages 
} = require('../middleware/upload');

const router = express.Router();

// In-memory storage for portfolios (in production, use a database)
let portfolios = [];

// GET all portfolios
router.get('/', (req, res) => {
  res.json(portfolios);
});

// GET image by ID
router.get('/image/:imageId', (req, res) => {
  const imageData = getImageFromMemory(req.params.imageId);
  if (imageData) {
    res.set('Content-Type', imageData.mimetype);
    res.send(imageData.buffer);
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
});

// POST create new portfolio
router.post('/', portfolioUpload, (req, res) => {
  try {
    const portfolioData = JSON.parse(req.body.data);
    const portfolioId = uuidv4();
    
    // Handle profile image
    const profileImageId = req.files.profileImage ? 
      storeImageInMemory(req.files.profileImage[0], portfolioId) : null;
    
    // Handle portfolio images
    if (portfolioData.portfolio) {
      portfolioData.portfolio = portfolioData.portfolio.map((project, index) => {
        const portfolioImageId = req.files[`portfolioImage${index}`] ? 
          storeImageInMemory(req.files[`portfolioImage${index}`][0], portfolioId) : null;
        return {
          ...project,
          imageId: portfolioImageId
        };
      });
    }
    
    const newPortfolio = {
      id: portfolioId,
      ...portfolioData,
      profileImageId,
      createdAt: new Date().toISOString()
    };
    
    portfolios.push(newPortfolio);
    res.status(201).json(newPortfolio);
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(400).json({ error: 'Invalid data format' });
  }
});

// GET portfolio by ID
router.get('/:id', (req, res) => {
  const portfolio = portfolios.find(p => p.id === req.params.id);
  if (portfolio) {
    res.json(portfolio);
  } else {
    res.status(404).json({ error: 'Portfolio not found' });
  }
});

// PUT update portfolio
router.put('/:id', portfolioUpload, (req, res) => {
  const index = portfolios.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    try {
      const portfolioData = JSON.parse(req.body.data);
      const portfolioId = req.params.id;
      
      // Handle profile image
      const profileImageId = req.files.profileImage ? 
        storeImageInMemory(req.files.profileImage[0], portfolioId) : 
        portfolios[index].profileImageId;
      
      // Handle portfolio images
      if (portfolioData.portfolio) {
        portfolioData.portfolio = portfolioData.portfolio.map((project, projectIndex) => {
          const portfolioImageId = req.files[`portfolioImage${projectIndex}`] ? 
            storeImageInMemory(req.files[`portfolioImage${projectIndex}`][0], portfolioId) : 
            (portfolios[index].portfolio && portfolios[index].portfolio[projectIndex] ? 
              portfolios[index].portfolio[projectIndex].imageId : null);
          return {
            ...project,
            imageId: portfolioImageId
          };
        });
      }
      
      const updatedPortfolio = {
        ...portfolios[index],
        ...portfolioData,
        profileImageId,
        updatedAt: new Date().toISOString()
      };
      
      portfolios[index] = updatedPortfolio;
      res.json(updatedPortfolio);
    } catch (error) {
      console.error('Error updating portfolio:', error);
      res.status(400).json({ error: 'Invalid data format' });
    }
  } else {
    res.status(404).json({ error: 'Portfolio not found' });
  }
});

// DELETE portfolio
router.delete('/:id', (req, res) => {
  const index = portfolios.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    // Clean up all images for this portfolio
    cleanupPortfolioImages(req.params.id);
    portfolios.splice(index, 1);
    res.json({ message: 'Portfolio deleted successfully' });
  } else {
    res.status(404).json({ error: 'Portfolio not found' });
  }
});

// Filter portfolios by skills or role
router.get('/filter/:type/:value', (req, res) => {
  const { type, value } = req.params;
  let filteredPortfolios = [];
  
  if (type === 'skills') {
    filteredPortfolios = portfolios.filter(p => 
      p.skills && p.skills.some(skill => 
        skill.toLowerCase().includes(value.toLowerCase())
      )
    );
  } else if (type === 'role') {
    filteredPortfolios = portfolios.filter(p => 
      p.hero && p.hero.title && 
      p.hero.title.toLowerCase().includes(value.toLowerCase())
    );
  }
  
  res.json(filteredPortfolios);
});

module.exports = router; 