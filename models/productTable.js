// sequelize/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Assuming you've configured Sequelize in a separate file
const Category = require('./categoryTable');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  costPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mainImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sampleImages: {
    type: DataTypes.JSON,
    defaultValue: [], // Default to an empty array if not provided
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  discountPercentage: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  reviewsRatings: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

// Establish a many-to-one relationship with Category
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
