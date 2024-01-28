const sequelize = require("./db");
const Category = require('../models/categoryTable')
const Products = require('../models/productTable')
const User = require('../models/userTable')
const Cart = require('../models/cartTable')

const initializeTables = async () => {
  try {
    await Category.sync();
    console.log("Category table synchronized");

    await Products.sync();
    console.log("Products table synchronized");

    await User.sync();
    console.log("User table synchronized");

    await Cart.sync();
    console.log("Cart table synchronized");

   

  } catch (error) {
    console.error("Error synchronizing tables:", error);
  }
};

module.exports = initializeTables;
