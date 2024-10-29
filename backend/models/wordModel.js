// models/userModel.js
const db = require('../config/db');

// Function to get all users
const getAllWords = async () => {
  const result = await db.query('SELECT * FROM words');
  return result.rows;
};



module.exports = { getAllWords };
