// models/userModel.js
const db = require('../config/db');

// Function to get all lectures
const getAllLectures = async () => {
  const query = 'SELECT * FROM lectures order by id';
  const result = await db.query(query);
  return result.rows;
};

// Function to get all lectures from a language
const getLecturesByLanguage = async (language) => {
  const query = `SELECT l.*
                FROM lectures l
                JOIN languages ON l.language_id = languages.id
                WHERE languages.name = $1;`;
  const result = await db.query(query, [language]);
  return result.rows;
};

module.exports = { getAllLectures, getLecturesByLanguage };
