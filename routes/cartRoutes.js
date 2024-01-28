const express = require('express');
const router = express.Router();
const Cart = require('../models/cartTable'); // Adjust the path based on your project structure

// Create a new item in the cart
router.post('/', async (req, res) => {
  try {
    const newCartItem = await Cart.create({
      quantity: req.body.quantity,
      // Add other fields as needed based on your Cart model
    });
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all items in the cart
router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.findAll();
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific item in the cart by ID
router.get('/:id', async (req, res) => {
  const cartItemId = req.params.id;
  try {
    const cartItem = await Cart.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a cart item by ID
router.put('/:id', async (req, res) => {
  const cartItemId = req.params.id;
  try {
    const cartItem = await Cart.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.update(req.body);
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a cart item by ID
router.delete('/:id', async (req, res) => {
  const cartItemId = req.params.id;
  try {
    const cartItem = await Cart.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    await cartItem.destroy();
    res.json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
