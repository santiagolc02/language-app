// controllers/userController.js
const { getWordsQuery, getWordsLanguageQuery } = require('../models/wordModel');

const getWordsContoller = async (req, res) => {
  try {
    const words = await getWordsQuery();
    res.json(words);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Function to get all words from a language
const getWordsLanguageController = async (req, res) => {
  try {
    const {language} = req.params;
    const words = await getWordsLanguageQuery(language);
    res.json(words);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error')
  }
}

module.exports = { getWordsContoller, getWordsLanguageController };
