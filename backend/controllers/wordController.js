// controllers/userController.js
const { getAllWords } = require('../models/wordModel');

const getWords = async (req, res) => {
  try {
    const words = await getAllWords();
    res.json(words);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getWords };
