const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: Number,
    required: true
  },
  languages: [{
    type: String,
    required: true
  }],
  heritageSites: [{
    type: String,
    required: true
  }],
  contactInfo: {
    phone: String,
    email: String,
    whatsapp: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  availability: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Guide', guideSchema);
