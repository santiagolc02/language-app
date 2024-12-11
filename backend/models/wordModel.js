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
                  WHERE l.name = $1
                  ORDER BY w.id DESC`;
  const result = await db.query(query, [language]);
  return result.rows;
};

// Function to get all words from a language
const postWordQuery = async ({ word, mastery, translations, word_type, gender, language }) => {
  const query = `INSERT INTO words (word, mastery, translations, word_type, gender, language_id)
                  SELECT $1, $2, $3::jsonb, $4, $5, l.id 
                  FROM languages l
                  WHERE l.name = $6
                  RETURNING *;`;


  const values = [word, mastery, translations, word_type, gender, language];                
  const result = await db.query(query, values);
  return result.rows[0];
}; 

module.exports = { getWordsQuery,  getWordsLanguageQuery, postWordQuery };

