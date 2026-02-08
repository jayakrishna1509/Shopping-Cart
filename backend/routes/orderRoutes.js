const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// POST /api/orders - Convert cart to order
router.post('/', auth, async (req, res) => {
  try {
    // Find user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total amount and prepare order items
    let totalAmount = 0;
    const orderItems = [];

    for (const cartItem of cart.items) {
      const item = await Item.findById(cartItem.item._id);
      if (!item) continue;

      const itemTotal = item.price * cartItem.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        item: item._id,
        quantity: cartItem.quantity,
        price: item.price
      });
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount
    });

    await order.save();
    await order.populate('items.item');

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders - List all orders for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.item')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
