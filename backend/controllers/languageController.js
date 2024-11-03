// controllers/userController.js
const { getLanguagesQuery } = require('../models/languageModel');

const getLanguagesController = async (req, res) => {
  try {
    const languages = await getLanguagesQuery();
    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getLanguagesController };
