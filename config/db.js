/**
 * This File contains configuration about
 * starting up the sequelize engine.
 */

// Import dotenv.
const dotenv = require('dotenv');
dotenv.config();

// Import Sequelize for managing db.
const { Sequelize, DataTypes } = require('sequelize');

// Pass in necessary configuration to sequelize.
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Off outputting sql queries on screen.
});

console.log('The name of the DB is', DB_NAME);

// Test the connection.
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection was established sucessfully');
  } catch (err) {
    console.error('Unable to connect.', err);
  }
})();

module.exports = { sequelize, DataTypes };
