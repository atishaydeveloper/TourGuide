const express = require('express');
const router = express.Router();
const HeritageSite = require('../models/HeritageSite');

// GET all heritage sites
router.get('/', async (req, res) => {
  try {
    const heritageSites = await HeritageSite.find();
    res.json(heritageSites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific heritage site by name
router.get('/:name', async (req, res) => {
  try {
    const heritageSite = await HeritageSite.findOne({ name: req.params.name });
    if (!heritageSite) {
      return res.status(404).json({ message: 'Heritage site not found' });
    }
    res.json(heritageSite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new heritage site (for admin/seed data)
router.post('/', async (req, res) => {
  const heritageSite = new HeritageSite({
    name: req.body.name,
    description: req.body.description,
    streetViewCoordinates: req.body.streetViewCoordinates,
    historicalNarrative: req.body.historicalNarrative,
    nearbyRecommendations: req.body.nearbyRecommendations,
    budgetInfo: req.body.budgetInfo,
    localEvents: req.body.localEvents,
    handicrafts: req.body.handicrafts
  });

  try {
    const newHeritageSite = await heritageSite.save();
    res.status(201).json(newHeritageSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;