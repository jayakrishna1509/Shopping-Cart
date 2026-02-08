const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// POST /api/items - Create an item
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const item = new Item({ name, description, price });
    await item.save();

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/items - List all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
