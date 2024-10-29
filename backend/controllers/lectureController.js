// controllers/userController.js
const { getAllLectures } = require('../models/lectureModel');

const getLectures = async (req, res) => {
  try {
    const lectures = await getAllLectures();
    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = { getLectures };
