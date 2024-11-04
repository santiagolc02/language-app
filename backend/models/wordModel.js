// models/userModel.js
const db = require('../config/db');

// Function to get all users
const getWordsQuery = async () => {
  const result = await db.query('SELECT * FROM words order by id');
  return result.rows;
};

// Function to get all words from a language
const getWordsLanguageQuery = async (language) => {
  const query = `SELECT w.*
                  FROM words w
                  JOIN languages l ON w.language_id = l.id
                  WHERE l.name = $1`;
  const result = await db.query(query, [language]);
  return result.rows;
};

module.exports = { getWordsQuery,  getWordsLanguageQuery };

