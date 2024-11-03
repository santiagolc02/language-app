// models/userModel.js
const db = require('../config/db');

// Function to get all users
const getLanguagesQuery = async () => {
    const result = await db.query('SELECT * FROM languages order by id');
    return result.rows;
  };

  module.exports = { getLanguagesQuery };