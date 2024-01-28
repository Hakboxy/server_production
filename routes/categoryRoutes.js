const express = require('express');
const router = express.Router();
const  Category  = require('../models/categoryTable'); // Adjust the path based on your project structure
const createMulterMiddleware = require('../middleware/uploadFile');

// Use the Multer middleware with a specific subdirectory
const upload = createMulterMiddleware('category');

// Create a new category
router.post('/', upload.single('coverPhoto'), async (req, res) => {

  const coverPhoto = req.file; 
  console.log(req.body)

  try {
    const newCategory = await Category.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file.path.replace(/\\/g, '/'),
      inventory: 0,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all categories
router.get('/', async (req, res
  ) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific category by ID
router.get('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.update(req.body);
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
