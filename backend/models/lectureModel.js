// models/userModel.js
const db = require('../config/db');

// Query to get all lectures
const getLecturesQuery = async () => {
  const query = 'SELECT * FROM lectures order by id';
  const result = await db.query(query);
  return result.rows;
};

// Query to get all lectures from a language
const getLecturesByLanguageQuery = async (language) => {
  const query = `SELECT l.*
                FROM lectures l
                JOIN languages ON l.language_id = languages.id
                WHERE languages.name = $1
                order by id desc;`;
  const result = await db.query(query, [language]);
  return result.rows;
};

const getLectureQuery = async (lectureId) => {
  const query = `SELECT * FROM lectures l WHERE l.id = $1`;
  const result = await db.query(query, [lectureId]);
  return result.rows[0];
};

// Query to get all words from a language
const postLectureQuery = async ({ name, text, language, level, videoUrl }) => {
  const query = `INSERT INTO lectures (name, text, level, video_url, language_id)
                  SELECT $1, $2, $3, $4, l.id
                  FROM languages l
                  WHERE l.name = $5
                  RETURNING *;`;

  const values = [name, text, level, videoUrl, language];                
  const result = await db.query(query, values);
  return result.rows[0];
}; 

module.exports = { getLecturesQuery, getLecturesByLanguageQuery, getLectureQuery, postLectureQuery };
