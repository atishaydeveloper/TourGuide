const mongoose = require('mongoose');

const heritageSiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  streetViewCoordinates: {
    lat: Number,
    lng: Number
  },
  historicalNarrative: String,
  nearbyRecommendations: [String],
  budgetInfo: {
    entryFee: Number,
    bestTimeToVisit: String,
    averageVisitDuration: String
  },
  localEvents: [{
    name: String,
    date: String,
    description: String
  }],
  handicrafts: [{
    name: String,
    description: String
  }]
});

module.exports = mongoose.model('HeritageSite', heritageSiteSchema);