// db.js
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log("Connected to the database successfully"))
  .catch(err => console.error("Database connection error", err.stack));

module.exports = client;
