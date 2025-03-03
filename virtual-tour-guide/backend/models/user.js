const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'seller', 'guide', 'vendor', 'admin'],
    default: 'user'
  },
  badges: {
    enabled: {
      type: Boolean,
      default: true
    },
    list: [{
      name: {
        type: String,
        required: true
      },
      description: String,
      icon: String,
      earnedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  lastVisited: [{
    site: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  sellerProfile: {
    shopName: String,
    description: String,
    location: String,
    rating: {
      type: Number,
      default: 0
    }
  },
  vendorDetails: {
    businessName: String,
    description: String,
    contactNumber: String,
    address: String,
    verified: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.checkAndAwardBadges = async function() {
  if (!this.badges.enabled) return [];
  
  const newBadges = [];
  const timeSpentMinutes = Math.floor(this.timeSpent / 60);
  
  const badgeRules = [
    {
      name: 'Welcome Explorer',
      description: 'Joined the Heritage Explorer community',
      icon: '🎉',
      condition: () => this.badges.list.length === 0
    },
    {
      name: 'Curious Explorer',
      description: 'Spent 5 minutes exploring heritage sites',
      icon: '🔍',
      condition: () => timeSpentMinutes >= 5
    },
    {
      name: 'Heritage Enthusiast',
      description: 'Spent 15 minutes learning about heritage',
      icon: '🏛️',
      condition: () => timeSpentMinutes >= 15
    },
    {
      name: 'Culture Connoisseur',
      description: 'Spent 30 minutes immersed in culture',
      icon: '👑',
      condition: () => timeSpentMinutes >= 30
    }
  ];
  
  for (const rule of badgeRules) {
    const hasBadge = this.badges.list.some(b => b.name === rule.name);
    if (!hasBadge && rule.condition()) {
      this.badges.list.push({
        name: rule.name,
        description: rule.description,
        icon: rule.icon
      });
      newBadges.push(rule.name);
    }
  }
  
  if (newBadges.length > 0) {
    await this.save();
  }
  
  return newBadges;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
