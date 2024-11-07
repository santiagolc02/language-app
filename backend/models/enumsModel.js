// models/userModel.js
const db = require('../config/db');

// Function to get all users
const getGendersQuery = async () => {
    query = `SELECT enumlabel 
              FROM pg_enum 
              JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
              WHERE pg_type.typname = 'genders';`
    const result = await db.query(query);
    return result.rows;
  };

const getLevelsQuery = async () => {
    query = `SELECT enumlabel 
              FROM pg_enum 
              JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
              WHERE pg_type.typname = 'levels';`
    const result = await db.query(query);
    return result.rows;
  };

const getMasteriesQuery = async () => {
    query = `SELECT enumlabel 
              FROM pg_enum 
              JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
              WHERE pg_type.typname = 'masteries';`
    const result = await db.query(query);
    return result.rows;
  };

const getWordTypesQuery = async () => {
    query = `SELECT enumlabel 
              FROM pg_enum 
              JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
              WHERE pg_type.typname = 'wordTypes';`
    const result = await db.query(query);
    return result.rows;
  };

  module.exports = { getGendersQuery, getLevelsQuery, getMasteriesQuery, getWordTypesQuery };