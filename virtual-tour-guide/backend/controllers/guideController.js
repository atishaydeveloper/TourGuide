const Guide = require('../models/guide');
const { validateGuide } = require('../utils/validation');

exports.createGuide = async (req, res) => {
  try {
    const { error } = validateGuide(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const guide = new Guide(req.body);
    await guide.save();
    
    res.status(201).json(guide);
  } catch (error) {
    res.status(500).json({ message: 'Error creating guide profile', error: error.message });
  }
};

exports.getGuides = async (req, res) => {
  try {
    const { heritageSite, language } = req.query;
    let query = { isVerified: true, availability: true };

    if (heritageSite) {
      query.heritageSites = heritageSite;
    }
    if (language) {
      query.languages = language;
    }

    const guides = await Guide.find(query)
      .select('-reviews')
      .sort('-rating');

    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guides', error: error.message });
  }
};

exports.getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id)
      .populate('reviews.user', 'username');
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guide', error: error.message });
  }
};

exports.updateGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    // Ensure only admin or the guide themselves can update
    if (req.user.role !== 'admin' && req.user.role !== 'guide') {
      return res.status(403).json({ message: 'Not authorized to update guide profile' });
    }

    const { error } = validateGuide(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedGuide = await Guide.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.json(updatedGuide);
  } catch (error) {
    res.status(500).json({ message: 'Error updating guide', error: error.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const guide = await Guide.findById(req.params.id);
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    // Check if user has already reviewed
    const existingReview = guide.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this guide' });
    }

    guide.reviews.push({
      user: req.user._id,
      rating,
      comment
    });

    // Update overall rating
    const totalRating = guide.reviews.reduce((sum, review) => sum + review.rating, 0);
    guide.rating = totalRating / guide.reviews.length;

    await guide.save();
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};
