// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');

//http://localhost:3001/lectures...
router.get('/', lectureController.getLecturesController);
router.get('/language/:language', lectureController.getLecturesLanguageController)
router.get('/id/:lectureId', lectureController.getLectureController)
router.post('/:language/add', lectureController.postLectureController)

module.exports = router;
