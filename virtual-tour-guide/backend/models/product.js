const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Handicrafts', 'Paintings', 'Textiles', 'Sculptures', 'Jewelry', 'Other']
  },
  images: [{
    url: String,
    alt: String
  }],
  location: {
    type: String,
    required: true
  },
  contactInfo: {
    phone: String,
    email: String,
    whatsapp: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Product', productSchema);
