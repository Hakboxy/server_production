const { Sequelize } = require('sequelize');
require('dotenv').config();

// Replace these values with your MySQL database credentials
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
  dialect: 'mysql',
};

// Create Sequelize instance
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

module.exports = sequelize;
