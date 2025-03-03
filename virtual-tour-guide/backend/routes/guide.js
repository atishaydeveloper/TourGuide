const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { 
  createGuide,
  getGuides,
  getGuideById,
  updateGuide,
  addReview
} = require('../controllers/guideController');

// Public routes
router.get('/', getGuides);
router.get('/:id', getGuideById);

// Protected routes
router.post('/', auth, createGuide);
router.put('/:id', auth, updateGuide);
router.post('/:id/reviews', auth, addReview);

module.exports = router;
