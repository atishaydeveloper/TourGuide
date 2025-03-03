require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (temporary solution)
const users = new Map();
const userProgress = new Map();

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Badge definitions
const BADGES = {
  WELCOME: {
    name: 'Welcome Explorer',
    description: 'Started your heritage exploration journey'
  },
  CURIOUS_BEING: {
    name: 'Curious Being',
    description: 'Spent 5 minutes exploring heritage sites'
  },
  HERITAGE_EXPLORER: {
    name: 'Heritage Explorer',
    description: 'Dedicated 15 minutes to learning about heritage'
  },
  HISTORY_BUFF: {
    name: 'History Buff',
    description: 'Spent 30 minutes exploring historical sites'
  },
  CULTURAL_EXPERT: {
    name: 'Cultural Expert',
    description: 'Accumulated 45 minutes of heritage exploration'
  }
};

// Register endpoint
app.post('/api/register', (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (users.has(username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    const user = {
      username,
      password,
      totalTimeSpent: 0,
      lastLoginTime: new Date(),
      badges: [{
        ...BADGES.WELCOME,
        earnedAt: new Date()
      }],
      siteProgress: new Map()
    };

    users.set(username, user);
    userProgress.set(username, { totalTimeSpent: 0, siteProgress: new Map() });
    
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'your-secret-key');
    res.status(201).json({ token, user: { username: user.username, badges: user.badges } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login endpoint
app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.get(username);
    
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.lastLoginTime = new Date();
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ 
      token, 
      user: { 
        username: user.username, 
        badges: user.badges, 
        totalTimeSpent: user.totalTimeSpent 
      } 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user progress
app.post('/api/progress', authenticateToken, (req, res) => {
  try {
    const { timeSpent, siteId } = req.body;
    const { username } = req.user;
    const user = users.get(username);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update total time spent
    user.totalTimeSpent += timeSpent;
    
    // Update site-specific progress
    const currentSiteProgress = user.siteProgress.get(siteId) || 0;
    user.siteProgress.set(siteId, currentSiteProgress + timeSpent);

    // Check for new badges
    const totalMinutes = Math.floor(user.totalTimeSpent / 60);
    
    if (totalMinutes >= 5 && !user.badges.some(b => b.name === BADGES.CURIOUS_BEING.name)) {
      user.badges.push({ ...BADGES.CURIOUS_BEING, earnedAt: new Date() });
    }
    
    if (totalMinutes >= 15 && !user.badges.some(b => b.name === BADGES.HERITAGE_EXPLORER.name)) {
      user.badges.push({ ...BADGES.HERITAGE_EXPLORER, earnedAt: new Date() });
    }
    
    if (totalMinutes >= 30 && !user.badges.some(b => b.name === BADGES.HISTORY_BUFF.name)) {
      user.badges.push({ ...BADGES.HISTORY_BUFF, earnedAt: new Date() });
    }
    
    if (totalMinutes >= 45 && !user.badges.some(b => b.name === BADGES.CULTURAL_EXPERT.name)) {
      user.badges.push({ ...BADGES.CULTURAL_EXPERT, earnedAt: new Date() });
    }

    res.json({ 
      totalTimeSpent: user.totalTimeSpent,
      badges: user.badges,
      siteProgress: Object.fromEntries(user.siteProgress)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user profile
app.get('/api/profile', authenticateToken, (req, res) => {
  try {
    const { username } = req.user;
    const user = users.get(username);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      username: user.username,
      totalTimeSpent: user.totalTimeSpent,
      badges: user.badges,
      siteProgress: Object.fromEntries(user.siteProgress)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
