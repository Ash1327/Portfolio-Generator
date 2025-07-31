const multer = require('multer');

// In-memory storage for images
const imageStorage = new Map();

// Configure multer for in-memory storage
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Portfolio upload configuration
const portfolioUpload = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'portfolioImage0', maxCount: 1 },
  { name: 'portfolioImage1', maxCount: 1 },
  { name: 'portfolioImage2', maxCount: 1 }
]);

// Helper function to store image in memory
const storeImageInMemory = (file, portfolioId) => {
  if (!file) return null;
  
  const imageId = `${portfolioId}-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
  const imageData = {
    buffer: file.buffer,
    mimetype: file.mimetype,
    originalname: file.originalname,
    portfolioId: portfolioId
  };
  
  imageStorage.set(imageId, imageData);
  return imageId;
};

// Helper function to get image from memory
const getImageFromMemory = (imageId) => {
  return imageStorage.get(imageId);
};

// Helper function to delete image from memory
const deleteImageFromMemory = (imageId) => {
  imageStorage.delete(imageId);
};

// Cleanup function to remove all images for a portfolio
const cleanupPortfolioImages = (portfolioId) => {
  for (const [imageId, imageData] of imageStorage.entries()) {
    if (imageData.portfolioId === portfolioId) {
      imageStorage.delete(imageId);
    }
  }
};

module.exports = {
  upload,
  portfolioUpload,
  storeImageInMemory,
  getImageFromMemory,
  deleteImageFromMemory,
  cleanupPortfolioImages
}; 