// controllers/userController.js
const { getAllLanguages } = require('../models/languageModel');

const getLanguages = async (req, res) => {
  try {
    const languages = await getAllLanguages();
    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getLanguages };
