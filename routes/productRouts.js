const express = require('express');
const router = express.Router();
const  Product  = require('../models/productTable'); // Adjust the path based on your project structure
const createMulterMiddleware = require('../middleware/uploadFile');

// Use the Multer middleware with a specific subdirectory
const upload = createMulterMiddleware('products');

// Create a new product
router.post('/', upload.single('coverPhoto'), async (req, res) => {
  console.log(req.body)
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      stock:req.body.stock,
      price:req.body.price,
      costPrice:req.body.costPrice,
      categoryId: req.body.category,
      mainImage:req.file.path.replace(/\\/g, '/'),
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    products.map((product)=>(product.mainImage = `${process.env.BASE_URL}/${product.mainImage}`))
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.mainImage = `${process.env.BASE_URL}/${product.mainImage}`
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
