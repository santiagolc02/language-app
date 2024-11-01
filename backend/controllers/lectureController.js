// controllers/userController.js
const { getLecturesQuery, getLecturesByLanguageQuery, getLectureQuery } = require('../models/lectureModel');

// All lectures
const getLecturesController = async (req, res) => {
  try {
    const lectures = await getLecturesQuery();
    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// All lectures from a language
const getLecturesLanguageController = async (req, res) => {
  try {
    const {language} = req.params;
    const lectures = await getLecturesByLanguageQuery(language);
    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error')
  }
}

// Get specific lecture from a language
const getLectureController = async (req, res) => {
  try {
    const {lectureId} = req.params;
    const lecture = await getLectureQuery(lectureId);
    res.json(lecture);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error')
  }
}

module.exports = { getLecturesController, getLecturesLanguageController, getLectureController };
