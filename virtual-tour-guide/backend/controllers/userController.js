const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    // Mock data for now - replace with actual data from database later
    const mockData = {
      badges: [
        { id: 1, name: 'Explorer', description: 'Visited 5 heritage sites', icon: '🏛️' },
        { id: 2, name: 'Historian', description: 'Spent 2 hours exploring', icon: '📚' }
      ],
      badgesEnabled: true,
      stats: {
        totalTimeSpent: 120, // in minutes
        sitesVisited: 5,
        lastVisited: {
          site: 'Taj Mahal',
          date: new Date()
        }
      }
    };

    res.json({
      user,
      ...mockData
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Error fetching profile data' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};
