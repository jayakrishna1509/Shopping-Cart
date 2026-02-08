const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// POST /api/carts - Create and add items to the cart
router.post('/', auth, async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required' });
    }

    // Verify item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.item.toString() === itemId
    );

    if (existingItemIndex > -1) {
      // Increment quantity if item already in cart
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      cart.items.push({ item: itemId, quantity: 1 });
    }

    await cart.save();
    await cart.populate('items.item');

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/carts - List all carts (or user's cart if authenticated)
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');
    
    if (!cart) {
      return res.json({ user: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
