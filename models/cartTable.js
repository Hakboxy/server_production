// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Product = require("./productTable");
const User = require("./userTable");

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Establish associations
Cart.belongsTo(User, { foreignKey: "userID" });
Cart.belongsTo(Product, { foreignKey: "productID" });

module.exports = Cart;
