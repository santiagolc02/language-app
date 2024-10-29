// models/userModel.js
const db = require('../config/db');

// Function to get all users
const getAllLectures = async () => {
  const result = await db.query('SELECT * FROM lectures');
  return result.rows;
};



module.exports = { getAllLectures };
