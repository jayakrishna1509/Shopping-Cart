const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

// POST /api/users - Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user._id, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users - List all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password -token');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/users/login - Login for existing user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username/password' });
    }

    // Check if user is already logged in on another device
    if (user.token) {
      return res.status(403).json({ error: 'You cannot login on another device.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username/password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Save token to DB to "lock" the session
    user.token = token;
    await user.save();

    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/users/logout - Logout user
router.post('/logout', auth, async (req, res) => {
  try {
    // Clear the token in the DB to allow future logins
    req.user.token = null;
    await req.user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error during logout' });
  }
});

module.exports = router;
