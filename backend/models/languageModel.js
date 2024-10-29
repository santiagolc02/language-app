// models/userModel.js
const db = require('../config/db');

// Function to get all users
const getAllLanguages = async () => {
    const result = await db.query('SELECT * FROM languages');
    return result.rows;
  };

  module.exports = { getAllLanguages };