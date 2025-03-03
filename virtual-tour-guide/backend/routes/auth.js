const express = require('express');
const router = express.Router();
const { register, login, updateTimeSpent } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/update-time', updateTimeSpent);

module.exports = router;
