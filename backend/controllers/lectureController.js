// controllers/userController.js
const { getAllLectures, getLecturesByLanguage } = require('../models/lectureModel');

// All lectures
const getLectures = async (req, res) => {
  try {
    const lectures = await getAllLectures();
    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// All lectures from a language
const getLecturesLanguage = async (req, res) => {
  try {
    const {language} = req.params;
    const lectures = await getLecturesByLanguage(language);
    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error')
  }
}

module.exports = { getLectures, getLecturesLanguage };
