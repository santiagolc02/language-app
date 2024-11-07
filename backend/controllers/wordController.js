// controllers/userController.js
const { getWordsQuery, getWordsLanguageQuery, postWordQuery } = require('../models/wordModel');

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

// Function to get all words from a language
const postWordsLanguageController = async (req, res) => {
  const {language} = req.params;
  const {word, mastery, translations, word_type, gender} = req.body;
  
  try {
    // Validate inputs (optional)
    if (!word || !mastery || !translations || !word_type || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Create an object to store the word in the database
    const newWord = {
      word,
      mastery,
      translations,
      word_type,
      gender,
      language, // language comes from the URL parameter
    };

    const insertedWord = await postWordQuery(newWord);
    res.status(201).json(insertedWord)
    console.log("Express: Word registered!")
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error")
  }
}

module.exports = { getWordsContoller, getWordsLanguageController, postWordsLanguageController };
