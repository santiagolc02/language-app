// controllers/userController.js
const { getLecturesQuery, getLecturesByLanguageQuery, getLectureQuery, postLectureQuery } = require('../models/lectureModel');

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

// Post lecture for a language
const postLectureController = async (req, res) => {
  const {language} = req.params;
  const {name, text, level, videoUrl} = req.body;
  
  try {
    // Validate inputs (optional)
    if (!name || !text || !level) {
      return res.status(400).json({ message: "Name, text and level are required" });
    }
    
    // Create an object to store the word in the database
    const newLecture = {
      name,
      text,
      language, // language comes from the URL parameter
      level,
      videoUrl,
    };

    const insertedLecture = await postLectureQuery(newLecture);
    res.status(201).json(insertedLecture)
    console.log("Express: Lecture registered!")
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error")
  }
}

module.exports = { getLecturesController, getLecturesLanguageController, getLectureController, postLectureController };
