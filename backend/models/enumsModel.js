// models/userModel.js

// Hardcoded enums
const GENDERS = ['Masculine', 'Feminine', 'Neuter', 'None'];
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const MASTERIES = ['Novice', 'Intermediate', 'Expert'];
const WORD_TYPES = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Pronoun', 'Preposition', 'Conjunction', 'Interjection', 'Article'];

// Functions to return hardcoded enums
const getGendersQuery = async () => {
  return GENDERS; // Returns ['Male', 'Female', 'Non-Binary']
};

const getLevelsQuery = async () => {
  return LEVELS; // Returns ['Beginner', 'Intermediate', 'Advanced']
};

const getMasteriesQuery = async () => {
  return MASTERIES; // Returns ['Novice', 'Intermediate', 'Expert', 'Familiar']
};

const getWordTypesQuery = async () => {
  return WORD_TYPES; // Returns ['Noun', 'Verb', 'Adjective', 'Adverb']
};

module.exports = { getGendersQuery, getLevelsQuery, getMasteriesQuery, getWordTypesQuery };

// // models/userModel.js
// const db = require('../config/db');

// // Function to get all users
// const getGendersQuery = async () => {
//     query = `SELECT enumlabel 
//               FROM pg_enum 
//               JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
//               WHERE pg_type.typname = 'genders';`
//     const result = await db.query(query);
//     return result.rows;
//   };

// const getLevelsQuery = async () => {
//     query = `SELECT enumlabel 
//               FROM pg_enum 
//               JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
//               WHERE pg_type.typname = 'levels';`
//     const result = await db.query(query);
//     return result.rows;
//   };

// const getMasteriesQuery = async () => {
//     query = `SELECT enumlabel 
//               FROM pg_enum 
//               JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
//               WHERE pg_type.typname = 'masteries';`
//     const result = await db.query(query);
//     return result.rows;
//   };

// const getWordTypesQuery = async () => {
//     query = `SELECT enumlabel 
//               FROM pg_enum 
//               JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
//               WHERE pg_type.typname = 'wordTypes';`
//     const result = await db.query(query);
//     return result.rows;
//   };

//   module.exports = { getGendersQuery, getLevelsQuery, getMasteriesQuery, getWordTypesQuery };