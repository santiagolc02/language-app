// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');

router.get('/', lectureController.getLectures);

module.exports = router;
