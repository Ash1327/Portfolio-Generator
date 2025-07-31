const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { portfolioUpload } = require('../middleware/upload');

const router = express.Router();

// In-memory storage for portfolios (in production, use a database)
let portfolios = [];

// GET all portfolios
router.get('/', (req, res) => {
  res.json(portfolios);
});

// POST create new portfolio
router.post('/', portfolioUpload, (req, res) => {
  try {
    const portfolioData = JSON.parse(req.body.data);
    
    // Handle profile image
    const profileImage = req.files.profileImage ? `/uploads/${req.files.profileImage[0].filename}` : null;
    
    // Handle portfolio images
    if (portfolioData.portfolio) {
      portfolioData.portfolio = portfolioData.portfolio.map((project, index) => {
        const portfolioImage = req.files[`portfolioImage${index}`] ? 
          `/uploads/${req.files[`portfolioImage${index}`][0].filename}` : null;
        return {
          ...project,
          image: portfolioImage
        };
      });
    }
    
    const newPortfolio = {
      id: uuidv4(),
      ...portfolioData,
      profileImage,
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
      
      // Handle profile image
      const profileImage = req.files.profileImage ? 
        `/uploads/${req.files.profileImage[0].filename}` : 
        portfolios[index].profileImage;
      
      // Handle portfolio images
      if (portfolioData.portfolio) {
        portfolioData.portfolio = portfolioData.portfolio.map((project, projectIndex) => {
          const portfolioImage = req.files[`portfolioImage${projectIndex}`] ? 
            `/uploads/${req.files[`portfolioImage${projectIndex}`][0].filename}` : 
            (portfolios[index].portfolio && portfolios[index].portfolio[projectIndex] ? 
              portfolios[index].portfolio[projectIndex].image : null);
          return {
            ...project,
            image: portfolioImage
          };
        });
      }
      
      const updatedPortfolio = {
        ...portfolios[index],
        ...portfolioData,
        profileImage,
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