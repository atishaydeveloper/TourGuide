const mongoose = require('mongoose');

const heritageSiteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  streetViewCoordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  historicalNarrative: { type: String, required: true }, // For ElevenLabs
  nearbyRecommendations: {
    hotels: [{ type: String }],  // Hotel IDs or references to a Hotel model
    restaurants: [{ type: String }], // Restaurant IDs or references
    attractions: [{ type: String }], // Attraction IDs or references
  },
  budgetInfo: {
    estimatedCostPerDay: { type: Number }
  },
  localEvents: [{
    name: { type: String },
    date: { type: Date },
    description: { type: String }
  }],
  handicrafts: [{
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    imageUrl: { type: String }
  }]
});

module.exports = mongoose.model('HeritageSite', heritageSiteSchema);